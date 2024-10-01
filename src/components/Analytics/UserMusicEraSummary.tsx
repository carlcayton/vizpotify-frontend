import React, { useState, useEffect } from 'react';
import UpperSection from 'components/layout/UpperSection';
import { getDataByTimeRange } from 'utils/util';
import LazyLoadedChart from 'components/charts/LazyLoadedChart';

interface MusicEraItem {
  releaseDateRange: string;
  trackCount: number;
  percentage: number;
}

interface UserMusicEraData {
  shortTerm: MusicEraItem[];
  mediumTerm: MusicEraItem[];
  longTerm: MusicEraItem[];
}

type TimeRange = 'shortTerm' | 'mediumTerm' | 'longTerm';

interface UserMusicEraSummaryProps {
  userMusicEraData: UserMusicEraData;
}

const UserMusicEraSummary = ({ userMusicEraData }: UserMusicEraSummaryProps) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>('shortTerm');
  const [musicEraData, setMusicEraData] = useState<MusicEraItem[]>([]);

  useEffect(() => {
    const data = getDataByTimeRange({ data: userMusicEraData, timeRange: selectedTimeRange });
    setMusicEraData(data);
  }, [userMusicEraData, selectedTimeRange]);

  if (!musicEraData.length) {
    return null;
  }

  const reversedData = [...musicEraData].reverse().filter(item => item.releaseDateRange !== '< 1950');
  const chartData = {
    labels: reversedData.map(item => item.releaseDateRange),
    datasets: [{
      label: 'Percentage',
      data: reversedData.map(item => item.percentage),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }]
  };


  return (
    <div className="flex flex-col justify-center items-center space-y-10 bg-[#111827] w-full">
      <UpperSection 
        sectionType="User Music Era Summary" 
        selectedTimeRange={selectedTimeRange} 
        setSelectedTimeRange={setSelectedTimeRange} 
      />
      <div className='flex flex-col xl:flex-row w-full h-full items-center'>
        <LazyLoadedChart data={chartData} chartType="percentage" />
      </div>
    </div>
  );
};

export default UserMusicEraSummary;