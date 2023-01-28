import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import ArtistsSelectionList from "./ArtistsSelectionList";
import ArtistDetailsPanel from "./ArtistDetailsPanel";

const UpperSection = () => {
  return (
    <div className="flex flex-row sticky top-0">
      <div className="">
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

const ShowMoreButton = ({ showMore, setShowMore }) => {
  const handleShowMore = () => {
    setShowMore((prevState) => ({
      isExpanded: !showMore.isExpanded,
      itemsToShow: !showMore.isExpanded ? showMore.totalItems : 4,
      totalItems: showMore.totalItems,
    }));
  };
  return (
    <button
      className="px-3 pb-1 flex text-white text-sm items-center mt-5 rounded-full ease-in-out hover:translate-y-1 transition-all group border border-white"
      onClick={handleShowMore}
    >
      {showMore.isExpanded ? "Show Less" : "Show More"}
    </button>
  );
};

const TopArtists = ({ userTopArtists, similarArtists }) => {
  const [selectedArtistIndex, setSelectedArtistIndex] = useState<string>(
    userTopArtists[0].id
  );
  const [showMore, setShowMore] = useState({
    isExpanded: false,
    itemsToShow: 4,
    totalItems: userTopArtists.length,
  });
  const isMobile = useMediaQuery({ query: `(max-width:640px)` });
  const modalIsOpen = isMobile && false;
  const classForBaseScreen = "";
  // if (isMobile) {
  //   setSelectedArtistIndex("");
  // }
  // useEffect(() => {
  //   if (isMobile) {
  //     console.log("hotdog");
  //   }
  // });

  return (
    <div className="flex flex-col  justify-center items-center space-y-10 bg-[#111827] w-full p-10 ">
      <UpperSection />
      <div className="flex flex-row justify-center  bg-[#111827] space-x-1 ">
        <ArtistsSelectionList
          userTopArtists={userTopArtists}
          selectedArtistIndex={selectedArtistIndex}
          setSelectedArtistIndex={setSelectedArtistIndex}
          showMore={showMore}
        />
        <div>
          {userTopArtists.map((artist, index) => {
            return (
              // <div key={artist.id}>dog</div>
              <ArtistDetailsPanel
                artistInfo={artist}
                similarArtists={similarArtists[artist.id]}
                selectedArtistIndex={selectedArtistIndex}
                key={artist.id}
              />
            );
          })}
        </div>
      </div>

      <ShowMoreButton showMore={showMore} setShowMore={setShowMore} />
    </div>
  );
};

export default TopArtists;
