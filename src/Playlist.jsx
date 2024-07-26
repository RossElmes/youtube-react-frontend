import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import Table from "./Table";
import NavBar from "./NavBar";


const Playlist = ({playlists,setTasks}) => {

  
  const headers = ['ID', 'Name',];

  console.log(playlists)

  return (
    <>
    <NavBar />
    <div className="container pt-5">
      <Table headers={headers} rows={playlists} />
    </div>
    </>
  );
};

export default Playlist;