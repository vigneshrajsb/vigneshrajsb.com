import React from 'react'

const Employment = ({ employer, title, duration, location }) => {
  return (
    <p>
      <span className="font-bold">{employer}</span>
      <span className="px-2">|</span>
      {title}
      <span className="font-thin"> ({duration}) </span>
      <span className="px-2">|</span>
      <span className="font-thin"> {location} </span>
    </p>
  )
}

export default Employment
