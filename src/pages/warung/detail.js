import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import NavbarComponent from "../../components/NavbarComponent";
import FooterComponent from "../../components/FooterComponent";
import "./detail.css"

class Detail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            warungs: [
                {
                    idWarung: 1,
                    name: 'WARUNG 01',
                    image: '/image/warung/warung 01.jpeg',
                },
                {
                    idWarung: 2,
                    name: 'WARUNG 02',
                    image: '/image/warung/warung 02.jpeg',
                },
                {
                    idWarung: 3,
                    name: 'WARUNG 03',
                    image: '/image/warung/warung 03.jpeg',
                },
                // Tambahkan makanan lain sesuai kebutuhan
            ],
            selectedwarungs: [],
            totalHarga: 0,
            editingwarung: null,
            editQuantity: 0,
            editNote: '',
        };
    }


    render() {
        const { warungs } = this.state;

        return (
            <div>
                <NavbarComponent />
                <div className='container-detail'>
                    <div className='foto-atas'>
                        <div className='overlay'></div>
                    </div>
                    <div className='content-detail'>
                        <h1>Warung Selena</h1>
                    </div>
                    <div className='detail-kategori'>
                        <ul className='kategori'>
                            <li className='makanan'>Makanan</li>
                            <li classname='minuman'>Minuman</li>
                        </ul>
                    </div>

                    <div className='detail-menu'>
                        {warungs.map((warung) => (
                            <NavLink to={{
                                pathname: `/warung/${warung.idWarung}`,
                                state: { title: 'from home page' }
                            }} key={warung.idWarung}
                                className='menu-card'
                            >
                                <div className='menu-image-container'>
                                    <img src={warung.image} alt={warung.name} className='menu-image' />
                                </div>
                                <div className='menu-details'>
                                    <h3 >{warung.name}</h3>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                </div>
                <FooterComponent />
            </div>
        );
    }
}

export default Detail