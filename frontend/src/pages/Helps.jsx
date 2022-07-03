import React, { useState, useEffect } from 'react';
import http from 'axios';
import Help from '../components/Help';
import { Link } from "react-router-dom";


const Helps = () => {
    const [data, setData] = useState(null);

    const loadData = async () => {
      const token = (JSON.parse(localStorage.getItem('token')).token);
      console.log("tokenke: ", token);

        const response = await http.get("http://localhost:4000/api/helprequest"
        , {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
        );
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
            <Help data={data}/>
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

export default Helps