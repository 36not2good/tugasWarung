import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Tabel.css";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

class Tabel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      newItem: {
        nama_menu: "",
        harga: "",
        stok: "",
        id_kategori: "",
        foto: "",
      },
      editItemId: null,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    try {
      const response = await fetch("http://localhost:5000/products");
      const data = await response.json();
      this.setState({ data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  handleEdit = (id) => {
    this.props.history.push(`/edit/${id}`);
  };

  handleDelete = (id) => {
    fetch(`http://localhost:5000/products/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        this.fetchData();
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  render() {
    const { data } = this.state;

    return (
      <div className="tabel-wrapper">
        <div className="tabel-content">
          <table className="tabel">
            <thead>
              <tr>
                <th className="expand">No</th>
                <th>Nama</th>
                <th>Harga</th>
                <th className="expand">Stok</th>
                <th>Kategori</th>
                <th>Foto</th>
                <th className="expand" colSpan={2}>
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.nama_menu}</td>
                  <td>{item.harga}</td>
                  <td>{item.stok}</td>
                  <td>{item.id_kategori}</td>
                  <td>
                    {item.foto && (
                      <img
                        src={`http://localhost:5000/images/${item.foto}`}
                        alt={item.nama_menu}
                        className="table-image"
                      />
                    )}
                  </td>
                  <td className="aksi">
                    <span className="icon-wrapper">
                      <Link
                        to={`/edit/${item.id}`} // Use Link for navigation
                        className="tabel-menu"
                        state={{ title: "" }}
                      >
                        <BsFillPencilFill />
                      </Link>
                    </span>
                    <span
                      className="icon-wrapper"
                      onClick={() => this.handleDelete(item.id)}
                    >
                      <BsFillTrashFill className="delete-button" />
                    </span>
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

export default Tabel;
