import React from 'react';
import { Link } from 'react-router-dom';
import "./navbar.css";

class Navbar extends React.Component {
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
        <div className="logo-container">
          <div className="logo">Canteen</div>
          <h3>owner</h3></div>
        <ul className="nav-links">
          <li className={`home ${currentPath === '/dashboard' ? 'active' : ''}`}><Link to="/dashboard">Home</Link></li>
          <li className={`warung ${currentPath === '/notifikasi' ? 'active' : ''}`}><Link to="/notifikasi">notifikasi</Link></li>
          <li className={`riwayat ${currentPath === '/riwayat' ? 'active' : ''}`}><Link to="/riwayat">Histori</Link></li>
          <li className="logout" onClick={this.handleLogout}><Link to="/">Log out</Link></li>
        </ul>
      </div>
    );
  }
}

export default Navbar;