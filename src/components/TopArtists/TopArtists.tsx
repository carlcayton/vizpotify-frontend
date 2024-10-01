import { useEffect, useState, useContext, createContext } from "react";
import { SelectedArtistProvider } from "contexts/SelectedArtistContext";
import { useIsMobile } from "utils/detectScreenSize"
import { getDataByTimeRange } from "utils/util";
import UpperSection from "components/layout/UpperSection"
import { ArtistDetailsProvider } from "contexts/ArtistDetailsContext";
import ShowMoreButton from "components/common/ShowMoreButton";

import ArtistsSelectionList from "./ArtistsSelectionList";
import ArtistDetailsPanel from "./ArtistDetailsPanel";

// const ShowMoreButton = ({ showMore, setShowMore }) => {
//   const handleShowMore = () => {
//     setShowMore((prevState) => ({
//       isExpanded: !showMore.isExpanded,
//       itemsToShow: !showMore.isExpanded ? showMore.totalItems : 10,
//       totalItems: showMore.totalItems,
//     }));
//   };
//   return (
//     <button
//       className="px-3 pb-1 flex text-white text-sm items-center mt-5 rounded-full ease-in-out hover:translate-y-1 transition-all group border border-white"
//       onClick={handleShowMore}
//     >
//       {showMore.isExpanded ? "Show Less" : "Show More"}
//     </button>
//   );
// };

const TopArtists = ({ innerRef, userTopArtistsAllTimeRange }) => {

  const [selectedTimeRange, setSelectedTimeRange] = useState<string>("shortTerm");
  const [userTopArtists, setUserTopArtists] = useState([]);

  const [showMore, setShowMore] = useState({
    isExpanded: false,
    itemsToShow: 10,
    totalItems: 50,
  });

  useEffect(() => {
    if (userTopArtistsAllTimeRange) {
      const artists = getDataByTimeRange({ data: userTopArtistsAllTimeRange, timeRange: selectedTimeRange });
      setUserTopArtists(artists);
    }
  }, [userTopArtistsAllTimeRange, selectedTimeRange, userTopArtists]);

  const isMobile = useIsMobile()
  return (
    <div ref={innerRef} className={`flex flex-col  justify-center items-center space-y-10 bg-[#111827] w-full `}>
      <UpperSection sectionType={"Top Artists"} selectedTimeRange={selectedTimeRange} setSelectedTimeRange={setSelectedTimeRange} />
      <ArtistDetailsProvider>
        <SelectedArtistProvider>
          <div className="flex flex-row justify-center  bg-[#111827] space-x-1 w-full ">
            <ArtistsSelectionList
              userTopArtists={userTopArtists}
              showMore={showMore}
            />
            {isMobile ? <div></div> : <ArtistDetailsPanel />}
          </div>
        </SelectedArtistProvider>
      </ArtistDetailsProvider>

      <ShowMoreButton showMore={showMore} setShowMore={setShowMore} />
    </div>
  );
};

export default TopArtists;