
import React, { useEffect, useState, createContext } from 'react';
import { useIsMobile } from 'utils/detectScreenSize';
import { SelectedTrackProvider } from 'contexts/SelectedTrackContext';
import UpperSection from 'components/layout/UpperSection';
import { getDataByTimeRange } from 'utils/util';

import TracksSelectionList from './TrackSelectionList';
import TrackDetailsPanel from './TrackDetailsPanel';
import { TrackDetailsProvider } from 'contexts/TrackDetailContext';
import ShowMoreButton from 'components/common/ShowMoreButton';

const TopTracks = ({ innerRef, userTopTracksAllTimeRange }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("shortTerm");
  const [userTopTracks, setUserTopTracks] = useState([]);

  useEffect(() => {
    if (userTopTracksAllTimeRange) {
      const tracks = getDataByTimeRange({ data: userTopTracksAllTimeRange, timeRange: selectedTimeRange });
      setUserTopTracks(tracks);
    }
  }, [userTopTracksAllTimeRange, selectedTimeRange]);

  const isMobile = useIsMobile();
  // const classForMobile = isMobile ? '' : 'md:px-12 xl:px-56 ';
  const classForMobile = isMobile ? '' : '';

  const [showMore, setShowMore] = useState({
    isExpanded: false,
    itemsToShow: 10,
    totalItems: 50,
  });

  return (
    <div ref={innerRef} className={`flex flex-col justify-center items-center space-y-10 bg-[#111827] w-full ${classForMobile}`}>
      <UpperSection sectionType={"Top Tracks"} selectedTimeRange={selectedTimeRange} setSelectedTimeRange={setSelectedTimeRange} />
      <div className="flex flex-row justify-center bg-[#111827] space-x-1 w-full ">
        <TrackDetailsProvider>
          <SelectedTrackProvider>
            <TracksSelectionList
              userTopTracks={userTopTracks}
              showMore={showMore}
            />
            {isMobile ? null : <TrackDetailsPanel />}
          </SelectedTrackProvider>
        </TrackDetailsProvider>
      </div>
      <ShowMoreButton showMore={showMore} setShowMore={setShowMore} />
    </div>
  );
};

export default TopTracks;
