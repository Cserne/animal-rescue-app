import React, { useState, useEffect } from 'react';
import http from 'axios';
import Help from '../components/Help';
import Navbar from '../components/Navbar';
import { Link } from "react-router-dom";


const Helps = () => {
    const [data, setData] = useState(null);

    const loadData = async () => {
      const token = (JSON.parse(localStorage.getItem('token')).token);
      console.log("tokenke: ", token);

        // const response = await http.get("https://app.mankacs.site/api/helprequest"
        const response = await http.get("http://localhost:8080/api/helprequest"
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
      <Navbar/>
      {
        data && 
          <div className='helpsOnPage'>
            <h2>Helprequests</h2>
            <Help data={data}/>
            {/* <Link to="/" className="navbar-btn">
              <div>
                <p>HOMEPAGE</p>
              </div>
            </Link>
 */}
          </div>
      }
    </div>
  )
}

export default Helps