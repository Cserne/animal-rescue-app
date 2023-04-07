import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import http from 'axios';
import DeleteUser from '../components/DeleteUser';


const DeleteProfile = () => {

  const [loggedin, setLoggedin] = useState(false);
  const [data, setData] = useState(null);

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
      // const response = await http.get("http://localhost:8080/api/user"
      , {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      );
      console.log('ez most a lényeg', response.data);
      // setUsers(response.data)
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


  return (
    <div>
      {
        data && 
        <div>
          <DeleteUser data={data}/>
        </div>
      }
    </div>
  )
}

export default DeleteProfile