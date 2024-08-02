// src/App.jsx
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthForm from './AuthForm';
import Profile from './Profile';
import MatchDetails from './MatchDetails';
import YouTubePlayer from './YoutubePlayer';
import AddMatchForm from './AddMatchForm';
import EditMatchForm from './EditMatchForm';
import { useState, useEffect } from "react";
import { fetchTasks, fetchCodes ,fetchPlaylists} from "./utils"
import Playlist from './Playlist';
import Codes from "./Codes";
import Playlistplayer from "./Playlistplayer";
import SplashPage from "./SplashPage";

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
                <Route path="/" element={<SplashPage />} />
                <Route path="/matchdetails" element={<MatchDetails tasks={tasks} setTasks={setTasks} />} />
                <Route path="/playlists" element={<Playlist playlists={playlists} setPlaylists={setPlaylists} />} />
                <Route path="/video/:videoId/:matchId" element={<YouTubePlayer codes={codes} setCodes={setCodes} playlists={playlists} />} />
                <Route path="/addmatch" element={<AddMatchForm tasks={tasks} setTasks={setTasks}/>} />
                <Route path="/editmatch/:matchId" element={<EditMatchForm tasks={tasks} setTasks={setTasks}/>} />
                <Route path="/codes" element={<Codes codes={codes} setCodes={setCodes} />} />
                <Route path="/playlistclips/:playlistId" element={<Playlistplayer playlists={playlists}/>} />
            </Routes>
        </div>
    );
}

export default App 
