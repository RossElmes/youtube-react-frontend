import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import axios from 'axios';
import Table from "./Table";
import NavBar from "./NavBar";
import { Link } from 'react-router-dom';

const MatchDetails = ({tasks,setTasks}) => {

  
const headers = ['ID','Date of Match', 'Venue', 'Team1', 'Team2','Home Team','Team1_Score','Team2_Score','Result','Youtube Link','Video ID'];

  // Function to delete a task
const deleteClip = async (id,setTasks) => {
  console.log(id)
  await axios.delete(`http://127.0.0.1:8000/api/matchdetails/${id}/`);
  setTasks((prevTasks) =>prevTasks.filter(prevTask => prevTask.id !== id));
};


  return (
    <>
    <NavBar />
    <div className="container pt-5">
    <Link to="/addmatch" className="add-button">Add New Match</Link>
      <Table headers={headers} rows={tasks} setTasks={setTasks} deleteClip={deleteClip} />
    </div>
    </>
  );
};

export default MatchDetails;