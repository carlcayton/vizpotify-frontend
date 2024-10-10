import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import UpperSection from '@/components/layout/UpperSection';
import LazyLoadedChart from '@/components/charts/LazyLoadedChart';
import { TimeRange } from '@/components/Analytics/Analytics.types';
import { userAnalyticsService } from '@/services/userAnalyticsService';
import { ArtistTrackCountItem, UserArtistTrackCount } from '@/components/Analytics/Analytics.types';


const UserArtistTrackCountComponent = ({ spotifyId }: { spotifyId: string }) => {
    const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>('shortTerm');

    const { data: artistTrackCount, isLoading, error } = useQuery<UserArtistTrackCount, Error>({
        queryKey: ['artistTrackCount', spotifyId],
        queryFn: () => userAnalyticsService.getUserArtistTrackCount(spotifyId),
        enabled: !!spotifyId,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;

    if (!artistTrackCount || !artistTrackCount.artistTrackCountsByTimeRange[selectedTimeRange]) {
        return null;
    }

    const currentArtistTrackCount = artistTrackCount.artistTrackCountsByTimeRange[selectedTimeRange];

    const chartData = currentArtistTrackCount.map(item => ({
        artist_name: item.artistName,
        track_count: item.trackCount,
        percentage: item.percentage
    }));

    return (
        <div className="flex flex-col justify-center items-center space-y-10 bg-[#111827] w-full">
            <UpperSection
                sectionType="User Artist Track Count Summary"
                selectedTimeRange={selectedTimeRange}
                setSelectedTimeRange={(timeRange: string) => setSelectedTimeRange(timeRange as TimeRange)}
            />
            <div className='flex flex-col xl:flex-row w-full h-full items-center'>
                <LazyLoadedChart data={chartData} chartType="tree" />
            </div>
        </div>
    );
};

export default UserArtistTrackCountComponent;
