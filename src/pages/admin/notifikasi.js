import React, { Component } from 'react';
import Navbar from '../../components/Navbar.js';
import Footer from '../../components/FooterComponent.js';
import "./notifikasi.css";
import axios from 'axios';

export default class Notifikasi extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orders: [],
        };
    }

    componentDidMount() {
        this.fetchOrders();
    }

    fetchOrders = () => {
        // Fetch orders from the server
        axios.get('http://localhost:5000/orders')
            .then(res => {
                this.setState({ orders: res.data });
            })
            .catch(error => {
                console.log(error);
            });
    };

    handleAcceptOrder = (orderId) => {
        // Send a request to the server to update the order status
        axios.patch(`http://localhost:5000/orders/${orderId}`, { keterangan: 1 })
            .then(() => {
                console.log('Order accepted:', orderId);
                alert("pesanan diterima");
                this.fetchOrders();
            })
            .catch(error => {
                console.error('Error accepting order:', error);
            });
    };

    handleRejectOrder = (orderId) => {
        axios.patch(`http://localhost:5000/orders/${orderId}`, { keterangan: 2 })
            .then(res => {
                alert("Pesanan dibatalkan");
                this.fetchPesans();
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        const { orders } = this.state;

        return (
            <div className='notifikasi'>
                <Navbar />
                <div className='notifikasi-container'>
                    <div className='konten-notifikasi'>
                        <h2>Pesanan Masuk</h2>
                        <div className='notifikasi-wrap'>
                            {orders.map((order) => (
                                <div key={order.id} className='notification-card'>
                                    <div className='notification-details'>
                                        <h3>{order.nama_menu}</h3>
                                        <p>Total Harga: Rp {order.harga_satuan}</p>
                                    </div>
                                    <div className='notification-buttons'>
                                        <button className="terima" onClick={() => this.handleAcceptOrder(order.id)}>Terima</button>
                                        <button className="tolak" onClick={() => this.handleRejectOrder(order.id)}>Tolak</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
