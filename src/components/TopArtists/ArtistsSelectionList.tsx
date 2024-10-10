// ArtistsSelectionList.tsx
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { useIsMobile } from "utils/detectScreenSize";
import ArtistDetailsPanel from "./ArtistDetailsPanel";

import { Artist, ArtistCardProps, ArtistsSelectionListProps } from './TopArtists.types';

const ArtistCard: React.FC<ArtistCardProps> = ({ artist, rank, isSelected, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isSelected && cardRef.current) {
      cardRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [isSelected]);

  const handleClick = () => {
    onSelect(isSelected ? null : artist);
  };

  return (
    <div className="w-full" ref={cardRef}>
      <button
        className={`flex flex-row gap-8 ${isSelected ? "bg-[#374151] cursor-default" : "bg-transparent"} hover:bg-[#374151] rounded-lg items-center p-2 space-x-2 w-full`}
        onClick={handleClick}
      >
        <p className="text-white font-bold text-base w-8">{rank}</p>
        <div className="w-16 h-16 sm:w-24 sm:h-24 flex-shrink-0">
          <Image
            src={artist.imageUrl}
            alt={`${artist.name}`}
            width={96}
            height={96}
            className="rounded-lg"
          />
        </div>
        <p className={`font-bold ${isSelected ? "text-theme-green-1" : "text-white"} text-sm sm:text-base md:text-lg whitespace-nowrap truncate`}>
          {artist.name}
        </p>
        {isMobile && (
          <span className="text-white text-xl font-bold justify-self-end">
            {isSelected ? '-' : '+'}
          </span>
        )}
      </button>
      {isMobile && isSelected && (
        <div className="w-full animated-collapse-2">
          <ArtistDetailsPanel artist={artist} />
        </div>
      )}
    </div>
  );
};

const ArtistsSelectionList: React.FC<ArtistsSelectionListProps> = ({ userTopArtists, showMore, selectedArtist, setSelectedArtist }) => {
  if (!userTopArtists) return null;

  return (
    <div className="flex flex-row flex-wrap px-5 sm:flex-col grow items-left gap-2 w-full">
      {userTopArtists
        .slice(0, showMore.itemsToShow)
        .map((artist, index) => (
          <ArtistCard
            key={artist.id}
            artist={artist}
            rank={index + 1}
            isSelected={selectedArtist?.id === artist.id}
            onSelect={setSelectedArtist}
          />
        ))}
    </div>
  );
};

export default ArtistsSelectionList;