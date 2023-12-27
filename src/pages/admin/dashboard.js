import React, {  } from 'react';
import {useLocation} from 'react-router-dom'
import Navbar from '../../components/Navbar';
import FooterComponent from '../../components/FooterComponent';
import "./dashboard.css"


export default function Dashboard() {
  let location = useLocation();

  console.log(location)
  return (
    <div>
        <Navbar />
        <div className='container'></div>
        <FooterComponent />
      </div>
  )
}
