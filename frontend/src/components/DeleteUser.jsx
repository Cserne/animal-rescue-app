import React, { useState } from 'react';
import http from 'axios';
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar';


const DeleteUser = ({data}) => {
    const [loggedin, setLoggedin] = useState(false);
    const [wantToDelete, setWantToDelete] = useState(true);
    const [showDelete, setShowDelete] = useState(false);
    // const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const isLoggedIn = async () => {
        const token = localStorage.getItem("token");
        console.log("toktoktok", token)
        if (token) {
          setLoggedin(true);
        }
      };
      
    const deleteData = async () => {
        const token = (JSON.parse(localStorage.getItem('token')).token);
        if (!token) window.alert("Please log in first");
        
        if (token) {
          try {
            const response = await http.delete(`https://app.mankacs.site/api/user/${data._id}`, 
            // const response = await http.delete(`http://localhost:8080/api/user/${data._id}`, 
              {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              }
            );
            return response;
          } catch (error) {
            console.log("Something has gone wrong! ", error);
            return error;
          }
        }
    
    }

    const deleteUser = () => {
        deleteData();
        localStorage.clear();
        setLoggedin(false);
        navigate("/");
    }

    const deleteButtonClick = () => {
      setShowDelete(true);
      setWantToDelete(false);
    }

    const dontDelete = () => {
      setWantToDelete(true);
      setShowDelete(false);
    }
    

  return (
    <div>
      <Navbar/>
      <div className='deleteUser'>
        {
          wantToDelete && <button className='deleteProfileButton' onClick={deleteButtonClick}>Profil törlése</button>
        }
        
        {
          showDelete && 
          <div className='wantToDelete'>
            <p>Biztosan törli a profilját?</p>
            <button onClick={deleteUser} key={data._id}>Igen</button>
            <button onClick={dontDelete} key={data._id}>Nem</button>
          </div>
        }
      </div>
    </div>
  )
}

export default DeleteUser