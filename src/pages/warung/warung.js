import React, { Component } from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import NavbarComponent from '../../components/NavbarComponent';
import FooterComponent from '../../components/FooterComponent';
import WarungDetail from './detail';
import './warung.css';
import axios from 'axios';

class Warung extends Component {
  constructor(props) {
    super(props);

    this.state = {
      warungs: []
    };
  }

  componentDidMount() {
    this.fetchWarungs();
  }

  fetchWarungs = () => {
    axios.get('http://localhost:5000/warungs')
      .then(res => {
        this.setState({ warungs: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleWarungClick = (warung) => {
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
              <NavLink
                to={`/warung/${warung.id}`}
                key={warung.id}
                className='warung-card'
              >
                <div className='warung-image-container'>
                  <img src={warung.url} alt={warung.nama_warung} className='warung-image' />
                </div>
                <div className='warung-details'>
                  <h3>{warung.nama_warung}</h3>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
        <FooterComponent />
        <Routes>
          <Route path="/warung/:id" element={<WarungDetail />} />
        </Routes>
      </div>
    );
  }
}

export default Warung;
