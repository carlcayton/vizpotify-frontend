import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { useIsMobile } from 'utils/detectScreenSize';

// Register ChartJS components for Radar Chart
ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

const RadarChart = ({ data }) => {
    const options = {

        responsive: true,
        scales: {
            r: {
                angleLines: {
                    color: 'rgba(255, 255, 255, 0.5)' // Adjust the color as needed
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.5)'
                },
                ticks: {
                    color: 'white', // Adjust the color as needed
                    backdropColor: 'transparent', // To make the background transparent
                },
                pointLabels: {
                    color: 'white', // Change to your desired color
                }
            },
        },
        plugins: {
            legend: {
                display: false
            },
        },
    };
    return (
        <div className="h-1/2 w-full sm:w-1/2"> {/* Tailwind classes for width, height, and centering */}
            <Radar data={data} options={options} />
        </div>
    );
};

export default RadarChart;
