import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import foto from './login.png';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [errorMessages, setErrorMessages] = useState({});

  const validateInputs = () => {
    const errors = {};
    if (!username.trim()) {
        errors.username = 'Username is required';
    }
    if (!password.trim()) {
        errors.password = 'Password is required';
    }
    setErrorMessages(errors);
    return Object.keys(errors).length === 0;
};

  const Auth = async (e) => {
    e.preventDefault();
    if (!validateInputs()) {
        return;
    }
      try {
          const response = await axios.post('http://localhost:5000/login', {
              username: username,
              password: password
          });
          localStorage.setItem("user_kantin", JSON.stringify(response.data));
          if(response.data.data?.id_role == 1){
            window.location.href = "/beranda";
          }
          if(response.data.data?.id_role == 2){
            window.location.href = "/dashboard";
          }
             
      } catch (error) {
          if (error.response) {
              setMsg(error.response.data.msg);
          }
      }
  }

  const handleRegisterClick = () => {
    window.location.href = "/register";
  };

  return (
    <div className='login'>
      <div className="login-container">
        <form className="login-form" onSubmit={Auth}>
          <div>
            <h1 className="login-header">Canteen</h1>
            <h2 className="login-header-2">Log in into your account</h2>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
              placeholder="Username"
            />
            {errorMessages.username && <p className="error-message">{errorMessages.username}</p>}
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              placeholder="*****"
            />
            {errorMessages.password && <p className="error-message">{errorMessages.password}</p>}
          </div>
          <button type="submit" className="login-button">
            Login now
          </button>
          <h5 className="register"><hr />Or<hr /></h5>
          <button type="button" className="regist-button" onClick={handleRegisterClick}>
            Register now
          </button>
        </form>
        {msg && <p className="error-msg">{msg}</p>}
      </div>
      <div className="foto-register">
        <img src={foto} alt="" />
      </div>
    </div>
  );
}

export default Login;
