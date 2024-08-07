import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import axios from 'axios';
import MatchDetailTable from "./MatchDetailsTable";
import NavBar from "./NavBar";
import { Link } from 'react-router-dom';

const MatchDetails = ({tasks,setTasks}) => {

  
const headers = ['ID','Date of Match', 'Venue', 'Team1', 'Team2','Home Team','Team1_Score','Team2_Score','Result','Youtube Link','Video ID'];

  // Function to delete a task
const deleteClip = async (id,setTasks) => {
  console.log(id)
  await axios.delete(`https://youtubeplayer-django-api.onrender.com/api/matchdetails/${id}/`);
  setTasks((prevTasks) =>prevTasks.filter(prevTask => prevTask.id !== id));
};


  return (
    <>
    <NavBar />
    <div className="container-fluid pt-1">
    <Link to="/addmatch" className="btn btn-secondary m-2">Add New Match</Link>
      <MatchDetailTable headers={headers} rows={tasks} setTasks={setTasks} deleteClip={deleteClip} />
    </div>
    </>
  );
};

export default MatchDetails;