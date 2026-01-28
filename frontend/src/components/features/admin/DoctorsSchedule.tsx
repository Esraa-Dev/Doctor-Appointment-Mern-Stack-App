import type { DoctorsStatusCardProps } from "../../../types/types";


export const DoctorsSchedule = ({ doctorsData }: DoctorsStatusCardProps) => {

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold text-primaryText mb-4">Doctors Schedule</h2>

            <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-primary/10 border border-primary/70 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{doctorsData.available}</div>
                    <div className="text-sm text-primary">Available</div>
                </div>
                <div className="bg-secondary/10 border border-secondary/70 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-secondary">{doctorsData.unavailable}</div>
                    <div className="text-sm text-secondary">Unavailable</div>
                </div>
            </div>

            <div className="space-y-3">
                {doctorsData.list.slice(0, 4).map((doctor) => (
                    <div key={doctor._id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                        <img
                            src={doctor.image}
                            alt={`${doctor.firstName} ${doctor.lastName}`}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                            <div className="font-medium text-primaryText">
                                Dr. {doctor.firstName} {doctor.lastName}
                            </div>
                            <div className="text-sm text-primaryText">
                                {doctor.specialization_en}
                            </div>
                        </div>
                        <div className={`text-xs font-medium px-2 py-1 rounded-full ${doctor.isAvailableToday ? 'bg-primary/5 text-primary' : 'bg-secondary/5 text-secondary'}`}>
                            {doctor.isAvailableToday ? 'Available' : 'Unavailable'}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};