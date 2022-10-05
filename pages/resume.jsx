import React from 'react'
import Head from 'next/head'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { AiTwotoneMail } from 'react-icons/ai'
import Employment from '../components/molecules/Employment'

const resume = () => {
  return (
    <>
      <Head>
        <title>Vignesh | Resume</title>
        <meta
          name="description"
          content="A software developer specialized in building tools improving developer productivity and test enablement."
        />
        <meta name="theme-color" content="#222" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-[#222]">
        <div className="max-w-[940px] mx-auto p-2 pt-[120px] bg-[#222] text-[#d4d4d4]">
          <div className="flex  justify-between items-center">
            <h2 className="text-center text-[#e06e4d]">RESUME</h2>
            <div className="flex px-0">
              <a
                href="https://docs.google.com/document/d/1rFgfrJMLjTbBVSWEGslrAhne5_yQwvwU9A9WrID5Lw0/edit?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="px-1"
              >
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    data-tooltip-target="tooltip-top"
                    data-tooltip-placement="top"
                    className=" px-1 md:px-3 py-2 bg-[#222] text-[#e06e4d] font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-[#d4d4d4] hover:text-[#222] ring-1 ring-[#e06e4d] hover:ring-[#222] hover:shadow-lg  transition duration-150 ease-in-out"
                  >
                    Share
                  </button>
                </div>
              </a>

              <a href="assets/vignesh-resume.pdf" className="px-1" download>
                <div className="flex space-x-2 justify-center">
                  <button
                    type="button"
                    className=" px-1 md:px-3   py-2 bg-[#222] text-[#e06e4d] font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-[#d4d4d4] hover:text-[#222] ring-1 ring-[#e06e4d] hover:ring-[#222] hover:shadow-lg  transition duration-150 ease-in-out"
                  >
                    Download
                  </button>
                </div>
              </a>
            </div>
          </div>
          <hr className="mb-6 mt-1 border-[#222] sm:mx-auto" />
          <div className="my-2 py-4 px-2 md:px-4 w-full flex justify-between items-center ring-1 ring-[#d4d4d4]">
            <h2 className="text-xl md:text-3xl uppercase">
              Vigneshraj Sekar Babu
            </h2>
            <div className="flex px-1">
              <a
                href="https://www.linkedin.com/in/vigneshrajsb/"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-md hover:scale-100 ease-in duration-300 hover:ring-1 hover:ring-white"
              >
                <FaLinkedinIn size={20} />
              </a>
              <a
                href="https://github.com/vigneshrajsb"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-md hover:scale-100 ease-in duration-300 hover:ring-1 hover:ring-white"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="mailto:vignesh.raj47@gmail.com"
                className="p-2 rounded-md hover:scale-100 ease-in duration-300 hover:ring-1 hover:ring-white"
              >
                <AiTwotoneMail size={20} />
              </a>
            </div>
          </div>
          <div className="text-center py-4 text-xl font-medium uppercase tracking-wider">
            <div className="hidden sm:block">
              <p>
                Developer Productivity <span className="px-1">|</span> Test
                Enablement <span className="px-1">|</span> Problem Solving
              </p>
            </div>
            <div className="block sm:hidden text-base md:text-lg">
              <p>Developer Productivity</p>
              <p className="py-2">Test Enablement</p>
              <p>Problem Solving</p>
            </div>
          </div>
          <p className="font-light text-sm md:text-base">
            Motivated and analytical software engineer with 10+ years of
            experience in fast paced challenging environments. Effective and
            proven track record of organizational effectiveness, critical
            thinking, idea generation and optimizing efficiencies.
          </p>

          {/* Skills */}
          <div className="text-center py-4">
            <h5 className="text-center underline text-[18px] py-2">SKILLS</h5>
            <p className="py-2  font-light">
              <span className="font-bold">Technical Skills</span>
              <span className="px-2">|</span>Developer Productivity Engineering
              <span className="px-2">|</span> NodeJS
              <span className="px-2">|</span> Typescript
              <span className="px-2">|</span> Python
              <span className="px-2">|</span> GoLang
              <span className="px-2">|</span> Playwright
              <span className="px-2">|</span> NextJS
              <span className="px-2">|</span> Selenium
              <span className="px-2">|</span> Swift - XCUI Tests
            </p>
            <p className="py-2  font-light">
              <span className="font-bold">Tools</span>
              <span className="px-2">|</span> Datadog
              <span className="px-2">|</span> Codefresh
              <span className="px-2">|</span> Github
              <span className="px-2">|</span> AWS Serverless
              <span className="px-2">|</span> AWS API Gateway
              <span className="px-2">|</span> Jenkins
            </p>
          </div>

          <h5 className="text-center underline text-[18px] py-4">
            PROFESSIONAL EXPERIENCE
          </h5>
          {/* Experience */}
          <div className="py-6">
            <Employment
              employer="GoodRx"
              title="Sr. SDET"
              duration="2019 - PRESENT"
              location="Los Angeles"
            />

            <ul className="list-disc list-outside px-7 py-1 leading-relaxed font-light text-sm md:text-base">
              <li>
                Developed frontend automation tools with Playwright supporting
                NextJS applications and instrument apps(mocking props) for
                integration UI tests.
              </li>
              <li>
                Collaborated with teams to shift left testing by enabling 100%
                developer contributed tests across all test phases enabling
                faster development cycles.
              </li>
              <li>
                Built and optimized CI/CD pipelines to maintain optimal
                deployment cycles from first commit to production under ~40
                minutes.
              </li>
              <li>
                Enhanced test reporting with hosted HTML reports, added
                telemetry to test suites to improve test health({'>'}90%)
                monitoring.
              </li>
              <li>
                Supported squad SDETs to maintain average test runtime under 60
                seconds with telemetry.
              </li>
              <li>
                Packaged Playwright as node module with internal tooling setup
                out of the box to support micro frontend applications with zero
                to minimal effort.
              </li>
              <li>
                Published private node modules for utilities - identify new
                tests, create test data, fetch verification codes from email/sms
                accounts.
              </li>
              <li>
                Developed chrome extension to support validation across account
                based functionalities.
              </li>
              <li>
                Created and published GoLang CLI with supporting APIs and lambda
                functions saving 200%+ time for test data creation.
              </li>
              <li>
                Built and maintained test automation framework with Python,
                Behave(BDD), Selenium/Appium, RestAPI & Jenkins and with XCUI
                tests for iOS native application.
              </li>
            </ul>
          </div>
          {/* Experience */}
          <div className="py-6">
            <Employment
              employer="Cognizant"
              title="Automation Engineer"
              duration="2019 - 2019"
              location="Indianapolis"
            />
            <ul className="list-disc list-outside px-7 py-1 leading-relaxed font-light text-sm md:text-base">
              <li>
                Created and maintained a scalable test framework for web and API
                automation tests (Java, Selenium, Extent reports).
              </li>
              <li>
                Integrated test executions in CI(Jenkins) with automated
                reporting.
              </li>
              <li>
                Built integrations with JIRA to monitor test cycles with
                existing test plans.
              </li>
              <li>
                Supported multiple frontend and backend teams for automation
                capabilities.
              </li>
            </ul>
          </div>
          {/* Experience */}
          <div className="py-6">
            <Employment
              employer="Tech Mahindra"
              title="Software Engineer  "
              duration="2011 - 2019"
              location="St Louis"
            />
            <ul className="list-disc list-outside px-7 py-1 leading-relaxed font-light text-sm md:text-base">
              <li>
                Developed test automation solution with Java, Selenium for CMS
                application.
              </li>
              <li>
                Prepared test plans and scenarios for EXACT applications for
                Telecom domain.
              </li>
              <li>
                Supported and developed Dot Net applications mitigating from
                legacy ASP applications.
              </li>
              <li>
                Created Ad-hoc reporting from lubricant sales data and worked
                with DBAs and support teams on application migrations.
              </li>
            </ul>
          </div>
          <h5 className="text-center underline text-[18px] py-4">EDUCATION</h5>
          {/* Experience */}
          <div className="py-4">
            <p className=" font-light">
              <span className="font-bold">Bachelor of Engineering</span>
              <span className="px-2">|</span> 2007 - 2011
              <span className="px-2">|</span> Anna University, Chennai, India
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default resume
