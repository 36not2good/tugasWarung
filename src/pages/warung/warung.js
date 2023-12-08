import React, { Component } from 'react';
import { NavLink, Routes, Route } from 'react-router-dom'; // Import Route
import NavbarComponent from '../../components/NavbarComponent';
import FooterComponent from '../../components/FooterComponent';
import WarungDetail from './detailWarung';
import './warung.css';

class Warung extends Component {
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

  handleWarungClick = (warung) => {
    // Tangani acara klik, navigasi ke halaman detail makanan warung
    this.props.history.push(`/warung/${warung.id}`);
  };

  render() {
    const { warungs } = this.state;

    return (
      <div className='warung-container'>
        <NavbarComponent />
        <div className='content-warung'>
          <h2>Daftar Warung</h2>
          <div className='warung-list'>
            {warungs.map((warung) => (
              <NavLink to={{
                pathname:`/warung/${warung.idWarung}`,
                state: {title:'from home page'} 
              }} key={warung.idWarung}
              className='warung-card'
              >
                <div className='warung-image-container'>
                  <img src={warung.image} alt={warung.name} className='warung-image' />
                </div>
                <div className='warung-details'>
                <h3 >{warung.name}</h3>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
        <FooterComponent />
        <Routes>
        <Route path="/warung/:id" component={<WarungDetail/>} />
        </Routes>
      </div>
    );
  }
}

export default Warung;
