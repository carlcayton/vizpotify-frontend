import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
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

const MusicEraComparison = ({
    user1Profile,
    user2Profile,
    musicEraSummary
}) => {
    const [selectedTimeRange, setSelectedTimeRange] = React.useState('shortTerm');

    console.log(musicEraSummary)
    const processChartData = () => {
        const user1Data = musicEraSummary[user1Profile.spotifyId]?.eraSummariesByTimeRange[selectedTimeRange] || [];
        const user2Data = musicEraSummary[user2Profile.spotifyId]?.eraSummariesByTimeRange[selectedTimeRange] || [];

        // Create combined data for the chart
        return user1Data.map(era1 => {
            const era2 = user2Data.find(e => e.releaseDateRange === era1.releaseDateRange);
            return {
                era: era1.releaseDateRange,
                [user1Profile.displayName]: parseFloat(era1.percentage.toFixed(1)),
                [user2Profile.displayName]: era2 ? parseFloat(era2.percentage.toFixed(1)) : 0
            };
        }).sort((a, b) => {
            // Custom sort order for eras
            const eraOrder = ['2020s', '2010s', '2000s', '1990s', '1980s', '1970s', '1960s', '1950s', '< 1950'];
            return eraOrder.indexOf(a.era) - eraOrder.indexOf(b.era);
        });
    };

    const chartData = processChartData();

    return (
        <Card className="w-full bg-gray-800 border-gray-700">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-white">Music Era Comparison</CardTitle>
                        <CardDescription className="text-gray-400">
                            Compare music preferences across different decades
                        </CardDescription>
                    </div>
                    <Select
                        value={selectedTimeRange}
                        onValueChange={setSelectedTimeRange}
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
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis
                                dataKey="era"
                                stroke="#9CA3AF"
                                tickLine={false}
                            />
                            <YAxis
                                stroke="#9CA3AF"
                                tickLine={false}
                                label={{
                                    value: 'Percentage (%)',
                                    angle: -90,
                                    position: 'insideLeft',
                                    style: { fill: '#9CA3AF' }
                                }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1F2937',
                                    border: '1px solid #374151',
                                    borderRadius: '6px'
                                }}
                                labelStyle={{ color: '#F9FAFB' }}
                                itemStyle={{ color: '#F9FAFB' }}
                            />
                            <Legend wrapperStyle={{ color: '#F9FAFB' }} />
                            <Bar
                                dataKey={user1Profile.displayName}
                                fill="#10B981"
                                radius={[4, 4, 0, 0]}
                            />
                            <Bar
                                dataKey={user2Profile.displayName}
                                fill="#6366F1"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default MusicEraComparison;