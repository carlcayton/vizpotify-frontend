import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useIsMobile } from 'utils/detectScreenSize';
import SectionTitle from 'components/common/SectionTitle';
import ProgressBar from 'components/common/ProgressBar';
import { formatDuration, formatDate } from 'utils/util';
import { getTrackAudioFeature } from 'services/musicService';
import Image from 'next/image';

import { Track, AudioFeatures, TrackDetailsPanelProps } from './TopTracks.types';

const AlbumSection: React.FC<{ albumImageUrl: string; albumName: string }> = ({ albumImageUrl, albumName }) => {
    return (
        <div className="flex flex-col align-left space-y-2">
            <SectionTitle sectionName="Album" />
            <div className="flex flex-row items-center gap-8">
                <div className="w-32">
                    <Image
                        src={albumImageUrl}
                        height={100}
                        width={100}
                        layout="responsive"
                        alt={albumName}
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

const AudioFeatureSection: React.FC<{ audioFeatures: AudioFeatures }> = ({ audioFeatures }) => {
    const features = [
        { name: 'Acousticness', value: audioFeatures.acousticness },
        { name: 'Danceability', value: audioFeatures.danceability },
        { name: 'Energy', value: audioFeatures.energy },
        { name: 'Instrumentalness', value: audioFeatures.instrumentalness },
        { name: 'Liveness', value: audioFeatures.liveness },
        { name: 'Speechiness', value: audioFeatures.speechiness },
        { name: 'Valence', value: audioFeatures.valence },
    ];

    return (
        <div>
            <SectionTitle sectionName="Audio Features" />
            <div className="grid grid-cols-2 gap-4">
                {features.map(({ name, value }) => (
                    <div key={name} className="flex flex-col space-y-2">
                        <span className="text-sm text-white font-semibold capitalize">{name}:</span>
                        <ProgressBar percentage={value * 100} />
                    </div>
                ))}
                <div className="col-span-2">
                    <span className="text-sm text-white font-semibold">Tempo:</span>
                    <p className="text-white">{audioFeatures.tempo.toFixed(2)} BPM</p>
                </div>
            </div>
        </div>
    );
}

const TrackDetailsPanel: React.FC<TrackDetailsPanelProps> = ({ track }) => {
    const isMobile = useIsMobile();
    const classForSMScreen = isMobile ? 'border' : 'sticky';

    const { data: audioFeatures, isLoading, error } = useQuery<AudioFeatures, Error>({
        queryKey: ['trackAudioFeatures', track?.id],
        queryFn: () => getTrackAudioFeature(track?.id as string),
        enabled: !!track?.id,
    });

    if (!track) return null;
    if (isLoading) return <div>Loading audio features...</div>;
    if (error) return <div>Error loading audio features: {error.message}</div>;

    return (
        <div className="flex flex-col w-full">
            <div className={`${classForSMScreen} flex-col rounded-lg px-8 py-8 space-y-4 mr-4 top-0 w-full bg-[#1B2539]`}>
                <SectionTitle sectionName="Popularity" />
                <ProgressBar percentage={track.popularity} />
                <AlbumSection albumImageUrl={track.albumImageUrl} albumName={track.albumName} />
                <div className="text-white rounded-lg flex justify-normal">
                    <div className="w-full pr-2">
                        <SectionTitle sectionName="Duration" />
                        <p>{formatDuration(track.duration)}</p>
                    </div>
                    <div className="w-full pl-2">
                        <SectionTitle sectionName="Release Date" />
                        <p>{formatDate(track.releaseDate)}</p>
                    </div>
                </div>
                {audioFeatures && <AudioFeatureSection audioFeatures={audioFeatures} />}
            </div>
        </div>
    );
};

export default TrackDetailsPanel;