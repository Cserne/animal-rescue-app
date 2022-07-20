import React from 'react';
import http from 'axios';

const DeleteHelpRequest = ({help}) => {

  const deleteHelpReq = async () => {
      const token = (JSON.parse(localStorage.getItem('token')).token);
      if (!token) window.alert("Please log in first");

      if (token) {
        try {
          // const response = await http.delete(`https://app.mankacs.site/api/helprequest/${help._id}`, 
          const response = await http.delete(`http://localhost:8080/api/helprequest/${help._id}`, 
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

  const refreshPage = () => {
    window.location.reload(false);
  };

  const deleteHelpRequest = () => {
    deleteHelpReq();
    refreshPage();
  }

  return (
    <div className='myPageDeleteHelpReq'>
        <button onClick={deleteHelpRequest} key={help._id}>Delete</button>
    </div>
  )
}

export default DeleteHelpRequest