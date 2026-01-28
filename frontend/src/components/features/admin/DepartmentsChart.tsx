import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import type { DeptStat } from '../../../types/types';

ChartJS.register(ArcElement, Tooltip, Legend);

export const DepartmentsChart = ({ stats }: { stats: DeptStat[] }) => {
    const data = {
        labels: stats.map(d => d.name),
        datasets: [
            {
                data: stats.map(d => d.count),
                backgroundColor: ['#ed7b21', '#2594c9', '#9c9086'],
                hoverOffset: 4
            }
        ]
    };


    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold text-primaryText mb-4">Top 3 Departments</h2>
            <div className="w-72 h-72 mx-auto">
                <Doughnut data={data} />
            </div>
        </div>
    );
};