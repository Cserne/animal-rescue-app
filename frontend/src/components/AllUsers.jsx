import React, { useState } from 'react';
import HelpReq from '../components/HelpReq';

const AllUsers = ({data}) => {
    // const [showHelpButton, setShowHelpButton] = useState(true);

  return (
    <div>
        {data && data.map((d) => (
            <div className='showAllData'>
                <div key={d._id}>{d.username}</div>
                <div key={d._id}>{d.email}</div>
                <div key={d._id}>{d.helpRequests.map((helpreq) => (
                    <div className='usersHelpRequests'>
                        <HelpReq helpreq={helpreq}/>
                    </div>
                ))}</div>
            </div>
        ))}
    </div>
  )
}

export default AllUsers