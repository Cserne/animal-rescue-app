import React, { useState, useEffect } from 'react';
import http from 'axios';
import Navbar from '../components/Navbar';


const SearchByCity = () => {
    const [description, setDescription] = useState("");
    const [city, setCity] = useState("");

    const updateDescription = async () => {

        const token = (JSON.parse(localStorage.getItem('token')).token);
        console.log('TOKK', token);
    
        if (!token) window.alert("Please log in first");
        if ((token)) {
          try {
            const response = await http.get(
              `https://app.mankacs.site/query/api/helprequest`, {
              // `http://localhost:8080/query/api/helprequest`, {
                params: {
                  city: city
                }},
              {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              }
            );
            console.log("ez a response: ", response)
            setDescription(response.data)
            return response;
          } catch (error) {
            console.log("Something has gone wrong! ", error);
            return error;
          }
        }
    }

    useEffect(() => {
        updateDescription();
    }, [city])
    
    
    
    const clearInputs = () => {
        setCity("");
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        clearInputs();
        // setDescription(true);
    }
  

  return (
    <div>
        <Navbar/>
            <form className="searchByCity" onSubmit={handleSubmit}>
                <label>
                Filter by city!
                </label>
                <div className="input-div">
                <input
                    type="textarea"
                    name="city"
                    placeholder="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
                </div>
                <input type="submit" value="New search" />
            </form>

            {
                description && 
                description.map((desc) => (
                    <div className='searchDetails'>
                    {/* <div>{description}</div> */}
                        <div key={desc._id}><span>User: </span>{desc.username} ({desc.email})</div>
                        <div key={desc._id}><span>Species: </span>{desc.helpRequests.species}</div>
                        <div key={desc._id}><span>City: </span>{desc.helpRequests.city}</div>
                        <div key={desc._id}><span>Details: </span>{desc.helpRequests.description}</div>
                        <div key={desc._id}><span>Helps: </span>{desc.helpRequests.helps.map((d) => (
                            <div key={d}>{d.description}</div>
                        ))}</div>
                        {/* <div key={desc._id}>{desc.city}</div>
                        <div key={desc._id}>{desc.date}</div>
                        <div key={desc._id}>{desc.description}</div>
                        <div key={desc._id}>{desc.helps.map((d) => (
                            <div key={d}>{d.description}</div>
                        ))}</div> */}

                    </div>
                ))
            }


    </div>
  )
}

export default SearchByCity