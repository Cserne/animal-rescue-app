import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import Navbar from "../components/Navbar";

const Home = () => {
  const [loggedin, setLoggedin] = useState(false);

  const isLoggedIn = async () => {
    const token = localStorage.getItem("token");
    // const token = (JSON.parse(localStorage.getItem('token')).token);
    const decoded = jwt_decode(token);
    console.log("CHECK", decoded);
    if (token) setLoggedin(true);
  };

  useEffect(() => {
    isLoggedIn();
  }, []);


  return (
    <div className="homepage">
      <Navbar />
      <div>
        <h1>Homepage</h1>
        <div className="homepageDiv">
          <h3>Welcome to our website!</h3>
          <p>Our goal is to help animals in need.</p>
        </div>
      </div>
    </div>
  )
}

export default Home