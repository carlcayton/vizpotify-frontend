import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    BarController,
    Tooltip,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

// Register ChartJS components using ChartJS.register
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    BarController,
    Tooltip,
);
const BarChart = ({ data }) => {
    const options = {
        indexAxis: 'y',
        responsive: true,
        scales: {
            y: {
                ticks: {
                    color: 'white', // Set y-axis tick color to white
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)' // Optional: Adjust grid line color
                }
            },
            x: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    color: 'white', // Set x-axis tick color to white
                    font: {
                    }
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
        },
        animation: {
            duration: 5000,
            easing: 'easeOutCubic',
        },

    };

    return (
        <Bar data={data} options={options} />
    );
};

export default BarChart;