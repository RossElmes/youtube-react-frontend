// Function to fetch tasks from the API
import axios from "axios";
import Playlist from "./Playlist";

export async function fetchTasks(setTasks){
    const response = await axios.get("http://127.0.0.1:8000/api/matchdetails/");
    const data = await response.data;
    setTasks(data);
};

// Function to fetch clips from the API
export async function  fetchClips(setClips,match){
    const response = await axios.get("http://127.0.0.1:8000/api/matchclips/",{
            params: {
                match:match
            }
    });
    const data = await response.data;
    console.log(data)
    setClips(data);
};


// Function to fetch clips from the API
export async function  fetchCodes(setCodes){
    const response = await fetch("http://127.0.0.1:8000/api/codes/");
    const data = await response.json();
    setCodes(data);
};




// Function to fetch clips from the API
export async function  fetchPlaylistClips(setPlaylistClips,playlistid,setVideoId){
    const response = await axios.get("http://127.0.0.1:8000/api/playlistclips/",{      
        params: {
        playlist:playlistid
        }
    });
    const data = await response.data;
    setPlaylistClips(data);
    setVideoId(data[0].video_id)
    
};

export async function extractYouTubeId(url){
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}


// Function to fetch clips from the API
export async function  fetchPlaylists(setPlaylists){
    const response = await axios.get("http://127.0.0.1:8000/api/playlist/");
    const data = await response.data;
    setPlaylists(data);
};