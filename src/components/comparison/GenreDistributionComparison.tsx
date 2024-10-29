import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, BarChart3, PieChart } from 'lucide-react';
import type {
    GenreDistributionComparisonProps,
    TimeRange,
    ViewType,
    CombinedGenreData
} from '@/types/genreDistribution';

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';

const LoadingSkeleton = () => (
    <div className="space-y-6 w-full p-4">
        <div className="flex justify-between items-center gap-4">
            <Skeleton className="h-8 w-48 bg-gray-700/50" />
            <Skeleton className="h-10 w-32 bg-gray-700/50" />
        </div>
        <div className="flex justify-center">
            <Skeleton className="h-[450px] w-full bg-gray-700/50 rounded-lg" />
        </div>
    </div>
);

const ErrorDisplay = ({ message }: { message: string }) => (
    <Alert variant="destructive" className="bg-red-900 border-red-800">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{message}</AlertDescription>
    </Alert>
);

import { Doughnut } from 'react-chartjs-2';
import { CombinedGenreData } from '@/types/genreDistribution';

interface GenreVisualizationProps {
    data: CombinedGenreData[];
    user1Name: string;
    user2Name: string;
    maxGenres?: number;
}

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload) return null;

    return (
        <div className="bg-gray-800/95 border border-gray-700 p-4 rounded-lg shadow-lg backdrop-blur-sm">
            <p className="text-white font-medium mb-3">{label}</p>
            {payload.map((entry, index) => (
                <div key={index} className="flex items-center gap-3 py-1">
                    <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: entry.fill }}
                    />
                    <p className="text-gray-300">
                        {entry.name}: {entry.value.toFixed(1)}%
                        <span className="text-gray-400 text-sm ml-2">
                            ({entry.payload[`${entry.dataKey.toLowerCase()}Count`]} tracks)
                        </span>
                    </p>
                </div>
            ))}
        </div>
    );
};

export const GenreBarChart: React.FC<GenreVisualizationProps> = ({
    data,
    user1Name,
    user2Name,
    maxGenres = 10
}) => {
    const chartData = React.useMemo(() => {
        return data
            .slice(0, maxGenres)
            .map(item => ({
                genre: item.genre,
                [user1Name]: item.user1Percentage,
                [`${user1Name}Count`]: item.user1Count,
                [user2Name]: item.user2Percentage,
                [`${user2Name}Count`]: item.user2Count,
            }));
    }, [data, user1Name, user2Name, maxGenres]);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                    type="number"
                    stroke="#9CA3AF"
                    tickFormatter={(value) => `${value}%`}
                />
                <YAxis
                    type="category"
                    dataKey="genre"
                    stroke="#9CA3AF"
                    width={90}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ color: '#F9FAFB' }} />
                <Bar
                    dataKey={user1Name}
                    fill="#10B981"
                    radius={[0, 4, 4, 0]}
                />
                <Bar
                    dataKey={user2Name}
                    fill="#6366F1"
                    radius={[0, 4, 4, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export const GenreDoughnutChart: React.FC<GenreVisualizationProps> = ({
    data,
    user1Name,
    user2Name,
    maxGenres = 5
}) => {
    const chartData = React.useMemo(() => ({
        user1Data: {
            labels: data.slice(0, maxGenres).map(d => d.genre),
            datasets: [{
                data: data.slice(0, maxGenres).map(d => d.user1Percentage),
                backgroundColor: [
                    '#10B981', '#34D399', '#6EE7B7', '#A7F3D0', '#D1FAE5',
                ],
                borderColor: '#111827',
                borderWidth: 2,
            }]
        },
        user2Data: {
            labels: data.slice(0, maxGenres).map(d => d.genre),
            datasets: [{
                data: data.slice(0, maxGenres).map(d => d.user2Percentage),
                backgroundColor: [
                    '#6366F1', '#818CF8', '#A5B4FC', '#C7D2FE', '#E0E7FF',
                ],
                borderColor: '#111827',
                borderWidth: 2,
            }]
        }
    }), [data, maxGenres]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    color: '#F9FAFB',
                    padding: 20,
                    font: {
                        size: 12
                    },
                    // Ensure labels don't get cut off
                    textAlign: 'left',
                    boxWidth: 15
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        const count = data.find(d => d.genre === label)?.user1Count || 0;
                        return `${value.toFixed(1)}% (${count} tracks)`;
                    }
                }
            }
        },
        cutout: '60%',
        layout: {
            padding: {
                bottom: 20
            }
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
            {[
                { name: user1Name, data: chartData.user1Data },
                { name: user2Name, data: chartData.user2Data }
            ].map(({ name, data }, index) => (
                <div key={index} className="flex flex-col items-center">
                    <h3 className="text-white mb-4 font-medium">{name}</h3>
                    <div className="relative w-full h-[300px] md:h-[350px]">
                        <Doughnut data={data} options={options} />
                    </div>
                </div>
            ))}
        </div>
    );
};


const GenreDistributionComparison: React.FC<GenreDistributionComparisonProps> = ({
    user1Profile,
    user2Profile,
    genreDistribution,
    isLoading = false,
    error = null
}) => {
    const [timeRange, setTimeRange] = React.useState<TimeRange>('shortTerm');
    const [viewType, setViewType] = React.useState<ViewType>('doughnut');

    // Process the data for visualization
    const processData = React.useCallback((): CombinedGenreData[] => {
        if (!genreDistribution) return [];

        const user1Data = genreDistribution[user1Profile.spotifyId]?.genreDistributionsByTimeRange[timeRange] || [];
        const user2Data = genreDistribution[user2Profile.spotifyId]?.genreDistributionsByTimeRange[timeRange] || [];

        // Create a map of all genres
        const allGenres = new Set([
            ...user1Data.map(item => item.genre),
            ...user2Data.map(item => item.genre)
        ]);

        return Array.from(allGenres).map(genre => {
            const user1Genre = user1Data.find(item => item.genre === genre);
            const user2Genre = user2Data.find(item => item.genre === genre);

            return {
                genre,
                user1Percentage: user1Genre?.percentage || 0,
                user2Percentage: user2Genre?.percentage || 0,
                user1Count: user1Genre?.genreCount || 0,
                user2Count: user2Genre?.genreCount || 0
            };
        }).sort((a, b) =>
            (Math.max(b.user1Percentage, b.user2Percentage)) -
            (Math.max(a.user1Percentage, a.user2Percentage))
        );
    }, [genreDistribution, timeRange, user1Profile.spotifyId, user2Profile.spotifyId]);

    const combinedData = React.useMemo(() => processData(),
        [processData]
    );

    if (isLoading) {
        return (
            <Card className="w-full bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                    <LoadingSkeleton />
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="w-full bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                    <ErrorDisplay message="Failed to load genre distribution data" />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="bg-gray-800/95 border-gray-700 transition-all duration-300">
            <CardHeader className="px-6 pb-4">
                <div className="flex justify-between items-center gap-8">
                    <div className="space-y-1.5">
                        <CardTitle className="text-xl font-medium">Genre Distribution</CardTitle>
                        <CardDescription className="text-sm text-gray-400">
                            Compare music genre preferences between users
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex gap-2 bg-gray-700/50 rounded-lg p-1.5">
                            {[
                                { label: '4 Weeks', value: 'shortTerm' },
                                { label: 'All Time', value: 'longTerm' }
                            ].map(option => (
                                <button
                                    key={option.value}
                                    onClick={() => setTimeRange(option.value)}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 
              ${timeRange === option.value
                                            ? 'bg-gray-600 text-white shadow-sm'
                                            : 'text-gray-400 hover:text-white hover:bg-gray-600/50'}`}

                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                        <Tabs
                            value={viewType}
                            onValueChange={(value: ViewType) => setViewType(value)}
                            className="bg-gray-700 rounded-md p-1"
                        >
                            <TabsList className="grid w-24 grid-cols-2">
                                <TabsTrigger value="doughnut" className="p-2">
                                    <PieChart className="h-4 w-4" />
                                </TabsTrigger>
                                <TabsTrigger value="bar" className="p-2">
                                    <BarChart3 className="h-4 w-4" />
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <div className={`w-full ${viewType === 'doughnut'
                    ? 'min-h-[450px] md:min-h-[200px]'
                    : 'h-[400px]'} 
                    pt-4 px-2`}>
                    {viewType === 'bar' ? (
                        <GenreBarChart
                            data={combinedData}
                            user1Name={user1Profile.displayName}
                            user2Name={user2Profile.displayName}
                            maxGenres={10}
                        />
                    ) : (
                        <GenreDoughnutChart
                            data={combinedData}
                            user1Name={user1Profile.displayName}
                            user2Name={user2Profile.displayName}
                            maxGenres={5}
                        />
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default GenreDistributionComparison;