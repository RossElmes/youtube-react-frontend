import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import NavBar from "./NavBar";
import axios from 'axios';
import { useState } from "react";
import PlaylistTable from "./PlaylistTable";
import './Form.css'; 

const Playlist = ({playlists,setPlaylists}) => {

  const headers = ['ID', 'Playlist Name'];

  const [Newplaylist, setNewplaylist] = useState({
    name:''  
  });

  // Function to delete a task
  const deletePlaylists = async (id,setPlaylists) => {
    console.log(id)
    await axios.delete(`https://youtubeplayer-django-api.onrender.com/api/playlist/${id}/`);
    setPlaylists((prevPlaylists) =>prevPlaylists.filter(prevPlaylist => prevPlaylist.id !== id));
  };


  const handleChange = (e) => {

    const { name, value } = e.target;

    setNewplaylist({
      ...Newplaylist,
      [name]:value,})
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPlaylist(Newplaylist);
    setNewplaylist({name:'',})

  };
  
  const createPlaylist = async (Newplaylist) => {
    const response = await axios.post("https://youtubeplayer-django-api.onrender.com/api/playlist/",Newplaylist);
      setPlaylists([...playlists, response.data]);
      };
      // Function to create a new task

  return (
    <>
    <NavBar />
    <form onSubmit={handleSubmit}>
        <div className="form-container">
          <label htmlFor="Code">Add New Playlist</label>
          <input
            type="text"
            id="name"
            name="name"
            value={Newplaylist.name}
            onChange={handleChange}
            className="form-control mb-3"
          />
          <button type="submit" className="btn btn-secondary">Add Playlist</button>
        </div>

      </form>
    <div className="container-fluid">
      <PlaylistTable  headers={headers} rows={playlists} deletePlaylists={deletePlaylists} setPlaylists={setPlaylists} />
    </div>
    </>
  );
};

export default Playlist;


