import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Beranda from "./pages/home";
import PageMakanan from "./pages/makanan/makanan";
import PageMinuman from "./pages/minuman/minuman";
import PageWarung from "./pages/warung/warung";
import Keranjang from "./pages/keranjang/keranjang";
import DetailWarung from "./pages/warung/detail";
import Login from "./pages/login";
import PageRegister from "./pages/Register";
import Dashboard from "./pages/admin/dashboard";
import PageTambah from "./pages/tambah/TambahMenu";
import PageEdit from "./pages/edit/EditMenu";
import Notifikasi from "./pages/admin/notifikasi";
import Riwayat from "./pages/admin/riwayat";
import Pesanan from "./pages/pesanan/pesanan";
import SearchPage from "./pages/search/search";
import Error404 from "./pages/404"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State untuk menandai status login

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user_kantin")); // Cek apakah ada user yang sudah login
    if (user) {
      setIsLoggedIn(true);
      if(user.id_role === 2){
        return <Navigate to="/dashboard" />
      }
    }else{
      setIsLoggedIn(false);
    }
  }, []);


  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/beranda" /> : <Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<PageRegister />} />
          {isLoggedIn ? (
            <>
              <Route path="/beranda" element={<Beranda />} />
              <Route path="/makanan" element={<PageMakanan />} />
              <Route path="/minuman" element={<PageMinuman />} />
              <Route path="/warung" element={<PageWarung />} />
              <Route path="/keranjang" element={<Keranjang />} />
              <Route path="/warung/:id" element={<DetailWarung />} />
              <Route path="/add" element={<PageTambah />} />
              <Route path="/edit/:id" element={<PageEdit />} />
              <Route path="/notifikasi" element={<Notifikasi />} />
              <Route path="/riwayat" element={<Riwayat />} />
              <Route path="/pesanan" element={<Pesanan />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="*" element={<Error404 />} />
            </>
          ) : (
            <Route path="/*" element={<Navigate to="/" />} />

          )}
        </Routes>
      </div>
    </Router>
  );
}

const user = JSON.parse(localStorage.getItem("user_kantin"));
if (!user) {
  Swal.fire({
    position: 'center',
    icon: 'error',
    title: 'Silakan login terlebih dahulu',
    showConfirmButton: false,
    timer: 1500,
  });
}



export default App;
