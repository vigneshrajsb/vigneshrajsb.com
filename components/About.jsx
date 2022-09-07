import Image from 'next/image'
import React from 'react'
import AboutImg from '../public/assets/about.jpg'

const About = () => {
  return (
    <div id="about" className="w-full md:h-screen p-2 flex items-center py-16">
      <div className="=max-w-[1240px] m-auto md:grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <p className="uppercase text-xl tracking-widest text-[#e06e4d]">
            About
          </p>
          <h2 className="py-4">Who I Am?</h2>
          <p className="py-2 text-gray-600">
            A Software Engineer based in Los Angeles.
          </p>
          <p className="py-2 text-gray-600">
            Here comes my life story that no one asked for. Here comes my life
            story that no one asked.
          </p>
          <p className="py-2 text-gray-600">
            Here comes my life story that no one asked for. Here comes my life
            story that no one asked for. Here comes my life story that no one
            asked for.
          </p>
          <p className="py-2 text-gray-600 underline cursor-pointer">
            See what I&apos; working on
          </p>
        </div>
        <div className="invisible md:visible w-full h-full m-auto shadow-xl shadow-gray-400 rounded-xl flex items-center justify-center p-4 hover:scale-105 ease-in duration-300">
          <Image
            src={AboutImg}
            alt="a picture of vignesh with sepia filter"
            className="rounded-xl"
          />
        </div>
      </div>
    </div>
  )
}

export default About
