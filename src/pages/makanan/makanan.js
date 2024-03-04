import React, { Component } from 'react';
import Swal from 'sweetalert2';
import NavbarComponent from '../../components/NavbarComponent';
import FooterComponent from '../../components/FooterComponent';
import './makanan.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '../../utils/constants'
import axios from 'axios'
import { numberWithCommas } from '../../utils/utils';

export default class Makanan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      selectedFoods: [],
      totalHarga: 0,

    }
  }


  componentDidMount() {
    this.fetchMenuData();
  }

  fetchMenuData = () => {
    axios.get(API_URL + "products", { params: { id_kategori: 1 } })  
      .then(res => {
        this.setState({ menus: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  


  handleFoodClick = (food) => {
    const { selectedFoods } = this.state;
    const existingFood = selectedFoods.find((selectedFood) => selectedFood.id === food.id);

    if (existingFood) {
      const updatedFoods = selectedFoods.map((selectedFood) =>
        selectedFood.id === food.id
          ? { ...selectedFood, quantity: selectedFood.quantity + 1, totalPrice: selectedFood.harga * (selectedFood.quantity + 1) }
          : selectedFood
      );

      this.setState({
        selectedFoods: updatedFoods,
        totalHarga: this.state.totalHarga + food.harga,
      });
    } else {
      const newFood = { ...food, quantity: 1, totalPrice: food.harga };
      this.setState((prevState) => ({
        selectedFoods: [...prevState.selectedFoods, newFood],
        totalHarga: prevState.totalHarga + food.harga,
      }));

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Menu Ditambah',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  calculateTotal = (foodList) => {
    return foodList.reduce((total, food) => total + food.totalPrice, 0);
  };

  handleSelectedFoodClick = (selectedFood) => {
    this.setState({
      editingFood: selectedFood,
      editQuantity: selectedFood.quantity,
      editNote: selectedFood.note || '',
    });
    this.openEditPopup();
  };

  handleEditMenu = () => {
    const { selectedFoods, editingFood, editQuantity, editNote } = this.state;

    const updatedFoods = selectedFoods.map((selectedFood) =>
      selectedFood.id === editingFood.id
        ? { ...selectedFood, quantity: editQuantity, note: editNote, totalPrice: editingFood.harga * editQuantity }
        : selectedFood
    );

    const newTotalHarga = this.calculateTotal(updatedFoods);

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Menu berhasil di edit',
      showConfirmButton: false,
      timer: 1500,
    });

    this.setState({
      selectedFoods: updatedFoods,
      totalHarga: newTotalHarga,
      editingFood: null,
    });
  };

  openEditPopup = () => {
    this.setState({
      isEditPopupOpen: true,
    });
  };

  closeEditPopup = () => {
    this.setState({
      editingFood: null,
      isEditPopupOpen: false,
    });
  };

  handleDeleteMenu = () => {
    const { selectedFoods, editingFood } = this.state;

    const updatedFoods = selectedFoods.filter((selectedFood) => selectedFood.id !== editingFood.id);

    const newTotalHarga = this.calculateTotal(updatedFoods);

    this.setState({
      selectedFoods: updatedFoods,
      totalHarga: newTotalHarga,
      editingFood: null,
    });
  };

  // handlePayOrder = () => {
  //   const { selectedFoods } = this.state;

  //   if (selectedFoods.length === 0) {
  //     Swal.fire({
  //       position: 'center',
  //       icon: 'error',
  //       title: 'Silakan pilih salah satu menu terlebih dahulu',
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });
  //     return;
  //   }


  //   Swal.fire({
  //     title: 'Pesanan Sukses',
  //     text: 'Terima Kasih Sudah Memesan',
  //     imageUrl: '/image/success.png',
  //     imageWidth: 400,
  //     imageHeight: 200,
  //     imageAlt: 'Custom image',
  //   });

  //   this.setState({
  //     selectedFoods: [],
  //     totalHarga: 0,
  //   });
  // };

  handlePayOrder = () => {
    const { selectedFoods, editNote } = this.state;
  
    if (selectedFoods.length === 0) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Silakan pilih salah satu menu terlebih dahulu',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
  
    const orderData = {
      selectedFoods: selectedFoods.map(food => ({
        nama_menu: food.nama_menu,
        jumlah_pesanan: food.quantity,
        harga_satuan: food.harga,
        total_harga: food.totalPrice,
        catatan: editNote,
        foto_menu: food.url
      }))
    };
  
    axios.post('http://localhost:5000/orders', orderData)
      .then(response => {
        Swal.fire({
          title: 'Pesanan Sukses',
          text: 'Terima Kasih Sudah Memesan',
          imageUrl: '/image/success.png',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
        });
  
        this.setState({
          selectedFoods: [],
          totalHarga: 0,
        });
      })
      .catch(error => {
        console.error(error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Terjadi kesalahan saat melakukan pesanan',
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  

  render() {
    console.log(this.state.menus)
    const { menus, selectedFoods, totalHarga, editingFood, editQuantity, editNote } = this.state;
    const filteredMenus = menus.filter((food) => food.id_kategori === 1);
    return (
      <div className='judul-menu'>
        <NavbarComponent />
        <div className='container' style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: '15px'
        }}>
          <div className='food-list-wrapper'>
            <div className='food-list'>
              <h2>Daftar Menu</h2>
              <div className='food-wrap'>
                {filteredMenus.map((food) => (
                  <div key={food.id} className='food-card' onClick={() => this.handleFoodClick(food)}>
                    <div className='food-image-container'>
                      <FontAwesomeIcon icon={faCircleInfo} className='icon-info' />
                      <img src={food.url} alt={food.nama} className='food-image' />
                    </div>
                    <div className='food-details'>
                      <div className='food-name'>
                        <h3>{food.nama_menu}</h3>
                      </div>
                      <h4>Rp {numberWithCommas(food.harga)}</h4>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>
          <div className='payment-details'>
            <h2>Detail Pembayaran</h2>
            <div className='selected-foods'>
              {selectedFoods.map((selectedFood) => (
                <div
                  key={selectedFood.id}
                  className='selected-food'
                  onClick={() => this.handleSelectedFoodClick(selectedFood)}
                >
                  <p>{selectedFood.nama_menu} ({selectedFood.quantity}) </p>
                  <h5>Rp {numberWithCommas(selectedFood.totalPrice)}</h5>
                </div>
              ))}
            </div>
            <div className='total-price'>
              <p>Total Harga: {this.state.totalHarga}</p>
            </div>
            <button className='pay-button' onClick={this.handlePayOrder}>
              BAYAR
            </button>
          </div>

          {/* Pop-up Edit */}
          {editingFood && (
            <div className='edit-popup'>
              <div className='edit-popup-content'>
                <h3>{editingFood.nama_menu}</h3>
                <label>Jumlah Pesanan:</label>
                <div className="quantity-container">
                  <button onClick={() => this.setState({ editQuantity: Math.max(1, editQuantity - 1) })}>-</button>
                  <span>{editQuantity}</span>
                  <button onClick={() => this.setState({ editQuantity: editQuantity + 1 })}>+</button>
                </div>
                <div className='edit-section'>
                  <label>Catatan Pesanan:</label>
                  <textarea value={editNote} onChange={(e) => this.setState({ editNote: e.target.value })} placeholder='Tuliskan catatan anda disini' />
                </div>
                <div className='edit-price'>
                  <label>Total Harga: </label>
                  <h4>Rp {numberWithCommas(editingFood.harga * editQuantity)}</h4>
                </div>
                <div className='popup-button'>
                  <button onClick={this.handleEditMenu} style={{ color: '#7749F8', border: ' 2px solid #7749F8', cursor: 'pointer' }}>Simpan</button>
                  <button onClick={this.handleDeleteMenu} style={{ color: '#DC3545', border: ' 2px solid #DC3545', cursor: 'pointer' }}>Hapus</button>
                  <button onClick={this.closeEditPopup} style={{ cursor: 'pointer' }}>Batal</button>
                </div>
              </div>
            </div>
          )}

        </div>
        <FooterComponent />
      </div>
    );
  }
}
