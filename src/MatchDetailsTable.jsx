// Table.jsx

import React from 'react';
import { Link } from 'react-router-dom';


const MatchDetailTable = ({ headers, rows,setTasks,deleteClip}) => {

  return (
    <>
    <table className="table table-bordered table-striped">
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
              <Link className="btn btn-secondary m-2" to={`/editmatch/${row.id}`}>Edit</Link>
              </td>
              <td>
              <button  className="btn btn-danger m-2" onClick={() => deleteClip(row.id,setTasks)}>Delete</button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
    </>
    
  );
};

export default MatchDetailTable;
