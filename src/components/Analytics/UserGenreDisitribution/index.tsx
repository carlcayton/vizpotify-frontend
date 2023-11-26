import React, { useState, useEffect, useMemo } from 'react';
import UpperSection from 'components/composite/UpperSection';
import LazyLoadedChart from 'components/charts/LazyLoadedChart';
import { getDataByTimeRange } from 'utils/util';

const GenreDistributionData = ({ genreDistributionData }) => {
    const [selectedTimeRange, setSelectedTimeRange] = useState('shortTerm');
    const [genreDistribution, setGenreDistribution] = useState([]);

    useEffect(() => {
        const distribution = getDataByTimeRange({ data: genreDistributionData, timeRange: selectedTimeRange });
        setGenreDistribution(distribution);
    }, [genreDistributionData, selectedTimeRange]);

    if (!genreDistribution.length) {
        return <div>Loading or Placeholder Content</div>;
    }

    const percentageChartData = {
        labels: genreDistribution.map(item => item.genre),
        datasets: [{
            label: 'Percentage',
            data: genreDistribution.map(item => item.percentage),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }],
        title: "Genre Percentage Distribution"
    };

    const frequencyChartData = {
        labels: genreDistribution.map(item => item.genre),
        datasets: [{
            label: 'Frequency',
            data: genreDistribution.map(item => item.genre_count),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }],
        title: "Genre Frequency Distribution"
    };

    return (
        <div className="flex flex-col justify-center items-center space-y-10 bg-[#111827] w-full">
            <UpperSection sectionType="Genre Distribution" selectedTimeRange={selectedTimeRange} setSelectedTimeRange={setSelectedTimeRange} />
            <div className='flex flex-col xl:flex-row w-full h-full items-center'>
                <LazyLoadedChart data={frequencyChartData} chartType="vertical" />
                <LazyLoadedChart data={percentageChartData} chartType="doughnut" />
            </div>
        </div>
    );
};

export default GenreDistributionData;
