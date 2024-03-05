import react, { Component } from 'react';
import Navbar from '../../components/Navbar.js';
import Footer from '../../components/FooterComponent.js';
import "./notifikasi.css";

export default class Notifikasi extends Component {
    render() {
        return (
            <div className='notifikasi'>
                <Navbar />
                <div className='notifikasi-container'>
                    <div className='konten-notifikasi'>
                        blalalalalalaallal
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}