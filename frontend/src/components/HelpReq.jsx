import React, { useState } from 'react';
import http from 'axios';


const HelpReq = ({helpreq}) => {
    // const [show, setShow] = useState(false);
    const [description, setDescription] = useState("");

    const sendHelp = async (description) => {
        // setShow(true);
        const token = (JSON.parse(localStorage.getItem('token')).token);
    
        if (!token) window.alert("Please log in first");
        if ((token && description)) {
          try {
            const response = await http.post(
              `http://localhost:4000/api/helprequest/${helpreq._id}/help`, 
              {
                description: description
                // ,
                // userId: _id
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
    <div>
        <div key={helpreq._id}>{helpreq.species}</div>
        <div key={helpreq._id}>{helpreq.city}</div>
        <div key={helpreq._id}>{helpreq.date}</div>
        <div key={helpreq._id}>{helpreq.description}</div>
        {
            <>
            <form className="reg-form" onSubmit={handleSubmit}>
            <label>
              Please fill!
            </label>
            <div className="input-div">
              <input
                type="textarea"
                name="description"
                placeholder="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
    
            <input type="submit" value="Elküld" />
          </form>

                {/* <input placeholder='segítek' onChange={(e) => setHelp(e.target.value)}/>
                <button onClick={sendHelp}>Segítek</button>
                {
                    // show &&
                     <div>{help}</div>
                } */}
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