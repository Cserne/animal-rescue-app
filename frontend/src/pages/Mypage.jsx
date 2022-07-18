import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import http from 'axios';
import { addHelpRequest } from '../api/helpRequest';
import UpdateHelp from '../components/UpdateHelp';
import DeleteHelpRequest from '../components/DeleteHelpRequest';
import DeleteUser from '../components/DeleteUser';
import Navbar from '../components/Navbar';


const Mypage = () => {
  const [loggedin, setLoggedin] = useState(false);
  // const [showHelps, setShowHelps] = useState(false);
  const [users, setUsers] = useState(null);
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

      const response = await http.get("https://app.mankacs.site/api/user"
      , {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      );
      console.log('ez most a lényeg', response.data);
      setUsers(response.data)
      // users.map((u) => (
      //   console.log('')
      // ))
      response.data.map((d) => {
        console.log(d._id)
        try {
          if(d._id === jwt_decode(localStorage.getItem("token"))._id) {
            console.log('Zsír');
            setData(d)
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
      {/* {
        users && users.map((u) => (
          <DeleteUser u={u}/>
        ))
      } */}
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
            <div className='deleteUser'>
              <DeleteUser data={data}/>
            </div>
          </div>
      }
      {
        loggedin && (
          <div className="myPage">
          <form className="helpForm" onSubmit={handleSubmit}>
            <label>
              <h3>Register a new helprequest!</h3>
            </label>
            <div className="myPageInputDiv">
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
            <div className="myPageInputDiv">
              <input
                type="textarea"
                name="city"
                placeholder="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="myPageInputDiv">
              <input
                type="text"
                name="date"
                placeholder="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="myPageInputDiv">
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