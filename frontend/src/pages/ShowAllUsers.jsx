import React, { useState, useEffect } from 'react';
import http from 'axios';
import AllUsers from '../components/AllUsers';
import Navbar from '../components/Navbar';
import SearchByCity from './SearchByCity';


const ShowAllUsers = () => {
    const [data, setData] = useState(null);


    const loadData = async () => {
      const token = (JSON.parse(localStorage.getItem('token')).token);

        const response = await http.get("https://app.mankacs.site/api/user"
        // const response = await http.get("http://localhost:8080/api/user"
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
        <SearchByCity/>
      }
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