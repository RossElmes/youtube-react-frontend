import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import Table from "./Table";
import NavBar from "./NavBar";
import { Link } from 'react-router-dom';

const MatchDetails = ({tasks,setTasks}) => {

  
  const headers = ['ID', 'Date of Match', 'Venue', 'Team1', 'Team2','Home Team','Team1_Score','Team2_Score','Result','Youtube Link','Video ID'];
  const rows = [
    [1, 'John Doe', 'john.doe@example.com', <button>Delete</button>],
    [2, 'Jane Smith', 'jane.smith@example.com', <button>Delete</button>],
    [3, 'Bob Johnson', 'bob.johnson@example.com', <button>Delete</button>],
  ];

  console.log(tasks)

  return (
    <>
    <NavBar />
    <div className="container pt-5">
    <Link to="/addmatch" className="add-button">Add New Match</Link>
      <Table headers={headers} rows={tasks} setTasks={setTasks} />
    </div>
    </>
  );
};

export default MatchDetails;