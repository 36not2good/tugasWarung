import react, { Component } from 'react';
import Navbar from '../../components/Navbar.js';
import Footer from '../../components/FooterComponent.js';
import "./riwayat.css";

export default class Riwayat extends Component {
    render() {
        return (
            <div className='history'>
                <Navbar />
                <div className='history-container'>
                    <div className='history-riwayat'>
                        asvgjk
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}