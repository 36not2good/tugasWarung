import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavbarComponent from '../../components/NavbarComponent';
import FooterComponent from '../../components/FooterComponent';

const DetailWarung = ({ produks }) => {
  const { id } = useParams();
  const [menuWarung, setMenuWarung] = useState([]);

  useEffect(() => {
    // Ambil menu dari produks yang sesuai dengan ID warung
    const menuWarung = produks.filter((produk) => produk.warungs.id === parseInt(id, 10));
    setMenuWarung(menuWarung);
  }, [id, produks]);

  return (
    <div>
      <NavbarComponent />
      {/* Tampilkan daftar makanan dari warung yang dipilih */}
      {menuWarung.map((produk) => (
        <div key={produk.id}>
          <h3>{produk.nama}</h3>
          <p>Harga: {produk.harga}</p>
          {/* Tambahkan elemen lain sesuai kebutuhan */}
        </div>
      ))}
      <FooterComponent />
    </div>
  );
};

export default DetailWarung;
