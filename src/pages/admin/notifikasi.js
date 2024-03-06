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
        // Implement logic for accepting an order
        console.log('Order accepted:', orderId);
    };

    handleRejectOrder = (orderId) => {
        // Implement logic for rejecting an order
        console.log('Order rejected:', orderId);
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
