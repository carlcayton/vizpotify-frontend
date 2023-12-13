
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
import { TreemapController, TreemapElement } from 'chartjs-chart-treemap';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    BarController,
    Tooltip,
    ArcElement,
    Legend,
    TreemapController,
    TreemapElement,
    ChartDataLabels
);

