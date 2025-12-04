import { useEffect, useState } from 'react';
import { Users, Building, } from 'lucide-react';
import { getDepartmentCount } from '../services/departmentService.js';
import { getDoctorCount } from '../services/doctorService.js';
const Stats = () => {
    const [departmentCount, setDepartmentCount] = useState(0);
    const [doctorCount, setDoctorCount] = useState(0);
    useEffect(() => {
        Promise.all([getDoctorCount(), getDepartmentCount()]).then(([{ data: doctorData }, { data: departmentData }]) => {
            setDoctorCount(doctorData.count);
            setDepartmentCount(departmentData.count);
        })
    }, []);

    const stats = [
        { icon: <Users className="w-5 h-5" />, value: doctorCount, label: 'Doctors' },
        { icon: <Building className="w-5 h-5" />, value: departmentCount, label: 'Departments' },

    ];

    return (
        <div className="bg-gray-50 py-8">
            <div className="container mx-auto px-6">
                <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex items-center space-x-3">
                            <div className="text-blue-600">
                                {stat.icon}
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                                <div className="text-sm text-gray-600">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Stats;