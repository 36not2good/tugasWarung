import React, { Component } from "react";
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
      data: [],
      filteredData: [], // Sudah tidak diperlukan karena semua data akan ditampilkan pertama kali
      selectedCategory: "all",
      highlightedCategory: null,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    try {
      const response = await fetch("http://localhost:5000/products");
      const data = await response.json();
      this.setState({ data, filteredData: data }); // Mengatur filteredData untuk menampilkan semua data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  handleCategoryClick = (categoryId) => {
    console.log("Selected Category:", categoryId);
    this.setState({ selectedCategory: categoryId, highlightedCategory: categoryId }, () => {
      this.filterDataByCategory();
    });
  };
  
  filterDataByCategory() {
    const { data, selectedCategory } = this.state;
    console.log("Selected Category:", selectedCategory);
    if (selectedCategory === "all") {
      // Jangan perlu filter jika kategori yang dipilih adalah "all"
      this.setState({ filteredData: data });
    } else {
      const filteredData = data.filter(
        (item) => item.id_kategori === parseInt(selectedCategory)
      );
      console.log("Filtered Data:", filteredData);
      this.setState({ filteredData });
    }
  }
  
  render() {
    const { filteredData } = this.state;
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
            <TabelData data={filteredData} fetchData={this.fetchData.bind(this)} /> 
              <div className="kategori-tabel">
                <table className="tabel-kategorii">
                  <thead>
                    <tr>
                      <th>Kategori</th>
                    </tr>
                  </thead>
                  <tbody>
  <tr className={this.state.highlightedCategory === "all" ? "highlighted" : ""}>
    <td onClick={() => this.handleCategoryClick("all")}>
      <div>Semua</div>
    </td>
  </tr>
  <tr className={this.state.highlightedCategory === 1 ? "highlighted" : ""}>
    <td onClick={() => this.handleCategoryClick(1)}>
      <div>Makanan</div>
    </td>
  </tr>
  <tr className={this.state.highlightedCategory === 2 ? "highlighted" : ""}>
    <td onClick={() => this.handleCategoryClick(2)}>
      <div>Minuman</div>
    </td>
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
