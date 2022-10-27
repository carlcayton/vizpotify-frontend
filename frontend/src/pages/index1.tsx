import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Dashboard from "./dashboard";
import LandingPage from ".";
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
    // <div>
    //   <Head>
    //     <title>Vizpotify</title>
    //   </Head>
    //   <NavBar />
    //   {code_ ? <Dashboard /> : <LandingPage />}
    //   <footer className="bg-[#111827] p-20">
    //     <p className="text-white">
    //       Made by{" "}
    //       <a
    //         href="https://github.com/carlcayton"
    //         className="underline font-semibold"
    //       >
    //         Arian Cayton
    //       </a>
    //     </p>
    //   </footer>
    // </div>
  );
};

export default Home;
