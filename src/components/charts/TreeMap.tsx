import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import 'chartjs-chart-treemap';

Chart.register(...registerables);

interface ArtistTrackData {
    artist_name: string;
    track_count: number;
}

interface TreeMapProps {
    treeData: ArtistTrackData[];
}

const TreeMap: React.FC<TreeMapProps> = ({ treeData }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                const chart = new Chart(ctx, {
                    type: 'treemap',
                    data: {
                        datasets: [{
                            label: 'Artist Track Count',
                            key: 'track_count',
                            groups: ['artist_name'],
                            fontWeight: "bold",
                            tree: treeData,
                            borderColor: 'rgba(255,255,255, 1)',
                            borderWidth: 1,
                            backgroundColor: (context) => {
                                return 'rgba(75, 192, 192, 0.2)';
                            },
                            spacing: 0.1,
                        }]
                    },
                    plugins: {
                        datalabels: {
                            display: false,
                        },
                    },


                });
                return () => chart.destroy();
            }
        }
    }, [treeData]);

    return <canvas ref={canvasRef}></canvas>;
};

export default TreeMap;
