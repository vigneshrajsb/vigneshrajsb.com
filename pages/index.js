import Head from "next/head";
import About from "../components/About";
import { Main } from "../components/Main";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Vignesh | Sofware Engineer</title>
        <meta name="description" content="vigneshrajsb, a software engineer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Main />
      <About />
    </div>
  );
}
