import React from 'react';
import { Radar } from 'react-chartjs-2';

const RadarChart = ({ data }) => {
    const options = {

        responsive: true,
        maintainAspectRatio: true,
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
        <div className="flex justify-center items-center">
            <div className="xl:w-1/2">
                <Radar data={data} options={options} />
            </div>
        </div>

    );
};

export default RadarChart;
