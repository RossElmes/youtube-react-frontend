// src/App.jsx

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthForm from './AuthForm';
import Profile from './Profile';
import MatchDetails from './MatchDetails';
import YouTubePlayer from './YoutubePlayer';
import AddMatchForm from './AddMatchForm';
import { useState, useEffect } from "react";
import { fetchTasks, fetchClips, fetchCodes ,fetchPlaylists} from "./utils"
import Playlist from './Playlist';

function App() {

    const [tasks, setTasks] = useState([]);
    const [codes, setCodes] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [videoId, setVideoId] = useState();
    const [matchId, setMatchId] = useState();



    // Fetch tasks from the API when the component mounts
    useEffect(() => {
        fetchTasks(setTasks);
        fetchCodes(setCodes);
        fetchPlaylists(setPlaylists)
    }, []);


    return (
        <div className="App">
            <Routes>
                <Route path="/login" element={<AuthForm />} />
                <Route path="/profile" element={<Profile tasks={tasks} />} />
                <Route path="/" element={<AuthForm />} />
                <Route path="/matchdetails" element={<MatchDetails tasks={tasks} setTasks={setTasks} />} />
                <Route path="/playlists" element={<Playlist playlists={playlists} setPlaylists={setPlaylists} />} />
                <Route path="/video/:videoId/:matchId" element={<YouTubePlayer codes={codes} setCodes={setCodes} />} />
                <Route path="/addmatch" element={<AddMatchForm tasks={tasks} setTasks={setTasks}/>} />
            </Routes>
        </div>
    );
}

export default App 
