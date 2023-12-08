import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import './home.css';
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent"

class Beranda extends React.Component {
  state = {
    searchTerm: ''
  };

  handleSearch = (event) => {
    this.setState({
      searchTerm: event.target.value
    });
  };

  render() {
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
                <input type="text" placeholder="Cari makanan..." value={this.state.searchTerm} onChange={this.handleSearch} />
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

export default Beranda