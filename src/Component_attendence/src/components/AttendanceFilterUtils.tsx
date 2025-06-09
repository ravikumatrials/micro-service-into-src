
import { AttendanceFilters } from "../types/attendance";

export const initialFilters: AttendanceFilters = {
  employeeId: "",
  name: "",
  category: "all",
  classification: "all",
  status: "all",
  project: "all",
  entity: "all"
};

export const filterRecords = (filters: AttendanceFilters) => {
  // Mock function that would normally filter attendance records
  // Returns empty array for now as this is just a utility function
  return [];
};
