import { useEffect, useState, useContext, createContext } from "react";
import { SelectedArtistProvider } from "contexts/SelectedArtistContext";
import { useIsMobile } from "utils/detectScreenSize"
import UpperSection from "components/composite/UpperSection"
import { ArtistDetailsProvider } from "contexts/ArtistDetailsContext";

import ArtistsSelectionList from "./ArtistsSelectionList";
import ArtistDetailsPanel from "./ArtistDetailsPanel";

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
    totalItems: 0,
  });

  useEffect(() => {
    if (userTopArtistsAllTimeRange) {
      const artists = getArtistsByTimeRange({ userTopArtistsAllTimeRange, timeRange: selectedTimeRange });
      setUserTopArtists(artists);
    }
  }, [userTopArtistsAllTimeRange, selectedTimeRange,]);

  const isMobile = useIsMobile()
  const classForMobile = isMobile ? `px-1` : ` md:px-12 xl:px-56`
  return (
    <div ref={innerRef} className={`flex flex-col  justify-center items-center space-y-10 bg-[#111827] w-full ${classForMobile}`}>
      <UpperSection sectionType={"Artists"} selectedTimeRange={selectedTimeRange} setSelectedTimeRange={setSelectedTimeRange} />
      <ArtistDetailsProvider>
        <SelectedArtistProvider>
          <div className="flex flex-row justify-center  bg-[#111827] space-x-1 w-full ">
            <ArtistsSelectionList
              userTopArtists={userTopArtists}
              showMore={showMore}
            />
            {isMobile ? <div className="w-0" /> : <ArtistDetailsPanel />}
          </div>
        </SelectedArtistProvider>
      </ArtistDetailsProvider>

      {/* <ShowMoreButton showMore={showMore} setShowMore={setShowMore} /> */}
    </div>
  );
};

export default TopArtists;
