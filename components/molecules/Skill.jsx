import Image from 'next/image'
import React from 'react'

const Skill = ({ icon, image, name }) => {
  return (
    <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300 hover:ring-1 hover:ring-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center">
        <div className="m-auto ">
          {icon &&
            React.createElement(icon, { className: 'text-xl md:text-5xl' })}
          {image && (
            <div className="w-5 md:w-12 h-5 md:h-12 relative">
              <Image src={image} layout="fill" alt="/" className="p-0 m-0" />
            </div>
          )}
        </div>
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-sm md:text-base font-light">{name}</h3>
        </div>
      </div>
    </div>
  )
}

export default Skill
