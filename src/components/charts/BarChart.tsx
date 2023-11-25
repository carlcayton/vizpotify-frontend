
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data, options, labels }) => {
    return (
        <Bar data={{
            labels: labels,
            datasets: data,
        }} options={options} />
    );
};

export default BarChart;
