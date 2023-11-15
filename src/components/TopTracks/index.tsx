
import React, { useEffect, useState, createContext } from 'react';
import { useIsMobile } from 'utils/detectScreenSize';
import { SelectedTrackProvider } from 'contexts/SelectedTrackContext';
import UpperSection from 'components/composite/UpperSection';

import TracksSelectionList from './TrackSelectionList';
import TrackDetailsPanel from './TrackDetailsPanel';

const getTracksByTimeRange = ({ userTopTracksAllTimeRange, timeRange }) => {
  switch (timeRange) {
    case "shortTerm":
      return userTopTracksAllTimeRange?.shortTerm;
    case "mediumTerm":
      return userTopTracksAllTimeRange?.mediumTerm;
    case "longTerm":
      return userTopTracksAllTimeRange?.longTerm;
    default:
      return [];
  }
}

const TopTracks = ({ innerRef, userTopTracksAllTimeRange }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("shortTerm");
  const [userTopTracks, setUserTopTracks] = useState([]);

  useEffect(() => {
    if (userTopTracksAllTimeRange) {
      const tracks = getTracksByTimeRange({ userTopTracksAllTimeRange, timeRange: selectedTimeRange });
      setUserTopTracks(tracks);
    }
  }, [userTopTracksAllTimeRange, selectedTimeRange]);

  const isMobile = useIsMobile();
  const classForMobile = isMobile ? 'px-12' : 'sm:px-24 xl:px-56';

  const [showMore, setShowMore] = useState({
    isExpanded: false,
    itemsToShow: 10,
    totalItems: 0,
  });

  return (
    <div ref={innerRef} className={`flex flex-col justify-center items-center space-y-10 bg-[#111827] w-full ${classForMobile}`}>
      <UpperSection sectionType={"Tracks"} selectedTimeRange={selectedTimeRange} setSelectedTimeRange={setSelectedTimeRange} />
      <div className="flex flex-row justify-center bg-[#111827] space-x-1 w-full ">
        <SelectedTrackProvider>
          <TracksSelectionList
            userTopTracks={userTopTracks}
            showMore={showMore}
          />
          {isMobile ? null : <TrackDetailsPanel />}
        </SelectedTrackProvider>
      </div>
    </div>
  );
};

export default TopTracks;
