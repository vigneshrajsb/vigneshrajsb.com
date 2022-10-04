import React from 'react'
import Head from 'next/head'
import { FaGithub, FaLinkedinIn, FaFileDownload, FaShare } from 'react-icons/fa'
import { AiTwotoneMail } from 'react-icons/ai'

const resume = () => {
  return (
    <>
      <Head>
        <title>Vignesh | Resume</title>
        <meta
          name="description"
          content="A software developer specialized in building tools improving developer productivity and test enablement."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-[940px] mx-auto p-2 pt-[120px] bg-gray-800 text-slate-200">
        <div className="flex  justify-between items-center">
          <h2 className="text-center text-[#e06e4d]">Resume</h2>
          <div className="flex px-0">
            <a
              href="https://docs.google.com/document/d/1rFgfrJMLjTbBVSWEGslrAhne5_yQwvwU9A9WrID5Lw0/edit?usp=sharing"
              target="_blank"
              rel="noreferrer"
            >
              <div className="px-2 cursor-pointer hover:scale-110 ease-in duration-300 flex items-center">
                <div className="cursor-pointer px-1 md:px-2 text-xs md:text-base  text-slate-200">
                  {' '}
                  Share{' '}
                </div>
                <FaShare />
              </div>
            </a>
            <a href="assets/vignesh-resume.pdf" download>
              <div className="px-2 cursor-pointer hover:scale-110 ease-in duration-300 flex items-center">
                <div className="cursor-pointer px-1 md:px-2 text-xs md:text-base text-slate-200">
                  Download{' '}
                  <span className="text-xs md:text-sm text-gray-500">
                    (40kb)
                  </span>
                </div>
                <FaFileDownload />
              </div>
            </a>
          </div>
        </div>
        <div className="bg-gray-700 my-2 py-4 px-2 md:px-4 w-full flex justify-between items-center">
          <h2 className="text-xl md:text-3xl">Vigneshraj Sekar Babu</h2>
          <div className="flex">
            <a
              href="https://www.linkedin.com/in/vigneshrajsb/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedinIn size={20} style={{ marginRight: '1rem' }} />
            </a>
            <a
              href="https://github.com/vigneshrajsb"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub size={20} style={{ marginRight: '1rem' }} />
            </a>
            <a href="mailto:vignesh.raj47@gmail.com">
              <AiTwotoneMail size={20} style={{ marginRight: '1rem' }} />
            </a>
          </div>
        </div>
        <div className="text-center py-4 text-xl font-bold uppercase tracking-wider">
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
        <p>
          Motivated and analytical software engineer with 10+ years of
          experience in fast paced challenging environments. Effective and
          proven track record of organizational effectiveness, critical
          thinking, idea generation and optimizing efficiencies.
        </p>

        {/* Skills */}
        <div className="text-center py-4">
          <h5 className="text-center underline text-[18px] py-2">SKILLS</h5>
          <p className="py-2">
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
          <p className="py-2">
            <span className="font-bold">Tools</span>
            <span className="px-2">|</span> Datadog
            <span className="px-2">|</span> Codefresh
            <span className="px-2">|</span> Github
            <span className="px-2">|</span> Jenkins
            <span className="px-2">|</span> AWS Serverless
            <span className="px-2">|</span> AWS API Gateway
          </p>
        </div>

        <h5 className="text-center underline text-[18px] py-4">
          PROFESSIONAL EXPERIENCE
        </h5>
        {/* Experience */}
        <div className="py-6">
          <p className="italic">
            <span className="font-bold">GoodRx</span>
            <span className="px-2">|</span>Los Angeles
          </p>
          <p className="py-1 italic">Sr. SDET (2019 - PRESENT)</p>
          <ul className="list-disc list-outside px-7 py-1 leading-relaxed">
            <li>
              Developed frontend automation tools with Playwright supporting
              NextJS applications and instrument apps(mocking props) for
              integration UI tests.
            </li>
            <li>
              Collaborated with teams to shift left testing by enabling 100%
              developer contributed tests across all test phases enabling faster
              development cycles.
            </li>
            <li>
              Built and optimized CI/CD pipelines to maintain optimal deployment
              cycles from first commit to production under ~40 minutes.
            </li>
            <li>
              Enhanced test reporting with hosted HTML reports, added telemetry
              to test suites to improve test health({'>'}90%) monitoring.
            </li>
            <li>
              Supported squad SDETs to maintain average test runtime under 60
              seconds with telemetry.
            </li>
            <li>
              Packaged Playwright as node module with internal tooling setup out
              of the box to support micro frontend applications with zero to
              minimal effort.
            </li>
            <li>
              Published private node modules for utilities - identify new tests,
              create test data, fetch verification codes from email/sms
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
          <p className="italic">
            <span className="font-bold">Cognizant</span>
            <span className="px-2">|</span>Indianapolis
          </p>
          <p className="py-1 italic">Automation Engineer (2019)</p>
          <ul className="list-disc list-outside px-7 py-1 leading-relaxed">
            <li>
              Created and maintained a scalable test framework for web and API
              automation tests (Java, Selenium, Extent reports).
            </li>
            <li>
              Integrated test executions in CI(Jenkins) with automated
              reporting.
            </li>
            <li>
              Built integrations with JIRA to monitor test cycles with existing
              test plans.
            </li>
            <li>
              Supported multiple frontend and backend teams for automation
              capabilities.
            </li>
          </ul>
        </div>
        {/* Experience */}
        <div className="py-6">
          <p className="italic">
            <span className="font-bold">Tech Mahindra</span>
            <span className="px-2">|</span>St. Louis
          </p>
          <p className="py-1 italic">Software Engineer (2011 – 2019)</p>
          <ul className="list-disc list-outside px-7 py-1 leading-relaxed">
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
              Created Ad-hoc reporting from lubricant sales data and worked with
              DBAs and support teams on application migrations.
            </li>
          </ul>
        </div>
        <h5 className="text-center underline text-[18px] py-4">EDUCATION</h5>
        {/* Experience */}
        <div className="py-4">
          <p>
            <span className="font-bold">Bachelor of Engineering</span>
            <span className="px-2">|</span> 2007 - 2011
            <span className="px-2">|</span> Anna University, Chennai, India
          </p>
        </div>
      </div>
    </>
  )
}

export default resume
