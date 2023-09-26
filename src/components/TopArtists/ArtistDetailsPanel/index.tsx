import Image from "next/image";
import { useState, useContext, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { SelectedArtistContext, SelectedArtistDispatchContext } from "contexts/SelectedArtistContext";
import { useIsMobile } from "utils/detectScreenSize"

const SectionTitle = ({ sectionName }) => {
  return <p className="text-white font-bold text-xl w-full">{sectionName}</p>;
};

const ArtistGenresSection = ({ genres }) => {
  return (
    <div className="flex flex-col align-left space-y-2 w-full">
      <SectionTitle sectionName="Genres" />
      <div className="flex flex-row flex-wrap  gap-2">
        {genres.map((genre, index) => {
          return (
            <div
              className="bg-[#484E5B] rounded-full border  px-2 pb-1.5 text-white font-bold"
              key={index}
            >
              {genre}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ArtistFollowersSection = ({ followers }) => {
  return (
    <div className="flex flex-col align-left space-y-2">
      <SectionTitle sectionName="Followers" />
      <p className="text-white">{followers}</p>
    </div>
  );
};

const ArtistPopularitySection = ({ popularity }) => {
  return (
    <div className="flex flex-col align-left space-y-2 pr-12 w-full">
      <SectionTitle sectionName="Popularity" />
      <div className=" bg-[#5F646F] rounded-full h-2 dark:bg-bg-gray-700">
        <div
          className={`bg-theme-green-1 h-2 rounded-full`}
          style={{ width: `${popularity}%` }}
        ></div>
      </div>
    </div>
  );
};

const SimilarArtistCard = ({ artist }) => {
  return (
    <div className={`flex relative overflow-hidden hover:scale-110`}>
      <Image
        src={artist.image}
        alt={artist.name}
        className="rounded-lg "
        width={150}
        height={150}
      // layout="fill"
      // style={{width:"100%"}}
      />
      <div className="flex rounded-b-lg bottom-0 absolute w-full bg-[#111827] opacity-60 ">
        <span
          className="text-white grow p-1"
        // style={{ fontSizeAdjust: "inherit" }}
        >
          {artist.name}
        </span>
      </div>
    </div>
  );
};

const SimilarArtistSection = ({ similarArtists }) => {
  return (
    <div className="flex flex-col align-left space-y-2 grow gap-2">
      <SectionTitle sectionName="Similar Artists" />
      <div className="flex flex-row flex-wrap   gap-2">
        {similarArtists.map((artist, index) => {
          return <SimilarArtistCard artist={artist} key={artist.id} />;
        })}
      </div>
    </div>
  );
};

const ArtistDetailsPanel = () => {
  const selectedArtist = useContext(SelectedArtistContext)
  const artist = selectedArtist
  const isMobile = useIsMobile();
  const classForSMScreen = isMobile ? `border ` : `sticky pr-20 `;
  console.log(isMobile)
  return (
    <div className="flex flex-col w-full">
      {selectedArtist ? (<div
        // className={`${classForBaseScreen} ${classForSMScreen} flex-col  rounded-lg p-5 space-y-4 bg-[#1B2539]  mr-4 h-1/2 sticky top-0`}
        className={` ${classForSMScreen} 
        flex-col rounded-lg p-5 space-y-4  mr-4 h-1/2 top-0 w-full bg-[#1B2539]`} // added max-w-xl for a max width
      >
        <ArtistGenresSection genres={artist.genres} />
        <ArtistFollowersSection followers={artist.followers} />
        <ArtistPopularitySection popularity={artist.popularity} />
        {/* <SimilarArtistSection similarArtists={similarArtists.slice(0, 6)} /> */}
      </div>) : null}
    </div>
  );
};

export default ArtistDetailsPanel;
