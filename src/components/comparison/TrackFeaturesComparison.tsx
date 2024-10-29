import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import {
    ResponsiveContainer,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    Legend,
    Tooltip
} from 'recharts';
import { TimeRange, TIME_RANGE_OPTIONS } from '@/types/common';

const FEATURE_LABELS = {
    acousticness: 'Acoustic',
    danceability: 'Danceable',
    energy: 'Energetic',
    instrumentalness: 'Instrumental',
    liveness: 'Live-sounding',
    speechiness: 'Speech-like',
    valence: 'Positive'
};


const TrackFeaturesComparison = ({
    user1Profile,
    user2Profile,
    trackFeatureStats,
    isLoading,
    error
}) => {
    const [timeRange, setTimeRange] = React.useState<TimeRange>('shortTerm');


    const processData = React.useCallback(() => {
        if (!trackFeatureStats || !user1Profile?.spotifyId || !user2Profile?.spotifyId) {
            return [];
        }

        try {
            const user1Features = trackFeatureStats[user1Profile.spotifyId]?.featureStatsByTimeRange[timeRange] || {};
            const user2Features = trackFeatureStats[user2Profile.spotifyId]?.featureStatsByTimeRange[timeRange] || {};

            return Object.entries(FEATURE_LABELS).map(([key, label]) => ({
                feature: label,
                [user1Profile.displayName]: parseFloat(user1Features[key] || '0') * 100,
                [user2Profile.displayName]: parseFloat(user2Features[key] || '0') * 100
            }));
        } catch (error) {
            console.error('Error processing track features:', error);
            return [];
        }
    }, [trackFeatureStats, timeRange, user1Profile, user2Profile]);

    const getMemoizedFeatures = React.useCallback((features: any) => {
        if (!features) return {};
        return Object.entries(features).reduce((acc, [key, value]) => ({
            ...acc,
            [key]: typeof value === 'string' ? parseFloat(value) : value
        }), {});
    }, []);

    const user1Features = React.useMemo(() =>
        getMemoizedFeatures(trackFeatureStats[user1Profile.spotifyId]?.featureStatsByTimeRange[timeRange]),
        [trackFeatureStats, user1Profile.spotifyId, timeRange, getMemoizedFeatures]
    );

    const user2Features = React.useMemo(() =>
        getMemoizedFeatures(trackFeatureStats[user2Profile.spotifyId]?.featureStatsByTimeRange[timeRange]),
        [trackFeatureStats, user2Profile.spotifyId, timeRange, getMemoizedFeatures]
    );
    const chartData = React.useMemo(() => processData(), [processData]);

    if (isLoading) {
        return (
            <Card className="w-full bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                    <div className="h-[450px] bg-gray-700/50 rounded-lg animate-pulse" />
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="w-full bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                    <div className="text-red-400">Failed to load track features data</div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full bg-gray-800 border-gray-700">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-white">Track Features Analysis</CardTitle>
                        <CardDescription className="text-gray-400">
                            Compare audio characteristics of your music
                        </CardDescription>
                    </div>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger className="w-[180px] bg-gray-700 border-gray-600">
                            <SelectValue placeholder="Select time range" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                            {TIME_RANGE_OPTIONS.map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-[450px] w-full">
                    <ResponsiveContainer>
                        <RadarChart data={chartData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                            <PolarGrid stroke="#374151" />
                            <PolarAngleAxis
                                dataKey="feature"
                                tick={{ fill: '#9CA3AF' }}
                            />
                            <PolarRadiusAxis
                                angle={30}
                                domain={[0, 100]}
                                tick={{ fill: '#9CA3AF' }}
                                tickFormatter={(value) => `${value}%`}
                            />
                            <Radar
                                name={user1Profile.displayName}
                                dataKey={user1Profile.displayName}
                                stroke="#10B981"
                                fill="#10B981"
                                fillOpacity={0.3}
                            />
                            <Radar
                                name={user2Profile.displayName}
                                dataKey={user2Profile.displayName}
                                stroke="#6366F1"
                                fill="#6366F1"
                                fillOpacity={0.3}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1F2937',
                                    border: '1px solid #374151',
                                    borderRadius: '6px'
                                }}
                                labelStyle={{ color: '#F9FAFB' }}
                                formatter={(value) => `${value.toFixed(1)}%`}
                            />
                            <Legend
                                wrapperStyle={{ color: '#F9FAFB' }}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default TrackFeaturesComparison;