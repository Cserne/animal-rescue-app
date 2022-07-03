import React, { useState, useEffect } from 'react';
import http from 'axios';
// import Help from '../components/Help';
import { Link } from "react-router-dom";
import AllUsers from '../components/AllUsers';


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
      {
        data && 
          <>
            <AllUsers data={data}/>
            <Link to="/" className="navbar-btn">
              <div>
                <p>HOMEPAGE</p>
              </div>
            </Link>

          </>
      }
    </div>
  )
}

export default ShowAllUsers