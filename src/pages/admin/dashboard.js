// Dashboard.js
import React, { useState, useEffect, Component } from "react";
import Navbar from "../../components/Navbar";
import FooterComponent from "../../components/FooterComponent";
import TabelData from "../../components/tabel/Tabel";
import TambahMenu from "../tambah/TambahMenu";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

import "./dashboard.css";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: null, // Initialize selectedCategory to null
      data: [], // Initialize data array with your data
    };
  }

  handleAdd = async (newItem) => {
    try {
      console.log('handleAdd function called');
        // Send a POST request to the backend API to save the product
        const response = await fetch("http://localhost:5000/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newItem),
        });

        const data = await response.json();

        // Handle success or display an error message
        console.log(data);

        // Fetch updated product list and update the state if needed
        this.fetchProducts();
    } catch (error) {
        console.error("Error adding product:", error);
    }
};

componentDidMount() {
  this.fetchProducts();
}

fetchProducts = async () => {
  try {
    const response = await fetch('http://localhost:5000/products');
    const data = await response.json();
    this.setState({ data });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

  handleCategorySelect = (category) => {
    this.setState({ selectedCategory: category });
  };

  filterDataByCategory = () => {
    const { data, selectedCategory } = this.state;

    if (selectedCategory) {
      return data.filter((item) => item.kategori === selectedCategory);
    } else {
      return data;
    }
  };


  render() {
    const { selectedCategory, data } = this.state;

    return (
      <div>
        <Navbar />
        <div className="wadah-tabel">
          <div className="container-tabel">
            <h1>Warung selena </h1>
            <div className="kosong">
              <div className="daftar">
                <h2>Daftar menu</h2>
                <Link to={"/add"} className="tambah-btn">Tambah menu</Link>
              </div>
            </div>
            <div className="display-tabel">
              <TabelData data ={this.filterDataByCategory()}
                selectedCategory={selectedCategory}
                />
              <div className="kategori-tabel">
                <table className="tabel-kategorii">
                  <thead>
                    <tr>
                      <th>Kategori</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr onClick={() => this.handleCategorySelect("Makanan")}>
                      <td>Makanan</td>
                    </tr>
                    <tr onClick={() => this.handleCategorySelect("Minuman")}>
                      <td>Minuman</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <FooterComponent />
        </div>
      </div>
    );
  }
}
