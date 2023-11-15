
import Image from "next/image";
import { useEffect, useContext } from "react";
import { SelectedTrackContext, SelectedTrackDispatchContext } from "contexts/SelectedTrackContext";
import { useIsMobile } from "utils/detectScreenSize";
// import TrackDetailsPanel from "components/TopTracks/TrackDetailsPanel";

const TrackCard = ({ track, rank, selectedTrack, setSelectedTrack }) => {
    const isActive = selectedTrack === null && rank === 1 || track === selectedTrack;
    const isMobile = useIsMobile();

    return (
        <div className="w-full">
            <button
                className={`flex gap-8 bg-[#192132] ${isActive ? "bg-[#374151] cursor-default" : "bg-transparent"
                    } hover:bg-[#374151] rounded-lg items-center p-2 space-x-2 w-full`}
                onClick={() => setSelectedTrack(track)}
            >
                <p className="text-white font-bold text-base">{rank}</p>
                <div className="w-20">
                    <Image
                        src={track.albumImageUrl}
                        height="100%"
                        width="100%"
                        layout="responsive"
                        objectFit="cover"
                        alt={`${track.name}`}
                        className="rounded-lg"
                    />
                </div>

                <div className="flex flex-col items-start ">
                    <h2 className={`${isActive ? "text-theme-green-1" : "text-white"} font-bold text-xl whitespace-nowrap text-ellipsis overflow-hidden`}>
                        {track.name.length > 40 ? track.name.substring(0, 40) + '...' : track.name}
                    </h2>
                    {track ? (
                        <div className="flex flex-row">
                            <p className={`${isActive ? "text-theme-green-1" : "text-white"} text-sm font-medium whitespace-nowrap`}>
                                {track.artists.join(', ')}
                            </p>
                        </div>
                    ) : null}
                </div>

            </button>
            {/* {isMobile && isActive && <TrackDetailsPanel track={track} />} */}
        </div>
    );
};


const TracksSelectionList = ({ userTopTracks, showMore }) => {
    const selectedTrack = useContext(SelectedTrackContext);
    const setSelectedTrack = useContext(SelectedTrackDispatchContext);
    const isMobile = useIsMobile();

    useEffect(() => {
        if (userTopTracks && userTopTracks.length > 0) {
            setSelectedTrack(userTopTracks[0]);
        }
    }, [userTopTracks, setSelectedTrack]);

    return (
        <div className="flex flex-row flex-wrap px-5 sm:flex-col grow items-left gap-2 w-full">
            {userTopTracks ? (
                userTopTracks
                    .slice(0, showMore.itemsToShow)
                    .map((track, index) => (
                        <TrackCard
                            track={track}
                            rank={index + 1}
                            selectedTrack={selectedTrack}
                            setSelectedTrack={setSelectedTrack}
                            key={track.id}
                        />
                    ))
            ) : (
                <div />
            )}
        </div>
    );
};

export default TracksSelectionList;

