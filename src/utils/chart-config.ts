
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { TreemapController, TreemapElement } from 'chartjs-chart-treemap';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    BarController,
    Tooltip,
    ArcElement,
    Legend,
    RadarController,
    RadialLinearScale,
    PointElement,
    LineElement,
    registerables
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    BarController,
    Tooltip,
    ArcElement,
    Legend,
    ChartDataLabels,
    RadarController,
    RadialLinearScale,
    PointElement,
    LineElement,
    ...registerables
);
// import { Chart, RadarController, RadialLinearScale, ArcElement, PointElement, LineElement } from 'chart.js';
// 
// Chart.register(RadarController, RadialLinearScale, ArcElement, PointElement, LineElement);

// Now you can create your chart using the 'radar' type


