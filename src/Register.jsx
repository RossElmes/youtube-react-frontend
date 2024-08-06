import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'
import { useNavigate } from 'react-router-dom';

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register/', formData);
            console.log('Registration successful:', response.data);
            navigate('/login');
        } catch (error) {
            console.error('Registration error:', error);
        }
    };


  const handleLoginClick = () => {
    navigate('/login');
    
  };

    return (
        <>
        <div className="container-fluid d-flex flex-column justify-content-center align-items-center text-center">
        <form onSubmit={handleSubmit} className='form-signin'>
        <h2 className="display-5 text-center">CloudSport.io</h2>
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="form-control mb-3"
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="form-control mb-3"
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="form-control mb-3"
            />
            <button type="submit" className="btn btn-primary btn-lg">Sign Up</button>
        </form>
              <button 
              className="btn btn-secondary btn-lg"
              onClick={handleLoginClick}
            >
              Switch to Login
        </button>
        </div>
        </>
    );
}

export default Register;