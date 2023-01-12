import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { AiOutlineClose, AiOutlineMail, AiOutlineMenu } from 'react-icons/ai'
import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import MenuItem from './molecules/MenuItem'

const Navbar = () => {
  const [nav, setNav] = useState(false)
  const [shadow, setShadow] = useState(false)
  const [navBg, setNavBg] = useState('#ecf0f3')

  const handleNav = () => {
    setNav(!nav)
  }

  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 90) setShadow(true)
      else setShadow(false)
    }
    window.addEventListener('scroll', handleShadow)
  }, [])

  return (
    <div
      className={
        shadow
          ? 'fixed w-full h-20 shadow-xl z-[100] bg-[#222]'
          : 'fixed w-full h-20 z-[100] bg-[#222]'
      }
    >
      <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16">
        <Link href="/">
          <Image
            src="/assets/logo.webp"
            alt="logo"
            width="90"
            height="90"
            className="hover:scale-110 ease-in duration-300"
          />
        </Link>
        <div>
          <ul className="hidden md:flex">
            <MenuItem title="Home" href="/#home" />
            <MenuItem title="About" href="/#about" />
            <MenuItem title="Skills" href="/#skills" />
            <MenuItem title="Resume" href="/resume" />
          </ul>
          <div
            className="md:hidden text-[#d4d4d4] rounded-md p-2 hover:ring-white hover:ring-1"
            onClick={handleNav}
          >
            <AiOutlineMenu size={25} />
          </div>
        </div>
      </div>
      {/* menu */}
      <div
        className={
          nav ? 'md:hidden fixed left-0 top-0 w-full h-screen bg-black/70' : ''
        }
        onClick={handleNav}
      >
        <div
          className={
            nav
              ? 'fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-[#222] p-10 ease-in duration-500'
              : 'fixed left-[-100%] top-0 p-10 ease-in duration-500'
          }
        >
          <div>
            <div
              className="flex w-full items-center justify-between"
              onClick={handleNav}
            >
              <Link href="/">
                <Image
                  src="/assets/logo.webp"
                  alt="logo"
                  width="90"
                  height="90"
                  className="hover:scale-110 ease-in duration-300"
                />
              </Link>
              <div
                className="rounded-full shadow-lg shadow-gray-900 text-[#d4d4d4] p-3 cursor-pointer hover:ring-1 hover:ring-white ease-in duration-300 "
                onClick={handleNav}
              >
                <AiOutlineClose />
              </div>
            </div>
            <div className="border-b border-gray-300 my-4">
              {/* TODO */}
              {/* <p className="w-[85%] md:w-[90%] py-4">Building fun software!</p> */}
            </div>
          </div>
          <div className="py-4 flex flex-col">
            <ul className="uppercase">
              <Link href="/#home">
                <li
                  className="py-4 text-sm text-[#d4d4d4] ease-in duration-300 hover:text-[#e06e4d]"
                  onClick={() => setNav(false)}
                >
                  Home
                </li>
              </Link>
              <Link href="/#about">
                <li
                  className="py-4 text-sm  text-[#d4d4d4] ease-in duration-300 hover:text-[#e06e4d]"
                  onClick={() => setNav(false)}
                >
                  About
                </li>
              </Link>
              <Link href="/#skills">
                <li
                  className="py-4 text-sm  text-[#d4d4d4] ease-in duration-300 hover:text-[#e06e4d]"
                  onClick={() => setNav(false)}
                >
                  Skills
                </li>
              </Link>
              {/* <Link href="/">
                <li className="py-4 text-sm">Work</li>
              </Link> */}
              <Link href="/resume">
                <li
                  className="py-4 text-sm  text-[#d4d4d4] ease-in duration-300 hover:text-[#e06e4d]"
                  onClick={() => setNav(false)}
                >
                  Resume
                </li>
              </Link>
            </ul>
            <div className="pt-40">
              <p className="uppercase tracking-widest text-[#e06e4d]">
                Let&apos;s Connect
              </p>
              <div className="flex items-center justify-between my-4 w-full sm:w-[80%]">
                <a
                  href="https://www.linkedin.com/in/vigneshrajsb/"
                  target={'_blank'}
                  rel="noreferrer"
                >
                  <div className="social-icon p-3">
                    <FaLinkedinIn />
                  </div>
                </a>
                <a
                  href="https://github.com/vigneshrajsb"
                  target={'_blank'}
                  rel="noreferrer"
                >
                  <div className="social-icon p-3">
                    <FaGithub />
                  </div>
                </a>
                <a
                  href="https://twitter.com/vigneshrajsb"
                  target={'_blank'}
                  rel="noreferrer"
                >
                  <div className="social-icon p-3">
                    <FaTwitter />
                  </div>
                </a>
                <a href="mailto:vignesh.raj47@gmail.com">
                  <div className="social-icon p-3">
                    <AiOutlineMail />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
