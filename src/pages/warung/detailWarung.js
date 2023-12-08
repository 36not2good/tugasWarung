import React, {  } from 'react';
import {useLocation} from 'react-router-dom'
import NavbarComponent from '../../components/NavbarComponent';
import FooterComponent from '../../components/FooterComponent';
import Makanan from '../makanan/makanan';

export default function DetailWarung() {
  let location = useLocation();

  console.log(location)
  return (
    <div>
        <NavbarComponent />
        <h2>Daftar Makanan - </h2>
        {/* Tampilkan daftar makanan dari warung yang dipilih */}
        {/* <Makanan idWarung={idWarung} /> Kirim idWarung sebagai prop */}
        <FooterComponent />
      </div>
  )
}
