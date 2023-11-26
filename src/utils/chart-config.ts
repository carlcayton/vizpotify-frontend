import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    BarController,
    Tooltip,
    ArcElement,
    Legend
} from 'chart.js';
Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    BarController,
    Tooltip,

    ArcElement,
    Legend,

    ChartDataLabels
);
