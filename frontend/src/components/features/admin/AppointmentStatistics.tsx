
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export function AppointmentStatistics({ stats }: any) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const data = {
        labels: months,
        datasets: [
            {
                label: 'Completed',
                data: months.map((_, i) => {
                    const found = stats.find((s: any) => s.month === i + 1 && s.status === 'Completed');
                    return found ? found.count : 0;
                }),
                backgroundColor: '#ed7b21',
            },
            {
                label: 'Pending',
                data: months.map((_, i) => {
                    const found = stats.find((s: any) => s.month === i + 1 && s.status === 'Pending');
                    return found ? found.count : 0;
                }),
                backgroundColor: '#2594c9',
            },
            {
                label: 'Cancelled',
                data: months.map((_, i) => {
                    const found = stats.find((s: any) => s.month === i + 1 && s.status === 'Cancelled');
                    return found ? found.count : 0;
                }),
                backgroundColor: '#9c9086',
            }
        ],
    }
    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    precision: 0
                }
            }
        },
        responsive: true
    };
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold text-primaryText mb-4">Appointment Statistics</h2>
            <Bar data={data} options={options} />
        </div>
    )
}
