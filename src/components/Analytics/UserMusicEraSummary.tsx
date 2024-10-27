import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import UpperSection from '@/components/layout/UpperSection';
import LazyLoadedChart from '@/components/charts/LazyLoadedChart';
import { userAnalyticsService } from '@/services/userAnalyticsService';
import { TimeRange, UserMusicEraSummary, AnalyticsResponse } from '@/components/Analytics/Analytics.types';


const UserMusicEraSummaryComponent = ({ spotifyId }: { spotifyId: string }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>('shortTerm');

  const { data, isLoading, error } = useQuery<AnalyticsResponse<UserMusicEraSummary>, Error>({
    queryKey: ['musicEraSummary', spotifyId],
    queryFn: () => userAnalyticsService.getUserMusicEraSummary(spotifyId),
    enabled: !!spotifyId,
    retry: 3,
    retryDelay: 5000,
    refetchInterval: (query) => {
      return query.state.data?.status === 'processing' ? 5000 : false;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  if (data?.status === 'processing') {
    return <div>{data.message}</div>;
  }

  const musicEraSummary = data?.data;
  if (!musicEraSummary || !musicEraSummary.eraSummariesByTimeRange[selectedTimeRange]) {
    return null;
  }


  const currentEraSummary = musicEraSummary.eraSummariesByTimeRange[selectedTimeRange];
  const reversedData = [...currentEraSummary].reverse().filter(item => item.releaseDateRange !== '< 1950');

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
        setSelectedTimeRange={(timeRange: string) => setSelectedTimeRange(timeRange as TimeRange)}
      />
      <div className='flex flex-col xl:flex-row w-full h-full items-center'>
        <LazyLoadedChart data={chartData} chartType="percentage" />
      </div>
    </div>
  );
};

export default UserMusicEraSummaryComponent;
