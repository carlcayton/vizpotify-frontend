import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import ArtistsSelectionList from "./ArtistsSelectionList";
import ArtistDetailsPanel from "./ArtistDetailsPanel";

const UpperSection = () => {
  return (
    <div className="flex flex-row">
      <div>
        <p className="text-white font-bold text-xl">
          Top
          <span className="text-theme-green-1 font-bold text-2xl pl-1">
            Artists
          </span>
        </p>
      </div>
      <div>
        <button className="text-white ">4 weeks</button>
      </div>
    </div>
  );
};

const ShowMoreButton = (showMore, setShowMore) => {
  <button
    className="px-3 pb-1 flex text-white text-sm items-center mt-5 rounded-full ease-in-out hover:translate-y-1 transition-all group border border-white"
    onClick={() =>
      setShowMore((prevState) => ({
        ...prevState,
        isExpanded: !showMore.isExpanded,
        itemsToShow: showMore.totalItems,
      }))
    }
  >
    {showMore.isExpanded ? "Show Less" : "Show More"}
  </button>;
};

const TopArtists = ({ userTopArtists, similarArtists }) => {
  const [selectedArtistIndex, setSelectedArtistIndex] = useState<string>(
    userTopArtists[0].id
  );
  const [showMore, setShowMore] = useState({
    isExpanded: false,
    itemsToShow: 5,
    totalItems: userTopArtists.length,
  });
  const isMobile = useMediaQuery({ query: `(max-width:640px)` });

  const classForBaseScreen = "";

  return (
    <div className="flex flex-col justify-center items-center space-y-10 bg-[#111827] w-full">
      <UpperSection />
      <div className="flex flex-row justify-center bg-[#111827] space-x-1">
        <ArtistsSelectionList
          userTopArtists={userTopArtists}
          selectedArtistIndex={selectedArtistIndex}
          setSelectedArtistIndex={setSelectedArtistIndex}
          showMore={showMore}
        />
        <div className="hidden sm:flex flex-col bg-[#1B2539] rounded-lg mr-4 ">
          {!isMobile
            ? userTopArtists.map((artist, index) => {
                return (
                  <ArtistDetailsPanel
                    artistInfo={artist}
                    similarArtists={similarArtists[artist.id]}
                    selectedArtistIndex={selectedArtistIndex}
                    key={artist.id}
                  />
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default TopArtists;
