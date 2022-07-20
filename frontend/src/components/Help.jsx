import React from 'react'

const Help = ({data}) => {
  return (
    <div className='helpsPage'>
      {data.map((d, i) => (
        <div className='help'>
            <div key={i}><span>Species: </span>{d.species}</div>
            <div key={i}><span>City: </span>{d.city}</div>
            <div key={i}><span>Date: </span>{new Date(d.createdAt).toLocaleDateString()}</div>
            <div key={i}><span>Description: </span>{d.description}</div>
            {/* <div key={i}>_id: {d._id}</div> */}
        </div>
      ))}
    </div>
  )
}

export default Help