import React, { useState } from 'react';
import UpperSection from 'components/layout/UpperSection';
import LazyLoadedChart from 'components/charts/LazyLoadedChart';
import { useGenreDistribution } from 'services/musicService';

const UserTrackFeatureStat = ({ spotifyId }) => {
    const [selectedTimeRange, setSelectedTimeRange] = useState('short_term');
    const { data: genreDistributionData, isLoading, error } = useGenreDistribution(spotifyId);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;

    if (!genreDistributionData || !genreDistributionData[selectedTimeRange]) {
        return null;
    }

    const genreData = genreDistributionData[selectedTimeRange];

    if (genreData.length === 0) {
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
