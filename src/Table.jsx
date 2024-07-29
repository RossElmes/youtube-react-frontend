// Table.jsx

import React from 'react';
import './Table.css';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Table = ({ headers, rows,setTasks,deleteClip}) => {

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
              <Link to={`/editmatch/${row.id}`}>Edit</Link>
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
