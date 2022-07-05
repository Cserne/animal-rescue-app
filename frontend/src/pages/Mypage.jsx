import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import http from 'axios';
import { addHelpRequest } from '../api/helpRequest';
import { Link } from "react-router-dom";
import UpdateHelp from '../components/UpdateHelp';
import DeleteHelpRequest from '../components/DeleteHelpRequest';
import Navbar from '../components/Navbar';


const Mypage = () => {
  const [loggedin, setLoggedin] = useState(false);
  // const [showHelps, setShowHelps] = useState(false);
  const [data, setData] = useState(null);
  const [species, setSpecies] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");


  const isLoggedIn = async () => {
    const token = localStorage.getItem("token");
    console.log(token)
    const decoded = jwt_decode(token);
    console.log("my", decoded._id);
    if (token) setLoggedin(true);
  };

  const loadData = async () => {
    const token = (JSON.parse(localStorage.getItem('token')).token);
    console.log("tokenke: ", token);

      const response = await http.get("http://localhost:4000/api/user"
      , {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      );
      console.log(response.data);
      response.data.map((d) => {
        console.log(d._id)
        try {
          if(d._id === jwt_decode(localStorage.getItem("token"))._id) {
            console.log('Zsír');
            setData(d)
            console.log("data", data);
          }
        } catch (error) {
          console.log(error)
        }
        return data;
  })
      // setData(response.data);
  } 


  useEffect(() => {
    isLoggedIn();
    loadData();
  }, []);

  const clearInputs = () => {
    setSpecies("");
    setCity("");
    setDate("");
    setDescription("");
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    clearInputs();
    addHelpRequest(species, city, date, description);
  };


  return (
    <div>
      <Navbar className='navbar'/>
      {
        data && 
          <div>
            {data.helpRequests.map((help) => (
              <div className='myHelps'>
                <div key={help._id}>HelpId: {help._id}</div>
                <div key={help._id}>Állatfaj: {help.species}</div>
                <div key={help._id}>Helyszín: {help.city}</div>
                <div key={help._id}>Dátum: {help.date}</div>
                <div key={help._id}>Leírás: {help.description}</div>
                <div key={help._id}>Segítségek: {help.helps.map((h) => (
                  <div>
                    <UpdateHelp h={h} help={help}/>
                  </div>
                ))}
                </div>
                <DeleteHelpRequest help={help}/>
              </div>
            ))}
          </div>
      }
      {
        loggedin && (
          <div className="login-page">
          <h3>Register a new helprequest!</h3>
          <form className="reg-form" onSubmit={handleSubmit}>
            <label>
              Please fill!
            </label>
            <div className="input-div">
              <input
                type="string"
                name="species"
                placeholder="species"
                // minLength={5}
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                required
              />
            </div>
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
            <div className="input-div">
              <input
                type="text"
                name="date"
                placeholder="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="input-div">
              <input
                type="textarea"
                name="description"
                placeholder="description"
                minLength={15}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
    
            <input type="submit" value="Submit" />
          </form>
        </div>
    
        )
      }
    </div>
  )
}

export default Mypage