import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import './home.css';
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import { Link } from 'react-router-dom';

class Beranda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    };
  }

  handleInputChange = (event) => {
    this.setState({
      searchTerm: event.target.value
    });
  };

  render() {
    const { searchTerm } = this.state;

    return (
      <div>
        <NavbarComponent />
        <div className="beranda-container">
          <div className="background-image"></div>
          <div className="content">
            <h1>Selamat Datang</h1>
            <div className="search-container">
              <p>Mau makan apa hari ini?</p>
              <div className="search-box">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                <Link to='/search' className="search-link">
                  <input type="text" placeholder="Cari makanan..." value={searchTerm} onChange={this.handleInputChange} />
                </Link>
              </div>
            </div>
            <div className="most-searched">
              <p>Yang Paling Sering Dicari</p>
              <div className="food-box" onClick={() => alert('Makanan yang paling sering dicari')}>
                <span className="food-text">Nama Makanan</span>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="most-icon" />
              </div>
              <div className="food-box" onClick={() => alert('Makanan yang paling sering dicari')}>
                <span className="food-text">Nama Makanan</span>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="most-icon" />
              </div>
              <div className="food-box" onClick={() => alert('Makanan yang paling sering dicari')}>
                <span className="food-text">Nama Makanan</span>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="most-icon" />
              </div>
            </div>
          </div>
        </div>
        <FooterComponent />
      </div>
    );
  }
}

export default Beranda;
