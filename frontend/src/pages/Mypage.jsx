import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import http from 'axios';
import { addHelpRequest } from '../api/helpRequest';
import UpdateHelp from '../components/UpdateHelp';
import DeleteHelpRequest from '../components/DeleteHelpRequest';
// import DeleteUser from '../components/DeleteUser';
import Navbar from '../components/Navbar';


const Mypage = () => {
  const [loggedin, setLoggedin] = useState(false);
  // const [showHelps, setShowHelps] = useState(false);
  const [users, setUsers] = useState(null);
  const [data, setData] = useState(null);
  const [species, setSpecies] = useState("");
  const [city, setCity] = useState("");
  // const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

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

      // const response = await http.get("https://app.mankacs.site/api/user"
      const response = await http.get("http://localhost:8080/api/user"
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
            console.log('Zsír', d);
            setData(d);
            setName(d.username);
            setEmail(d.email);
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
    // setDate("");
    setDescription("");
  };

  const refreshPage = () => {
    window.location.reload(false);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    clearInputs();
    addHelpRequest(species, city, description);
    refreshPage();
  };


  return (
    <div className='myPageContainer'>
      <Navbar className='navbar'/>
      {/* {
        users && users.map((u) => (
          <DeleteUser u={u}/>
        ))
      } */}
      <div className='mainMyPage'>
      {
        loggedin && (
          <div className="myPage">
          <div className='hello'>Welcome {name}!</div>
          <form className="helpForm" onSubmit={handleSubmit}>
            <label>
              <h3>Send a new help request!</h3>
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
            {/* <div className="myPageInputDiv">
              <input
                type="text"
                name="date"
                placeholder="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div> */}
            <div className="myPageInputDiv">
              <textarea
                type="textarea"
                name="description"
                placeholder="description"
                minLength={15}
                defaultValue={''}
                // value={description}            If value is given, minLength gets ignored in textarea, so defaultValue is used instead.
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
    
            <input type="submit" value="Submit" />
          </form>
        </div>
    
        )
      }
      <h2>My helprequests</h2>
            {
        data && 
          <div className='showMyHelpRequests'>
            {data.helpRequests.map((help) => (
              <div className='myHelps'>
                {/* <div key={help._id}>HelpId: {help._id}</div> */}
                <div className='myPageHelpReq'>
                  <div key={help._id}><span>Username: </span>{data.username}</div>
                  <div key={help._id}><span>Species: </span>{help.species}</div>
                  <div key={help._id}><span>City: </span>{help.city}</div>
                  {/* <div key={help._id}>Date: {help.date}</div> */}
                  <div key={help._id}><span>Date: </span>{new Date(help.createdAt).toLocaleDateString()}</div>
                  <div key={help._id}><span>Description: </span>{help.description}</div>
                </div>
                <div className='myPageHelpDesc'>
                  <div key={help._id}><span>Helps: </span>{help.helps.map((h) => (
                    <div>
                      <UpdateHelp h={h} help={help}/>
                    </div>
                  ))}
                  </div>
                  <DeleteHelpRequest help={help}/>
                </div>
              </div>

            ))}
            {/* <div className='deleteUser'>
              <DeleteUser data={data}/>
            </div> */}
          </div>
      }
      </div>
    </div>
  )
}

export default Mypage