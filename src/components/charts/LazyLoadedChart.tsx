import React, { useState, useEffect, useRef } from 'react';
import { PercentageBarChart, VerticalBarChart } from './BarChart';
import RadarChart from './RadarChart';
import DoughnutChart from './DoughnutChart';
import TreeMap from './TreeMap';

const LazyLoadedChart = ({ data, chartType }) => {
    const [isVisible, setIsVisible] = useState(false);
    const chartRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        });

        if (chartRef.current) {
            observer.observe(chartRef.current);
        }

        return () => {
            if (chartRef.current) {
                observer.unobserve(chartRef.current);
            }
        };
    }, []);

    const renderChart = () => {
        switch (chartType) {
            case 'percentage':
                return <PercentageBarChart data={data} />;
            case 'vertical':
                return <VerticalBarChart data={data} />;
            case 'radar':
                return <RadarChart data={data} />;
            case 'doughnut':
                return <DoughnutChart data={data} />;
            case 'tree':
                return <TreeMap data={data} />;
            default:
                return <div>Chart type not supported</div>;
        }
    };

    return (
        <div ref={chartRef} className='h-full w-full '>
            {isVisible ? renderChart() : <div>Loading chart...</div>}
        </div>
    );
};

export default LazyLoadedChart;
