import React, { Component } from 'react';
import Swal from 'sweetalert2';
import NavbarComponent from '../../components/NavbarComponent';
import FooterComponent from '../../components/FooterComponent';
import './minuman.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '../../utils/constants'
import axios from 'axios'
import { numberWithCommas } from '../../utils/utils';

export default class Minuman extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      selectedDrinks: [],
      totalHarga: 0,

    }
  }


  componentDidMount() {
    this.fetchMenuData();
  }

  fetchMenuData = () => {
    axios.get(API_URL + "products", { params: { id_kategori: 2 } })  
      .then(res => {
        this.setState({ menus: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  


  handleDrinkClick = (Drink) => {
    const { selectedDrinks } = this.state;
    const existingDrink = selectedDrinks.find((selectedDrink) => selectedDrink.id === Drink.id);

    if (existingDrink) {
      const updatedDrinks = selectedDrinks.map((selectedDrink) =>
        selectedDrink.id === Drink.id
          ? { ...selectedDrink, quantity: selectedDrink.quantity + 1, totalPrice: selectedDrink.harga * (selectedDrink.quantity + 1) }
          : selectedDrink
      );

      this.setState({
        selectedDrinks: updatedDrinks,
        totalHarga: this.state.totalHarga + Drink.harga,
      });
    } else {
      const newDrink = { ...Drink, quantity: 1, totalPrice: Drink.harga };
      this.setState((prevState) => ({
        selectedDrinks: [...prevState.selectedDrinks, newDrink],
        totalHarga: prevState.totalHarga + Drink.harga,
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

  calculateTotal = (DrinkList) => {
    return DrinkList.reduce((total, Drink) => total + Drink.totalPrice, 0);
  };

  handleSelectedDrinkClick = (selectedDrink) => {
    this.setState({
      editingDrink: selectedDrink,
      editQuantity: selectedDrink.quantity,
      editNote: selectedDrink.note || '',
    });
    this.openEditPopup();
  };

  handleEditMenu = () => {
    const { selectedDrinks, editingDrink, editQuantity, editNote } = this.state;

    const updatedDrinks = selectedDrinks.map((selectedDrink) =>
      selectedDrink.id === editingDrink.id
        ? { ...selectedDrink, quantity: editQuantity, note: editNote, totalPrice: editingDrink.harga * editQuantity }
        : selectedDrink
    );

    const newTotalHarga = this.calculateTotal(updatedDrinks);

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Menu berhasil di edit',
      showConfirmButton: false,
      timer: 1500,
    });

    this.setState({
      selectedDrinks: updatedDrinks,
      totalHarga: newTotalHarga,
      editingDrink: null,
    });
  };

  openEditPopup = () => {
    this.setState({
      isEditPopupOpen: true,
    });
  };

  closeEditPopup = () => {
    this.setState({
      editingDrink: null,
      isEditPopupOpen: false,
    });
  };

  handleDeleteMenu = () => {
    const { selectedDrinks, editingDrink } = this.state;

    const updatedDrinks = selectedDrinks.filter((selectedDrink) => selectedDrink.id !== editingDrink.id);

    const newTotalHarga = this.calculateTotal(updatedDrinks);

    this.setState({
      selectedDrinks: updatedDrinks,
      totalHarga: newTotalHarga,
      editingDrink: null,
    });
  };

  handlePayOrder = () => {
    const { selectedDrinks } = this.state;

    if (selectedDrinks.length === 0) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Silakan pilih salah satu menu terlebih dahulu',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    Swal.fire({
      title: 'Pesanan Sukses',
      text: 'Terima Kasih Sudah Memesan',
      imageUrl: '/image/success.png',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    });

    this.setState({
      selectedDrinks: [],
      totalHarga: 0,
    });
  };

  render() {
    console.log(this.state.menus)
    const { menus, selectedDrinks, totalHarga, editingDrink, editQuantity, editNote } = this.state;
    const filteredMenus = menus.filter((Drink) => Drink.id_kategori === 2);
    return (
      <div className='judul-menu'>
        <NavbarComponent />
        <div className='container' style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: '15px'
        }}>
          <div className='Drink-list-wrapper'>
            <div className='Drink-list'>
              <h2>Daftar Menu</h2>
              <div className='Drink-wrap'>
                {filteredMenus.map((Drink) => (
                  <div key={Drink.id} className='Drink-card' onClick={() => this.handleDrinkClick(Drink)}>
                    <div className='Drink-image-container'>
                      <FontAwesomeIcon icon={faCircleInfo} className='icon-info' />
                      <img src={Drink.url} alt={Drink.nama} className='Drink-image' />
                    </div>
                    <div className='Drink-details'>
                      <div className='Drink-name'>
                        <h3>{Drink.nama_menu}</h3>
                      </div>
                      <h4>Rp {numberWithCommas(Drink.harga)}</h4>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>
          <div className='payment-details'>
            <h2>Detail Pembayaran</h2>
            <div className='selected-Drinks'>
              {selectedDrinks.map((selectedDrink) => (
                <div
                  key={selectedDrink.id}
                  className='selected-Drink'
                  onClick={() => this.handleSelectedDrinkClick(selectedDrink)}
                >
                  <p>{selectedDrink.nama_menu} ({selectedDrink.quantity}) </p>
                  <h5>Rp {numberWithCommas(selectedDrink.totalPrice)}</h5>
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
          {editingDrink && (
            <div className='edit-popup'>
              <div className='edit-popup-content'>
                <h3>{editingDrink.nama_menu}</h3>
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
                  <h4>Rp {numberWithCommas(editingDrink.harga * editQuantity)}</h4>
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
