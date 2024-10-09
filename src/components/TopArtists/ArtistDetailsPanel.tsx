import Image from "next/image";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useIsMobile } from "../../utils/detectScreenSize"
import { getArtistExtraInfo } from "../../services/musicService";
import { formatDuration } from '../../utils/util';
import SectionTitle from '../common/SectionTitle'
import ProgressBar from "../common/ProgressBar";

interface Artist {
  id: string;
  name: string;
  genres: string[];
  popularity: number;
  imageUrl: string;
}

interface Track {
  name: string;
  albumName: string;
  duration: number;
}

interface ArtistExtraInfo {
  artistDTOS: Artist[];
  trackDTOS: Track[];
}
const GenreItem = ({ genre }: { genre: string }) => {
  return (
    <div className="bg-[#484E5B] rounded-full border px-2 pb-1.5 text-white font-bold text-xs sm:text-sm md:text-base">
      {genre}
    </div>
  );
};

const ArtistGenresSection = ({ genres }: { genres: string[] }) => {
  return (
    <div className="flex flex-col align-left space-y-2 w-full">
      <SectionTitle sectionName="Genres" />
      <div className="flex flex-row flex-wrap  gap-2">
        {genres.map((genre, index) => {
          return (
            <GenreItem genre={genre} key={index} />
          );
        })}
      </div>
    </div >
  );
};

const ArtistFollowersSection = ({ followers }: { followers: number }) => {
  return (
    <div className="flex flex-col align-left space-y-2">
      <SectionTitle sectionName="Followers" />
      <p className="text-white">{followers}</p>
    </div>
  );
};

const ArtistPopularitySection = ({ popularity }: { popularity: number }) => {
  return (
    <div className="flex flex-col align-left space-y-2 w-full">
      <SectionTitle sectionName="Popularity" />
      <ProgressBar percentage={popularity} />
    </div>
  );
};

const TopTrackHeading = () => {
  let fontColor = "text-white";
  return (
    <div className="flex flex-row rounded-md gap-x-6 p-2 justify-between justify-items-start w-full">
      <p className={`${fontColor} truncate w-full text-xs sm:text-sm md:text-base`}>Title</p>
      <p className={`${fontColor} truncate w-full text-xs sm:text-sm md:text-base`}>Album</p>
      <p className={`${fontColor} text-xs sm:text-sm md:text-base`}>Duration</p>
    </div>
  );
};

const TopTrackCard = ({ rank, track }: { rank: number, track: Track }) => {
  let fontColor = "text-white";
  return (
    <div className="flex flex-row items-center bg-[#484E5B] rounded-md gap-x-4 p-4 justify-between shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:--translate-y-1">
      <div className="flex items-center w-2/5">
        <span className={`text-xs font-bold text-gray-400 mr-2 sm:text-sm md:text-base`}>{rank}.</span>
        <p className={`${fontColor} font-semibold truncate text-xs sm:text-sm md:text-base`}>{track.name}</p>
      </div>
      <p className={`${fontColor} truncate w-1/4 text-xs sm:text-sm md:text-base`}>{track.albumName}</p>
      <p className={`${fontColor} w-1/6 text-right text-xs sm:text-sm md:text-base`}>{formatDuration(track.duration)}</p>
    </div>
  );
};

const TopTrackSection = ({ artistTopTracks }: { artistTopTracks: Track[] }) => {
  return (
    <div className="flex flex-col align-left space-y-2 w-full">
      <SectionTitle sectionName="Artist's Popular Songs" />
      <div className="flex flex-col space-y-1">
        <TopTrackHeading />
        {artistTopTracks ? (
          artistTopTracks.map((track, index) => {
            return (
              <TopTrackCard key={index} rank={index + 1} track={track} />
            )
          })
        ) : null}
      </div>
    </div >
  )
}

const SimilarArtistCard = ({ artist }: { artist: Artist }) => {
  return (
    <div className="w-full relative hover:scale-110">
      <Image
        src={artist.imageUrl}
        height="100%"
        width="100%"
        layout="responsive"
        objectFit="cover"
        alt={`${artist.name}`}
        priority={false}
        className="rounded-lg"
      />
      <div
        className="absolute bottom-0 w-full flex justify-center items-center rounded-b-lg bg-[#111827] opacity-60"
      >
        <span className="text-white p-1">{artist.name}</span>
      </div>
    </div>
  );
};

const SimilarArtistSection = ({ similarArtists }: { similarArtists: Artist[] }) => {
  const isMobile = useIsMobile()
  const numberOfSimArtistToDisplay = isMobile ? 9 : 10;
  return (
    <div className="flex flex-col align-center space-y-2 gap-2 h">
      <SectionTitle sectionName="Similar Artists" />
      {similarArtists ? (
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {similarArtists.slice(0, numberOfSimArtistToDisplay).map((artist, index) => {
            return <SimilarArtistCard artist={artist} key={artist.id} />;
          })}
        </div>
      ) : null
      }
    </div >
  );
};

const useArtistInfo = (artistId: string | undefined) => {
  return useQuery<ArtistExtraInfo, Error>(
    ['artistInfo', artistId],
    () => getArtistExtraInfo(artistId as string),
    {
      enabled: !!artistId,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
};

const ArtistDetailsPanel = () => {
  const isMobile = useIsMobile();
  const classForSMScreen = isMobile ? `border sticky` : `sticky `;

  const selectedArtist = useContext(SelectedArtistContext) as Artist | null;
  const { data: artistInfo, isLoading, isError } = useArtistInfo(selectedArtist?.id);

  if (isLoading) {
    return <div className="text-white">Loading artist details...</div>;
  }

  if (isError) {
    return <div className="text-white">Error loading artist details. Please try again later.</div>;
  }

  if (!selectedArtist) {
    return null;
  }

  const { artistDTOS: similarArtists, trackDTOS: artistTopTracks } = artistInfo || { artistDTOS: [], trackDTOS: [] };

  return (
    <div className="flex flex-col w-full">
      <div
        className={`${classForSMScreen} border sticky sm:border-none  
        flex-col px-1 md:px-6 py-6 space-y-4 rounded-lg top-0 w-full bg-[#1B2539] w-full`}
      >
        <p className="text-3xl text-white font-bold">{selectedArtist.name}</p>
        <ArtistGenresSection genres={selectedArtist.genres} />
        <ArtistPopularitySection popularity={selectedArtist.popularity} />
        <TopTrackSection artistTopTracks={artistTopTracks} />
        <SimilarArtistSection similarArtists={similarArtists} />
      </div>
    </div>
  );
};

export default ArtistDetailsPanel;
