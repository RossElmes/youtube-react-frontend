// src/Profile.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';

const Profile = ({tasks}) => {

  return (
    <>
    <NavBar />
    <div className="profile">
      <h1>Welcome to your Profile</h1>
      <ul className="list-group mb-0">
      {tasks.map(task => (
          <li key={task.id}>
            <Link to={`/video/${task.video_id}/${task.id}`}>{`${task.team1} vs ${task.team2}`} </Link>
          </li>
        ))}
    </ul>
    </div>
    </>

  );
};

export default Profile;
