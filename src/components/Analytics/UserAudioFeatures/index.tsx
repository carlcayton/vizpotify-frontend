import React, { useState, useEffect } from 'react';
import UpperSection from 'components/composite/UpperSection';
import BarChart from 'components/charts/BarChart';
import { getDataByTimeRange } from 'utils/util';


const AudioFeaturesData = ({ audioFeaturesData }) => {
    console.log(audioFeaturesData)
    const [selectedTimeRange, setSelectedTimeRange] = useState('shortTerm');
    const [audioFeatures, setAudioFeatures] = useState([]);

    useEffect(() => {
        const features = getDataByTimeRange({ data: audioFeaturesData, timeRange: selectedTimeRange });
        setAudioFeatures(features);
    }, [audioFeaturesData, selectedTimeRange]);

    if (!audioFeatures.length) {
        return null;
    }

    const chartData = {
        labels: Object.keys(audioFeatures[0]),
        datasets: [{
            data: Object.values(audioFeatures[0])
                .filter(value => typeof value === 'number')
                .map(value => value * 100),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }],
    };

    return (
        <div className="flex flex-col justify-center items-center space-y-10 bg-[#111827] w-full">
            <UpperSection sectionType="Audio Features" selectedTimeRange={selectedTimeRange} setSelectedTimeRange={setSelectedTimeRange} />
            <BarChart data={chartData} />
        </div>
    );
};

export default AudioFeaturesData;