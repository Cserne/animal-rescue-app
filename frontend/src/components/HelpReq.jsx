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
              `http://localhost:4000/api/helprequest/${helpreq._id}/help`, 
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearInputs();
        sendHelp(description);
      };

  return (
    <div className='helpReq'>
        <div key={helpreq._id}>Posztoló: {d.username} ({d.email})</div>
        <div key={helpreq._id}>Állatfaj: {helpreq.species}</div>
        <div key={helpreq._id}>Helyszín: {helpreq.city}</div>
        <div key={helpreq._id}>Dátum: {helpreq.date}</div>
        <div key={helpreq._id}>Részletek: {helpreq.description}</div>
        {
            <>
            <form className="sendHelp" onSubmit={handleSubmit}>
            <label>
              Please fill!
            </label>
            <div className="input-div">
              <input
                type="textarea"
                name="help"
                placeholder="send help"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
    
            <input type="submit" value="Elküld" />
          </form>

            </> 
        }
        <div key={helpreq._id}>{helpreq.helps.map((help) => (
            <>
                <div key={help._id}>{help.description}</div>
                <div key={help._id}>{help.userId}</div>
            </>
        ))}</div>

    </div>
  )
}

export default HelpReq