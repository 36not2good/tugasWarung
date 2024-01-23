// Dashboard.js
import React, { useState, useEffect, Component } from "react";
import Navbar from "../../components/Navbar";
import FooterComponent from "../../components/FooterComponent";
import TabelData from "../../components/tabel/Tabel";
import { useAuth } from "../../context/AuthContext";

import "./dashboard.css";

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="wadah-tabel">
          <div className="container-tabel">
            <h1>Warung selena </h1>
            <div className="kosong">
              <div className="daftar">
                <h2>Daftar menu</h2>
                <button>Tambah menu</button>
              </div>
            </div>
            <div className="display-tabel">
              <TabelData />
              <div className="kategori-tabel">
                <table className="tabel-kategorii">
                  <thead>
                    <tr>
                      <th>Kategori</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Makanan</td>
                    </tr>
                    <tr>
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
