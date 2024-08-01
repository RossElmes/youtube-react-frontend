// Table.jsx

import React from 'react';
import './Table.css';
import { Link } from 'react-router-dom';

const PlaylistTable = ({ headers, rows,setPlaylists,deletePlaylists}) => {

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
                <Link to={`/playlistclips/${row.id}`}>Watch Clips</Link>
              </td>
              <td>
              <button onClick={() => deletePlaylists(row.id,setPlaylists)}>Delete</button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default PlaylistTable;
