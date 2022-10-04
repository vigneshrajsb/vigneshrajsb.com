import Image from 'next/image'
import React from 'react'
import { SiNodedotjs } from 'react-icons/si'

const Skill = ({ icon, image, name }) => {
  return (
    <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center">
        <div className="m-auto invisible md:visible">
          {icon && React.createElement(icon, { size: '50' })}
          {image && (
            <Image src={image} width="64px" height="64px" alt="/"></Image>
          )}
        </div>
        <div className="flex flex-col items-center justify-center">
          <h3>{name}</h3>
          {/* <p className="text-sm text-gray-500 italic">(everyday)</p> */}
        </div>
      </div>
    </div>
  )
}

export default Skill
