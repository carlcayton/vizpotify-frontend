import React, { useState } from 'react';
import { useQuery } from 'react-query';
import UpperSection from 'components/layout/UpperSection';
import { getDataByTimeRange } from 'utils/util';
import LazyLoadedChart from 'components/charts/LazyLoadedChart';
import { getUserTrackFeatureStats } from 'services/userService';

const UserTrackFeatureStat = ({ spotifyId }) => {
    const [selectedTimeRange, setSelectedTimeRange] = useState('shortTerm');

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

    const userTrackFeaturesStat = getDataByTimeRange({ data: userTrackFeatureStatData, timeRange: selectedTimeRange });

    if (!userTrackFeaturesStat.length) {
        return null;
    }

    const chartData = {
        labels: Object.keys(userTrackFeaturesStat[0]),
        datasets: [{
            label: 'Percentage',
            data: Object.values(userTrackFeaturesStat[0])
                .filter(value => typeof value === 'number')
                .map(value => value * 100),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }],
    };

    return (
        <div className="flex flex-col justify-center items-center space-y-10 bg-[#111827] w-full">
            <UpperSection sectionType="Track Features" selectedTimeRange={selectedTimeRange} setSelectedTimeRange={setSelectedTimeRange} />
            <LazyLoadedChart data={chartData} chartType="percentage" />
            <UpperSection customTWClass={"hidden xl:flex"} sectionType="Track Features" selectedTimeRange={selectedTimeRange} setSelectedTimeRange={setSelectedTimeRange} />
            <LazyLoadedChart data={chartData} chartType="radar" />
        </div>
    );
};

export default UserTrackFeatureStat;
