import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useIsMobile } from 'utils/detectScreenSize';
import UpperSection from 'components/layout/UpperSection';
import { getUserTopTrack } from 'services/userService';

import TracksSelectionList from './TrackSelectionList';
import TrackDetailsPanel from './TrackDetailsPanel';
import ShowMoreButton from 'components/common/ShowMoreButton';

import { Track, TimeRange, ShowMoreState, TopTracksProps } from './TopTracks.types';

const TopTracks: React.FC<TopTracksProps> = ({ spotifyId }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>("shortTerm");
  const [showMore, setShowMore] = useState<ShowMoreState>({
    isExpanded: false,
    itemsToShow: 10,
    totalItems: 50,
  });
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  const { data: userTopTracks, isLoading, error } = useQuery<Record<TimeRange, Track[]>, Error>({
    queryKey: ['topTracks', spotifyId],
    queryFn: () => getUserTopTrack(spotifyId),
    enabled: !!spotifyId,
  });

  const isMobile = useIsMobile();
  const classForMobile = isMobile ? '' : '';

  const handleTimeRangeChange = (timeRange: string) => {
    setSelectedTimeRange(timeRange as TimeRange);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const tracksForSelectedTimeRange = userTopTracks ? userTopTracks[selectedTimeRange] : [];

  return (
    <div className={`flex flex-col justify-center items-center space-y-10 bg-[#111827] w-full ${classForMobile}`}>
      <UpperSection
        sectionType="Top Tracks"
        selectedTimeRange={selectedTimeRange}
        setSelectedTimeRange={handleTimeRangeChange}
      />
      <div className="flex flex-row justify-center bg-[#111827] space-x-1 w-full ">
        <TracksSelectionList
          userTopTracks={tracksForSelectedTimeRange}
          showMore={showMore}
          selectedTrack={selectedTrack}
          setSelectedTrack={setSelectedTrack}
        />
        {!isMobile && <TrackDetailsPanel track={selectedTrack} />}
      </div>
      <ShowMoreButton showMore={showMore} setShowMore={setShowMore} />
    </div>
  );
};

export default TopTracks;