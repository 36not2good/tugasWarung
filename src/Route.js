import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Beranda from "./pages/home";
import PageMakanan from "./pages/makanan/makanan";
import PageMinuman from "./pages/minuman/minuman";
import PageWarung from "./pages/warung/warung";
import WarungDetail from "./pages/warung/detailWarung";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes> {/* Bungkus semua rute Anda dalam komponen Routes */}
          <Route path="/" element={<Beranda />} /> {/* Gunakan element untuk menentukan komponen */}
          <Route path="/makanan" element={<PageMakanan />} /> {/* Gunakan element untuk menentukan komponen */}
          <Route path="/minuman" element={<PageMinuman />} />
          <Route path="/warung" element={<PageWarung />} />
          <Route path="/warung/:id" component={<WarungDetail />} />
        </Routes>
        {/* <Home /> */}
      </div>
    </Router>
  );
}

export default App;
