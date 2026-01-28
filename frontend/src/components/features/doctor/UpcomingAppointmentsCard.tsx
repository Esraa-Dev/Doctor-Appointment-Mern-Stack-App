export const UpcomingAppointmentsCard = ({ appointments }: {
    appointments: {
        patientName: string;
        image: string;
        date: string;
        time: string;
        type: "clinic" | "video" | "voice";
        mode?: "clinic" | "video" | "voice";
    }[]
}) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 h-full">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-bold text-primaryText">Upcoming Appointments</h2>
                <span className="text-xs font-bold px-2 py-1 bg-secondary/10 text-secondary rounded-lg">
                    {appointments.length} Total
                </span>
            </div>

            <div className="space-y-4">
                {appointments.map((appointment, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-gray-100 hover:bg-gray-50 transition-all duration-200"
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={appointment.image}
                                alt={appointment.patientName}
                                className="w-11 h-11 rounded-full object-cover ring-2 ring-gray-50"
                            />
                            <div>
                                <div className="font-semibold text-gray-900 text-sm">
                                    {appointment.patientName}
                                </div>
                                <div className="text-xs text-gray-500 mt-0.5">
                                    {formatDate(appointment.date)} • {appointment.time}
                                </div>
                            </div>
                        </div>

                        <div className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider bg-primary/10 text-primary`}>
                            {appointment.type}
                        </div>
                    </div>
                ))}
            </div>

            {appointments.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                 No appointments for today
                </div>
            )}
        </div>
    );
};