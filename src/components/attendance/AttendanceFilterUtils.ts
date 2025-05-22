
// Initial filters
export const initialFilters = {
  name: "",
  employeeId: "",
  project: "all",
  classification: "all",
  category: "all",
  status: "all",
  entity: "all",
  attendanceReason: "all"  // Added new filter for attendance reason
};

// Type definition for filters
export interface AttendanceFilters {
  name: string;
  employeeId: string;
  project: string;
  classification: string;
  category: string;
  status: string;
  entity: string;
  attendanceReason?: string;  // Added new filter type for attendance reason
}

// Mock filtered records for demonstration
export const filterRecords = (filters: AttendanceFilters) => {
  // This would normally filter data from an API or database
  // For now, returning mock data
  return [
    {
      id: 1,
      employeeId: "E1001",
      name: "John Smith",
      date: "2023-07-01",
      checkInTime: "08:00 AM",
      checkOutTime: "05:00 PM",
      project: "Main Building Construction",
      location: "Site A",
      attendanceStatus: "Present",
      shift: "Day",
      attendanceReason: "medical"  // Example of attendance reason
    },
    {
      id: 2,
      employeeId: "E1002",
      name: "Sarah Johnson",
      date: "2023-07-01",
      checkInTime: "08:30 AM",
      checkOutTime: "04:30 PM",
      project: "Bridge Expansion Project",
      location: "Site B",
      attendanceStatus: "Present",
      shift: "Day",
      attendanceReason: undefined
    },
    {
      id: 3,
      employeeId: "E1003",
      name: "Michael Brown",
      date: "2023-07-01",
      checkInTime: "-",
      checkOutTime: "-",
      project: "Main Building Construction",
      location: "-",
      attendanceStatus: "Absent",
      shift: "Day",
      attendanceReason: "sick"  // Example of attendance reason
    },
    {
      id: 4,
      employeeId: "E1004",
      name: "Emily Davis",
      date: "2023-07-01",
      checkInTime: "09:15 AM",
      checkOutTime: "-",
      project: "Highway Renovation",
      location: "Site C",
      attendanceStatus: "Present",
      shift: "Day",
      attendanceReason: undefined
    },
    {
      id: 5,
      employeeId: "E1005",
      name: "David Wilson",
      date: "2023-07-01",
      checkInTime: "08:45 AM",
      checkOutTime: "05:15 PM",
      project: "Main Building Construction",
      location: "Site A",
      attendanceStatus: "Present",
      shift: "Day",
      attendanceReason: "visa"  // Example of attendance reason
    }
  ];
};
