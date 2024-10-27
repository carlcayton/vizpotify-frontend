import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import UpperSection from '@/components/layout/UpperSection';
import LazyLoadedChart from '@/components/charts/LazyLoadedChart';
import { TimeRange, UserGenreDistribution, AnalyticsResponse } from '@/components/Analytics/Analytics.types';
import { userAnalyticsService } from '@/services/userAnalyticsService';

const UserGenreDistributionComponent = ({ spotifyId }: { spotifyId: string }) => {
    const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>('shortTerm');

    const { data, isLoading, error } = useQuery<AnalyticsResponse<UserGenreDistribution>, Error>({
        queryKey: ['genreDistribution', spotifyId],
        queryFn: () => userAnalyticsService.getUserGenreDistribution(spotifyId),
        enabled: !!spotifyId,
        retry: 3,
        retryDelay: 3000,
        refetchInterval: (query) => {
            return query.state.data?.status === 'processing' ? 5000 : false;
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;

    if (data?.status === 'processing') {
        return <div>{data.message}</div>;
    }

    const genreDistribution = data?.data;
    if (!genreDistribution || !genreDistribution.genreDistributionsByTimeRange[selectedTimeRange]) {
        return null;
    }

    const currentDistribution = genreDistribution.genreDistributionsByTimeRange[selectedTimeRange];

    const frequencyChartData = {
        labels: currentDistribution.map(item => item.genre),
        datasets: [{
            label: 'Genre Frequency',
            data: currentDistribution.map(item => item.genreCount),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }],
    };

    const percentageChartData = {
        labels: currentDistribution.map(item => item.genre),
        datasets: [{
            label: 'Genre Percentage',
            data: currentDistribution.map(item => item.percentage),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }],
    };

    return (
        <div className="flex flex-col justify-center items-center space-y-10 bg-[#111827] w-full">
            <UpperSection
                sectionType="Genre Distribution (Count)"
                selectedTimeRange={selectedTimeRange}
                setSelectedTimeRange={(timeRange: string) => setSelectedTimeRange(timeRange as TimeRange)}
            />
            <LazyLoadedChart data={frequencyChartData} chartType="vertical" />
            <UpperSection
                customTWClass={"hidden xl:flex"}
                sectionType="Genre Distribution (Percentage)"
                selectedTimeRange={selectedTimeRange}
                setSelectedTimeRange={(timeRange: string) => setSelectedTimeRange(timeRange as TimeRange)}
            />
            <LazyLoadedChart data={percentageChartData} chartType="doughnut" />
        </div>
    );
};

export default UserGenreDistributionComponent;
