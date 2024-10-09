import React, { useState, useEffect } from 'react';
import UpperSection from 'components/layout/UpperSection';
import { getDataByTimeRange } from 'utils/util';
import LazyLoadedChart from 'components/charts/LazyLoadedChart';

const UserTrackFeatureStat= ({ userTrackFeatureStatData }) => {
    const [selectedTimeRange, setSelectedTimeRange] = useState('shortTerm');
    const [userTrackFeaturesStat, setUserTrackFeaturesStat] = useState([]);
    

    useEffect(() => {
        const features = getDataByTimeRange({ data: userTrackFeatureStatData, timeRange: selectedTimeRange });
        setUserTrackFeaturesStat(features);
    }, [userTrackFeatureStatData, selectedTimeRange]);

    if (!userTrackFeaturesStat.length) {
        return null;
    }

    const chartData = {
        labels: Object.keys(userTrackFeatureStat[0]),
        datasets: [{
            label: 'Percentage',
            data: Object.values(userTrackFeatureStat[0])
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
