import React, { useState, useEffect } from 'react';
import { useAnalyticsData } from 'contexts/AnalyticsContext';
import UserAudioFeatures from './UserAudioFeatures';
// import UserGenreDistribution from './UserGenreDistribution';
// import UserMusicEraSummary from './UserMusicEraSummary';

const Analytics = ({ innerRef, userAnalyticsData }) => {
    // const analyticsData = useAnalyticsData();
    // const [selectedTimeRange, setSelectedTimeRange] = useState("shortTerm");

    // // Extract data for each component based on the selected time range
    // const audioFeaturesData = analyticsData?.audio_features;
    // const genreDistributionData = analyticsData?.genreDistribution[selectedTimeRange];
    // const musicEraSummaryData = analyticsData?.musicEraSummary[selectedTimeRange];
    console.log(userAnalyticsData)

    return (
        <div ref={innerRef} className="analytics-container">
        </div>
    );
};

export default Analytics;
