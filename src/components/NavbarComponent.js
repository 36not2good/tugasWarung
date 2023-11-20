// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function BasicExample() {
//   return (
//     <Navbar expand="lg" className="bg-body-tertiary">
//       <Container>
//         <Navbar.Brand href="#home">Canteen</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             <Nav.Link href="#home">Home</Nav.Link>
//             <Nav.Link href="#link">Warung</Nav.Link>
//             <NavDropdown title="Kategori Menu" id="basic-nav-dropdown">
//               <NavDropdown.Item href="#action/3.1">Makanan</NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item href="#action/3.3">Minuman</NavDropdown.Item>
//             </NavDropdown>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default BasicExample;

import React from 'react';
import "./navbar.css"

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
          <li className="home"><a href="#" className="active-page">Beranda</a></li>
          <li className="warung"><a href="#">Warung</a></li>
          <li className="dropdown kategori-menu">
            <a href="#" onClick={this.toggleMenu}>Kategori Menu</a>
            <ul className="dropdown-content" style={{ display: this.state.isOpen ? 'block' : 'none' }}>
              <li><a href="#">Makanan</a></li>
              <li><a href="#">Minuman</a></li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavbarComponent;

import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

class NavbarComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  toggleMenu() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Canteen</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={this.toggleMenu} />
          <Navbar.Collapse id="basic-navbar-nav" isOpen={this.state.isOpen}>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Warung</Nav.Link>
              <NavDropdown title="Kategori Menu" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Makanan</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.3">Minuman</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default NavbarComponent;