
export interface AttendanceFilters {
  employeeId: string;
  name: string;
  classification: string;
  category: string;
  status: string;
  project: string;
  entity: string;
}

export const initialFilters: AttendanceFilters = {
  employeeId: "",
  name: "",
  classification: "all",
  category: "all",
  status: "all",
  project: "all",
  entity: "all"
};

export const filterRecords = (filters: AttendanceFilters) => {
  // Mock filtering logic - would be replaced with actual API calls
  const mockRecords = [
    { id: 1, name: "John Doe", employeeId: "10001", classification: "Staff", category: "Engineer" },
    { id: 2, name: "Jane Smith", employeeId: "10002", classification: "Laborer", category: "Worker" }
  ];
  
  return mockRecords.filter(record => {
    if (filters.name && !record.name.toLowerCase().includes(filters.name.toLowerCase())) return false;
    if (filters.employeeId && !record.employeeId.includes(filters.employeeId)) return false;
    if (filters.classification !== "all" && record.classification !== filters.classification) return false;
    if (filters.category !== "all" && record.category !== filters.category) return false;
    return true;
  });
};
