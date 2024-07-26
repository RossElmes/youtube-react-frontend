// Table.jsx

import React from 'react';
import './Table.css';
import axios from 'axios';


const Table = ({ headers, rows,setTasks }) => {

// Function to delete a task
const deleteClip = async (id,setTasks) => {
  console.log(id)
  await axios.delete(`http://127.0.0.1:8000/api/matchdetails/${id}/`);
  setTasks((prevTasks) =>prevTasks.filter(prevTask => prevTask.id !== id));
};


  return (
    <table className="table">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="table-header">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
      {rows.map((row) => (
            <tr key={row.id}>
              {Object.keys(row).map((key) => (
                <td key={key}>{row[key]}</td>
              ))}
              <td>
                <button onClick={() => deleteClip(row.id)}>Edit</button>
              </td>
              <td>
              <button onClick={() => deleteClip(row.id,setTasks)}>Delete</button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;
