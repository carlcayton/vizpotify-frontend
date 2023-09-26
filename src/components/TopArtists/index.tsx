import { useEffect, useState, useContext, createContext } from "react";
import { useMediaQuery } from "react-responsive";
import { SelectedArtistContext, SelectedArtistDispatchContext, SelectedArtistProvider } from "contexts/SelectedArtistContext";

import ArtistsSelectionList from "./ArtistsSelectionList";
import ArtistDetailsPanel from "./ArtistDetailsPanel";

const UpperSection = ({ setSelectedTimeRange }) => {
  return (
    <div className="flex flex-row top-0">
      <div className="">
        <p className="text-white font-bold text-xl">
          Top
          <span className="text-theme-green-1 font-bold text-2xl pl-1">
            Artists
          </span>
        </p>
      </div>
      <div>
        <button className="text-white" onClick={() => setSelectedTimeRange("shortTerm")}>
          4 weeks
        </button>
        <button className="text-white" onClick={() => setSelectedTimeRange("shortTerm")}>
          6 months
        </button>
        <button className="text-white" onClick={() => setSelectedTimeRange("shortTerm")}>
          4 weeks
        </button>
        <button className="text-white ">6 months</button>
        <button className="text-white ">All Time</button>
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

const getArtistsByTimeRange = ({ userTopArtistsAllTimeRange, timeRange }) => {
  switch (timeRange) {
    case "shortTerm":
      return userTopArtistsAllTimeRange?.shortTerm;
    case "mediumTerm":
      return userTopArtistsAllTimeRange?.mediumTerm;
    case "longTerm":
      return userTopArtistsAllTimeRange?.longTerm;
  }
}
const TopArtists = ({ innerRef, userTopArtistsAllTimeRange }) => {

  const [selectedTimeRange, setSelectedTimeRange] = useState<string>("shortTerm");
  const [userTopArtists, setUserTopArtists] = useState([]);

  const [showMore, setShowMore] = useState({
    isExpanded: false,
    itemsToShow: 10,
    totalItems: userTopArtists.length,
  });

  useEffect(() => {
    if (userTopArtistsAllTimeRange) {
      const artists = getArtistsByTimeRange({ userTopArtistsAllTimeRange, timeRange: selectedTimeRange });
      setUserTopArtists(artists);
    }
  }, [userTopArtistsAllTimeRange, selectedTimeRange]);

  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
  return (
    <div ref={innerRef} className="flex flex-col  justify-center items-center space-y-10 bg-[#111827] w-full p-10 ">
      <UpperSection />
      <div className="flex flex-row justify-center  bg-[#111827] space-x-1 w-full ">
        <SelectedArtistProvider>
          <ArtistsSelectionList
            userTopArtists={userTopArtists}
            showMore={showMore}
          />
          {isMobile ? null : <ArtistDetailsPanel />}
        </SelectedArtistProvider>
      </div>

      {/* <ShowMoreButton showMore={showMore} setShowMore={setShowMore} /> */} */}
    </div>
  );
};

export default TopArtists;
