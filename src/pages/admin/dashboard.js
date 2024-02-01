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
      selectedCategory: null,
      data: [
        { id: 1, nama: "Makanan 1", kategori: "Makanan", harga: 10000, stok: 5 },
        { id: 2, nama: "Makanan 2", kategori: "Makanan", harga: 15000, stok: 8 },
        { id: 3, nama: "Makanan 3", kategori: "Makanan", harga: 20000, stok: 3 },
        { id: 4, nama: "Minuman 1", kategori: "Minuman", harga: 5000, stok: 10 },
        { id: 5, nama: "Minuman 2", kategori: "Minuman", harga: 8000, stok: 7 },
      ],
    };
  }

  handleAdd = (newItem) => {
    this.setState((prevState) => ({
      data: [
        ...prevState.data,
        {
          ...newItem,
          id: Math.max(...prevState.data.map((item) => item.id), 0) + 1,
        },
      ],
    }));
  };

  handleCategorySelect = (category) => {
    this.setState({ selectedCategory: category });
  };

  filterDataByCategory = () => {
    const { data, selectedCategory } = this.state;
    return selectedCategory
      ? data.filter((item) => item.kategori === selectedCategory)
      : data;
  };


  render() {
    const { selectedCategory } = this.state;

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
              <TabelData data={this.filterDataByCategory()}
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
