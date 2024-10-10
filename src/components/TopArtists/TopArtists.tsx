// TopArtists.tsx
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useIsMobile } from 'utils/detectScreenSize';
import UpperSection from 'components/layout/UpperSection';
import { userService} from 'services/userService';

import ArtistsSelectionList from './ArtistsSelectionList';
import ArtistDetailsPanel from './ArtistDetailsPanel';
import ShowMoreButton from 'components/common/ShowMoreButton';

import { Artist, TimeRange, ShowMoreState, TopArtistsProps } from './TopArtists.types';

const TopArtists: React.FC<TopArtistsProps> = ({ spotifyId }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>("shortTerm");
  const [showMore, setShowMore] = useState<ShowMoreState>({
    isExpanded: false,
    itemsToShow: 10,
    totalItems: 50,
  });
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  const { data: userTopArtists, isLoading, error } = useQuery<Record<TimeRange, Artist[]>, Error>({
    queryKey: ['topArtists', spotifyId],
    queryFn: () => userService.getUserTopArtist(spotifyId),
    enabled: !!spotifyId,
  });

  const isMobile = useIsMobile();

  const handleTimeRangeChange = (timeRange: string) => {
    setSelectedTimeRange(timeRange as TimeRange);
  };


  if (isLoading) return <div className="text-white">Loading top artists...</div>;
  if (error) return <div className="text-white">Error loading top artists: {error.message}</div>;

  const artistsForSelectedTimeRange = userTopArtists ? userTopArtists[selectedTimeRange] : [];

  return (
    <div className="flex flex-col justify-center items-center space-y-10 bg-[#111827] w-full">
      <UpperSection
        sectionType="Top Artists"
        selectedTimeRange={selectedTimeRange}
        setSelectedTimeRange={handleTimeRangeChange}
      />
      <div className="flex flex-row justify-center bg-[#111827] space-x-1 w-full">
        <ArtistsSelectionList
          userTopArtists={artistsForSelectedTimeRange}
          showMore={showMore}
          selectedArtist={selectedArtist}
          setSelectedArtist={setSelectedArtist}
        />
        {!isMobile && <ArtistDetailsPanel artist={selectedArtist} />}
      </div>
      <ShowMoreButton showMore={showMore} setShowMore={setShowMore} />
    </div>
  );
};

export default TopArtists;