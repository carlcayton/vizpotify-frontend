
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import UpperSection from 'components/layout/UpperSection';
import LazyLoadedChart from 'components/charts/LazyLoadedChart';
import { TimeRange, UserTrackFeatureStats, AnalyticsResponse } from 'components/Analytics/Analytics.types';
import { userAnalyticsService } from 'services/userAnalyticsService';

const UserTrackFeatureStatsComponent = ({ spotifyId }: { spotifyId: string }) => {
    const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>('shortTerm');

    const { data, isLoading, error } = useQuery<AnalyticsResponse<UserTrackFeatureStats>, Error>({
        queryKey: ['trackFeatureStats', spotifyId],
        queryFn: () => userAnalyticsService.getUserTrackFeatureStats(spotifyId),
        enabled: !!spotifyId,
        retry: 3,
        retryDelay: 1000,
        refetchInterval: (query) => {
            return query.state.data?.status === 'processing' ? 5000 : false;
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;

    console.log(data)
    if (data?.status === 'processing') {
        return <div>{data.message}</div>;
    }

    const trackFeatureStats = data?.data;
    if (!trackFeatureStats || !trackFeatureStats.featureStatsByTimeRange[selectedTimeRange]) {
        return null;
    }


    const featureData = trackFeatureStats.featureStatsByTimeRange[selectedTimeRange];

    const chartData = {
        labels: Object.keys(featureData),
        datasets: [{
            label: 'Track Feature Stats',
            data: Object.values(featureData).map(Number),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }],
    };

    return (
        <div className="flex flex-col justify-center items-center space-y-10 bg-[#111827] w-full">
            <UpperSection
                sectionType="Track Feature Stats"
                selectedTimeRange={selectedTimeRange}
                setSelectedTimeRange={(timeRange: string) => setSelectedTimeRange(timeRange as TimeRange)}
            />
            <LazyLoadedChart data={chartData} chartType="radar" />
        </div>
    );
};

export default UserTrackFeatureStatsComponent;
