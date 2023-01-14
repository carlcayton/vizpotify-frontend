import Image from "next/image";

const SectionTitle = ({ sectionName }) => {
  return <p className="text-white font-bold text-xl">{sectionName}</p>;
};

const ArtistGenresSection = ({ genres }) => {
  return (
    <div className="flex flex-col align-left space-y-2 ">
      <SectionTitle sectionName="Genres" />
      <div className="flex flex-row flex-wrap  gap-2">
        {genres.map((genre, index) => {
          return (
            <div
              className="bg-[#484E5B] rounded-full border  px-2 pb-1.5 text-white font-bold"
              key={index}
            >
              {genre}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ArtistFollowersSection = ({ followers }) => {
  return (
    <div className="flex flex-col align-left space-y-2">
      <SectionTitle sectionName="Followers" />
      <p className="text-white">{followers.toLocaleString()}</p>
    </div>
  );
};

const ArtistPopularitySection = ({ popularity }) => {
  return (
    <div className="flex flex-col align-left space-y-2 pr-12">
      <SectionTitle sectionName="Popularity" />
      <div className=" bg-[#5F646F] rounded-full h-2 dark:bg-bg-gray-700">
        <div
          className={`bg-theme-green-1 h-2 rounded-full`}
          style={{ width: `${popularity}%` }}
        ></div>
      </div>
    </div>
  );
};

const SimilarArtistCard = ({ artist }) => {
  return (
    <div className={`flex relative overflow-hidden hover:scale-110`}>
      <Image
        src={artist.image}
        alt={artist.name}
        className="rounded-lg "
        width={150}
        height={150}
        // layout="fill"
        // style={{width:"100%"}}
      />
      <div className="flex rounded-b-lg bottom-0 absolute w-full bg-[#111827] opacity-60 ">
        <span
          className="text-white grow p-1"
          // style={{ fontSizeAdjust: "inherit" }}
        >
          {artist.name}
        </span>
      </div>
    </div>
  );
};

const SimilarArtistSection = ({ similarArtists }) => {
  return (
    <div className="flex flex-col align-left space-y-2 grow gap-2">
      <SectionTitle sectionName="Similar Artists" />
      <div className="flex flex-row flex-wrap   gap-2">
        {similarArtists.map((artist, index) => {
          return <SimilarArtistCard artist={artist} key={artist.id} />;
        })}
      </div>
    </div>
  );
};

const ArtistDetailsPanel = ({
  artistInfo,
  similarArtists,
  selectedArtistIndex,
}) => {
  const classForBaseScreen = "hidden";
  const classForSMScreen = "sm:flex ";
  return (
    //  <div className="flex flex-col grow">
    <>
      {artistInfo.id === selectedArtistIndex && (
        <div
          className={`${classForBaseScreen} ${classForSMScreen} flex-col  rounded-lg p-5 space-y-4 `}
        >
          <ArtistGenresSection genres={artistInfo.genres} />
          <ArtistFollowersSection followers={artistInfo.followers.total} />
          <ArtistPopularitySection popularity={artistInfo.popularity} />
          <SimilarArtistSection similarArtists={similarArtists.slice(0, 6)} />
        </div>
      )}
      {/* </div> */}
    </>
  );
};

export default ArtistDetailsPanel;
