import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Dashboard from "./dashboard";
import LandingPage from "./LandingPage";
import { useRouter } from "next/router";
import NavBar from "components/NavBar";

const Home = () => {
  const [code_, setCode] = useState<string | undefined>(undefined);
  const router = useRouter();
  useEffect(() => {
    const { code } = router.query;
    setCode(code as string);
  }, [code_, router.query]);

  return (
    <div >
      <Head>
        <title>Vizpotify</title>
      </Head>
      <NavBar />
      {code_ ? <Dashboard code={code_} /> : <LandingPage />}
      <footer>Made by Arian</footer>
    </div>
  );
};

export default Home;
