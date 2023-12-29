import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import foto from './register.png';
// import { API_URL } from '../utils/constants'
import axios from 'axios'

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nama: '',
        no_hp: '',
        username: '',
        password: '',
        confirmPassword: '',
    });

    const [errorMessages, setErrorMessages] = useState({
        nama: '',
        no_hp: '',
        username: '',
        password: '',
        confirmPassword: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        setErrorMessages({
            ...errorMessages,
            [name]: '',
        });
    };

    const validateForm = () => {
        const {nama, no_hp, username, password, confirmPassword} = formData;
        let isValid = true;
        const newErrorMessages = {};

        if (!nama && !no_hp && !username && !password && !confirmPassword) {
            alert('Isi form registrasi terlebih dahulu');
            isValid = false;
        } else if (!nama) {
            newErrorMessages.nama = 'Please enter your name';
            isValid = false;
        } else if (!no_hp) {
            newErrorMessages.no_hp = 'Please enter your phone number';
            isValid = false;
        } else if (!username) {
            newErrorMessages.username = 'Please enter your username';
            isValid = false;
        } else if (!password) {
            newErrorMessages.password = 'Please enter your password';
            isValid = false;
        } else if (!confirmPassword) {
            newErrorMessages.confirmPassword = 'Please enter your password again';
            isValid = false;
        }

        setErrorMessages(newErrorMessages);

        return isValid;
    };

    const handleSubmit = async (event) => {
        // event.preventDefault();
        // const { nama, no_hp, username, password, confirmPassword } = formData;

        // // if (password === confirmPassword) {
            
        // //     alert('Registration successful');
        // //     navigate('/beranda'); // Redirect to login page after successful registration
        // // } else {
        // //     alert('Password and Confirm Password do not match. Please try again.');
        // // }

        // if (password === confirmPassword) {
        //     try {
        //         const response = await fetch('/backend/db.json', {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //             body: JSON.stringify({
        //                 nama,
        //                 no_hp,
        //                 username,
        //                 password,
        //             }),
        //         });

        //         if (response.ok) {
        //             alert('Registration successful');
        //             navigate('/beranda'); 
        //         } else {
        //             alert('Failed to register. Please try again.');
        //         }
        //     } catch (error) {
        //         console.error('Error during registration:', error);
        //         alert('An error occurred. Please try again.');
        //     }
        // } else {
        //     alert('Password and Confirm Password do not match. Please try again.');
        // }
        event.preventDefault();
        const { nama, no_hp, username, password, confirmPassword } = formData;

        if (!validateForm()) {
            return;
        }

        if (password === confirmPassword) {
            try {
                // Register the customer
                const customerResponse = await axios.post('http://localhost:3001/customers', {
                    nama,
                    no_hp,
                    users: {
                        username,
                        password,
                        role: {
                            id: 1,
                            role: 'user',
                        },
                    },
                });

                if (customerResponse.status === 201) {
                    alert('Registration successful');
                    navigate('/');
                } else {
                    alert('Failed to register. Please try again.');
                }
            } catch (error) {
                console.error('Error during registration:', error);
                alert('An error occurred. Please try again.');
            }
        } else {
            alert('Password and Confirm Password do not match. Please try again.');
        }
    };

    const handleRegisterClick = () => {
        navigate('/'); 
    };

    return (
        <div className='login'>
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <div>
                        <h1 className="login-header">Canteen</h1>
                        <h2 className="login-header-2">Register for an account</h2>
            <label>Nama</label>
                        <input
                            type="text"
                            name="nama"
                            value={formData.nama}
                            onChange={handleInputChange}
                            className="login-input"
                            placeholder="Nama"
                        />
                        <p className="error-message">{errorMessages.nama}</p>
            <label>Nomor Hp</label>
                        <input
                            type="number"
                            name="no_hp"
                            value={formData.no_hp}
                            onChange={handleInputChange}
                            className="login-input"
                            placeholder="Nomor Hp"
                        />
                        <p className="error-message">{errorMessages.no_hp}</p>
            <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="login-input"
                            placeholder="username"
                        />
                        <p className="error-message">{errorMessages.username}</p>
            <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="login-input"
                            placeholder="Password"
                        />
                        <p className="error-message">{errorMessages.password}</p>
            <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="login-input"
                            placeholder="Confirm password"
                        />
                        <p className="error-message">{errorMessages.confirmPassword}</p>
                    </div>
                    <button type="submit" className="login-button">
                        Register Now
                    </button>
                    <h5 className="register"><hr />Or<hr /></h5>
                    <button type="submit" className="regist-button" onClick={handleRegisterClick}>
                        Login Now
                    </button>
                </form>
            </div>
            <div className="foto-register">
                <img src={foto} alt="" />
            </div>
        </div>
    );
}

export default Register;
