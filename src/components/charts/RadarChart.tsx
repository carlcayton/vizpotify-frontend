import React from 'react';
import { Radar } from 'react-chartjs-2';

const RadarChart = ({ data }) => {
    const options = {

        responsive: true,
        scales: {
            r: {
                angleLines: {
                    color: 'rgba(255, 255, 255, 0.5)'
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.5)'
                },
                ticks: {
                    color: 'white',
                    backdropColor: 'transparent',
                },
                pointLabels: {
                    color: 'white',
                }
            },
        },
        plugins: {
            legend: {
                display: false
            },
            datalabels: {
                display: false
            }
        },
    };
    return (
        <div className="h-1/2 w-full sm:w-1/2">
            <Radar data={data} options={options} />
        </div>
    );
};

export default RadarChart;
