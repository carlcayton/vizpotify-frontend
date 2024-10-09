import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import UpperSection from 'components/layout/UpperSection';
import LazyLoadedChart from 'components/charts/LazyLoadedChart';
import { getUserTrackFeatureStats } from 'services/userService';

const UserTrackFeatureStat = ({ spotifyId }) => {
    const [selectedTimeRange, setSelectedTimeRange] = useState('short_term');

    const { data: userTrackFeatureStatData, isLoading, error } = useQuery(
        ['userTrackFeatureStats', spotifyId],
        () => getUserTrackFeatureStats(spotifyId),
        {
            staleTime: 5 * 60 * 1000, // 5 minutes
            cacheTime: 60 * 60 * 1000, // 1 hour
        }
    );

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;

    if (!userTrackFeatureStatData || !userTrackFeatureStatData.genreDistributionsByTimeRange) {
        return null;
    }

    const genreData = userTrackFeatureStatData.genreDistributionsByTimeRange[selectedTimeRange];

    if (!genreData || genreData.length === 0) {
        return null;
    }

    const chartData = {
        labels: genreData.map(item => item.genre),
        datasets: [{
            label: 'Genre Distribution',
            data: genreData.map(item => item.percentage),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }],
    };

    return (
        <div className="flex flex-col justify-center items-center space-y-10 bg-[#111827] w-full">
            <UpperSection 
                sectionType="Genre Distribution" 
                selectedTimeRange={selectedTimeRange} 
                setSelectedTimeRange={setSelectedTimeRange} 
            />
            <LazyLoadedChart data={chartData} chartType="bar" />
            <UpperSection 
                customTWClass={"hidden xl:flex"} 
                sectionType="Genre Distribution" 
                selectedTimeRange={selectedTimeRange} 
                setSelectedTimeRange={setSelectedTimeRange} 
            />
            <LazyLoadedChart data={chartData} chartType="pie" />
        </div>
    );
};

export default UserTrackFeatureStat;
