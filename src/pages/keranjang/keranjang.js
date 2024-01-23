import React, { Component } from 'react';
import Swal from 'sweetalert2';
import NavbarComponent from '../../components/NavbarComponent';
import FooterComponent from '../../components/FooterComponent';
import './keranjang.css';
import { numberWithCommas } from '../../utils/utils';

class Keranjang extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [
        {
          id: 1,
          name: 'Jus Buah',
          origin: 'warung 01',
          price: 15000,
          image: '/image/keranjang/juss.jpeg',
        },
        {
          id: 2,
          name: 'Seblak',
          origin: 'warung 02',
          price: 15000,
          image: '/image/keranjang/seblakk.jpeg',
        },
        {
          id: 2,
          name: 'Seblak',
          origin: 'warung 02',
          price: 15000,
          image: '/image/keranjang/seblakk.jpeg',
        },
        {
          id: 2,
          name: 'Seblak',
          origin: 'warung 02',
          price: 15000,
          image: '/image/keranjang/seblakk.jpeg',
        },
        {
          id: 2,
          name: 'Seblak',
          origin: 'warung 02',
          price: 15000,
          image: '/image/keranjang/seblakk.jpeg',
        },
        // Tambahkan makanan lain sesuai kebutuhan
      ],
      selectedMenus: [],
      totalHarga: 0,
      editingMenu: null,
      editQuantity: 0,
      editNote: '',
    };
  }

  handleMenuClick = (menu) => {
    const { selectedMenus, totalHarga, editQuantity } = this.state;
    const existingMenu = selectedMenus.find((selectedMenu) => selectedMenu.id === menu.id);
  
    if (existingMenu) {
      const updatedMenus = selectedMenus.map((selectedMenu) =>
        selectedMenu.id === menu.id
          ? {
              ...selectedMenu,
              quantity: selectedMenu.quantity + 1,
              subTotalPrice: selectedMenu.subTotalPrice + menu.price,
            }
          : selectedMenu
      );
  
      this.setState((prevState) => ({
        selectedMenus: updatedMenus,
        totalHarga: prevState.totalHarga + menu.price,
        editQuantity: prevState.editQuantity + 1,
      }));
    } else {
      const newMenu = { ...menu, quantity: 1, subTotalPrice: menu.price }; // Ganti totalPrice dengan subTotalPrice
      this.setState((prevState) => ({
        selectedMenus: [...prevState.selectedMenus, newMenu],
        totalHarga: prevState.totalHarga + menu.price,
        editQuantity: prevState.editQuantity + 1,
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

  calculateTotal = (menuList) => {
    return menuList.reduce((total, menu) => total + menu.subTotalPrice, 0);
  };

  handleSelectedMenuClick = (selectedMenu) => {
    this.setState({
      editingMenu: selectedMenu,
      editQuantity: selectedMenu.quantity,
      editNote: selectedMenu.note || '',
    });
  };

  handleEditMenu = () => {
    const { selectedMenus, editingMenu, editQuantity, editNote } = this.state;
  
    const updatedMenus = selectedMenus.map((selectedMenu) =>
      selectedMenu.id === editingMenu.id
        ? {
            ...selectedMenu,
            quantity: editQuantity,
            note: editNote,
            subTotalPrice: editingMenu.price * editQuantity, // Update to subTotalPrice
          }
        : selectedMenu
    );
  
    const newTotalHarga = this.calculateTotal(updatedMenus);
  
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Menu berhasil di edit',
      showConfirmButton: false,
      timer: 1500,
    });
  
    this.setState({
      selectedMenus: updatedMenus,
      totalHarga: newTotalHarga,
      editingMenu: null,
    });
  };
  

  closeEditPopup = () => {
    this.setState({
      editingMenu: null,
    });
  };

  handleDeleteMenu = () => {
    const { selectedMenus, editingMenu } = this.state;

    const updatedMenus = selectedMenus.filter((selectedMenu) => selectedMenu.id !== editingMenu.id);

    const newTotalHarga = this.calculateTotal(updatedMenus);

    this.setState({
      selectedMenus: updatedMenus,
      totalHarga: newTotalHarga,
      editingMenu: null,
    });
  };

  handlePayOrder = () => {
    const { selectedMenus, totalHarga } = this.state;

    if (selectedMenus.length === 0) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Silakan pilih salah satu menu terlebih dahulu',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    console.log('Makanan yang dibeli:', selectedMenus);
    console.log('Total Harga:', totalHarga);

    Swal.fire({
      title: 'Pesanan Sukses',
      text: 'Terima Kasih Sudah Memesan',
      imageUrl: '/image/success.png',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    });

    this.setState({
      selectedMenus: [],
      totalHarga: 0,
    });
  };

  render() {
    const { menus, selectedMenus, totalHarga, editingMenu, editQuantity, editNote } = this.state;

    return (
      <div>
        <NavbarComponent />
        <div className="keranjang-container">
          <div className="keranjang-content">
            <div className="keranjang-judul">
              <h2>Keranjang</h2>
            </div>
            <div className="menu-container">
              {menus.map((menu) => (
                <div
                  className="card-menu"
                  key={menu.id}
                  onClick={() => this.handleMenuClick(menu)}
                >
                  <div className="menu-img-container">
                    <img src={menu.image} alt={menu.name} className="menu-img" />
                  </div>
                  <div className="menu-info">
                    <div className="menu-title">
                      <h3>{menu.name}</h3>
                      <p>{menu.origin}</p>
                    </div>
                    <h4>{`Rp ${menu.price}`}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="detail-pembayaran">
            <h2>Detail Pembayaran</h2>
            <div className="card-detail-pembayaran">
              {selectedMenus.map((selectedMenu) => (
                <div
                  key={selectedMenu.id}
                  className="detail-item "
                  onClick={() => this.handleSelectedMenuClick(selectedMenu)}
                >
                  <p>{`${selectedMenu.name} (${selectedMenu.quantity})`}</p>
                  <h5>{`Rp ${numberWithCommas(selectedMenu.subTotalPrice)}`}</h5>
                </div>
              ))}
            </div>
            <div className="total-harga">
              <span>Total Harga:</span>
              <span>{`Rp ${numberWithCommas(totalHarga)}`}</span>
            </div>
            <button className="cart-button" onClick={this.handlePayOrder}>
              Bayar
            </button>
          </div>
          
          

          {editingMenu && (
            <div className="popup">
              <div className="popup-content">
                <h3>{editingMenu.name}</h3>
                <label>Jumlah Pesanan:</label>
                <div className="kuantitas-container">
                  <button onClick={() => this.setState({ editQuantity: Math.max(1, editQuantity - 1) })}>
                    -
                  </button>
                  <span>{editQuantity}</span>
                  <button onClick={() => this.setState({ editQuantity: editQuantity + 1 })}>+</button>
                </div>
                <div className="section">
                  <label>Catatan Pesanan:</label>
                  <textarea
                    value={editNote}
                    onChange={(e) => this.setState({ editNote: e.target.value })}
                    placeholder="Tuliskan catatan anda disini"
                  />
                </div>
                <div className="price">
                  <label>Total Harga: </label>
                  <h4>{`Rp ${numberWithCommas(editingMenu.price * editQuantity)}`}</h4>
                </div>
                <div className="popup-button">
                  <button
                    onClick={this.handleEditMenu}
                    style={{ color: '#7749F8', border: ' 2px solid #7749F8', cursor: 'pointer' }}
                  >
                    Simpan
                  </button>
                  <button
                    onClick={this.handleDeleteMenu}
                    style={{ color: '#DC3545', border: ' 2px solid #DC3545', cursor: 'pointer' }}
                  >
                    Hapus
                  </button>
                  <button onClick={this.closeEditPopup} style={{ cursor: 'pointer' }}>
                    Batal
                  </button>
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

export default Keranjang;
