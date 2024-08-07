import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import CodeTable from "./CodeTable";
import NavBar from "./NavBar";
import axios from 'axios';
import { useState } from "react";
import './Form.css'

const Codes = ({codes,setCodes}) => {

  const headers = ['ID', 'Code',];

  const [newCode, setNewCode] = useState({
    code:''  
  });

  // Function to delete a task
  const deleteCodes = async (id,setCodes) => {
    console.log(id)
    await axios.delete(`https://youtubeplayer-django-api.onrender.com/api/codes/${id}/`);
    setCodes((prevCodes) =>prevCodes.filter(prevCode => prevCode.id !== id));
  };


  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewCode({
      ...newCode,
      [name]:value,})

    console.log(newCode)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCode(newCode);
    setNewCode({code:'',})

  };
  
  const createCode = async (newCode) => {
    const response = await axios.post("https://youtubeplayer-django-api.onrender.com/api/codes/",newCode);
        setCodes([...codes, response.data]);
      };
      // Function to create a new task

  return (
    <>
    <NavBar />
    <form onSubmit={handleSubmit}>
        <div className="form-container">
          <label htmlFor="Code">Add new Code</label>
          <input
            type="text"
            id="code"
            name="code"
            value={newCode.code}
            onChange={handleChange}
             className="form-control mb-3"
          />
           <button className="btn btn-secondary" type="submit">Add New Code</button>
        </div>
       
      </form>
    <div className="container">
      <CodeTable headers={headers} rows={codes} deleteCodes={deleteCodes} setCodes={setCodes} />
    </div>
    </>
  );
};

export default Codes;


