import React from 'react';
import http from 'axios';

const DeleteHelpRequest = ({help}) => {

  const deleteHelpReq = async () => {
      const token = (JSON.parse(localStorage.getItem('token')).token);
      if (!token) window.alert("Please log in first");

      if (token) {
        try {
          const response = await http.delete(`http://localhost:4000/api/helprequest/${help._id}`, 
            {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }
          );
          console.log("ez a response: ", response)
          return response;
        } catch (error) {
          console.log("Something has gone wrong! ", error);
          return error;
        }
      }
  } 

  return (
    <div>
        <button onClick={deleteHelpReq} key={help._id}>Törlés</button>
    </div>
  )
}

export default DeleteHelpRequest