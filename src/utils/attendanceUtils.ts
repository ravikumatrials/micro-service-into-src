
/**
 * Helper function to get the display text for an attendance reason
 */
export const getAttendanceReasonText = (reasonCode: string | undefined): string => {
  if (!reasonCode) return "";
  
  const reasonMap: Record<string, string> = {
    // Off-site presence reasons
    "medical": "Medical → Present (off-site)",
    "visa": "Visa → Present (off-site)",
    "id": "ID → Present (off-site)",
    
    // Absence reasons
    "sick": "Sick → Absent (excused)",
    "casual": "Casual → Absent (unexcused/personal leave)"
  };
  
  return reasonMap[reasonCode] || reasonCode;
};

/**
 * Helper function to get a color badge for each reason type
 */
export const getAttendanceReasonBadgeColor = (reasonCode: string | undefined): string => {
  if (!reasonCode) return "";
  
  // Off-site reasons get blue variants
  if (["medical", "visa", "id"].includes(reasonCode)) {
    return "bg-blue-100 text-blue-800";
  }
  
  // Absence reasons get red variants
  if (["sick", "casual"].includes(reasonCode)) {
    return "bg-red-100 text-red-800";
  }
  
  // Default
  return "bg-gray-100 text-gray-800";
};

/**
 * Function to categorize the attendance status
 */
export const getAttendanceStatus = (
  isPresent?: boolean,
  isAbsent?: boolean,
  attendanceReason?: string
): string => {
  if (isPresent) {
    if (["medical", "visa", "id"].includes(attendanceReason || "")) {
      return "Present (Off-site)";
    }
    return "Present";
  }
  
  if (isAbsent) {
    if (attendanceReason === "sick") {
      return "Absent (Excused)";
    }
    if (attendanceReason === "casual") {
      return "Absent (Unexcused)";
    }
    return "Absent";
  }
  
  return "Not Marked";
};
