import React, { Component } from "react";
import Navbar from "../../components/Navbar.js";
import Footer from "../../components/FooterComponent.js";
import "./notifikasi.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";


export default class Notifikasi extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      allOrders: [], // Menyimpan semua pesanan dari server
      displayedOrders: [], 
      isDropdownOpen: false,
      selectedCategory: null,
    };
  }

  componentDidMount() {
    this.fetchOrders();
  }

  toggleDropdown = () => {
      this.setState((prevState) => ({
          isDropdownOpen: !prevState.isDropdownOpen,
      }));
  };

  fetchOrders = () => {
    // Fetch orders from the server
    axios
      .get("http://localhost:5000/orders")
      .then((res) => {
        this.setState({ 
          allOrders: res.data,
          displayedOrders: res.data // Mengatur pesanan yang akan ditampilkan ke semua pesanan dari server saat pertama kali memuat
        });
      })
      .catch((error) => {
        console.log("Error fetching orders:", error);
      });
  };


  handleAcceptOrder = (orderId) => {
    // Kirim permintaan ke server untuk memperbarui status pesanan
    axios
      .patch(`http://localhost:5000/orders/${orderId}`, { keterangan: 1 })
      .then(() => {
        console.log("Order accepted:", orderId);
        alert("Pesanan diterima");
        this.fetchOrders();
      })
      .catch((error) => {
        console.error("Error accepting order:", error);
      });
  };

  handleRejectOrder = (orderId) => {
    axios
      .patch(`http://localhost:5000/orders/${orderId}`, { keterangan: 2 })
      .then(() => {
        console.log("Order rejected:", orderId);
        alert("Pesanan dibatalkan");
        this.setState(prevState => ({
          displayedOrders: prevState.displayedOrders.filter(order => order.id !== orderId) // Menghapus pesanan yang ditolak dari tampilan
        }));
      })
      .catch((error) => {
        console.error("Error rejecting order:", error);
      });
  };

  handleFinishOrder = (orderId) => {
    axios
      .patch(`http://localhost:5000/orders/${orderId}`, { keterangan: 3 })
      .then(() => {
        console.log("Order Finish:", orderId);
        alert("Pesanan telah selesai");
        this.fetchOrders();
      })
      .catch((error) => {
        console.error("Error finishing order:", error);
      });
  };

  handleCategoryClick = (category) => {
      this.setState({
          selectedCategory: category,
          isDropdownOpen: false
      });
  };

  // render() {
  //   const { orders, isDropdownOpen, selectedCategory } = this.state;
  //   const totalHargaSemuaPesanan = orders.reduce((total, order) => {
  //       return total + (order.harga_satuan * order.jumlah_pesanan);
  //   }, 0);

  //   return (
  //     <div className="notifikasi">
  //       <Navbar />
  //       <div className="notifikasi-container">
  //         <div className="konten-notifikasi">
  //           <h2>Pesanan Masuk</h2>
  //               <div className="kategori-pesanan">
  //               <div
  //                   className="kategori-status"
  //                   onClick={this.toggleDropdown}
  //               >
  //                   Kategori Pesanan{" "}
  //                   <FontAwesomeIcon
  //                   icon={faCaretDown}
  //                   rotation={isDropdownOpen ? 180 : 0}
  //                   />
  //               </div>
  //               {isDropdownOpen && ( 
  //                   <div className="kategori-konten">
  //                     <div className="kategori" onClick={() => this.handleCategoryClick(null)}>Semua Pesanan</div>
  //                     <div className="kategori" onClick={() => this.handleCategoryClick(0)}>Sedang cek stok pesanan</div>
  //                     <div className="kategori" onClick={() => this.handleCategoryClick(1)}>Pesanan sedang dibuat</div>
  //                     <div className="kategori" onClick={() => this.handleCategoryClick(2)}>Pesanan dibatalkan</div>
  //                     <div className="kategori" onClick={() => this.handleCategoryClick(3)}>Pesanan telah selesai</div>
  //                   </div>
  //               )}
  //               </div>
  //           <div className="notifikasi-wrap">
  //             {orders.filter(order => selectedCategory === null || order.keterangan === selectedCategory).map((order) => (
  //               <div
  //                 key={order.id}
  //                 className={`notification-card keterangan-${order.keterangan}`}>
  //                 <div className="notification-details">
  //                   <h3>{order.nama_menu}</h3>
  //                   <p>Catatan: {order.catatan}</p>
  //                   <p>Total Harga: Rp {order.harga_satuan * order.jumlah_pesanan}</p>
  //                 </div>
  //                 <div className="notification-buttons">
  //                   {order.keterangan === 0 && (
  //                     <>
  //                       <button className="terima" onClick={() => this.handleAcceptOrder(order.id)}>Terima</button>
  //                       <button className="tolak" onClick={() => this.handleRejectOrder(order.id)}>Tolak</button>
  //                     </>
  //                   )}
  //                   {order.keterangan === 1 && (
  //                     <button className="selesai" onClick={() => this.handleFinishOrder(order.id)}>Selesai</button>
  //                   )}
  //                 </div>
  //               </div>
  //             ))}
  //           </div>
  //           <h3>Total harga semua pesanan: Rp {totalHargaSemuaPesanan}</h3>
  //         </div>
  //       </div>
  //       <Footer />
  //     </div>
  //   );
  // }
  render() {
    const { displayedOrders, isDropdownOpen, selectedCategory } = this.state;
    const totalHargaSemuaPesanan = displayedOrders.reduce((total, order) => {
      return total + (order.harga_satuan * order.jumlah_pesanan);
    }, 0);

    return (
      <div className="notifikasi">
        <Navbar />
        <div className="notifikasi-container">
          <div className="konten-notifikasi">
            <h2>Pesanan Masuk</h2>
            <div className="kategori-pesanan">
              <div className="kategori-status" onClick={this.toggleDropdown}>
                Kategori Pesanan{" "}
                <FontAwesomeIcon
                  icon={faCaretDown}
                  rotation={isDropdownOpen ? 180 : 0}
                />
              </div>
              {isDropdownOpen && ( 
                <div className="kategori-konten">
                  <div className="kategori" onClick={() => this.handleCategoryClick(null)}>Semua Pesanan</div>
                  <div className="kategori" onClick={() => this.handleCategoryClick(0)}>Sedang cek stok pesanan</div>
                  <div className="kategori" onClick={() => this.handleCategoryClick(1)}>Pesanan sedang dibuat</div>
                  <div className="kategori" onClick={() => this.handleCategoryClick(2)}>Pesanan dibatalkan</div>
                  <div className="kategori" onClick={() => this.handleCategoryClick(3)}>Pesanan telah selesai</div>
                </div>
              )}
            </div>
            <div className="notifikasi-wrap">
              {displayedOrders
                .filter(order => selectedCategory === null || order.keterangan === selectedCategory)
                .map((order) => (
                  <div
                    key={order.id}
                    className={`notification-card keterangan-${order.keterangan}`}>
                    <div className="notification-details">
                      <h3>{order.nama_menu}</h3>
                      <p>Catatan: {order.catatan}</p>
                      <p>Total Harga: Rp {order.harga_satuan * order.jumlah_pesanan}</p>
                    </div>
                    <div className="notification-buttons">
                      {order.keterangan === 0 && (
                        <>
                          <button className="terima" onClick={() => this.handleAcceptOrder(order.id)}>Terima</button>
                          <button className="tolak" onClick={() => this.handleRejectOrder(order.id)}>Tolak</button>
                        </>
                      )}
                      {order.keterangan === 1 && (
                        <button className="selesai" onClick={() => this.handleFinishOrder(order.id)}>Selesai</button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
            <h3>Total harga semua pesanan: Rp {totalHargaSemuaPesanan}</h3>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
