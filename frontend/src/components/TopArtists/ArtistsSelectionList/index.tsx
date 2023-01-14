import Image from "next/image";
import { useState } from "react";

type ArtistCardProps = {
  artistName: string;
  artistImage: string;
  artistRank: number;
  artistId: string;
  selectedArtistIndex: string;

  setSelectedArtistIndex: (val: string) => void;
};

const ArtistCard = ({
  artistName,
  artistImage,
  artistRank,
  artistId,
  selectedArtistIndex,
  setSelectedArtistIndex,
}: ArtistCardProps) => {
  const isActive = selectedArtistIndex === artistId;
  const classForBaseScreenButton = "flex-col flex-1 basis-[40%] space-y-2";
  const classForSMSizeScreenButton = "sm:flex-row sm:gap-10 sm:basis-0  ";
  return (
    <button
      className={`flex ${classForBaseScreenButton} ${classForSMSizeScreenButton} bg-[#192132] ${
        isActive ? "bg-[#374151] cursor-default" : "bg-transparent"
      } hover:bg-[#374151] rounded-lg items-center p-2  sm:border-opacity-0`}
      onClick={() => setSelectedArtistIndex(artistId)}
    >
      <p className="text-white font-bold text-bas ">#{artistRank}</p>
      <div className="rounded-full w-28 md:w-31 lg:40 sm:w-20 min-w-max">
        <Image
          // loader={() => artistImage}
          src={artistImage}
          height="100%"
          width="100%"
          layout="responsive"
          className="rounded-full"
          objectFit="cover"
          alt={`${artistName}`}
        />
      </div>
      <p
        className={`${
          isActive ? "text-theme-green-1" : "text-white"
        } font-bold text-2xl sm:text-left `}
      >
        {artistName}
      </p>
    </button>
  );
};

const ArtistsSelectionList = ({
  userTopArtists,
  selectedArtistIndex,
  setSelectedArtistIndex,
  showMore,
}) => {
  const classForBaseScreen = "flex-row   px-5";
  const classForSMScreen = "sm:flex-col grow";

  return (
    <div
      className={`flex ${classForBaseScreen} ${classForSMScreen} items-left gap-2 overflow-y-auto max-h-[42em] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-900`}
    >
      {userTopArtists
        .slice(0, showMore.itemsToShow)
        .map((artist: any, index: number) => {
          return (
            <ArtistCard
              artistName={artist.name}
              artistImage={artist.images.at(-1).url}
              artistRank={index + 1}
              artistId={artist.id}
              selectedArtistIndex={selectedArtistIndex}
              setSelectedArtistIndex={setSelectedArtistIndex}
              key={artist.id}
            />
          );
        })}
    </div>
  );
};

export default ArtistsSelectionList;
