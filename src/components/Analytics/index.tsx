import React, { useState, useEffect } from 'react';
import { useAnalyticsData } from 'contexts/AnalyticsContext';
import UserAudioFeatures from './UserAudioFeatures';
import BarChart from 'components/charts/BarChart';
import GenreDistribution from './UserGenreDisitribution';
// import UserMusicEraSummary from './UserMusicEraSummary';

const Analytics = ({ innerRef, userAnalyticsData }) => {
    const audioFeaturesData = userAnalyticsData?.audio_features;
    const genreDistributionData = userAnalyticsData?.genre_distribution;
    const musicEraSummaryData = userAnalyticsData?.music_era_summary;

    return (
        <div ref={innerRef} className="flex flex-col w-full">
            <UserAudioFeatures audioFeaturesData={audioFeaturesData} />
            <GenreDistribution genreDistributionData={genreDistributionData} />
        </div>
    );
};

export default Analytics;
