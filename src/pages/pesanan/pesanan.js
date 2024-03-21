import React, { Component } from 'react';
import NavbarComponent from '../../components/NavbarComponent';
import FooterComponent from '../../components/FooterComponent';
import axios from 'axios';
import "./pesanan.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

export default class Pesanan extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pesans: [],
            isDropdownOpen: false,
            selectedCategory: null,
        };
    }

    componentDidMount() {
        this.fetchPesans();
    }

    toggleDropdown = () => {
        this.setState((prevState) => ({
            isDropdownOpen: !prevState.isDropdownOpen,
        }));
    };

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

    handleCategoryClick = (category) => {
        this.setState({
            selectedCategory: category,
            isDropdownOpen: false
        });
    };

    render() {
        const { pesans, isDropdownOpen, selectedCategory } = this.state;
        const filteredPesans = selectedCategory !== null ? pesans.filter(order => parseInt(order.keterangan) === parseInt(selectedCategory)) : pesans;
        const totalHargaSemuaPesanan = pesans.reduce((total, order) => {
            return total + (order.harga_satuan * order.jumlah_pesanan);
        }, 0);

        return (
            <div className='pesanan1'>
                <NavbarComponent />
                <div className='pesanan1-kontainer'>
                    <div className='konten-pesanan1'>
                        <h2>Status Pesanan</h2>
                        <div className="kategori-pesanan">
                            <div
                                className="kategori-status"
                                onClick={this.toggleDropdown}
                            >
                                Kategori Status{" "}
                                <FontAwesomeIcon
                                    icon={faCaretDown}
                                    rotation={isDropdownOpen ? 180 : 0}
                                />
                            </div>
                            {isDropdownOpen && (
                                <div className="kategori-konten">
                                    <div className="kategori" onClick={() => this.handleCategoryClick(null)}>Semua Pesanan</div>
                                    <div className="kategori" onClick={() => this.handleCategoryClick(0)}> Sedang cek stok pesanan </div>
                                    <div className="kategori" onClick={() => this.handleCategoryClick(1)}> Pesanan sedang dibuat </div>
                                    <div className="kategori" onClick={() => this.handleCategoryClick(2)}> Pesanan dibatalkan </div>
                                    <div className="kategori" onClick={() => this.handleCategoryClick(3)}> Pesanan telah selesai </div>
                                </div>
                            )}
                        </div>
                        <div className='pesan1-wrap'>
                            {filteredPesans.map((order) => (
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
                        <div className='harga-pesan'>
                            <p>total harga semua pesanan: {totalHargaSemuaPesanan}</p>
                        </div>
                    </div>
                </div>
                <FooterComponent />
            </div>
        )
    }

} 
