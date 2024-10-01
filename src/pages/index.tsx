import React, { useState, useEffect } from "react";
import LoginButton from "components/common/LoginButton";
import LandingPageCards from "components/LandingPageCards";
import Image from "next/image";

import NavBar from "components/layout/NavBar";

import { checkAuthentication } from 'services/commonService';

export async function getServerSideProps(context) {
  try {
    const { isAuthenticated, spotifyId } = await checkAuthentication(context.req.headers.cookie);

    if (isAuthenticated) {
      return {
        redirect: {
          destination: `/dashboard/${spotifyId}`,
          permanent: false,
        },
      };
    }
  } catch (error) {
    console.error('Authentication check failed', error);
  }

  return { props: {} };
}


const LandingPage = () => {

  const [hoveredCard, setHoveredCard] = useState(0);

  const cardsInfo = [
    // {
    //   src: "/LandingPage/Logo/gear_logo.svg",
    //   title: "Modify",
    //   desc: "Browse your statistics according to your liking",
    //   illuSrc: "/LandingPage/Illustration/Sort.svg",
    //   isHovered: false,
    // },

    {
      src: "/LandingPage/Logo/share_logo.svg",
      title: "Share",
      desc: "Share to the world what music you are into",
      illuSrc: "/LandingPage/Illustration/Share.svg",
      isHovered: false,
    },
    {
      src: "/LandingPage/Logo/compare_logo.svg",
      title: "Compare",
      desc: "Find out similar music you and your friends listen to",
      illuSrc: "/LandingPage/Illustration/Compare.svg",
      isHovered: false,
    },
  ];

  const tailwindForDivs = `flex flex-col pt-20 px-10 sm:px-16 md:px-40 lg:px-56 2xl:px-72`;

  const onMouseOverHandler = (hoveredIndex) => {
    setHoveredCard(hoveredIndex);
  };

  return (
    <div>
      <NavBar />
      <div className="flex flex-col ">
        {/**
         * First
         */}
        <div className={`${tailwindForDivs} bg-theme-black gap-y-4 py-4`}>
          <p className="text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-5xl   ">
            Personal <span className="font- text-theme-green">Spotify </span>
            Stats
          </p>
          <p className="text-slate-400 font-thin text-base sm:text-lg  md:text-xl lg:text-2xl ">
            Explore expressive visualizations of your top artists, songs, and
            genres based from your activities @Spotify.
            <br />
            <br />
            Share with your friends.
          </p>
          <div>
            <LoginButton />
          </div>
        </div>

        <div
          className={`${tailwindForDivs} bg-theme-green lg:pl-64 xl:pl-50 2xl:pl-80 py-10 `}
        >
          <div className="flex flex-col justify-center">
            <p className="font-semibold text-2xl pb-4 sm:pb-6 text-black">
              Discover more about your music taste
            </p>
            <div className="flex xl:flex-row lg:flex-col items-center">
              <div className="flex flex-col justify-between sm:flex-row  items-stretch justify-items-stretch sm:justify-evenly w-full xl:w-1/2 lg:h-1/2 sm:h-full gap-5 2xl:gap-8">
                {cardsInfo.map((card, index) => {
                  return (
                    <LandingPageCards
                      imgSrc={card.src}
                      title={card.title}
                      desc={card.desc}
                      index={index}
                      onMouseOver={onMouseOverHandler}
                      key={index}
                    />
                  );
                })}
              </div>

              <div className="hidden lg:flex justify-center ml-1 xl:w-100 lg:w-1/2">
                <Image
                  src={cardsInfo[hoveredCard].illuSrc}
                  height="500%"
                  width="500%"
                  // layout="fill"
                  alt={cardsInfo[hoveredCard].title}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={`${tailwindForDivs} bg-theme-black justify-center`}>
          <div className="bg-[#374151] p-10 flex flex-row justify-around gap-10 items-center rounded-xl">
            <p className="text-white text-xl font-semibold">
              Ready to start exploring?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
