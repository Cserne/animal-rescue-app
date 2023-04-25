import React from 'react'

const Help = ({data}) => {
  return (
    <div className='helpsPage'>
      {data.map((d) => (
        <div className='help'>
            <div key={d._id}><span>Species: </span>{d.species}</div>
            <div key={d._id}><span>City: </span>{d.city}</div>
            <div key={d._id}><span>Date: </span>{new Date(d.createdAt).toLocaleDateString()}</div>
            <div key={d._id}><span>Description: </span>{d.description}</div>
            {/* <img key={d._id} src={d.image} alt='img'></img> */}
            {/* <div key={i}>_id: {d._id}</div> */}
        </div>
      ))}
    </div>
  )
}

export default Help