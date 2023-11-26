import React from 'react';
import { Doughnut } from 'react-chartjs-2';


const colors = [
    '#FF5733',
    '#FFC300',
    '#33FF57',
    '#339DFF',
    '#A733FF',
    '#FF33A7',
    '#3D9970',
    '#FF851B',
    '#B10DC9',
    '#7FDBFF',
    '#111111',
    '#AAAAAA',
    '#F0DB4F',
    '#00BCD4',
    '#FFEB3B',
];


const DoughnutChart = ({ data }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                color: 'white'
            },
            title: {
                display: true,
                text: data.title,
                color: 'white',
                size: 32
            },
            datalabels: {
                display: true,
                formatter: (value) => {
                    return value + "%"
                },
                color: 'white'
            }
        },
    };

    const backgroundColors = colors.slice(0, data.datasets[0].data.length);
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                data: data.datasets[0].data,
                backgroundColor: backgroundColors,
                borderColor: backgroundColors,
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="flex h-full w-full">
            <Doughnut data={chartData} options={options} />
        </div>
    );
};

export default DoughnutChart;
