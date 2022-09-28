import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

// TODO get high res icons
const Skills = () => {
  return (
    <div id="skills" className="w-full lg:h-screen p-2">
      <div className="max-w-[1240px] mx-auto flex flex-col justify-center h-full">
        <p className="text-xl tracking-widest uppercase text-[#e06e4d]">
          Skills
        </p>
        <h2 className="py-4">What I can do?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
            <div className="grid grid-cols-2 gap-4 justify-center items-center">
              <div className="m-auto">
                <Image
                  src="/assets/skills/nodejs.png"
                  width="64px"
                  height="64px"
                  alt="/"
                ></Image>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h3>NodeJS</h3>
                {/* <p className="text-sm text-gray-500 italic">(everyday)</p> */}
              </div>
            </div>
          </div>
          <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
            <div className="grid grid-cols-2 gap-4 justify-center items-center">
              <div className="m-auto">
                <Image
                  src="/assets/skills/playwright.png"
                  width="64px"
                  height="64px"
                  alt="/"
                ></Image>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h3>Playwright</h3>
                {/* <p className="text-sm text-gray-500 italic">(everyday)</p> */}
              </div>
            </div>
          </div>
          <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
            <div className="grid grid-cols-2 gap-4 justify-center items-center">
              <div className="m-auto">
                <Image
                  src="/assets/skills/nextjs.png"
                  width="64px"
                  height="64px"
                  alt="/"
                ></Image>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h3>Next.js</h3>
                {/* <p className="text-sm text-gray-500 italic">(everyday)</p> */}
              </div>
            </div>
          </div>
          <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
            <div className="grid grid-cols-2 gap-4 justify-center items-center">
              <div className="m-auto">
                <Image
                  src="/assets/skills/aws.png"
                  width="64px"
                  height="64px"
                  alt="/"
                ></Image>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h3>AWS</h3>
              </div>
            </div>
          </div>
          <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
            <div className="grid grid-cols-2 gap-4 justify-center items-center">
              <div className="m-auto">
                <Image
                  src="/assets/skills/github.png"
                  width="64px"
                  height="64px"
                  alt="/"
                ></Image>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h3>Github</h3>
                {/* <p className="text-sm text-gray-500">everyday</p> */}
              </div>
            </div>
          </div>
          <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
            <div className="grid grid-cols-2 gap-4 justify-center items-center">
              <div className="m-auto">
                <Image
                  src="/assets/skills/datadog.png"
                  width="64px"
                  height="64px"
                  alt="/"
                ></Image>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h3>Datadog</h3>
                {/* <p className="text-sm text-gray-500">past</p> */}
              </div>
            </div>
          </div>
          <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
            <div className="grid grid-cols-2 gap-4 justify-center items-center">
              <div className="m-auto">
                <Image
                  src="/assets/skills/swift.png"
                  width="64px"
                  height="64px"
                  alt="/"
                ></Image>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h3>Swift</h3>
                {/* <p className="text-sm text-gray-500">past</p> */}
              </div>
            </div>
          </div>
          <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
            <div className="grid grid-cols-2 gap-4 justify-center items-center">
              <div className="m-auto">
                <Image
                  src="/assets/skills/selenium.png"
                  width="64px"
                  height="64px"
                  alt="/"
                ></Image>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h3>Selenium</h3>
                {/* <p className="text-sm text-gray-500">past</p> */}
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8">
          <Link href="/resume">
            <p className="py-2 text-gray-600 underline cursor-pointer">
              Checkout my resume for more
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Skills
