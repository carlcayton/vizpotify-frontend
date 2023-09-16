import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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
