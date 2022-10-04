import Head from 'next/head'
import About from '../components/About'
import Footer from '../components/Footer'
import { Main } from '../components/Main'
import Navbar from '../components/Navbar'
import Skills from '../components/Skills'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Vignesh | Sofware Engineer</title>
        <meta name="description" content="vigneshrajsb, a software engineer" />
        <meta name="theme-color" content="#1F2937" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Main />
      <About />
      <Skills />
    </div>
  )
}
