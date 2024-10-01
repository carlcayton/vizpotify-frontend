import React, { useState, useEffect } from 'react';
import { getUserAnalyticsData } from 'services/userService';
import UserTrackFeatureStats from './UserTrackFeatureStats';
import UserGenreDistribution from './UserGenreDistribution';
import UserMusicEraSummary from './UserMusicEraSummary';
import UserArtistTrackCount from './UserArtistTrackCount';

const Analytics = ({ innerRef, spotifyId }) => {
    const [userAnalyticsData, setUserAnalyticsData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchAnalyticsData = async () => {
            if (!spotifyId) return;
            setIsLoading(true);
            try {
                const data = await getUserAnalyticsData(spotifyId);
                setUserAnalyticsData(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching analytics data:', error);
                setIsLoading(false);
            }
        };

        fetchAnalyticsData();
    }, [spotifyId]);

    if (isLoading || !userAnalyticsData) {
        return <div ref={innerRef} className="flex flex-col w-full">Loading analytics...</div>;
    }
    // use camelcase for keys

    const userTrackFeatureStatsData = userAnalyticsData?.userTrackFeatureStats;

    // const genreDistributionData = userAnalyticsData?.user_genre_distribution;
    // const musicEraSummaryData = userAnalyticsData?.user_music_era_summary;
    // const artistTrackCountData = userAnalyticsData?.user_artist_track_count;

    return (
        <div ref={innerRef} className="flex flex-col w-full">
            {/* <UserGenreDistribution genreDistributionData={genreDistributionData} /> */}
            <UserTrackFeatureStats userTrackFeatureStatData={userTrackFeatureStatsData} />
        </div>
    );
};

export default Analytics;