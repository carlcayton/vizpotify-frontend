import Image from "next/image";
import React, { useContext, useState, useEffect } from 'react';
import { SelectedTrackContext } from 'contexts/SelectedTrackContext';
import { useIsMobile } from 'utils/detectScreenSize';
import { formatDuration, formatDate } from 'utils/util';
import SectionTitle from 'components/base/SectionTitle';
import ProgressBar from 'components/base/ProgressBar';

const AlbumSection = ({ albumImageUrl, albumName }) => {
    return (

        <div className="flex flex-col align-left space-y-2">
            <SectionTitle sectionName={"Album"} />
            <div className="flex flex-row items-center gap-8">
                <div className="w-32">
                    <Image
                        src={albumImageUrl}
                        height="100%"
                        width="100%"
                        layout="responsive"
                        // objectFit="cover"
                        alt={`${albumName}`}
                        className="rounded-lg"
                    />
                </div>
                <p className="text-xl font-bold text-white">
                    {albumName}
                </p>
            </div>
        </div>
    )
}
const TrackDetailsPanel = () => {
    const selectedTrack = useContext(SelectedTrackContext);
    const track = selectedTrack;
    const isMobile = useIsMobile();
    const classForSMScreen = isMobile ? 'border' : 'sticky';

    // Assuming getTrackExtraInfo is a function that fetches additional information about the track
    //   const [trackDetails, setTrackDetails] = useState(null);

    //   useEffect(() => {
    //     if (selectedTrack) {
    //       getTrackExtraInfo(selectedTrack.id)
    //         .then(data => {
    //           setTrackDetails(data);
    //         })
    //         .catch(error => {
    //           console.error('Error fetching track details:', error);
    //         });
    //     }
    //   }, [selectedTrack]);
    if (!track) {
        return null;
    }

    return (
        <div className="flex flex-col w-full">
            <div
                className={` ${classForSMScreen} 
        flex-col rounded-lg px-6 py-6 space-y-4  mr-4 top-0 w-full bg-[#1B2539]`}
            >
                {/* Render AttributesPanel only if track.attributes is not empty */}
                {/* {track.attributes && track.attributes.length > 0 && (
                <AttributesPanel attributes={track.attributes} />
            )} */}

                <SectionTitle sectionName={"Popularity"} />
                <ProgressBar percentage={track.popularity} />
                <AlbumSection albumImageUrl={track.albumImageUrl} albumName={track.albumName} />
                <div className="text-white rounded-lg flex justify-between">
                    <div>
                        <SectionTitle sectionName={"Duration"} />
                        <p className="">{formatDuration(track.duration)}</p>
                    </div>
                    <div>
                        <SectionTitle sectionName={"Release Date"} />
                        <p className="">{formatDate(track.releaseDate)}</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TrackDetailsPanel;
