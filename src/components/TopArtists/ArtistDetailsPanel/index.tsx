import Image from "next/image";
import { useState, useContext, useEffect } from "react";
import { SelectedArtistContext } from "contexts/SelectedArtistContext";
import { useIsMobile } from "utils/detectScreenSize"
import { getArtistExtraInfo } from "pages/api/dashboard/dashboardApi";

const SectionTitle = ({ sectionName }) => {
  return <p className="text-white font-bold text-xl w-full">{sectionName}</p>;
};
const GenreItem = ({ genre }) => {
  return (
    <div
      className="bg-[#484E5B] rounded-full border  px-2 pb-1.5 text-white font-bold"
    >
      {genre.name}
    </div>
  )
}

const ArtistGenresSection = ({ genres }) => {
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

const ArtistFollowersSection = ({ followers }) => {
  return (
    <div className="flex flex-col align-left space-y-2">
      <SectionTitle sectionName="Followers" />
      <p className="text-white">{followers}</p>
    </div>
  );
};

const ArtistPopularitySection = ({ popularity }) => {
  return (
    <div className="flex flex-col align-left space-y-2 w-full">
      <SectionTitle sectionName="Popularity" />
      <div className=" bg-[#5F646F] rounded-full h-2 dark:bg-bg-gray-700 w-full">
        <div
          className={`bg-theme-green-1 h-2 rounded-full w-full`}
          style={{ width: `${popularity}%` }}
        ></div>
      </div>
    </div>
  );
};
const TopTrackHeading = () => {
  let fontColor = "text-white"
  return (

    <div className="flex flex-row  rounded-md gap-x-6  p-2 justify-between justify-items-start ">
      <p className={`${fontColor}  truncate w-full`}>Title</p> {/* Truncate text if it overflows */}
      <p className={`${fontColor}  truncate w-full`}>Album</p> {/* Truncate text if it overflows */}
      <p className={`${fontColor}  `}>Duration</p> {/* Truncate text if it overflows */}
    </div>
  )
}

const TopTrackCard = ({ rank, track }) => {
  let fontColor = "text-white"
  return (
    <div className="flex flex-row items-center bg-[#484E5B] rounded-md gap-x-4 p-4 justify-between shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1">
      <div className="flex items-center w-2/5">
        <span className="text-sm font-bold text-gray-400 mr-2">{rank}.</span>
        <p className={`${fontColor} font-semibold truncate`}>{track.name}</p>
      </div>
      <p className={`${fontColor} truncate w-1/4 text-sm`}>{track.albumName}</p>
      <p className={`${fontColor} w-1/6 text-right text-sm`}>{track.duration}</p>
    </div>
  );
};

const TopTrackSection = ({ artistTopTracks }) => {
  return (
    <div className="flex flex-col align-left space-y-2 w-full">
      <SectionTitle sectionName="Artist's Popular Songs" />
      <div className="flex flex-col space-y-1">
        <TopTrackHeading />
        {artistTopTracks ? (
          artistTopTracks.map((track: any, index: number) => {
            return (
              <TopTrackCard rank={index + 1} track={track} />
            )
          })
        ) : null}
      </div>
    </div >
  )

}

const SimilarArtistCard = ({ artist }) => {
  return (
    <div className="relative hover:scale-110">
      <Image
        src={artist.imageUrl}
        height="100%"
        width="100%"
        layout="responsive"
        objectFit="cover"
        alt={`${artist.name}`}
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

const SimilarArtistSection = ({ similarArtists }) => {
  return (
    <div className="flex flex-col align-left space-y-2 gap-2 w-full">
      <SectionTitle sectionName="Similar Artists" />
      {similarArtists ? (
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {similarArtists.slice(0, 12).map((artist, index) => {
            return <SimilarArtistCard artist={artist} key={artist.id} />;
          })}
        </div>
      ) : null
      }
    </div >
  );
};

const ArtistDetailsPanel = () => {
  const selectedArtist = useContext(SelectedArtistContext)

  const [similarArtists, setSimilarArtists] = useState([]);
  const [artistTopTracks, setArtistTopTracks] = useState([]);
  const artist = selectedArtist
  const isMobile = useIsMobile();
  const classForSMScreen = isMobile ? `border ` : `sticky `;

  useEffect(() => {
    if (selectedArtist) {
      // Fetch related artists
      getArtistExtraInfo(selectedArtist.id)
        .then(data => {
          setSimilarArtists(data.artistDTOS);
          setArtistTopTracks(data.trackDTOS);
        })
        .catch(error => {
          console.error('Error fetching similar artists:', error);
        });
    }
  }, [selectedArtist]);


  return (
    <div className="flex flex-col w-full">
      {selectedArtist ? (
        <div
          className={` ${classForSMScreen} 
        flex-col rounded-lg px-6 py-6 space-y-4  mr-4 top-0 w-full bg-[#1B2539]`}
        >
          <ArtistGenresSection genres={artist.genres} />
          <ArtistPopularitySection popularity={artist.popularity} />
          <TopTrackSection artistTopTracks={artistTopTracks} />
          <SimilarArtistSection similarArtists={similarArtists} />
        </div>
      ) : null}
    </div>
  );
};

export default ArtistDetailsPanel;
