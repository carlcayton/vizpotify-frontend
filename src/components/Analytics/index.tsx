import React, { useState, useEffect } from 'react';
import { useAnalyticsData } from 'contexts/AnalyticsContext';
import UserAudioFeatures from './UserAudioFeatures';
import GenreDistribution from './UserGenreDisitribution';
import UserMusicEraSummary from './UserMusicEraSummary';
import UserArtistTrackCount from './UserArtistTrackCount';

const Analytics = ({ innerRef, userAnalyticsData }) => {
    const audioFeaturesData = userAnalyticsData?.audio_features;
    const genreDistributionData = userAnalyticsData?.genre_distribution;
    const musicEraSummaryData = userAnalyticsData?.music_era_summary;
    // const artistTrackCountData = userAnalyticsData?.artist_track_count;

    return (
        <div ref={innerRef} className="flex flex-col w-full">
            <UserAudioFeatures audioFeaturesData={audioFeaturesData} />
            <GenreDistribution genreDistributionData={genreDistributionData} />
            <UserMusicEraSummary userMusicEraData={musicEraSummaryData} />
            {/* <UserArtistTrackCount userArtistTrackData={artistTrackCountData} /> */}
        </div>
    );
};

export default Analytics;
