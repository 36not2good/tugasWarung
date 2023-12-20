import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        isLoggedIn: false,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { username, password } = formData;

        // Simple username and password validation
        if (username === 'user' && password === 'password') {
            setFormData({
                ...formData,
                isLoggedIn: true,
            });
            alert('Login successful');
            navigate('/beranda');
        } else {
            alert('Login failed. Please try again.');
        }
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
                    <h5 className="register">Or</h5>
                    <button type="submit" className="regist-button">
                        Register now
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
