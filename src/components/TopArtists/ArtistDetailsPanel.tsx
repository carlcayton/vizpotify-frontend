// ArtistDetailsPanel.tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useIsMobile } from 'utils/detectScreenSize';
import SectionTitle from 'components/common/SectionTitle';
import ProgressBar from 'components/common/ProgressBar';
import { getArtistExtraInfo } from 'services/musicService';
import Image from 'next/image';
import { formatDuration } from 'utils/util';

import { Artist, ArtistDetailsPanelProps, ArtistExtraInfo } from './TopArtists.types';

const GenreSection: React.FC<{ genres: string[] }> = ({ genres }) => (
  <div className="flex flex-col align-left space-y-2 w-full">
    <SectionTitle sectionName="Genres" />
    <div className="flex flex-row flex-wrap gap-2">
      {genres.map((genre, index) => (
        <div key={index} className="bg-[#484E5B] rounded-full border px-2 pb-1.5 text-white font-bold text-xs sm:text-sm md:text-base">
          {genre}
        </div>
      ))}
    </div>
  </div>
);

const TopTrackSection: React.FC<{ topTracks: ArtistExtraInfo['artistTopTracks'] }> = ({ topTracks }) => (
  <div className="flex flex-col align-left space-y-2 w-full">
    <SectionTitle sectionName="Artist's Popular Songs" />
    <div className="flex flex-col space-y-1">
      {topTracks && topTracks.map((track, index) => (
        <div key={track.id} className="flex flex-row items-center bg-[#484E5B] rounded-md gap-x-4 p-4 justify-between">
          <span className="text-xs font-bold text-gray-400 mr-2">{index + 1}.</span>
          <div className="flex-grow">
            <p className="text-white font-semibold truncate">{track.name}</p>
            <p className="text-gray-300 text-sm truncate">{track.artists.join(', ')}</p>
          </div>
          <p className="text-gray-300 text-sm">{formatDuration(track.duration)}</p>
        </div>
      ))}
    </div>
  </div>
);

const SimilarArtistSection: React.FC<{ relatedArtists: ArtistExtraInfo['relatedArtists'] }> = ({ relatedArtists }) => {
  const isMobile = useIsMobile();
  const numberOfSimArtistToDisplay = isMobile ? 9 : 10;
  
  return (
    <div className="flex flex-col align-center space-y-2 gap-2">
      <SectionTitle sectionName="Similar Artists" />
      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {relatedArtists.slice(0, numberOfSimArtistToDisplay).map((artist) => (
          <div key={artist.id} className="w-full relative hover:scale-110">
            <Image
              src={artist.imageUrl}
              layout="responsive"
              width={100}
              height={100}
              alt={artist.name}
              className="rounded-lg"
            />
            <div className="absolute bottom-0 w-full flex justify-center items-center rounded-b-lg bg-[#111827] opacity-60">
              <span className="text-white p-1">{artist.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ArtistDetailsPanel: React.FC<ArtistDetailsPanelProps> = ({ artist }) => {
  const isMobile = useIsMobile();
  const classForSMScreen = isMobile ? 'border' : 'sticky';

  const { data: artistExtraInfo, isLoading, error } = useQuery<ArtistExtraInfo, Error>({
    queryKey: ['artistExtraInfo', artist?.id],
    queryFn: () => getArtistExtraInfo(artist?.id as string),
    enabled: !!artist?.id,
  });

  if (!artist) return null;
  if (isLoading) return <div className="text-white">Loading artist details...</div>;
  if (error) return <div className="text-white">Error loading artist details: {error.message}</div>;

  return (
    <div className="flex flex-col w-full">
      <div className={`${classForSMScreen} flex-col rounded-lg px-8 py-8 space-y-4 mr-4 top-0 w-full bg-[#1B2539]`}>
        <SectionTitle sectionName="Popularity" />
        <ProgressBar percentage={artist.popularity} />
        <GenreSection genres={artist.genres} />
        <div className="text-white rounded-lg flex justify-normal">
          <div className="w-full pr-2">
            <SectionTitle sectionName="Followers" />
            <p>{artist.followers}</p>
          </div>
        </div>
        {artistExtraInfo && artistExtraInfo.artistTopTracks && 
          <TopTrackSection topTracks={artistExtraInfo.artistTopTracks} />
        }
        {artistExtraInfo && artistExtraInfo.relatedArtists && 
          <SimilarArtistSection relatedArtists={artistExtraInfo.relatedArtists} />
        }
      </div>
    </div>
  );
};

export default ArtistDetailsPanel;