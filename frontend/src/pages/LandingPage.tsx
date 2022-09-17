import React, { useState } from "react";
import LoginButton from "components/LoginButton";
import LandingPageCards from "components/LandingPageCards";
import Image from "next/image";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=19677842c1504c3c831f448b3e0691c8&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

const LandingPage = () => {
  const [hoveredCard, setHoveredCard] = useState(0);
  const cardsInfo = [
    {
      src: "/LandingPage/Logo/gear_logo.svg",
      title: "Modify",
      desc: "Browse your statistics according to your liking",
      illuSrc: "/LandingPage/Illustration/Sort.svg",
      isHovered: false,
    },

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
      desc: "Find out similar music you and your friends listen to and learn about artists you both like",
      illuSrc: "/LandingPage/Illustration/Compare.svg",
      isHovered: false,
    },
  ];

  const onMouseOverHandler = (hoveredIndex) => {
    setHoveredCard(hoveredIndex);
  };

  return (
    <div className="flex flex-col">
      {/**
       * First
       */}
      <div className="flex flex-col bg-theme-black pt-20 px-10  sm:px-16 md:px-40 lg:px-56 2xl:px-80 gap-y-4">
        <p className="text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-5xl px-10  ">
          Personal <span className="font- text-theme-green">Spotify </span>
          Stats
        </p>
        <p className="text-slate-400 font-thin px-10 text-base sm:text-lg  md:text-xl lg:text-2xl ">
          Explore expressive visualizations of your top artists, songs, and
          genres based from your activities @Spotify.
          <br />
          <br />
          Share with your friends.
        </p>
        <div className="flex px-10">
          <LoginButton authUrl={AUTH_URL} />
        </div>
      </div>

      {/**
       * Second
       */}
      <div className="flex bg-theme-green lg:px-[350px]">
        <div className="flex flex-row">
          <div className="flex flex-col w-1/2">
            <p>Discover more about your music taste</p>
            <div className="flex flex-row gap-10">
              {cardsInfo.map((card, index) => {
                return (
                  <div key={index}>
                    <LandingPageCards
                      imgSrc={card.src}
                      title={card.title}
                      desc={card.desc}
                      // setIsHovered={card.isHovered}
                      index={index}
                      onMouseOver={onMouseOverHandler}
                    />
                    {card.isHovered ? setHoveredCard(index) : ""}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex w-1/2 relative">
            <Image
              className=""
              src={cardsInfo[hoveredCard].illuSrc}
              layout="fill"

              alt="Sorting Illustration"
            />
          </div>
        </div>
      </div>
      {/**
       * Third
       */}
      <div className="flex bg-theme-black">
        <div>
          <p className="text-white">Ready to start exploring?</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
