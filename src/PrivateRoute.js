import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import Login from "./pages/login"; 

function PrivateRoute({ element, ...rest }) {
  const dataUser = JSON.parse(localStorage.getItem("user_kantin"));
  return (
    <Route      
      element={<Login />}
    />
  );
}
{/* <Route path="/register" element={<PageRegister />} /> */}
export default PrivateRoute;
