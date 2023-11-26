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
            }
        },
        animation: {
            duration: 1500,
            easing: 'easeOutCubic',
        }
    };

    return <Bar data={data} options={options} />;
};

// VerticalBarChart Component
const VerticalBarChart = ({ data }) => {
    const options = {
        indexAxis: 'x',
        responsive: true,
        scales: {
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
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
            }
        },
        animation: {
            duration: 500,
            easing: 'easeOutCubic',
        }
    };

    return <Bar data={data} options={options} />;
};

export { PercentageBarChart, VerticalBarChart };
