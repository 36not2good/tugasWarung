import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import foto from './login.png';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // ...

    const handleSubmit = async (event) => {
        event.preventDefault();
    const { username, password } = formData;

    try {
        // Send a login request to your backend API
        const response = await axios.get('http://localhost:3001/users', {
            params: { username, password },
        });

        if (response.status === 200) {
            // Check if user data is available in the response
            if (response.data.length > 0) {
                const user = response.data[0];
                alert('Login successful');

                // Save user data (e.g., role) to local storage or context for future use
                // For example, localStorage.setItem('user', JSON.stringify(user));

                // Navigate to the appropriate page based on the user's role
                if (user.role.role === 'user') {
                    navigate('/beranda');
                } else if (user.role.role === 'admin') {
                    navigate('/admin-dashboard');
                }
            } else {
                alert('Login failed. Please check your credentials and try again.');
            }
        } else {
            alert('Login failed. Please check your credentials and try again.');
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
