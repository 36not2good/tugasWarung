import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, NavLink, useNavigate } from "react-router-dom"; // Menambahkan useNavigate
import Navbar from "../../components/Navbar";
import './EditMenu.css'

function EditMenu() {
  const [editItem, setEditItem] = useState({
    nama: "",
    harga: "",
    stok: "",
    id_kategori: "",
    foto: ""
  });
  const [file, setFile] = useState(null); // Deklarasi variabel file
  const [preview, setPreview] = useState(""); // Deklarasi variabel preview
  const { id } = useParams();
  const navigate = useNavigate(); // Menggunakan useNavigate untuk navigasi

  useEffect(() => {
    getProductById();
  }, []);

  const getProductById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/products/${id}`);
      const { nama_menu, harga, stok, id_kategori, foto } = response.data; // Ganti nama_menu menjadi nama
      setEditItem({ nama: nama_menu, harga, stok, id_kategori, foto }); // Mengatur nama_menu ke dalam nama
      setFile(foto); // Mengatur file dan preview dengan foto
      setPreview(`http://localhost:5000/images/${foto}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setEditItem({ ...editItem, [e.target.name]: e.target.value });
  };

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("foto", file);
    formData.append("nama_menu", editItem.nama);
    formData.append("harga", editItem.harga);
    formData.append("stok", editItem.stok);
    formData.append("id_kategori", editItem.id_kategori);
    try {
      await axios.patch(`http://localhost:5000/products/${id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      navigate("/dashboard"); // Menggunakan navigate untuk navigasi
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Edit-container">
      <Navbar />
      <h1>Kedai Selena</h1>
      <div className="Edit-menu-wrapper">
        <div className="form-container-edit">
          <div className="form-Edit">
            <h2>Edit Menu</h2>
            <form onSubmit={updateProduct}>
              <label>Nama:</label>
              <div>
                <input
                  type="text"
                  name="nama"
                  value={editItem.nama}
                  onChange={handleChange}
                />
              </div>
              <label>Harga:</label>
              <div>
                <input
                  type="number"
                  name="harga"
                  value={editItem.harga}
                  onChange={handleChange}
                />
              </div>
              <label>Stok:</label>
              <div>
                <input
                  type="number"
                  name="stok"
                  value={editItem.stok}
                  onChange={handleChange}
                />
              </div>
              <label>Kategori</label>
              <div>
                <select
                  name="id_kategori"
                  value={editItem.id_kategori}
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
                  onChange={loadImage}
                />
              </div>
              {preview && <img src={preview} alt="Preview" style={{ width: "200px" }} />}
              <button type="submit" className="btn-update">
                Update
              </button>
              <NavLink to="/dashboard" className="btn-batal-edit">
                Batal
              </NavLink>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditMenu;
