import React from 'react'
import { FaLinkedinIn, FaGithub, FaTwitter } from 'react-icons/fa'
import { AiOutlineMail } from 'react-icons/ai'
import Link from 'next/link'
export const Main = () => {
  return (
    <div id="home" className="w-full h-screen text-center">
      <div className="max-w-[1240p] w-full h-full mx-auto p-2 flex justify-center items-center">
        <div>
          <p className="uppercase text-sm tracking-widest text-gray-600">
            LET&apos;S BUILD SOFTWARE TOGETHER!
          </p>
          <h1 className="py-4 text-gray-700">
            Hi, I&apos;m <span className="text-[#e06e4d]"> Vignesh</span>
          </h1>
          <h1 className="py-4 text-gray-700">Software Engineer</h1>
          <p className="py-1 text-gray-500">(he/him)</p>
          <p className="py-4 text-gray-600 max-w-[70%] m-auto">
            I&apos;m a software developer specialized in building tools that
            help with developer productivity, internal tooling and testing
            practices. Currently, I&apos;m a part of the Developer Productivity
            team building tools and serverless applications while learning SRE
            technologies.
          </p>
          <div className="flex items-center justify-between max-w-[330px] m-auto py-4">
            <a
              href="https://www.linkedin.com/in/vigneshrajsb/"
              target={'_blank'}
              rel="noreferrer"
            >
              <div className="rounded-full shadow-lg shadow-gray-400 p-6 cursor-pointer hover:scale-110 ease-in duration-300">
                <FaLinkedinIn />
              </div>
            </a>
            <a
              href="https://github.com/vigneshrajsb"
              target={'_blank'}
              rel="noreferrer"
            >
              <div className="rounded-full shadow-lg shadow-gray-400 p-6 cursor-pointer hover:scale-110 ease-in duration-300">
                <FaGithub />
              </div>
            </a>
            <a
              href="https://twitter.com/vigneshrajsb"
              target={'_blank'}
              rel="noreferrer"
            >
              <div className="rounded-full shadow-lg shadow-gray-400 p-6 cursor-pointer hover:scale-110 ease-in duration-300">
                <FaTwitter />
              </div>
            </a>
            <a href="mailto:vignesh.raj47@gmail.com">
              <div className="rounded-full shadow-lg shadow-gray-400 p-6 cursor-pointer hover:scale-110 ease-in duration-300">
                <AiOutlineMail />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
