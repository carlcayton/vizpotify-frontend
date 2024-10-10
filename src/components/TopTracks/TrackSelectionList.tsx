import Image from "next/image";
import React, { useRef, useEffect } from "react";
import { useIsMobile } from "utils/detectScreenSize";
import TrackDetailsPanel from "components/TopTracks/TrackDetailsPanel";

import { Track, TrackCardProps, TracksSelectionListProps } from './TopTracks.types';

const TrackCard: React.FC<TrackCardProps> = ({ track, rank, isSelected, onSelect }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    useEffect(() => {
        if (isSelected && cardRef.current) {
            cardRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }
    }, [isSelected]);

    const handleClick = () => {
        onSelect(isSelected ? null : track);
    };

    return (
        <div className="w-full" ref={cardRef}>
            <button
                className={`flex flex-row gap-8 ${isSelected ? "bg-[#374151] cursor-default" : "bg-transparent"} hover:bg-[#374151] rounded-lg items-center p-2 space-x-2 w-full`}
                onClick={handleClick}
            >
                <p className="text-white font-bold text-base w-8">{rank}</p>
                <div className="w-16 h-16 sm:w-24 sm:h-24 flex-shrink-0">
                    <Image
                        src={track.albumImageUrl}
                        alt={`${track.name}`}
                        width={96}
                        height={96}
                        className="rounded-lg"
                    />
                </div>
                <div className="flex flex-col items-start overflow-hidden w-full">
                    <h2 className={`font-bold ${isSelected ? "text-theme-green-1" : "text-white"} text-sm sm:text-base md:text-lg whitespace-nowrap truncate`}>
                        {track.name.length > 35 ? `${track.name.slice(0, 35)}...` : track.name}
                    </h2>
                    {track.artists && (
                        <p className="text-white sm:text-xs text-sm font-medium whitespace-nowrap overflow-ellipsis">
                            {track.artists.join(', ')}
                        </p>
                    )}
                </div>
                {isMobile && (
                    <span className="text-white text-xl font-bold justify-self-end">
                        {isSelected ? '-' : '+'}
                    </span>
                )}
            </button>
            {isMobile && isSelected && (
                <div className="w-full animated-collapse-2">
                    <TrackDetailsPanel track={track} />
                </div>
            )}
        </div>
    );
};

const TracksSelectionList: React.FC<TracksSelectionListProps> = ({ userTopTracks, showMore, selectedTrack, setSelectedTrack }) => {
    const isMobile = useIsMobile();

    if (!userTopTracks) return null;

    return (
        <div className="flex flex-row flex-wrap px-5 sm:flex-col grow items-left gap-2 w-full">
            {userTopTracks
                .slice(0, showMore.itemsToShow)
                .map((track, index) => (
                    <TrackCard
                        key={track.id}
                        track={track}
                        rank={index + 1}
                        isSelected={selectedTrack?.id === track.id}
                        onSelect={setSelectedTrack}
                    />
                ))}
        </div>
    );
};

export default TracksSelectionList;