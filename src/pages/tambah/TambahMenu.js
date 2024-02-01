// // TambahMenu.js
// import React, { Component } from "react";
// import { NavLink } from "react-router-dom";
// import Navbar from "../../components/Navbar";
// import "./TambahMenu.css"

// class TambahMenu extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       newItem: { nama: "", harga: '', stok: '', kategori: "" },
//     };
//   }

//   handleChange = (e) => {
//     const { name, value } = e.target;
//     this.setState((prevState) => ({
//       newItem: { ...prevState.newItem, [name]: value },
//     }));
//   };

//   handleSave = () => {
//     this.props.handleAdd(this.state.newItem);
//     this.props.history.push("/dashboard");
//   };

//   render() {
//     const { newItem } = this.state;

//     return (
//       <div className="tambah-container">
//         <Navbar />
//         <h1>WARUNG SARI RASA</h1>
//         <div className="tambah-menu-wrapper">
//           <div className="form-container">
//             <div className="form-tambah">
//               <h2>Tambah Menu</h2>
//               <label>Nama:</label>
//               <div><input
//                 type="text"
//                 name="nama"
//                 placeholder="masukkan nama menu"
//                 value={newItem.nama}
//                 onChange={this.handleChange}
//               />
//               </div>
//               <label>Harga:</label>
//               <div>
//                 <input
//                   type="number"
//                   name="harga"
//                   placeholder="masukkan harga"
//                   value={newItem.harga}
//                   onChange={this.handleChange}
//                 />
//               </div>
//               <label>Stok:</label>
//               <div>
//                 <input
//                   type="number"
//                   name="stok"
//                   placeholder="masukkan jumlah stok"
//                   value={newItem.stok}
//                   onChange={this.handleChange}
//                 />
//               </div>
//               <label>Kategori</label>
//               <div>
//                 <select
//                   name="kategori"
//                   value={newItem.kategori}
//                   onChange={this.handleChange}
//                 >
//                   <option value="makanan">Makanan</option>
//                   <option value="minuman">Minuman</option>
//                 </select>
//               </div>
//               <button onSubmit={this.handleSave} className="btn-simpan">Simpan</button>
//               <NavLink to="/dashboard" className="btn-batal">Batal</NavLink>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default TambahMenu;

// TambahMenu.js
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./TambahMenu.css"

class TambahMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: { nama: "", harga: '', stok: '', kategori: "" },
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      newItem: { ...prevState.newItem, [name]: value },
    }));
  };

  handleSave = async (e) => {
    e.preventDefault();

    const { nama, harga, stok, kategori } = this.state.newItem;

    try {
        // Send a POST request to the backend API to save the product
        const response = await fetch("http://localhost:5000/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nama_menu: nama,
                harga: harga,
                stok: stok,
                id_kategori: kategori,
                // Add other fields as needed
            }),
        });

        const data = await response.json();

        // Handle success or display an error message
        console.log(data);

        // Redirect to the dashboard or handle success as needed
        this.props.history.push("/dashboard");
    } catch (error) {
        console.error("Error saving product:", error);
    }
};

  render() {
    const { newItem } = this.state;

    return (
      <div className="tambah-container">
        <Navbar />
        <h1>WARUNG SARI RASA</h1>
        <div className="tambah-menu-wrapper">
          <div className="form-container">
            <div className="form-tambah">
              <h2>Tambah Menu</h2>
              <form onSubmit={this.handleSave}> 
                <label>Nama:</label>
                <div>
                  <input
                    type="text"
                    name="nama"
                    placeholder="masukkan nama menu"
                    value={newItem.nama}
                    onChange={this.handleChange}
                  />
                </div>
                <label>Harga:</label>
                <div>
                  <input
                    type="number"
                    name="harga"
                    placeholder="masukkan harga"
                    value={newItem.harga}
                    onChange={this.handleChange}
                  />
                </div>
                <label>Stok:</label>
                <div>
                  <input
                    type="number"
                    name="stok"
                    placeholder="masukkan jumlah stok"
                    value={newItem.stok}
                    onChange={this.handleChange}
                  />
                </div>
                <label>Kategori</label>
                <div>
                  <select
                    name="kategori"
                    value={newItem.kategori}
                    onChange={this.handleChange}
                  >
                    <option value="makanan">Makanan</option>
                    <option value="minuman">Minuman</option>
                  </select>
                </div>
                <button type="submit" className="btn-simpan">Simpan</button> 
                <NavLink to="/dashboard" className="btn-batal">Batal</NavLink>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TambahMenu;
