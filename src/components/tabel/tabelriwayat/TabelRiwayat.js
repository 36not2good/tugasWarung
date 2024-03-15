import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../Tabel.css";

class TabelRiwayat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredData: [],
    };
  }

  componentDidMount() {
    this.filterData(this.props.data);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.filterData(this.props.data);
    }
  }

  filterData(data) {
    const filteredData = data.filter(item => item.keterangan === 3);
    this.setState({ filteredData });
  }


  async fetchData() {
    try {
      const response = await fetch("http://localhost:5000/orders");
      const data = await response.json();
      this.setState({ data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  render() {
    const { filteredData } = this.state;

    return (
      <div className="tabel-wrapper">
        <div className="tabel-content">
          <table className="tabel">
            <thead>
              <tr>
                <th className="expand">No</th>
                <th>Nama</th>
                <th className="expand">jumlah</th>
                <th>harga satuan</th>
                <th>catatan</th>
                <th>keterangan</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.nama_menu}</td>
                  <td>{item.jumlah_pesanan}</td>
                  <td>{item.harga_satuan}</td>
                  <td>{item.catatan || <p>tidak ada</p>}</td>
                  <td>
                    {item.keterangan === 3 && <p>Pesanan telah selesai</p>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default TabelRiwayat;
