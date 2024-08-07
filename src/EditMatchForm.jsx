import React, { useState,useEffect } from 'react';
import './Form.css';
import axios from 'axios';
import NavBar from './NavBar';
import { useNavigate, useParams} from "react-router-dom";

const EditMatchForm = ({setTasks,tasks}) => {

  const { matchId } = useParams();
  const navigate = useNavigate();
  const [match, setMatch] = useState({
    date_of_match: '',
    venue: '',
    team1: '',
    team2: '',
    team1_score: '',
    team2_score: '',
    result: 'Team1', // Default value
    youtube_link: '',
    video_id: '',
    home_team: 'Team1', // Default value
  });

  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };


  const fetchMatch = async (id) => {
    try {
      const response = await axios.get(`https://youtubeplayer-django-api.onrender.com/api/matchdetails/${id}/`)
      setMatch(response.data);
    } catch (error) {
      console.error('Error fetching match:', error);
    }
  };

  useEffect(() => {
    fetchMatch(matchId);
  }, [matchId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMatch({ ...match, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://youtubeplayer-django-api.onrender.com/api/matchdetails/${matchId}/`, match);
      updateTask(response.data);
      navigate('/matchdetails');
    } catch (error) {
      console.error('Error updating match:', error);
    }
  };

  
  return (
    <>
    <NavBar />
    <div className="form-container">
      <h2>Edit Match</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="date_of_match">Date of Match:</label>
          <input
            type="date"
            id="date_of_match"
            name="date_of_match"
            value={match.date_of_match}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="venue">Venue:</label>
          <input
            type="text"
            id="venue"
            name="venue"
            value={match.venue}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="team1">Team 1:</label>
          <input
            type="text"
            id="team1"
            name="team1"
            value={match.team1}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="team2">Team 2:</label>
          <input
            type="text"
            id="team2"
            name="team2"
            value={match.team2}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="team1_score">Team 1 Score:</label>
          <input
            type="number"
            id="team1_score"
            name="team1_score"
            value={match.team1_score}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="team2_score">Team 2 Score:</label>
          <input
            type="number"
            id="team2_score"
            name="team2_score"
            value={match.team2_score}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="result">Result:</label>
          <select
            id="result"
            name="result"
            value={match.result}
            onChange={handleChange}
          >
            <option value="Team1">Team 1</option>
            <option value="Team2">Team 2</option>
            <option value="Draw">Draw</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="youtube_link">YouTube Link:</label>
          <input
            type="text"
            id="youtube_link"
            name="youtube_link"
            value={match.youtube_link}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="video_id">Video ID:</label>
          <input
            type="text"
            id="video_id"
            name="video_id"
            value={match.video_id}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="home_team">Home Team:</label>
          <select
            id="home_team"
            name="home_team"
            value={match.home_team}
            onChange={handleChange}
          >
            <option value="Team1">Team 1</option>
            <option value="Team2">Team 2</option>
          </select>
        </div>
        <button type="submit">Update Match Details</button>
      </form>
    </div>
    </>
  );
};

export default EditMatchForm;
