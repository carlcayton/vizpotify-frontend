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
                    font: {
                        size: 14
                    }
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
        <div className="h-full w-full">
            <Radar data={data} options={options} />
        </div>
    );
};

export default RadarChart;
