import React from 'react';
import "./navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCartShopping } from '@fortawesome/free-solid-svg-icons';

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

  async handleLogout(){
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
          <li className={`home ${currentPath === '/beranda' ? 'active' : ''}`}><a href="/beranda">Home</a></li>
          <li className={`warung ${currentPath === '/warung' ? 'active' : ''}`}><a href="/warung">Warung</a></li>
          <li className={`pesanan ${currentPath.includes('/pesanan') ? 'active' : ''}`} style={{ cursor: 'pointer' }}><a href="/pesanan">Pesanan</a></li>
          <li className={`kategori-menu ${currentPath.includes('/kategori') ? 'active' : ''}`} style={{ cursor: 'pointer' }}>
            <div className="dropdown-toggle" onClick={this.toggleMenu}>
              Kategori Menu <FontAwesomeIcon icon={faCaretDown} />
            </div>
            <ul className="dropdown-content" style={{ display: this.state.isOpen ? 'block' : 'none' }}>
              <div className={`text-1 ${currentPath === '/makanan' ? 'active' : ''}`}><a href="/makanan">Makanan</a></div>
              <hr />
              <div className={`text-2 ${currentPath === '/minuman' ? 'active' : ''}`}><a href="/minuman">Minuman</a></div>
            </ul>
          </li>
          <li className={`logout ${currentPath === '/' ? 'active' : ''}`}><a href="/" onClick={this.handleLogout}>Log out</a></li>
          <li className={`cart ${currentPath === '/keranjang' ? 'active' : ''}`}><a href="/keranjang"><FontAwesomeIcon icon={faCartShopping} /></a></li>
        </ul>
      </div>
    );
  }
}

export default NavbarComponent;
