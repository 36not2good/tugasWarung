// import React, { Component } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import './search.css'
// import NavbarComponent from '../../components/NavbarComponent';
// import FooterComponent from '../../components/FooterComponent';

// class SearchPage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       products: [],
//       keyword: "",
//       msg: ""
//     };
//   }

//   componentDidMount() {
//     // this.getProducts(); // Uncomment this line if you want to fetch products initially
//   }

//   getProducts = async () => {
//     const { keyword } = this.state;
//     try {
//       const response = await axios.get(`http://localhost:5000/products?search=${keyword}`);
//       this.setState({ products: response.data.result });
//     } catch (error) {
//       console.error('Error fetching search results:', error);
//     }
//   };

//   searchData = (e) => {
//     e.preventDefault();
//     this.setState({ msg: "" }, () => {
//       this.getProducts();
//     });
//   };

//   handleInputChange = (e) => {
//     this.setState({ keyword: e.target.value });
//   };

//   render() {
//     const { products, keyword, msg } = this.state;

//     return (
//       <div>
//         <NavbarComponent/>
//       <div className='cari-container'>
//         <div className="cari-box">
//           <FontAwesomeIcon icon={faSearch} className="cari-icon" onClick={this.searchData}/>
//           <Link to='/search' className="cari-link">
//             <input type="text" placeholder="Cari makanan..." value={keyword} onChange={this.handleInputChange} />
//           </Link>
//         </div>
//         {msg && (
//           <h2>{msg}</h2>
//         )}
//         <div className='product-wrap'>
//         {products.length > 0 ? (
//   <div className="product-list">
//     {products.map((product) => (
//       <div key={product.id} className="product-card">
//         <div className="product-img-container">
//           <img src={product.url} alt={product.nama_menu} className="product-img" />
//         </div>
//         <div className="product-details">
//           <div className="product-name">
//             <h3>{product.nama_menu}</h3>
//           </div>
//           <p>Rp {product.harga}</p>
//         </div>
//       </div>
//     ))}
//   </div>
// ) : (
//   <p>Tidak ada produk yang ditemukan.</p>
// )}

//         </div>
//       </div>
//         <FooterComponent />
//       </div>
//     );
//   }
// }

// export default SearchPage;
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './search.css';
import NavbarComponent from '../../components/NavbarComponent';
import FooterComponent from '../../components/FooterComponent';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      selectedProduct: null,
      keyword: "",
      msg: ""
    };
  }

  componentDidMount() {
    // this.getProducts(); // Uncomment this line if you want to fetch products initially
  }

  getProducts = async () => {
    const { keyword } = this.state;
    try {
      const response = await axios.get(`http://localhost:5000/products?search=${keyword}`);
      this.setState({ products: response.data.result });
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  searchData = (e) => {
    e.preventDefault();
    this.setState({ msg: "" }, () => {
      this.getProducts();
    });
  };

  handleInputChange = (e) => {
    this.setState({ keyword: e.target.value });
  };

  handleProductSelect = (product) => {
    this.setState({ selectedProduct: product });
  };

  render() {
    const { products, selectedProduct, keyword, msg } = this.state;

    return (
      <div>
        <NavbarComponent/>
        <div className='cari-container'>
          <div className="cari-box">
            <FontAwesomeIcon icon={faSearch} className="cari-icon" onClick={this.searchData}/>
            <Link to='/search' className="cari-link">
              <input type="text" placeholder="Cari makanan..." value={keyword} onChange={this.handleInputChange} />
            </Link>
          </div>
          {msg && (
            <h2>{msg}</h2>
          )}
          <div className='product-wrap'>
            {products.length > 0 ? (
              <div className="product-list">
                {products.map((product) => (
                  <div key={product.id} className="product-card" onClick={() => this.handleProductSelect(product)}>
                    <div className="product-img-container">
                      <img src={product.url} alt={product.nama_menu} className="product-img" />
                    </div>
                    <div className="product-details">
                      <div className="product-name">
                        <h3>{product.nama_menu}</h3>
                      </div>
                      <p>Rp {product.harga}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>Tidak ada produk yang ditemukan.</p>
            )}

            {selectedProduct && (
              <div className="selected-product">
                <h2>Detail Pesanan:</h2>
                <p>Nama Menu: {selectedProduct.nama_menu}</p>
                <p>Harga: Rp {selectedProduct.harga}</p>
              </div>
            )}
          </div>
        </div>
        <FooterComponent />
      </div>
    );
  }
}

export default SearchPage;
