import React, { useState } from 'react';
import './Form.css';
import axios from 'axios';
import NavBar from './NavBar';
import { useNavigate } from "react-router-dom";

const AddMatchForm = ({ setTasks,tasks}) => {

  const [formData, setFormData] = useState({
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

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value)
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMatch(formData);
    navigate('/matchdetails')
  };
  
  const createMatch = async (formData) => {
    const response = await axios.post("https://youtubeplayer-django-api.onrender.com/api/matchdetails/",formData);
        setTasks([...tasks, response.data]);
      };
      // Function to create a new task


  return (
    <>
    <NavBar />
    <div className="form-container">
      <h2>Add New Match</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="date_of_match">Date of Match:</label>
          <input
            type="date"
            id="date_of_match"
            name="date_of_match"
            value={formData.date_of_match}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="venue">Venue:</label>
          <input
            type="text"
            id="venue"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="team1">Team 1:</label>
          <input
            type="text"
            id="team1"
            name="team1"
            value={formData.team1}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="team2">Team 2:</label>
          <input
            type="text"
            id="team2"
            name="team2"
            value={formData.team2}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="team1_score">Team 1 Score:</label>
          <input
            type="number"
            id="team1_score"
            name="team1_score"
            value={formData.team1_score}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="team2_score">Team 2 Score:</label>
          <input
            type="number"
            id="team2_score"
            name="team2_score"
            value={formData.team2_score}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="result">Result:</label>
          <select
            id="result"
            name="result"
            value={formData.result}
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
            value={formData.youtube_link}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="video_id">Video ID:</label>
          <input
            type="text"
            id="video_id"
            name="video_id"
            value={formData.video_id}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="home_team">Home Team:</label>
          <select
            id="home_team"
            name="home_team"
            value={formData.home_team}
            onChange={handleChange}
          >
            <option value="Team1">Team 1</option>
            <option value="Team2">Team 2</option>
          </select>
        </div>
        <button type="submit">Add Match</button>
      </form>
    </div>
    </>
  );
};

export default AddMatchForm;
