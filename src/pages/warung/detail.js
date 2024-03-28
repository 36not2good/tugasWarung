import React from 'react';
import { NavLink } from 'react-router-dom';
import NavbarComponent from "../../components/NavbarComponent";
import FooterComponent from "../../components/FooterComponent";
import "./detail.css"
import axios from 'axios';

class Detail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            filteredProducts: [],
            selectedCategory: 1 // Kategori makanan sebagai kategori yang dipilih secara default
        }
    }

    componentDidMount() {
        this.fetchProducts();
    }

    fetchProducts = () => {
        axios.get('http://localhost:5000/products')
            .then(res => {
                this.setState({ products: res.data.result }, () => {
                    // Memanggil filterProductsByCategory setelah data produk dimuat
                    this.filterProductsByCategory(this.state.selectedCategory);
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    filterProductsByCategory = (categoryId) => {
        const { products } = this.state;
        const filteredProducts = products.filter(product => product.id_kategori === categoryId);
        this.setState({ filteredProducts, selectedCategory: categoryId });
    }

    render() {
        const { products, filteredProducts, selectedCategory } = this.state;

        return (
            <div>
                <NavbarComponent />
                <div className='container-detail'>
                    <div className='foto-atas'>
                        <div className='overlay'></div>
                    </div>
                    <div className='content-detail'>
                        <h1>Warung Selena</h1>
                    </div>
                    <div className='detail-kategori'>
                        <ul className='kategori'>
                            <li className={`makanan ${selectedCategory === 1 ? 'active' : ''}`} onClick={() => this.filterProductsByCategory(1)}>Makanan</li>
                            <li className={`minuman ${selectedCategory === 2 ? 'active' : ''}`} onClick={() => this.filterProductsByCategory(2)}>Minuman</li>
                        </ul>
                    </div>

                    <div className='detail-menu'>
                        {(selectedCategory ? filteredProducts : products).map((product) => (
                            <NavLink to={`/products/${product.id}`} key={product.id} className='menu-card'>
                                <div className='menu-image-container'>
                                    <img src={product.url} alt={product.nama_menu} className='menu-image' />
                                </div>
                                <div className='menu-details'>
                                    <h3>{product.nama_menu}</h3>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                </div>
                <FooterComponent />
            </div>
        );
    }
}

export default Detail;
