import React from 'react'
import Head from 'next/head'
import { FaGithub, FaLinkedinIn, FaFileDownload, FaShare } from 'react-icons/fa'

const resume = () => {
  return (
    <>
      <Head>
        <title>Vignesh | Resume</title>
        <meta
          name="description"
          content="A software developer specialized in building tools improving developer productivity and test enablement."
        />
        <link rel="icon" href="/fav.png" />
      </Head>

      <div className="max-w-[940px] mx-auto p-2 pt-[120px]">
        <div className="flex  justify-between items-center">
          <h2 className="text-center text-[#e06e4d]">Resume</h2>
          <div className="flex px-0">
            <a
              href="https://docs.google.com/document/d/1rFgfrJMLjTbBVSWEGslrAhne5_yQwvwU9A9WrID5Lw0/edit?usp=sharing"
              target="_blank"
              rel="noreferrer"
            >
              <div className=" py-6 px-2 cursor-pointer hover:scale-110 ease-in duration-300 flex">
                <div className="cursor-pointer px-2 text-lg"> Share </div>
                <FaShare size={25} />
              </div>
            </a>
            <a href="assets/vignesh-resume.pdf" download>
              <div className=" py-6 px-2 cursor-pointer hover:scale-110 ease-in duration-300 flex">
                <div className="cursor-pointer px-2 text-lg">
                  Download (40kb)
                </div>
                <FaFileDownload size={25} />
              </div>
            </a>
          </div>
        </div>
        <div className="bg-[#d0d4d6] my-4 p-4 w-full flex justify-between items-center">
          <h2 className="text-center">Vigneshraj Sekar Babu</h2>
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
          </div>
        </div>
        <div className="text-center py-4 text-xl font-bold uppercase tracking-wider">
          <div className="hidden sm:block">
            <p>
              Developer Productivity <span className="px-1">|</span> Test
              Enablement <span className="px-1">|</span> Problem Solving
            </p>
          </div>
          <div className="block sm:hidden">
            <p>Developer Productivity</p>
            <p className="py-2">Test Enablement</p>
            <p>Problem Solving</p>
          </div>
        </div>
        <p>
          Motivated and analytical software engineer with organization
          effectiveness in fast paced challenging environments. Effective and
          proven track record of critical thinking, idea generation, and
          optimizing efficiencies.
        </p>

        {/* Skills */}
        <div className="text-center py-4">
          <h5 className="text-center underline text-[18px] py-2">Skills</h5>
          <p className="py-2">
            <span className="font-bold">Technical Skills</span>
            <span className="px-2">|</span>Developer Productivity
            <span className="px-2">|</span> NodeJS{' '}
            <span className="px-2">|</span>
            Playwright <span className="px-2">|</span>NextJS
            <span className="px-2">|</span>Selenium
            <span className="px-2">|</span> Swift
            <span className="px-2">|</span> AWS
            <span className="px-2">|</span> Python
            <span className="px-2">|</span> GoLang
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
          Professional Experience
        </h5>
        {/* Experience */}
        <div className="py-6">
          <p className="italic">
            <span className="font-bold italic">GoodRx</span>
            <span className="px-2">|</span>Los Angeles
          </p>
          <p className="py-1 italic">Sr. SDET (2019 - Current)</p>
          <ul className="list-disc list-outside px-7 py-1 leading-relaxed">
            <li>
              Develop frontend automation tools with Playwright supporting
              NextJS applications and instrument apps(mocking props) for
              integration UI tests.
            </li>
            <li>
              Create capabilities for teams across org to setup shift left
              strategy enabling dev contributed tests across all test components
              (UI/unit/backend/performance).
            </li>
            <li>
              Build and troubleshoot CI/CD pipelines to maintain optimal time to
              production cycles.
            </li>
            <li>
              Enhanced test reporting with hosted HTML reports, added telemetry
              to test suites for test health monitoring.
            </li>
            <li>
              Publish private node modules for testing utilities - identify new
              tests, create test data, utility to fetch verification codes from
              email/sms.
            </li>
            <li>
              Developed chrome extension to support account functions in testing
              envs.
            </li>
            <li>
              Create and publish GoLang CLI with supporting AWS Lambda
              functions.
            </li>
            <li>
              Build, maintain and support test automation framework with Python,
              Behave(BDD), Selenium/Appium, RestAPI & Jenkins.
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
              Create and maintain a scalable test framework for web and API
              automation tests (Java, Selenium, Extent reports).
            </li>
            <li>Integrate test runs in Jenkins with automated reporting.</li>
            <li>
              Build integrations with JIRA to monitor test cycles with existing
              test plans.
            </li>
            <li>
              Support multiple frontend and backend teams for automation
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
              Develop test automation solution with Java, Selenium for CMS
              application.
            </li>
            <li>
              Prepare test plans and scenarios for EXACT applications for
              Telecom domain.
            </li>
            <li>
              Support and developer Dot Net applications mitigating from legacy
              ASP applications.
            </li>
            <li>
              Create Ad-hoc reporting from lubricant sales data and work with
              DBAs and support teams on app migrations.
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default resume
