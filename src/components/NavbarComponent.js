import React from 'react';
import "./navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

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

  async handleLogout() {
    try {
      const response = await fetch('/logout', {
        method: 'DELETE',
        credentials: 'include'
      });
      localStorage.removeItem("user_kantin", JSON.stringify(response.data));
      if (response.ok) {
        window.location.href = '/';
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      console.error('Failed to logout', error);
    }
  }

  render() {
    const currentPath = window.location.pathname;


    return (
      <div className="navbar">
        <div className="logo">Canteen</div>
        <ul className="nav-links">
          <li className={`home ${currentPath === '/beranda' ? 'active' : ''}`}><Link to="/beranda">Home</Link></li>
          <li className={`warung ${currentPath === '/warung' ? 'active' : ''}`}><Link to="/warung">Kedai</Link></li>
          <li className={`pesanan ${currentPath.includes('/pesanan') ? 'active' : ''}`}><Link to="/pesanan">Pesanan</Link></li>
          <li className="kategori-menu" style={{ cursor: 'pointer' }}>
            <div className="dropdown-toggle" onClick={this.toggleMenu}>
              Kategori Menu <FontAwesomeIcon icon={faCaretDown} />
            </div>
            <ul className="dropdown-content" style={{ display: this.state.isOpen ? 'block' : 'none' }}>
              <li className={`text-1 ${currentPath === '/makanan' ? 'active' : ''}`}><Link to="/makanan">Makanan</Link></li>
              <hr />
              <li className={`text-2 ${currentPath === '/minuman' ? 'active' : ''}`}><Link to="/minuman">Minuman</Link></li>
            </ul>
          </li>
          <li className={`logout ${currentPath === '/' ? 'active' : ''}`}><a href="/" onClick={this.handleLogout}>Log out</a></li>
          <li className={`cart ${currentPath === '/keranjang' ? 'active' : ''}`}><Link to="/keranjang"><FontAwesomeIcon icon={faCartShopping} /></Link></li>
        </ul>
      </div>
    );
  }
}

export default NavbarComponent;
