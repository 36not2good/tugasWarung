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
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!validateForm()) {
          return;
        }
    
        const { username, password } = formData;
    
        try {
          const response = await axios.get('http://localhost:3001/users', {
            params: { username, password },
          });
    
          if (response.status === 200) {
            if (response.data.length > 0) {
              const user = response.data[0];
              alert('Login successful');
    
              // Call the login function from AuthContext
              login(user);
    
              // Navigate based on user role
              setTimeout(() => {
                if (user.role.role === 'user') {
                  navigate('/beranda');
                } else if (user.role.role === 'admin') {
                  navigate('/dashboard');
                }
              }, 2000);
            } else {
              if (!username || !password) {
                setErrorMessages({
                  username: 'Username is incorrect',
                  password: 'Password is incorrect',
                });
              } else {
                alert('Username and password are incorrect');
              }
            }
          } else {
            alert('Login failed. Please check your credentials and try again');
          }
        } catch (error) {
          console.error('Error during login:', error);
          alert('An error occurred. Please try again.');
        }
      };

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
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={handleInputChange}
                            className="login-input"
                            placeholder="Username"
                        />
                        <p className="error-message">{errorMessages.username}</p>
                    </div>
                    <div>
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
                    <button type="submit" className="login-button">
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
