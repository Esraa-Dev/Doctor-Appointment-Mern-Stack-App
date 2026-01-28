import type { TopPatientsCardProps } from "../../../types/types";

export const TopPatients = ({ patients }: { patients: TopPatientsCardProps[] }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold text-primaryText mb-4">Top 5 Patients</h2>

            <div className="space-y-4">
                {patients.map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <img
                                src={patient.image}
                                alt={`${patient.firstName} ${patient.lastName}`}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <div className="font-medium text-gray-800">
                                    {patient.firstName} {patient.lastName}
                                </div>
                            </div>
                        </div>
                        <div className="text-sm font-medium bg-secondary/10 text-secondary px-3 py-1 rounded-full">
                            {patient.count} Appointments
                        </div>
                    </div>
                ))}
            </div>

            {patients.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No patient data available
                </div>
            )}
        </div>
    );
};