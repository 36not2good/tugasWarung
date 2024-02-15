import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';
import foto from './login.png';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errorMessages, setErrorMessages] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error message when user starts typing
    setErrorMessages({
      ...errorMessages,
      [name]: '',
    });
  };

  const validateForm = () => {
    const { username, password } = formData;
    let isValid = true;
    const newErrorMessages = {};

    if (!username && !password) {
      alert('Please enter your username and password');
      isValid = false;
    } else if (!username) {
      newErrorMessages.username = 'Please enter your username';
      isValid = false;
    } else if (!password) {
      newErrorMessages.password = 'Please enter your password';
      isValid = false;
    }

    setErrorMessages(newErrorMessages);

    return isValid;
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    const { username, password } = formData;
  
    try {
      const response = await axios.get(`http://localhost:5000/user?username=${username}`);
      
      if (response.status === 200) {
        const user = response.data[0];
  
        if (user && user.password === password) {
          alert('Login successful');
          navigate('/beranda');

          login(user);
  
          if (user.id_role === '1') {
            navigate('/beranda');
          } if (user.id_role === '2') {
            navigate('/dashboard');
          }
        } else {
          setErrorMessages({
            password: 'Username or password is incorrect',
          });
        }
      } else {
        alert('Login failed. Please check your credentials and try again');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again.');
    }
  };
  
  
  //   const { username, password } = formData;
  //   console.log(formData);
  //   try {
  //     const response = await axios.get('http://localhost:3001/users');
  //     console.log(response.data);
  //     if (response.status === 200) {
  //       const userWithMatchingUsername = response.data.find(user => user.username === username);
  //       const userWithMatchingPassword = response.data.find(user => user.password === password);
  
  //       if (userWithMatchingUsername && userWithMatchingPassword) {
  //         // Login successful
  //         const matchingUser = response.data.find(user => user.username === username && user.password === password);
  //         alert('Login successful');
  
  //         // Call the login function from AuthContext
  //         login(matchingUser);
  
  //         // Navigate based on user role          
  //           if (matchingUser.role.role === 'user') {
  //             navigate('/beranda');
  //           } else if (matchingUser.role.role === 'admin') {
  //             navigate('/dashboard');
  //           }
  //       } else {
  //         // Check if either username or password is incorrect
  //         if (!userWithMatchingUsername) {
  //           setErrorMessages({
  //             username: 'Username is incorrect',
  //           });
  //         }
  
  //         if (!userWithMatchingPassword) {
  //           setErrorMessages({
  //             password: 'Password is incorrect',
  //           });
  //         }

  //         if(!userWithMatchingUsername && !userWithMatchingPassword){
  //           setErrorMessages({

  //             password: 'Username and Password is incorrect',
  //           });
  //         }
  //       }
  //     } else {
        
  //       alert('Login failed. Please check your credentials and try again');
  //     }
  //   } catch (error) {
  //     console.error('Error during login:', error);
  //     alert('An error occurred. Please try again.');
  //   }
  // };
  
  

  const handleRegisterClick = () => {
    navigate('/register'); // Navigate to the register page
  };

  const { username, password } = formData;

  return (
    <div className='login'>
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <h1 className="login-header">Canteen</h1>
            <h2 className="login-header-2">Log in into your account</h2>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleInputChange}
              className="login-input"
              placeholder="Username"
            />
            <p className="error-message">{errorMessages.username}</p>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              className="login-input"
              placeholder="Password"
            />
            <p className="error-message">{errorMessages.password}</p>
          </div>
          <button type="submit" className="login-button" onClick={handleSubmit}>
            Login now
          </button>
          <h5 className="register"><hr />Or<hr /></h5>
          <button type="button" className="regist-button" onClick={handleRegisterClick}>
            Register now
          </button>
        </form>
      </div>
      <div className="foto-register">
        <img src={foto} alt="" />
      </div>
    </div>
  );
}

export default Login;
