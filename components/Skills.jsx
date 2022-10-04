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
import Skill from './Skill'

// TODO get high res icons
const Skills = () => {
  return (
    <div id="skills" className="w-full lg:h-screen p-2 bg-[#222]">
      <div className="max-w-[1240px] mx-auto flex flex-col justify-center h-full text-[#d4d4d4]">
        <p className="text-xl tracking-widest uppercase text-[#e06e4d]">
          Skills
        </p>
        <h2 className="py-4">What I can do?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <Skill name="NodeJS" icon={SiNodedotjs} />
          <Skill name="Typescript" icon={SiTypescript} />
          <Skill name="Playwright" image="/assets/skills/playwright.png" />
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
        <div className="pt-8">
          <Link href="/resume">
            <p className="py-2 underline cursor-pointer text-[#d4d4d4]">
              Checkout my resume for more
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Skills
