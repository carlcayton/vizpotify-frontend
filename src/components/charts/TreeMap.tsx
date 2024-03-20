import React from 'react';
import { Chart } from 'react-google-charts';


const treemapColors = {
    primary: '#00AEEF',
    secondary: ['#007C92', '#005B6E', '#003D4A'],
    text: '#FFFFFF',
    grid: 'rgba(255, 255, 255, 0.1)',
};

const TreemapChart = ({ data }) => {
    console.log(data)
    const chartData = [
        ['Artist', 'Parent', 'Track Count (size)'],
        ['Artists', null, 0],
    ];

    data.forEach((item) => {
        const nameWithCount = `${item.artist_name} (${item.track_count})`;
        chartData.push([nameWithCount, 'Artists', item.track_count]);
    })

    return (
        <Chart
            width={'100%'}
            height={'500px'}
            chartType="TreeMap"
            loader={<div>Loading Chart</div>}
            data={chartData}
            options={{
                minColor: treemapColors.secondary[2],
                midColor: treemapColors.primary,
                maxColor: treemapColors.secondary[0],
                headerHeight: 15,
                fontColor: treemapColors.text,
                showScale: true,
                maxDepth: 0,
            }}
            rootProps={{ 'data-testid': '1' }}
        />
    );
};

export default TreemapChart;
