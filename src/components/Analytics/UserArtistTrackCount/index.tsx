import React, { useState, useEffect } from 'react';
import UpperSection from 'components/composite/UpperSection';
import LazyLoadedChart from 'components/charts/LazyLoadedChart';
import { getDataByTimeRange } from 'utils/util';

const UserArtistTrackCount = ({ userArtistTrackData }) => {
    const [selectedTimeRange, setSelectedTimeRange] = useState('shortTerm');
    const [artistTrackData, setArtistTrackData] = useState([]);

    useEffect(() => {
        const data = getDataByTimeRange({ data: userArtistTrackData, timeRange: selectedTimeRange });
        setArtistTrackData(data);
    }, [userArtistTrackData, selectedTimeRange]);

    if (!artistTrackData.length) {
        return null;
    }

    const chartData = artistTrackData.map((artist, index) => ({
        artist_name: artist.artist_name,
        track_count: artist.track_count
    }));

    return (
        <div className="flex flex-col justify-center items-center space-y-10 bg-[#111827] w-full">
            <UpperSection sectionType="User Artist Track Count Summary" selectedTimeRange={selectedTimeRange} setSelectedTimeRange={setSelectedTimeRange} />
            <div className='flex flex-col xl:flex-row w-full h-full items-center'>
                <LazyLoadedChart data={chartData} chartType={"tree"} />
            </div>
        </div>
    );
};

export default UserArtistTrackCount;
