import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Beranda from "./pages/home";
import PageMakanan from "./pages/makanan/makanan";
import PageMinuman from "./pages/minuman/minuman";
import PageWarung from "./pages/warung/warung";
import Keranjang from "./pages/keranjang/keranjang";
import DetailWarung from "./pages/warung/detail";
import PageLogin from "./pages/login";
import PageRegister from "./pages/Register";
import Dashboard from "./pages/admin/dashboard";
import PageTambah from "./pages/tambah/TambahMenu";
import PageEdit from "./pages/edit/EditMenu";
import Notifikasi from "./pages/admin/notifikasi";
import Riwayat from "./pages/admin/riwayat";
import Pesanan from "./pages/pesanan/pesanan";
import { AuthProvider } from './context/AuthContext';



function App() {
  const [produks, setProduks] = React.useState([]);

  const PrivateRoute = ({ component: Component, ...rest }) => {
    const { currentUser } = useAuth();

  return (
      <Route
        {...rest}
        render={props =>
          currentUser ? (
            <Component {...props} />
          ) : (
            <Navigate to="/" replace state={{ from: props.location }} />
          )
        }
      />
    );
  };
      <div className="App">
        {/* Letakkan AuthProvider di atas Routes */}
        <AuthProvider>
          <Routes>
            <Route path="/" element={<PageLogin />} />
            <Route path="/register" element={<PageRegister />} />
            <PrivateRoute path="/beranda" component={Beranda} />
            <PrivateRoute path="/makanan" component={PageMakanan} />
            <PrivateRoute path="/minuman" component={PageMinuman} />
            <PrivateRoute path="/warung" component={PageWarung} />
            <PrivateRoute path="/keranjang" component={Keranjang} />
            <PrivateRoute path="/warung/:id" component={DetailWarung} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/add" component={PageTambah} />
            <PrivateRoute path="/edit/:id" component={PageEdit} />
            <PrivateRoute path="/notifikasi" component={Notifikasi} />
            <PrivateRoute path="/riwayat" component={Riwayat} />
            <PrivateRoute path="/pesanan" component={Pesanan} />
          </Routes>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
