import Image from "next/image";
import React, { useContext, useState, useEffect } from 'react';
import { SelectedTrackContext, SelectedTrackProvider } from 'contexts/SelectedTrackContext';
import { useIsMobile } from 'utils/detectScreenSize';
import { formatDuration, formatDate } from 'utils/util';
import SectionTitle from 'components/base/SectionTitle';
import ProgressBar from 'components/base/ProgressBar';
import { useStoreTrackDetails, useTrackDetails } from "contexts/TrackDetailContext";
import { getTrackAudioFeature } from "pages/api/dashboard/dashboardApi";

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

const AudioFeatureSection = ({ audioFeatures }) => {
    if (!audioFeatures) {
        return null;
    }
    const { id, tempo, ...otherFeatures } = audioFeatures;
    return (
        <div>
            <SectionTitle sectionName={"Audio Features"} />
            <div className="grid grid-cols-2 gap-4">
                {Object.entries(otherFeatures).map(([key, value]) => (
                    <div key={key} className="flex flex-col space-y-2">
                        <span className="text-sm text-white font-semibold capitalize">{key}:</span>
                        <ProgressBar percentage={value * 100} />
                    </div>
                ))}
            </div>
        </div>
    );
}

const TrackDetailsPanel = () => {
    const isMobile = useIsMobile();
    const classForSMScreen = isMobile ? 'border' : 'sticky';

    const selectedTrack = useContext(SelectedTrackContext);
    const track = selectedTrack;
    const trackDetails = useTrackDetails()
    const storeTrackDetails = useStoreTrackDetails()
    const [audioFeatures, setAudioFeatures] = useState(null);

    useEffect(() => {
        if (selectedTrack) {
            const details = trackDetails ? trackDetails[selectedTrack.id] : undefined;
            if (details) {
                setAudioFeatures(details.audioFeatures);
            } else {
                getTrackAudioFeature(selectedTrack.id)
                    .then(data => {
                        setAudioFeatures(data);
                        if (storeTrackDetails) {
                            storeTrackDetails(selectedTrack.id, {
                                audioFeatures: data
                            });
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching audio features:', error);
                    });
            }
        }
    }, [selectedTrack, trackDetails, storeTrackDetails]);

    if (!track) {
        return null;
    }

    return (
        <div className="flex flex-col w-full">
            <div
                className={` ${classForSMScreen} 
        flex-col rounded-lg px-8 py-8 space-y-4  mr-4 top-0 w-full bg-[#1B2539]`}
            >

                <SectionTitle sectionName={"Popularity"} />
                <ProgressBar percentage={track.popularity} />
                <AlbumSection albumImageUrl={track.albumImageUrl} albumName={track.albumName} />
                <div className="text-white rounded-lg flex justify-normal">
                    <div className="w-full">
                        <SectionTitle sectionName={"Duration"} />
                        <p className="">{formatDuration(track.duration)}</p>
                    </div>
                    <div className="w-full">
                        <SectionTitle sectionName={"Release Date"} />
                        <p className="">{formatDate(track.releaseDate)}</p>
                    </div>
                </div>
                <AudioFeatureSection audioFeatures={audioFeatures} />

            </div>
        </div>
    );
};

export default TrackDetailsPanel;
