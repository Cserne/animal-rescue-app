import React, { useState } from 'react';
import http from 'axios';
import HelpReq from '../components/HelpReq';

const AllUsers = ({data}) => {



  return (
    <div className='allUsersPage'>

        {data && data.map((d) => (
            <div className='showAllData'>
                {/* <div key={d._id}>{d.username}</div>
                <div key={d._id}>{d.email}</div> */}
                <div key={d._id}>{d.helpRequests.map((helpreq) => (
                    <div className='usersHelpRequests'>
                        <HelpReq helpreq={helpreq} d={d}/>
                    </div>
                ))}</div>
            </div>
        ))}
    </div>
  )
}

export default AllUsers