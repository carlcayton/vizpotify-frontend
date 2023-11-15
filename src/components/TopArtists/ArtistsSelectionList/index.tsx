import Image from "next/image";
import { useState, useContext, useEffect } from "react";
import { SelectedArtistContext, SelectedArtistDispatchContext } from "contexts/SelectedArtistContext";
import { useIsMobile } from "utils/detectScreenSize"
import ArtistDetailsPanel from "components/TopArtists/ArtistDetailsPanel";


const ArtistCard = ({ artist, rank, selectedArtist, setSelectedArtist }) => {
  let isActive = false
  if (selectedArtist === null && rank === 1) {
    isActive = true
  } else if (artist === selectedArtist) {
    isActive = true
  }
  const isMobile = useIsMobile();
  // const classForBaseScreenButton = "flex-col flex-1 basis-[40%] space-y-2";
  const classForSMSizeScreenButton = "sm:flex-row sm:gap-10 sm:basis-0  ";
  return (
    <div className="w-full">
      <button
        className={`flex gap-8 bg-[#192132] ${isActive ? "bg-[#374151] cursor-default" : "bg-transparent"
          } hover:bg-[#374151] rounded-lg items-center p-2  sm:border-opacity-0 space-x-2 w-full`}
        onClick={() => setSelectedArtist(artist)}
      >
        <p className="text-white font-bold text-bas">{rank}</p>
        <div className="w-20">
          <Image
            src={artist.imageUrl}
            height="100%"
            width="100%"
            layout="responsive"
            objectFit="cover"
            alt={`${artist.name}`}
            className="rounded-lg"
          />
        </div>
        <p
          className={`${isActive ? "text-theme-green-1" : "text-white"
            } font-bold text-xl sm:text-left whitespace-nowrap`}
        >
          {artist.name}
        </p>
      </button>
      {isMobile && isActive && <ArtistDetailsPanel artist={artist} />}
    </div>
  );
};

const ArtistsSelectionList = ({
  userTopArtists,
  showMore,
}) => {

  const selectedArtist = useContext(SelectedArtistContext);
  const setSelectedArtist = useContext(SelectedArtistDispatchContext);
  // console.log(userTopArtists)
  const isMobile = useIsMobile()
  useEffect(() => {
    if (userTopArtists && userTopArtists.length > 0) {
      setSelectedArtist(userTopArtists[0]);
    }
  }, [userTopArtists, setSelectedArtist]);

  // useEffect(() => {
  //   if (isMobile) {
  //     setSelectedArtist("")
  //   }
  // }, [isMobile, setSelectedArtist])

  const classForBaseScreen = "flex-row flex-wrap  px-5";
  const classForSMScreen = "sm:flex-col grow";

  return (
    <div
      className={`flex ${classForBaseScreen} ${classForSMScreen} items-left gap-2 w-full `}
    >
      {userTopArtists ? (
        userTopArtists
          .slice(0, showMore.itemsToShow)
          .map((artist: any, index: number) => {
            return (
              <ArtistCard
                artist={artist}
                rank={index + 1}
                selectedArtist={selectedArtist}
                setSelectedArtist={setSelectedArtist}
                key={artist.id}
              />
            );
          })
      ) : (
        <div />
      )}
    </div>
  );
};

export default ArtistsSelectionList;
