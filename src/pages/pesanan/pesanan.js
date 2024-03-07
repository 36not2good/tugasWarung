import React, { Component } from 'react';
import NavbarComponent from '../../components/NavbarComponent';
import FooterComponent from '../../components/FooterComponent';
import axios from 'axios';
import "./pesanan.css";

export default class Pesanan extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pesans: [], 
        };
    }

    componentDidMount() {
        this.fetchPesans();
    }

    fetchPesans = () => {
        axios.get('http://localhost:5000/orders')
            .then(res => {
                this.setState({ pesans: res.data });
            })
            .catch(error => {
                console.log(error);
            });
    };

    handleCancelOrder = (orderId) => {
        axios.patch(`http://localhost:5000/orders/${orderId}`, { keterangan: 2 })
            .then(res => {
                alert("Pesanan dibatalkan");
                this.fetchPesans(); // Refresh pesanan setelah pembatalan
            })
            .catch(error => {
                console.log(error);
            });
    };
    
    render() {
        const { pesans } = this.state;
    
        return (
            <div className='pesanan1'>
                <NavbarComponent />
                <div className='pesanan1-kontainer'>
                    <div className='konten-pesanan1'>
                        <h2>Status Pesanan</h2>
                        <div className='pesan1-wrap'>
                            {pesans.map((order) => (
                                <div key={order.id} className='pesan1-card'>
                                    <div className='notification-details'>
                                        <h3>{order.nama_menu}</h3>
                                        <p>Total Harga: Rp {order.harga_satuan}</p>
                                        {order.keterangan === 0 && <p>Status: Sedang cek stok pesanan</p>}
                                        {order.keterangan === 1 && <p>Status: Pesanan sedang dibuat</p>}
                                        {order.keterangan === 2 && <p>Status: Pesanan dibatalkan</p>}
                                        {order.keterangan === 3 && <p>Status: Pesanan telah selesai</p>}
                                        {(order.keterangan !== 2 && order.keterangan !== 3) &&
                                            <button className="tolak" onClick={() => this.handleCancelOrder(order.id)}>Batal</button>
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <FooterComponent />
            </div>
        )
    }
    
} 
