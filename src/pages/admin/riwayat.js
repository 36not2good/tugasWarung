import React, { Component } from 'react';
import Navbar from '../../components/Navbar.js';
import Footer from '../../components/FooterComponent.js';
import TabelRiwayat from '../../components/tabel/tabelriwayat/TabelRiwayat.js';
import "./riwayat.css";

export default class Riwayat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredData: [],
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        try {
            const response = await fetch("http://localhost:5000/orders");
            const data = await response.json();
            this.setState({ filteredData: data.filter(item => item.keterangan === 3) });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    render() {
        const { filteredData } = this.state;
        return (
            <div className='history'>
                <Navbar />
                <div className='history-container'>
                    <div className='history-riwayat'>
                        <TabelRiwayat data={filteredData} />
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
