import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {
  SiNodedotjs,
  SiTypescript,
  SiNextdotjs,
  SiAmazonaws,
  SiGithub,
  SiDatadog,
  SiSwift,
  SiSelenium,
  SiPython,
  SiJenkins,
  SiGraphql,
} from 'react-icons/si'
import { HiChevronDoubleRight } from 'react-icons/hi'
import Skill from './molecules/Skill'

// TODO get high res icons
const Skills = () => {
  return (
    <div id="skills" className="w-full h-screen p-2 bg-[#222] relative">
      <div className="max-w-[1240px] mx-auto flex flex-col justify-center h-full text-[#d4d4d4]">
        <p className="text-xl tracking-widest uppercase text-[#e06e4d] py-2 md:py-4">
          Skills
        </p>
        {/* <h2 className="py-4">What I can do?</h2> */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-8">
          <Skill name="NodeJS" icon={SiNodedotjs} />
          <Skill name="Typescript" icon={SiTypescript} />
          <Skill name="Playwright" image="/assets/skills/playwright.svg" />
          <Skill name="NextJS" icon={SiNextdotjs} />
          <Skill name="AWS" icon={SiAmazonaws} />
          <Skill name="Github" icon={SiGithub} />
          <Skill name="Datadog" icon={SiDatadog} />
          <Skill name="Swift" icon={SiSwift} />
          <Skill name="Selenium" icon={SiSelenium} />
          <Skill name="Python" icon={SiPython} />
          <Skill name="Jenkins" icon={SiJenkins} />
          <Skill name="GraphQL" icon={SiGraphql} />
        </div>
      </div>
      <div className="absolute bottom-0 w-full flex items-center justify-center py-1 md:py-6 col-span-3">
        <Link href="/resume">
          <a>
            <div className="rounded-full shadow-lg shadow-gray-900 p-3 md:p-4 cursor-pointer hover:scale-110 ease-in duration-300 hover:ring-1 hover:ring-white animate-pulse">
              <HiChevronDoubleRight className="text-[#d4d4d4] text-xs md:text-lg" />
            </div>
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Skills
