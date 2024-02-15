import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import foto from './register.png';
// import { API_URL } from '../utils/constants'
import axios from 'axios'

// function Register() {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         nama: '',
//         no_hp: '',
//         username: '',
//         password: '',
//         confirmPassword: '',
//     });

//     const [errorMessages, setErrorMessages] = useState({
//         nama: '',
//         no_hp: '',
//         username: '',
//         password: '',
//         confirmPassword: '',
//     });

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });

//         setErrorMessages({
//             ...errorMessages,
//             [name]: '',
//         });
//     };

//     const validateForm = () => {
//         const {nama, no_hp, username, password, confirmPassword} = formData;
//         let isValid = true;
//         const newErrorMessages = {};

//         if (!nama && !no_hp && !username && !password && !confirmPassword) {
//             alert('Isi form registrasi terlebih dahulu');
//             isValid = false;
//         } else if (!nama) {
//             newErrorMessages.nama = 'Please enter your name';
//             isValid = false;
//         } else if (!no_hp) {
//             newErrorMessages.no_hp = 'Please enter your phone number';
//             isValid = false;
//         } else if (!username) {
//             newErrorMessages.username = 'Please enter your username';
//             isValid = false;
//         } else if (!password) {
//             newErrorMessages.password = 'Please enter your password';
//             isValid = false;
//         } else if (!confirmPassword) {
//             newErrorMessages.confirmPassword = 'Please enter your password again';
//             isValid = false;
//         }

//         setErrorMessages(newErrorMessages);

//         return isValid;
//     };

//     const handleSubmit = async (event) => {
//         // event.preventDefault();
//         // const { nama, no_hp, username, password, confirmPassword } = formData;

//         // // if (password === confirmPassword) {
            
//         // //     alert('Registration successful');
//         // //     navigate('/beranda'); // Redirect to login page after successful registration
//         // // } else {
//         // //     alert('Password and Confirm Password do not match. Please try again.');
//         // // }

//         // if (password === confirmPassword) {
//         //     try {
//         //         const response = await fetch('/backend/db.json', {
//         //             method: 'POST',
//         //             headers: {
//         //                 'Content-Type': 'application/json',
//         //             },
//         //             body: JSON.stringify({
//         //                 nama,
//         //                 no_hp,
//         //                 username,
//         //                 password,
//         //             }),
//         //         });

//         //         if (response.ok) {
//         //             alert('Registration successful');
//         //             navigate('/beranda'); 
//         //         } else {
//         //             alert('Failed to register. Please try again.');
//         //         }
//         //     } catch (error) {
//         //         console.error('Error during registration:', error);
//         //         alert('An error occurred. Please try again.');
//         //     }
//         // } else {
//         //     alert('Password and Confirm Password do not match. Please try again.');
//         // }
//         event.preventDefault();
//         const { nama, no_hp, username, password, confirmPassword } = formData;

//         if (!validateForm()) {
//             return;
//         }

//         if (password === confirmPassword) {
//             try {
//                 // Register the customer
//                 const customerResponse = await axios.post('http://localhost:3001/customers', {
//                     nama,
//                     no_hp,
//                     users: {
//                         username,
//                         password,
//                         role: {
//                             id: 1,
//                             role: 'user',
//                         },
//                     },
//                 });

//                 if (customerResponse.status === 201) {
//                     alert('Registration successful');
//                     navigate('/');
//                 } else {
//                     alert('Failed to register. Please try again.');
//                 }
//             } catch (error) {
//                 console.error('Error during registration:', error);
//                 alert('An error occurred. Please try again.');
//             }
//         } else {
//             alert('Password and Confirm Password do not match. Please try again.');
//         }
//     };

//     const handleRegisterClick = () => {
//         navigate('/'); 
//     };

//     return (
//         <div className='login'>
//             <div className="login-container">
//                 <form className="login-form" onSubmit={handleSubmit}>
//                     <div>
//                         <h1 className="login-header">Canteen</h1>
//                         <h2 className="login-header-2">Register for an account</h2>
//             <label>Nama</label>
//                         <input
//                             type="text"
//                             name="nama"
//                             value={formData.nama}
//                             onChange={handleInputChange}
//                             className="login-input"
//                             placeholder="Nama"
//                         />
//                         <p className="error-message">{errorMessages.nama}</p>
//             <label>Nomor Hp</label>
//                         <input
//                             type="number"
//                             name="no_hp"
//                             value={formData.no_hp}
//                             onChange={handleInputChange}
//                             className="login-input"
//                             placeholder="Nomor Hp"
//                         />
//                         <p className="error-message">{errorMessages.no_hp}</p>
//             <label>Username</label>
//                         <input
//                             type="text"
//                             name="username"
//                             value={formData.username}
//                             onChange={handleInputChange}
//                             className="login-input"
//                             placeholder="username"
//                         />
//                         <p className="error-message">{errorMessages.username}</p>
//             <label>Password</label>
//                         <input
//                             type="password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleInputChange}
//                             className="login-input"
//                             placeholder="Password"
//                         />
//                         <p className="error-message">{errorMessages.password}</p>
//             <label>Confirm Password</label>
//                         <input
//                             type="password"
//                             name="confirmPassword"
//                             value={formData.confirmPassword}
//                             onChange={handleInputChange}
//                             className="login-input"
//                             placeholder="Confirm password"
//                         />
//                         <p className="error-message">{errorMessages.confirmPassword}</p>
//                     </div>
//                     <button type="submit" className="login-button">
//                         Register Now
//                     </button>
//                     <h5 className="register"><hr />Or<hr /></h5>
//                     <button type="submit" className="regist-button" onClick={handleRegisterClick}>
//                         Login Now
//                     </button>
//                 </form>
//             </div>
//             <div className="foto-register">
//                 <img src={foto} alt="" />
//             </div>
//         </div>
//     );
// }

// export default Register;


const Register = () => {
    const [nama, setNama] = useState('');
    const [no_hp, setNo_hp] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const id_role = 1;

            await axios.post('http://localhost:5000/user', {
                nama: nama,
                no_hp: no_hp,
                username: username,
                password: password,
                confPassword: confirmPassword,
                id_role: id_role
            });
            navigate("/");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    const handleLoginClick = () => {
        navigate('/');
    };

    return (
        <div className='login'>
            <div className="login-container">
                <form className="login-form" onSubmit={handleRegister}>
                    <div>
                        <h1 className="login-header">Canteen</h1>
                        <h2 className="login-header-2">Register for an account</h2>
                        <label>Nama</label>
                        <input
                            type="text"
                            name="nama"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            className="login-input"
                            placeholder="Nama"
                        />
                        <label>Nomor Hp</label>
                        <input
                            type="number"
                            name="no_hp"
                            value={no_hp}
                            onChange={(e) => setNo_hp(e.target.value)}
                            className="login-input"
                            placeholder="Nomor Hp"
                        />
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="login-input"
                            placeholder="username"
                        />
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="login-input"
                            placeholder="Password"
                        />
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="login-input"
                            placeholder="Confirm password"
                        />
                    </div>
                    <button type="submit" className="login-button">
                        Register Now
                    </button>
                    <h5 className="register"><hr />Or<hr /></h5>
                    <button type="button" className="regist-button" onClick={handleLoginClick}>
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
