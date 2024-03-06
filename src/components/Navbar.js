import React from 'react';
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

  render() {
    const currentPath = window.location.pathname;

    return (
      <div className="navbar">
        <div className="logo-container">
        <div className="logo">Canteen</div>
        <h3>owner</h3></div>
        <ul className="nav-links">
          <li className={`home ${currentPath === '/dashboard' ? 'active' : ''}`}><a href="/dashboard" >Home</a></li>
          <li className={`warung ${currentPath === '/notifikasi' ? 'active' : ''}`}><a href="/notifikasi">notifikasi</a></li>
          <li className={`riwayat ${currentPath === '/riwayat' ? 'active' : ''}`}><a href="/riwayat">Histori</a></li>
        <li className="logout"><a href="/">Log out</a></li>
        </ul>
      </div>
    );
  }
}

export default Navbar;