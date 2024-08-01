// NavBar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import the CSS file for styling

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/profile" className="nav-link">Profile</Link>
        </li>
        <li className="nav-item">
          <Link to="/matchdetails" className="nav-link">Match Details</Link>
        </li>
        <li className="nav-item">
          <Link to="/playlists" className="nav-link">Playlists</Link>
        </li>
        <li className="nav-item">
          <Link to="/codes" className="nav-link">Codes</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
