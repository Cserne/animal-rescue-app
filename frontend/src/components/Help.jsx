import React from 'react'

const Help = ({data}) => {
  return (
    <div>{data.map((d, i) => (
        <div className='help'>
            <div key={i}>Állatfaj: {d.species}</div>
            <div key={i}>Helyszín: {d.city}</div>
            <div key={i}>Dátum: {d.date}</div>
            <div key={i}>Leírás: {d.description}</div>
            <div key={i}>_id: {d._id}</div>
        </div>
    ))}</div>
  )
}

export default Help