import React, { useState, useEffect } from 'react';
import BarChart from 'components/charts/BarChart';
import { getDataByTimeRange } from 'utils/util';

const UserAudioFeatures = ({ innerRef, userAudioFeaturesData }) => {
    const [selectedTimeRange, setSelectedTimeRange] = useState("shortTerm");
    const [audioFeatures, setAudioFeatures] = useState([]);

    useEffect(() => {
        if (userAudioFeaturesData) {
            const features = ({ userAudioFeaturesData, timeRange: selectedTimeRange });
            setAudioFeatures(features);
        }
    }, [userAudioFeaturesData, selectedTimeRange]);


    const dataForChart = {
        labels: audioFeatures.length > 0 ? Object.keys(audioFeatures[0]) : [],
        datasets: [{
            label: 'Audio Features',
            data: audioFeatures.length > 0 ? Object.values(audioFeatures[0]) : [],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }],
    };

    return (
        <div ref={innerRef} className="flex flex-col justify-center items-center space-y-10 bg-[#111827] w-full">
            <UpperSection sectionType={"Audio Features"} selectedTimeRange={selectedTimeRange} setSelectedTimeRange={setSelectedTimeRange} />
            <BarChart data={dataForChart} />
        </div>
    );
};

export default UserAudioFeatures;