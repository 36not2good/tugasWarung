import React from 'react';
import "./navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

class NavbarComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <div className="navbar">
        <div className="logo">Canteen</div>
        <ul className="nav-links">
          <li className="home"><a href="/beranda" >Home</a></li>
          <li className="warung"><a href="/warung">Warung</a></li>
          <li className="dropdown kategori-menu" style={{ cursor: 'pointer' }}>
            <div className="dropdown-toggle" onClick={this.toggleMenu}>
              Kategori Menu <FontAwesomeIcon icon={faCaretDown} />
            </div>
            <ul className="dropdown-content" style={{ display: this.state.isOpen ? 'block' : 'none' }}>
              <div className='text-1'><a href="/makanan">Makanan</a></div>
              <hr />
              <div className='text-2'><a href="/minuman">Minuman</a></div>
            </ul>
          </li>
          <li className="logout"><a href="/">Log out</a></li>
        </ul>
      </div>
    );
  }
}

export default NavbarComponent;