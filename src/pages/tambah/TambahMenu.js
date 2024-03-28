import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./TambahMenu.css";

const TambahMenu = () => {
  const [newItem, setNewItem] = useState({
    nama: "",
    harga: "",
    stok: "",
    id_kategori: "",
    foto: ""
  });

  

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setNewItem(prevState => ({
      ...prevState,
      [name]: name === "foto" ? files[0] : value
    }));
  };

  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();
    console.log("Fungsi handleSave dipanggil");
    const { nama, harga, stok, id_kategori, foto } = newItem;

    if (!nama || !harga || !stok || !id_kategori || !foto) {
      alert("Harap isi semua kolom!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("nama_menu", nama);
      formData.append("harga", harga);
      formData.append("stok", stok);
      formData.append("id_kategori", id_kategori);
      formData.append("foto", foto);

      const response = await fetch("http://localhost:5000/products", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      // Log the response data
      console.log("Response from backend:", data);

      // Check if the save was successful
      if (response.status === 201) {
        console.log("Product saved successfully. Redirecting to dashboard.");
        navigate("/dashboard");
      } else {
        console.error("Error saving product. Response status:", response.status);
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <div className="tambah-container">
      <Navbar />
      <h1>Kedai Selena</h1>
      <div className="tambah-menu-wrapper">
        <div className="form-container">
          <div className="form-tambah">
            <h2>Tambah Menu</h2>
            <form onSubmit={handleSave}>
              <label>Nama:</label>
              <div>
                <input
                  type="text"
                  name="nama"
                  placeholder="masukkan nama menu"
                  value={newItem.nama}
                  onChange={handleChange}
                />
              </div>
              <label>Harga:</label>
              <div>
                <input
                  type="number"
                  name="harga"
                  placeholder="masukkan harga"
                  value={newItem.harga}
                  onChange={handleChange}
                />
              </div>
              <label>Stok:</label>
              <div>
                <input
                  type="number"
                  name="stok"
                  placeholder="masukkan jumlah stok"
                  value={newItem.stok}
                  onChange={handleChange}
                />
              </div>
              <label>Kategori</label>
              <div>
                <select
                  name="id_kategori"
                  value={newItem.id_kategori}
                  onChange={handleChange}
                >
                  <option value="">Pilih Kategori</option>
                  <option value="1">Makanan</option>
                  <option value="2">Minuman</option>
                </select>
              </div>
              <label>Foto</label>
              <div>
                <input
                  type="file"
                  name="foto"
                  accept="image/*"
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn-simpan">
                Simpan
              </button>
              <NavLink to="/dashboard" className="btn-batal">
                Batal
              </NavLink>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TambahMenu;
