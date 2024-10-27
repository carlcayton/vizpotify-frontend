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

const LoadingSkeleton = () => (
    <div className="space-y-4 w-full">
        <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-48 bg-gray-700" />
            <Skeleton className="h-10 w-32 bg-gray-700" />
        </div>
        <div className="flex justify-center">
            <Skeleton className="h-[400px] w-full bg-gray-700" />
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

// Custom tooltip for the bar chart
const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload) return null;

    return (
        <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg shadow-lg">
            <p className="text-white font-medium mb-2">{label}</p>
            {payload.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
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
    const chartData = React.useMemo(() => {
        const user1Data = {
            labels: data.slice(0, maxGenres).map(d => d.genre),
            datasets: [{
                data: data.slice(0, maxGenres).map(d => d.user1Percentage),
                backgroundColor: [
                    '#10B981', '#34D399', '#6EE7B7', '#A7F3D0', '#D1FAE5',
                ],
                borderColor: '#111827',
                borderWidth: 2,
            }]
        };

        const user2Data = {
            labels: data.slice(0, maxGenres).map(d => d.genre),
            datasets: [{
                data: data.slice(0, maxGenres).map(d => d.user2Percentage),
                backgroundColor: [
                    '#6366F1', '#818CF8', '#A5B4FC', '#C7D2FE', '#E0E7FF',
                ],
                borderColor: '#111827',
                borderWidth: 2,
            }]
        };

        return { user1Data, user2Data };
    }, [data, maxGenres]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    color: '#F9FAFB',
                    padding: 20,
                    font: {
                        size: 12
                    }
                }
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
        cutout: '60%'
    };

    return (
        <div className="grid grid-cols-2 gap-8 h-full">
            <div className="flex flex-col items-center">
                <h3 className="text-white mb-4">{user1Name}</h3>
                <Doughnut data={chartData.user1Data} options={options} />
            </div>
            <div className="flex flex-col items-center">
                <h3 className="text-white mb-4">{user2Name}</h3>
                <Doughnut data={chartData.user2Data} options={options} />
            </div>
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
        <Card className="w-full bg-gray-800 border-gray-700">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-white">Genre Distribution</CardTitle>
                        <CardDescription className="text-gray-400">
                            Compare music genre preferences between users
                        </CardDescription>
                    </div>
                    <div className="flex gap-4">
                        <Select
                            value={timeRange}
                            onValueChange={(value: TimeRange) => setTimeRange(value)}
                        >
                            <SelectTrigger className="w-[180px] bg-gray-700 border-gray-600">
                                <SelectValue placeholder="Select time range" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 border-gray-600">
                                <SelectItem value="shortTerm">Last 4 Weeks</SelectItem>
                                <SelectItem value="mediumTerm">Last 6 Months</SelectItem>
                                <SelectItem value="longTerm">All Time</SelectItem>
                            </SelectContent>
                        </Select>

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
                <div className="h-[500px] w-full">
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