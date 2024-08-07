// src/YouTubePlayer.jsx

import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import axios from "axios";
import { fetchPlaylistClips } from "./utils"
import NavBar from './NavBar';
import './Youtubeplayer.css'


const Playlistplayer = ({ codes, playlists }) => {

    const [playlistClips, setPlaylistClips] = useState([]);
    const playerRef = useRef(null);
    const { playlistId } = useParams();
    const [videoId, setVideoId] = useState('')


    // Fetch tasks from the API when the component mounts
    useEffect(() => {
        fetchPlaylistClips(setPlaylistClips, playlistId, setVideoId);

    }, []);

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
            console.log(vidoId)
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



    const goToClip = (clip) => {
        if (playerRef.current) {

            const time = clip.clip.start_time

            if (videoId === clip.video_id) {
                playerRef.current.seekTo(time)
            } else {
                setVideoId(clip.video_id)
                playerRef.current.loadVideoById({ videoId: clip.video_id, startSeconds: time, })
                playerRef.current.playVideo()

            }
        }
    }


    const handlePlaylistChange = (e) => {
        console.log(e.target.value)
        const data = playlists.filter(item => item.name === e.target.value);
        setSelectedPlaylist(data[0])
    }



    // Function to delete a task
    const deletePlaylistClip = async (id) => {
        console.log(id)
        await axios.delete(`https://youtubeplayer-django-api.onrender.com/api/playlistclips/${id}/`);
        setPlaylistClips((prevplaylistClips) => prevplaylistClips.filter(prevplaylistClip => prevplaylistClip.id !== id));
    };

    return (
        <>
            <NavBar />
            <div>
                
                <YouTube videoId={videoId} opts={opts} onReady={onReady} />
                <button className='btn btn-secondary' onClick={togglePlayPause}>Play/Pause</button>
                <div className='row'>
                <div className="list-group mb-0 scrollable-div">
                    {playlistClips.map((clip) => (
                        <li
                            key={clip.id}
                           className="list-group-item d-flex align-items-center justify-content-between border-0 mb-2 bg-light"

                        >{`${clip.clip.name} @ ${clip.clip.start_time}`}
                            <button className="btn btn-secondary" onClick={() => goToClip(clip)}>Go to Clip</button>
                                <button type="button" class="btn btn-danger" onClick={()=> deletePlaylistClip(clip.id)}>
                                    Delete Clip from Playlist
                                </button>
                        </li>
                    ))}
                </div>
            </div>
            </div>
        </>
    );
};

export default Playlistplayer;
