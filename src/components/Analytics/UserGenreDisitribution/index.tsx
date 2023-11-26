import React, { useState, useEffect, useMemo } from 'react';
import UpperSection from 'components/composite/UpperSection';
import LazyLoadedChart from 'components/charts/LazyLoadedChart'; 
import { getDataByTimeRange } from 'utils/util';

const GenreDistributionData = ({ genreDistributionData }) => {
    const [selectedTimeRange, setSelectedTimeRange] = useState('shortTerm');
    const [genreDistribution, setGenreDistribution] = useState([]);
    const [displayMode, setDisplayMode] = useState('percentage'); 

    useEffect(() => {
        const distribution = getDataByTimeRange({ data: genreDistributionData, timeRange: selectedTimeRange });
        setGenreDistribution(distribution);
    }, [genreDistributionData, selectedTimeRange]);

    const chartData = useMemo(() => {
        const labels = genreDistribution.map(item => item.genre);
        const data = genreDistribution.map(item => displayMode === 'percentage' ? item.percentage : item.genre_count);

        return {
            labels,
            datasets: [{
                label: displayMode === 'percentage' ? 'Percentage' : 'Count',
                data,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                borderColor: 'rgba(53, 162, 235, 1)',
                borderWidth: 1,
            }],
        };
    }, [genreDistribution, displayMode]);

    if (!genreDistribution.length) {
        return <div>Loading or Placeholder Content</div>;
    }

    return (
        <div className="flex flex-col justify-center items-center space-y-10 bg-[#111827] w-full">
            <UpperSection sectionType="Genre Distribution" selectedTimeRange={selectedTimeRange} setSelectedTimeRange={setSelectedTimeRange} />
            {displayMode === 'percentage' ?
                <LazyLoadedChart data={chartData} chartType="doughnut" /> :
                <LazyLoadedChart data={chartData} chartType="vertical" />
            }
        </div>
    );
};

export default GenreDistributionData;

