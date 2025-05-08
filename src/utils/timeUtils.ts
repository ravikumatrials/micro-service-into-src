
/**
 * Calculates working hours between check-in and check-out times
 * @param checkInTime Check-in time string (format: "HH:MM AM/PM")
 * @param checkOutTime Check-out time string (format: "HH:MM AM/PM") 
 * @returns Formatted working hours string (e.g., "08h 15m")
 */
export const calculateWorkingHours = (checkInTime: string, checkOutTime: string): string => {
  try {
    if (!checkInTime || !checkOutTime) return "N/A";
    
    // Parse times assuming they are in format like "08:30 AM"
    const [inHour, inMinute] = checkInTime.split(':');
    const inHourNum = parseInt(inHour);
    const inMinuteNum = parseInt(inMinute.split(' ')[0]);
    const inIsAM = checkInTime.includes('AM');
    
    const [outHour, outMinute] = checkOutTime.split(':');
    const outHourNum = parseInt(outHour);
    const outMinuteNum = parseInt(outMinute.split(' ')[0]);
    const outIsAM = checkOutTime.includes('AM');
    
    // Convert to 24 hour format
    let inHour24 = inHourNum;
    if (inIsAM && inHourNum === 12) inHour24 = 0;
    if (!inIsAM && inHourNum !== 12) inHour24 = inHourNum + 12;
    
    let outHour24 = outHourNum;
    if (outIsAM && outHourNum === 12) outHour24 = 0;
    if (!outIsAM && outHourNum !== 12) outHour24 = outHourNum + 12;
    
    // Calculate difference in minutes
    const inTotalMinutes = inHour24 * 60 + inMinuteNum;
    const outTotalMinutes = outHour24 * 60 + outMinuteNum;
    
    // Handle case where checkout is next day
    let diffMinutes = outTotalMinutes - inTotalMinutes;
    if (diffMinutes < 0) {
      diffMinutes += 24 * 60; // Add 24 hours worth of minutes
    }
    
    // Convert to hours and minutes
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    
    return `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m`;
  } catch (error) {
    return "N/A";
  }
};
