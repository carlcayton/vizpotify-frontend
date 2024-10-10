import React from 'react';

import UserTrackFeatureStatsComponent from '@/components/Analytics/UserTrackFeatureStats';
import UserGenreDistribution from '@/components/Analytics/UserGenreDistribution';
import UserMusicEraSummary from '@/components/Analytics/UserMusicEraSummary';
import UserArtistTrackCount from '@/components/Analytics/UserArtistTrackCount';

const Analytics = ({ spotifyId }: { spotifyId: string }) => {
    if (!spotifyId) {
        return <div className="flex flex-col w-full">No Spotify ID provided</div>;
    }

    return (
        <div className="flex flex-col w-full">
            <UserTrackFeatureStatsComponent spotifyId={spotifyId} />
            <UserGenreDistribution spotifyId={spotifyId} />
            <UserMusicEraSummary spotifyId={spotifyId} />
            <UserArtistTrackCount spotifyId={spotifyId} />
        </div>
    );
};

export default Analytics;
