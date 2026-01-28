import type { ScheduleDay } from "../../../types/types";

export const AvailabilityCard = ({ schedule }: { schedule: ScheduleDay[] }) => {
    const dayNames = {
        monday: "Monday",
        tuesday: "Tuesday",
        wednesday: "Wednesday",
        thursday: "Thursday",
        friday: "Friday",
        saturday: "Saturday",
        sunday: "Sunday",
    };

    const getDayStatus = (day: string) => {
        const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
        return day.toLowerCase() === today ? "bg-primary/10 border-primary" : "bg-gray-50 border-gray-200";
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-primaryText mb-6">Availability</h2>

            <div className="grid grid-cols-2 gap-3">
                {Object.entries(dayNames).map(([key, dayName]) => {
                    const daySchedule = schedule.find(s => s.day.toLowerCase() === key);
                    const statusClass = getDayStatus(key);

                    return (
                        <div
                            key={key}
                            className={`border rounded-lg p-4 ${statusClass} transition-all duration-200`}
                        >
                            <div className="font-medium text-gray-800">{dayName}</div>
                            {daySchedule ? (
                                <div className="text-sm text-primary mt-1 font-medium">
                                    {daySchedule.startTime} - {daySchedule.endTime}
                                </div>
                            ) : (
                                <div className="text-sm text-gray-500 mt-1">Not available</div>
                            )}
                        </div>
                    );
                })}
            </div>

            {schedule.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No schedule configured
                </div>
            )}
        </div>
    );
};