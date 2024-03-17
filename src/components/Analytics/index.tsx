import React, { useState, useEffect } from 'react';
import { getUserAnalyticsData } from 'services/userService';
getUserAnalyticsData
import UserAudioFeatures from './UserAudioFeatures';
import UserGenreDistribution from './UserGenreDistribution';
import UserMusicEraSummary from './UserMusicEraSummary';

const Analytics = ({ innerRef, spotifyId }) => {
    const [userAnalyticsData, setUserAnalyticsData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const POLL_INTERVAL = 3000;
        let intervalId;

        const fetchAnalyticsData = async () => {
            if (!spotifyId) return;

            setIsLoading(true);
            try {
                const data = await getUserAnalyticsData(spotifyId);
                setUserAnalyticsData(data.analyticsData);
                setIsLoading(false);

                if (!data.isProcessing) {
                    console.log(data.analyticsData);
                    clearInterval(intervalId);
                }
            } catch (error) {
                console.error('Error fetching analytics data:', error);
                setIsLoading(false);
            }
        };

        fetchAnalyticsData();
        intervalId = setInterval(fetchAnalyticsData, POLL_INTERVAL);

        return () => clearInterval(intervalId);
    }, [spotifyId]);


    if (isLoading || !userAnalyticsData) {
        return <div ref={innerRef} className="flex flex-col w-full">Loading analytics...</div>;
    }

    const audioFeaturesData = userAnalyticsData?.audio_features;
    const genreDistributionData = userAnalyticsData?.genre_distribution;
    const musicEraSummaryData = userAnalyticsData?.music_era_summary;

    return (
        <div ref={innerRef} className="flex flex-col w-full">
            <UserAudioFeatures audioFeaturesData={audioFeaturesData} />
            <UserGenreDistribution genreDistributionData={genreDistributionData} />
            <UserMusicEraSummary userMusicEraData={musicEraSummaryData} />
            {/* <UserArtistTrackCount userArtistTrackData={artistTrackCountData} /> */}
        </div>
    );
};

export default Analytics;
