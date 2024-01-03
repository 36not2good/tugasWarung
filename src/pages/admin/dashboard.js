// Dashboard.js
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import FooterComponent from '../../components/FooterComponent';
import { useAuth } from '../../context/AuthContext';

import './dashboard.css';

export default function Dashboard() {
  const { loggedInOwner } = useAuth();
  const [warungName, setWarungName] = useState('');

  useEffect(() => {
    // Periksa apakah ada pemilik yang sedang login
    if (loggedInOwner) {
      // Akses nama warung langsung dari data pemilik
      const warungName = loggedInOwner.owners.nama || '';
      setWarungName(warungName);
    }
  }, [loggedInOwner]); // Menjalankan kembali efek ketika loggedInOwner berubah

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Selamat datang di {warungName}!</h1>
        {/* Konten lain dari dasbor */}
      </div>
      <FooterComponent />
    </div>
  );
}
