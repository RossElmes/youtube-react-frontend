import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        console.log(e.target.value)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/token/', formData);
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            console.log('Login successful:', response.data);
            navigate('/profile')
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const handleSignUpClick = () => {
        navigate('/register');
      };

    return (
        <>
            <div className="container-fluid d-flex flex-column justify-content-center align-items-center text-center">
                <form onSubmit={handleSubmit} className="form-signin">
                    <h2 className="display-5 text-center">CloudSport.io</h2>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="form-control mb-3"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="form-control mb-3"
                    />
                    <button className="btn btn-primary btn-lg mb-1"type="submit">Login</button>
                </form>
                <button
                    className="btn btn-secondary btn-lg"
                    onClick={handleSignUpClick}
                >Switch to Sign Up
                </button>
            </div>
        </>
    );
}

export default Login;