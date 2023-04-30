import React, { useState } from 'react';
import http from 'axios';
import jwt_decode from 'jwt-decode';

const HelpReq = ({helpreq, d}) => {
    const [description, setDescription] = useState("");
    const [sameUser, setSameUSer] = useState(false);

    const sendHelp = async (description) => {
        const token = (JSON.parse(localStorage.getItem('token')).token);
        const decoded = jwt_decode(token);
    
        if (!token) window.alert("Please log in first");
        if ((token && description) && decoded._id !== d._id) {
          try {
            const response = await http.post(
              // `https://app.mankacs.site/api/helprequest/${helpreq._id}/help`, 
              `http://localhost:8080/api/helprequest/${helpreq._id}/help`, 
              {
                description: description
              }, {
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

    const clearInputs = () => {
        setDescription("");
    };

    const refreshPage = () => {
      window.location.reload(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearInputs();
        sendHelp(description);
        refreshPage();
    };

  return (
    <div key={helpreq._id} className='helpReq'>
      <div className='showAllHelpReq'>
        <div className='allHelpReq1'>
          <div key={helpreq._id}><span>User: </span>{d.username} ({d.email})</div>
          <div key={helpreq._id}><span>Species: </span>{helpreq.species}</div>
          <div key={helpreq._id}><span>City: </span>{helpreq.city}</div>
          <div key={helpreq._id}><span>Date: </span>{new Date(helpreq.createdAt).toLocaleDateString()}</div>
          <div key={helpreq._id}><span>Details: </span>{helpreq.description}</div>
          <img key={helpreq._id} src={helpreq.image} alt='img'></img>
        </div>
        <div className='allHelpReq2'>
          <form className="sendHelp" onSubmit={handleSubmit}>
            {/* <label>
              Send help down below!
            </label> */}
            <div className="input-div">
              <input
                type="textarea"
                name="help"
                placeholder="I want to help"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <input type="submit" value="Send" />
          </form>
          <div key={helpreq._id}><span>Helps: </span>{helpreq.helps.map((help) => (
              <div className='hh'>
                  <div key={help._id}>{help.description}</div>
                  {/* <div key={help._id}>{help.userId}</div> */}
              </div>
          ))}</div>
        </div>
      </div>
    </div>
  )
}

export default HelpReq