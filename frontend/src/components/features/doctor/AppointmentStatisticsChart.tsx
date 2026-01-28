import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import type { StatusStat } from '../../../types/types';

ChartJS.register(ArcElement, Tooltip, Legend);

export const AppointmentStatisticsChart = ({ stats }: {stats: StatusStat[]}) => {
    const statusColors: Record<string, string> = {
        Scheduled: '#ed7b21',
        Completed: '#2594c9',
        Pending: '#9c9086',
        Cancelled: '#dc2626',
        'In Progress': '#f59e0b',
    };

    const data = {
        labels: stats.map(stat => stat._id),
        datasets: [
            {
                data: stats.map(stat => stat.count),
                backgroundColor: stats.map(stat => statusColors[stat._id] || '#9ca3af'),

            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    const total = stats.reduce((sum, stat) => sum + stat.count, 0);

    return (
        <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col items-center">
            <h2 className="text-lg font-bold text-gray-800 mb-6 w-full text-left">Appointment Status</h2>

            <div className="flex justify-center items-center w-full gap-6">
                <div className="relative h-[300px] mb-6">
                    <Doughnut data={data} options={options} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-4xl font-bold text-gray-800">{total}</span>
                        <span className="text-xs font-medium text-gray-400 uppercase">Total</span>
                    </div>
                </div>

                <div className="space-y-4 text-center">
                    {stats.map((stat) => (
                        <div key={stat._id} className="">
                            <div className="flex items-center flex-nowrap whitespace-nowrap gap-2">
                                <div
                                    className="w-2.5 h-2.5 rounded-full"
                                    style={{ backgroundColor: statusColors[stat._id] || '#9ca3af' }}
                                ></div>
                                <span className="text-gray-600 font-medium">{stat._id}</span>

                            </div>
                            <span className="font-bold text-xl text-gray-800">{stat.count}</span>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};