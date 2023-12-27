import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Beranda from "./pages/home";
import PageMakanan from "./pages/makanan/makanan";
import PageMinuman from "./pages/minuman/minuman";
import PageWarung from "./pages/warung/warung";
import DetailWarung from "./pages/warung/detailWarung";
import PageLogin from "./pages/login";
import PageRegister from "./pages/Register";
import Dashboard from "./pages/admin/dashboard";

function App() {
  const [produks, setProduks] = React.useState([]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<PageLogin />} />
          <Route path="/register" element={<PageRegister />} />
          <Route path="/beranda" element={<Beranda />} />
          <Route path="/makanan" element={<PageMakanan />} />
          <Route path="/minuman" element={<PageMinuman />} />
          <Route path="/warung" element={<PageWarung />} />
          <Route path="/warung/:id" element={<DetailWarung produks={produks} />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
