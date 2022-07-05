import React, { useState, useEffect } from 'react';
import http from 'axios';
import AllUsers from '../components/AllUsers';
import Navbar from '../components/Navbar';


const ShowAllUsers = () => {
    const [data, setData] = useState(null);

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
        console.log("userdata", response.data);
        setData(response.data);
    } 

    useEffect(() => {
        loadData();
    }, [])
    
  return (
    <div>
      <Navbar/>
      {
        data && 
          <>
            <AllUsers data={data}/>
          </>
      }
    </div>
  )
}

export default ShowAllUsers