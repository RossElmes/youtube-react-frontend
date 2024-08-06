// src/YouTubePlayer.jsx

import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import axios from "axios";
import { fetchClips } from "./utils"
import NavBar from './NavBar';
import Playlist from './Playlist';
import './Youtubeplayer.css'


const YouTubePlayer = ({ codes, playlists }) => {

    const [clips, setClips] = useState([]);
    const playerRef = useRef(null);
    const { matchId, videoId } = useParams();
    const [distinctNames, setDistinctNames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mode, setMode] = useState('Code'); // Initial mode set to 'Code'
    const [filteredData, setfilteredData] = useState('')
    const [selectedPlaylist, setSelectedPlaylist] = useState('')

    const toggleMode = () => {
        setMode(prevMode => (prevMode === 'Code' ? 'Viewer' : 'Code'));
    };

    const buttonStyle = {
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '5px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
    };


    // Fetch tasks from the API when the component mounts
    useEffect(() => {
        fetchClips(setClips, matchId);
        setLoading(false)

    }, []);


    useEffect(() => {
        const names = [...new Set(clips.map(clip => clip.name))];
        setDistinctNames(names);
        const data = clips.filter(item => item.name === names[0]);
        setfilteredData(data)
        setSelectedPlaylist(playlists[0])
    }, [mode])


    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 1, // Auto-play the video
        },
    };

    const onReady = (event) => {
        playerRef.current = event.target;
    };

    const getCurrentTime = (e) => {
        if (playerRef.current) {
            const currentTime = playerRef.current.getCurrentTime();
            const buttonValue = e.target.value;
            console.log(playlists)
            console.log(distinctNames)
        } else {
            console.error('Player reference is null');
        }
    };


    const togglePlayPause = () => {
        if (playerRef.current) {
            const playerState = playerRef.current.getPlayerState();
            if (playerState === 1) {
                playerRef.current.pauseVideo();
            } else {
                playerRef.current.playVideo();
            }
        }
    };


    const skipForward = () => {
        if (playerRef.current) {
            playerRef.current.seekTo(60)
        }
    }

    const skipBackward = () => {
        if (playerRef.current) {
            playerRef.current.seekTo(5)
        }
    }

    const goToClip = (time) => {
        if (playerRef.current) {
            playerRef.current.seekTo(time)
        }
    }

    const handleSelectChange = (e) => {
        console.log(e.target.value)
        const data = clips.filter(item => item.name === e.target.value);
        setfilteredData(data)
        console.log(data)
    }

    const handlePlaylistChange = (e) => {
        console.log(e.target.value)
        const data = playlists.filter(item => item.name === e.target.value);
        setSelectedPlaylist(data[0])
    }


    // Function to create a new task
    const createClip = async (e) => {

        if (playerRef.current) {
            const currentTime = parseFloat(playerRef.current.getCurrentTime().toFixed(2));
            const buttonValue = e.target.value;
            let padding = 10.00
            let formatedPadding = parseFloat(padding)
            const end_time = (currentTime + formatedPadding).toFixed(2)

            console.log(currentTime, end_time)

            const response = await axios.post("https://youtubeplayer-django-api.onrender.com/api/matchclips/", {
                match: matchId,
                start_time: currentTime,
                end_time: end_time,
                name: buttonValue
            });
            setClips([...clips, response.data]);
        };
    }

    const addToPlaylist = async (clip, selectedPlaylist, videoId) => {

        const data = {
            clip: clip.id,
            playlist: selectedPlaylist.id,
            video_id: videoId
        }

        const response = await axios.post("https://youtubeplayer-django-api.onrender.com/api/playlistclips/", data)
        console.log(data)

    }





    // Function to delete a task
    const deleteClip = async (id) => {
        console.log(id)
        await axios.delete(`https://youtubeplayer-django-api.onrender.com/api/matchclips/${id}/`);
        setClips((prevClips) => prevClips.filter(prevClip => prevClip.id !== id));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <NavBar />
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='row'>
                            <div>
                                <button onClick={toggleMode} style={buttonStyle}>
                                    Toggle to {mode === 'Code' ? 'Viewer' : 'Code'}
                                </button>
                            </div>
                            <YouTube videoId={videoId} opts={opts} onReady={onReady} />
                            <div class="d-flex">
                            <button onClick={getCurrentTime} class="btn btn-secondary">Get Current Time</button>
                            <button onClick={togglePlayPause} class="btn btn-secondary">Play/Pause</button>
                            <button onClick={skipBackward} class="btn btn-secondary">Skip Back 10s</button>
                            <button onClick={skipForward} class="btn btn-secondary">Skip Forward 10s</button>
                            </div>
                        </div>
                        <div className='row ml-5'>
                            <h2>Codes</h2>
                            <div className="mb-1">
                                {codes.map((code) => (
                                    <button value={code.code} key={code.id} onClick={createClip}>
                                        {`${code.code}`}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <h2>Clips</h2>
                        <div className="list-group mb-0 scrollable-div">
                            {clips.map((clip) => (
                                <li
                                    key={clip.id}
                                    className="list-group-item d-flex align-items-center justify-content-between border-0 mb-2 bg-light"

                                >{`${clip.name} @ ${clip.start_time}`}
                                    <button className="btn btn-secondary" onClick={() => goToClip(clip.start_time)}>Go to Clip</button>
                                    <button className="btn btn-danger" onClick={() => deleteClip(clip.id)} >Delete Clip</button>
                                </li>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {mode === 'Code' ? (
                    <>
                    </>
                ) : (<>
                    <div>Viewer</div>
                    <div>
                        <label htmlFor="name-select">Select a name:</label>
                        <select id="name-select" onChange={handleSelectChange}>
                            {distinctNames.map((name, index) => (
                                <option key={index} value={name}>
                                    {name}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="playlist-select">Select a name:</label>
                        <select id="playlist-select" onChange={handlePlaylistChange}>
                            {playlists.map((playlist) => (
                                <option key={playlist.id} value={playlist.name}>
                                    {playlist.name}
                                </option>
                            ))}
                        </select>
                        {filteredData.map((clip) => (
                            <li
                                key={clip.id}
                                className="list-group-item d-flex align-items-center justify-content-between border-0 mb-2"

                            >{`${clip.name} @ ${clip.start_time}`}
                                <span className="fa fa-pencil text-success mx-5" onClick={() => goToClip(clip.start_time)}></span>
                                <button onClick={(e) => addToPlaylist(clip, selectedPlaylist, videoId)}>Add to Playlist</button>
                            </li>
                        ))}

                    </div>
                </>
                )}
            </div>
        </>
    );
};

export default YouTubePlayer;
