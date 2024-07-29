// src/YouTubePlayer.jsx

import React, { useRef,useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import axios from "axios";
import {fetchClips } from "./utils"
import NavBar from './NavBar';


const YouTubePlayer = ({codes}) => {

    const [clips, setClips] = useState([]);
    const playerRef = useRef(null);
    const {matchId , videoId} = useParams();

    // Fetch tasks from the API when the component mounts
    useEffect(() => {
        fetchClips(setClips,matchId);
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
            const currentTime = playerRef.current.getCurrentTime();
            const buttonValue = e.target.value;
            console.log(buttonValue, currentTime);
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



    // Function to create a new task
const createClip = async (e) => {

    if (playerRef.current) {
        const currentTime = parseFloat(playerRef.current.getCurrentTime().toFixed(2));
        const buttonValue = e.target.value;
        let padding = 10.00
        let formatedPadding = parseFloat(padding)
        const end_time = (currentTime + formatedPadding).toFixed(2)

        console.log(currentTime,end_time)
        
        const response = await axios.post("http://127.0.0.1:8000/api/matchclips/", {
            match:matchId,
            start_time:currentTime,
            end_time:end_time,
            name:buttonValue
        });
        setClips([...clips, response.data]);
      };
    }

// Function to delete a task
const deleteClip = async (id) => {
    console.log(id)
    await axios.delete(`http://127.0.0.1:8000/api/matchclips/${id}/`);
    setClips((prevClips) =>prevClips.filter(prevClip => prevClip.id !== id));
  };


    return (
        <>
        <NavBar />
        <div>
            <YouTube videoId={videoId} opts={opts} onReady={onReady} />
            <button onClick={getCurrentTime}>Get Current Time</button>
            <button onClick={togglePlayPause}>Play/Pause</button>
            <button onClick={skipBackward}>Skip Back 10s</button>
            <button onClick={skipForward}>Skip Forward 10s</button>
            <ul className="list-group mb-0">
              {clips.map((clip) => (
                <li
                  key={clip.id}
                  className="list-group-item d-flex align-items-center justify-content-between border-0 mb-2"
                  
                >{`${clip.name} @ ${clip.start_time}`}
                <span className="fa fa-pencil text-success mx-5" onClick={() => goToClip(clip.start_time)}></span>
                <span className="fa fa-times text-danger" onClick={() => deleteClip(clip.id)} ></span>
                </li>
              ))}
            </ul>
            <ul className="list-group mb-0">
              {codes.map((code) => (
                  <button value={code.code} key={code.id} onClick={createClip}>
                    {`${code.code}`}
                  </button>
              ))}
            </ul>
        </div>
       </>
    );
};

export default YouTubePlayer;
