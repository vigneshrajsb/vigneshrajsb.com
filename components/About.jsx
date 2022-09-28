import Image from 'next/image'
import Link from 'next/link'
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
          <h2 className="py-4">Who am I?</h2>
          <p className="py-2 text-gray-600">
            A Software Engineer based in Los Angeles.
          </p>

          <p className="py-2 text-gray-600">
            I started my career in 2011 and have been with GoodRx since 2019. I
            spent a lot of time working on test automation related roles since I
            started my developer journey as an SDET but I&apos;ve evolved into
            more roles and now a polyglot{' '}
            <span className="font-semibold">
              Developer Productivity Engineer
            </span>{' '}
            working on internal tools, test enablement while also learning
            observability, reliability engineering.
          </p>
          <p className="py-2 text-gray-600">
            I like to code tools that help and support engineers, and enjoy
            bringing ideas to life. I take new inspirations and willing to
            follow where they take me everyday. I&apos;m never satisfied with
            just coming up with ideas but also have an impulsive need to act on
            and continue improving them.
          </p>
          <p className="py-2 text-gray-600 font-medium">
            I love to keep learning, continue challenging myself and do
            interesting things that matter.
          </p>
          <p className="py-2 text-gray-600">
            Outside of work I enjoy my runs, spending the weekends at beach and
            sometimes all day in my couch playing games.
          </p>
          <p className="py-2 text-gray-600">
            I also take my responsibility of creating timely memes and slack
            emojis seriously.
          </p>
          <Link href="/#skills">
            <p className="py-2 text-gray-600 underline cursor-pointer">
              See what I can do
            </p>
          </Link>
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
