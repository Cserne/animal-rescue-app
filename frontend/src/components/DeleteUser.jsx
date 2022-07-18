import React, { useState } from 'react';
import http from 'axios';
import { useNavigate } from "react-router-dom";


const DeleteUser = ({data}) => {
    const [loggedin, setLoggedin] = useState(false);
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
    

  return (
    <div>
            <button onClick={deleteUser} key={data._id}>Profil törlése</button>
    </div>
  )
}

export default DeleteUser