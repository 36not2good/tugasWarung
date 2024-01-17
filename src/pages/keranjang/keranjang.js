import React, { Component } from 'react';
import Swal from 'sweetalert2';
import NavbarComponent from "../../components/NavbarComponent";
import FooterComponent from "../../components/FooterComponent";
import "./keranjang.css";
import { numberWithCommas } from '../../utils/utils';

class Keranjang extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [
        {
          id: 1,
          name: 'Nasi Goreng',
          origin: 'warung 01',
          price: 15000,
          image: '/image/keranjang/juss.jpeg',
        },
        {
          id: 2,
          name: 'Bakso',
          origin: 'warung 02',
          price: 15000,
          image: '/image/keranjang/seblakk.jpeg'
        },
        // Tambahkan makanan lain sesuai kebutuhan
      ],
      selectedmenus: [],
      totalHarga: 0,
      editingmenu: null,
      editQuantity: 0,
      editNote: '',
    };
  }

  handlemenuClick = (menu) => {
    const { selectedmenus, totalHarga, quantity } = this.state;
    const existingmenu = selectedmenus.find((selectedmenu) => selectedmenu.id === menu.id);

    if (existingmenu) {
      const updatedmenus = selectedmenus.map((selectedmenu) =>
        selectedmenu.id === menu.id
          ? { ...selectedmenu, quantity: selectedmenu.quantity + 1, subtotalPrice: selectedmenu.quantity * menu.price }
          : selectedmenu
      );

      this.setState({
        selectedmenus: updatedmenus,
        totalHarga: totalHarga + menu.price,
        subtotalPrice: quantity * menu.price,
      });
    } else {
      const newmenu = { ...menu, quantity: 1, totalPrice: menu.price };
      this.setState((prevState) => ({
        selectedmenus: [...prevState.selectedmenus, newmenu],
        totalHarga: prevState.totalHarga + menu.price,
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
    return menuList.reduce((total, menu) => total + menu.totalPrice, 0);
  };

  handleSelectedmenuClick = (selectedmenu) => {
    this.setState({
      editingmenu: selectedmenu,
      editQuantity: selectedmenu.quantity,
      editNote: selectedmenu.note || '',
    });
  };

  handleEditMenu = () => {
    const { selectedmenus, editingmenu, editQuantity, editNote } = this.state;
  
    const updatedmenus = selectedmenus.map((selectedmenu) =>
      selectedmenu.id === editingmenu.id
        ? { ...selectedmenu, quantity: editQuantity, note: editNote, totalPrice: selectedmenu.price * editQuantity }
        : selectedmenu
    );
  
    const newTotalHarga = this.calculateTotal(updatedmenus);
  
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Menu berhasil di edit',
      showConfirmButton: false,
      timer: 1500,
    });
  
    this.setState({
      selectedmenus: updatedmenus,
      totalHarga: newTotalHarga, 
      editingmenu: null,
    });
  };
  

  closeEditPopup = () => {
    this.setState({
      editingmenu: null,
    });
  };

  handleDeleteMenu = () => {
    const { selectedmenus, editingmenu } = this.state;

    const updatedmenus = selectedmenus.filter((selectedmenu) => selectedmenu.id !== editingmenu.id);

    const newTotalHarga = this.calculateTotal(updatedmenus);

    this.setState({
      selectedmenus: updatedmenus,
      totalHarga: newTotalHarga,
      editingmenu: null,
    });
  };

  handlePayOrder = () => {
    const { selectedmenus, totalHarga } = this.state;

    if (selectedmenus.length === 0) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Silakan pilih salah satu menu terlebih dahulu',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    console.log('Makanan yang dibeli:', selectedmenus);
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
      selectedmenus: [],
      totalHarga: 0,
    });
  };

  render() {
    const { menus, selectedmenus, totalHarga, editingmenu, editQuantity, editNote } = this.state;

    return (
      <div>
        <NavbarComponent />
        <div className="keranjang-container">
          <div className="keranjang-content">
            <div className='keranjang-judul'>
              <h2>Keranjang</h2>
            </div>
            <div className="menu-container">
              {menus.map((menu) => (
                <div
                  className="card-menu"
                  key={menu.id}
                  onClick={() => this.handlemenuClick(menu)}
                >
                  <div className='menu-img-container'>
                    <img src={menu.image} alt={menu.name} className='menu-img'/>
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
              {selectedmenus.map((selectedmenu) => (
                <div key={selectedmenu.id} className="detail-item " onClick={() => this.handleSelectedmenuClick(selectedmenu)}>
                  <p>{selectedmenu.name} ({selectedmenu.quantity}) </p>
                  <h5>Rp {selectedmenu.subtotalPrice}</h5>
                </div>
              ))}
            </div>
            <div className="total-harga">
              <span>Total Harga:</span>
              <span>{`Rp ${totalHarga}`}</span>
            </div>
            <button className='cart-button' onClick={this.handlePayOrder}>Bayar</button>
          </div>

          {editingmenu && (
            <div className='popup'>
              <div className='popup-content'>
                <h3>{editingmenu.name}</h3>
                <label>Jumlah Pesanan:</label>
                <div className="kuantitas-container">
                  <button onClick={() => this.setState({ editQuantity: Math.max(1, editQuantity - 1) })}>-</button>
                  <span>{editQuantity}</span>
                  <button onClick={() => this.setState({ editQuantity: editQuantity + 1 })}>+</button>
                </div>
                <div className='section'>
                  <label>Catatan Pesanan:</label>
                  <textarea value={editNote} onChange={(e) => this.setState({ editNote: e.target.value })} placeholder='Tuliskan catatan anda disini' />
                </div>
                <div className='price'>
                  <label>Total Harga: </label>
                  <h4>Rp {numberWithCommas(editingmenu.price * editQuantity)}</h4>
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

export default Keranjang;
