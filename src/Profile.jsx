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
    <div className="profile bg-light">
      <div className='mx-5 pt-3'>
      <h1>Rugby Match Analysis Hub</h1>
      <p>Dive into detailed reviews and analyses of all the latest rugby matches. Click on any game to explore in-depth insights and performance breakdowns.</p>
      </div>
      <ul className="list-group" >
      {tasks.map(task => (
          <li key={task.id} className="list-group-item mx-4 mt-5 border-1 bg-white" onClick={()=>{gotoMatch(task)}}>
            <div className='row'>
              <div className='col-auto'>
              <img
                  src={`https://img.youtube.com/vi/${task.video_id}/mqdefault.jpg`}
                  alt="Video Thumbnail"
                  style={{ cursor: 'pointer' }}
                  
                />
              </div>
              <div className='col'>
                <p>{`${task.team1} vs ${task.team2} `}</p>
                <p> Venue: {`${task.venue}`}</p>
                <p> Score: {`${task.team1} ${task.team1_score} | ${task.team2} ${task.team2_score}`}</p>
                <p> Date: {`${task.date_of_match}`}</p>
              </div>
            </div>

          {/* <Link to={`/video/${task.video_id}/${task.id}`}>{`${task.team1} vs ${task.team2}`} </Link> */}
          </li>
        ))}
    </ul>
    </div>
    </>

  );
};

export default Profile;
