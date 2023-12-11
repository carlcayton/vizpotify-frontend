
import Image from "next/image";
import { useEffect, useContext, useState, useRef } from "react";
import { SelectedTrackContext, SelectedTrackDispatchContext } from "contexts/SelectedTrackContext";
import { useIsMobile } from "utils/detectScreenSize";
import TrackDetailsPanel from "components/TopTracks/TrackDetailsPanel";

const TrackCard = ({ track, rank, selectedTrack, setSelectedTrack }) => {
    const cardRef = useRef(null);
    const isActive = selectedTrack === track;
    const [isOpen, setIsOpen] = useState(isActive);
    const isMobile = useIsMobile();

    useEffect(() => {
        if (isActive && cardRef.current) {
            cardRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }
        setIsOpen(isActive);
    }, [isActive]);

    const handleClick = () => {
        if (isMobile) {
            setSelectedTrack(isActive ? null : track);
        } else {
            setSelectedTrack(track)
        }
    };

    return (
        <div className="w-full" ref={cardRef}>
            <button
                className={`flex flex-row gap-8 bg-[#192132] ${isActive ? "bg-[#374151] cursor-default" : "bg-transparent"} hover:bg-[#374151] rounded-lg items-center p-2 space-x-2 w-full`}
                onClick={handleClick}
            >
                <p className="text-white font-bold text-base w-8">{rank}</p>
                <div className="w-16 h-16 sm:w-24 sm:h-24 flex-shrink-0">
                    <img
                        src={track.albumImageUrl}
                        alt={`${track.name}`}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
                <div className="flex flex-col items-start overflow-hidden w-full">
                    <h2 className={`text-white font-bold ${isActive ? "text-theme-green-1" : "text-white"} text-sm sm:text-base md:text-lg whitespace-nowrap truncate`}>
                        {track.name.length > 35 ? `${track.name.slice(0, 35)}...` : track.name}
                    </h2>


                    {track.artists && (
                        <p className={`text-white sm:text-xs text-sm font-medium whitespace-nowrap overflow-ellipsis`}>
                            {track.artists.join(', ')}
                        </p>
                    )}
                </div>
                <div>
                    {isMobile && <span className="text-white text-xl font-bold justify-self-end">{isOpen && isActive ? '-' : '+'}</span>}
                </div>
            </button>
            {isMobile && isOpen && (
                <div className="w-full animated-collapse-2">
                    <TrackDetailsPanel track={track} />
                </div>
            )}
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

