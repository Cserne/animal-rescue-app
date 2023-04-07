import React, { useState } from 'react';
import http from 'axios';

const UpdateHelp = ({h, help}) => {
    const [showForm, setShowForm] = useState(false);
    const [description, setDescription] = useState("");

    const updateDescription = async (description) => {

        const token = (JSON.parse(localStorage.getItem('token')).token);
    
        if (!token) window.alert("Please log in first");
        if ((token && description)) {
          try {
            const response = await http.patch(
              `https://app.mankacs.site/api/helprequest/${help._id}/help/${h._id}`, 
              // `http://localhost:8080/api/helprequest/${help._id}/help/${h._id}`, 
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

    const handleSubmit = (e) => {
        e.preventDefault();
        clearInputs();
        updateDescription(description);
        refreshPage();
        // setDescription(true);
    }
    return (
        <div>
        <div key={h._id}>{h.description}</div>
        <button key={h._id} onClick={() => setShowForm(true)}>Update</button>
        {
            showForm &&
            <form key={h._id} className="reg-form" onSubmit={handleSubmit}>
                {/* <label>
                Please fill!
                </label> */}
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
                <input type="submit" value="Send" />
            </form>
        

        }
    </div>
  )
}

export default UpdateHelp