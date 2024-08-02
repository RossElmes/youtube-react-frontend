// src/Profile.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import { useNavigate } from "react-router-dom";


const Profile = ({tasks}) => {

  const navigate = useNavigate();

  const gotoMatch = (task) => {

    navigate(`/video/${task.video_id}/${task.id}`);
    
};

  return (
    <>
    <NavBar />
    <div className="profile">
      <h1>Welcome to your Profile</h1>
      <ul className="list-group mb-0">
      {tasks.map(task => (
          <li key={task.id}>
        <img
          src={`https://img.youtube.com/vi/${task.video_id}/mqdefault.jpg`}
          alt="Video Thumbnail"
          style={{ cursor: 'pointer' }}
          onClick={()=>{gotoMatch(task)}}
        />
          <Link to={`/video/${task.video_id}/${task.id}`}>{`${task.team1} vs ${task.team2}`} </Link>
          </li>
        ))}
    </ul>
    </div>
    </>

  );
};

export default Profile;
