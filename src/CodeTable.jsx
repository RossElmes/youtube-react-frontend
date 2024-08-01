// Table.jsx

import React from 'react';
import './Table.css';


const CodeTable = ({ headers, rows,setCodes,deleteCodes}) => {

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
              </td>
              <td>
              <button onClick={() => deleteCodes(row.id,setCodes)}>Delete</button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default CodeTable;