import React from 'react';
import { useNavigate } from 'react-router-dom';

const SplashPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
    
  };

  const handleSignUpClick = () => {
    navigate('/register');
  };

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100 text-center">
       <h1 className="display-4">Welcome to CloudSport.io</h1>
      <p className="lead">
        Our platform helps you analyze sports matches using YouTube videos.
        Gain insights and improve your strategies with our advanced video analysis tools.
      </p>
      <button 
        className="btn btn-primary btn-lg mb-1"
        onClick={handleLoginClick}
      >
        Login
      </button>
      <button 
          className="btn btn-secondary btn-lg"
          onClick={handleSignUpClick}
        >
          Sign Up
        </button>
    </div>
  );
};

export default SplashPage;
