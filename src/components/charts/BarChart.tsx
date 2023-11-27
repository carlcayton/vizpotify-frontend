import React from 'react';
import { Bar } from 'react-chartjs-2';



const PercentageBarChart = ({ data }) => {
    const options = {
        indexAxis: 'y',
        responsive: true,
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    color: 'white',
                    callback: (value) => `${value}%`,
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            },
            y: {
                ticks: {
                    color: 'white',
                    format: {
                        style: 'percent'
                    },
                },
                grid: {
                    // color: 'rgba(255, 255, 255, 0.1)'
                },
                scaleLabel: {
                    display: true,
                    labelString: "Percentage"
                }

            },

        },
        plugins: {
            legend: {
                display: false
            },
            datalabels: {
                display: true,
                align: 'right',
                formatter: function (value) {
                    return Math.round(value) + "%";
                    // eq. return ['line1', 'line2', value]
                },
                color: 'white',

            }
        },
        animation: {
            duration: 1500,
            easing: 'easeOutCubic',
        }
    };

    return (
        <div className="flex justify-center items-center h-full w-full ">
            <Bar data={data} options={options} />;
        </div>
    )
};

const VerticalBarChart = ({ data }) => {
    const options = {
        indexAxis: 'x',
        responsive: true,
        scales: {
            x: {
                grid: {
                    // color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: 'white'
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'white'
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
            datalabels: {
                display: false
            },
            title: {
                display: true,
                text: data.title,
                color: 'white'
            },
        },
        animation: {
            duration: 500,
            easing: 'easeOutCubic',
        }
    };

    return (
        <div className="flex justify-center items-center h-full w-full ">
            <Bar data={data} options={options} />;
        </div>
    )
};

export { PercentageBarChart, VerticalBarChart };
