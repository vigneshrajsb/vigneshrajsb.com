import React from 'react'
import { FaLinkedinIn, FaGithub, FaTwitter } from 'react-icons/fa'
import { AiOutlineMail } from 'react-icons/ai'
import Link from 'next/link'
export const Main = () => {
  return (
    <div id="home" className="w-full h-screen text-center bg-[#222]">
      <div className="max-w-[1240p] w-full h-full mx-auto p-2 flex justify-center items-center hover:cursor-default">
        <div>
          <p className="uppercase text-sm tracking-widest text-white  hover:cursor-default">
            LET&apos;S BUILD SOFTWARE TOGETHER!
          </p>
          <h1 className="py-4 text-white ease-in duration-500">
            Hi, I&apos;m <span className="text-primary "> Vignesh</span>
          </h1>
          <h3 className="py-2 text-white font-bold sm:text-4xl md:text-4xl">
            Software Engineer
          </h3>
          <p className="py-1 text-white font-light">(he/him)</p>
          <p className="py-4 text-white max-w-[70%] m-auto  font-light text-sm md:text-base">
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
              <div className="social-icon p-6">
                <FaLinkedinIn />
              </div>
            </a>
            <a
              href="https://github.com/vigneshrajsb"
              target={'_blank'}
              rel="noreferrer"
            >
              <div className="social-icon p-6">
                <FaGithub />
              </div>
            </a>
            <a
              href="https://twitter.com/vigneshrajsb"
              target={'_blank'}
              rel="noreferrer"
            >
              <div className="social-icon p-6">
                <FaTwitter />
              </div>
            </a>
            <a href="mailto:vignesh.raj47@gmail.com">
              <div className="social-icon p-6">
                <AiOutlineMail />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
