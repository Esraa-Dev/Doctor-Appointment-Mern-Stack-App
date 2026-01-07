export const calculateEndTime = (startTime: string) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    let endMinutes = minutes + 30;
    let endHours = hours;
    if (endMinutes >= 60) {
        endMinutes = endMinutes - 60;
        endHours = endHours + 1;
    }
    return `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
};