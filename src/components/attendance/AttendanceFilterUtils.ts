
import { mockAttendanceRecords } from "./ManualAttendanceTable";

export interface AttendanceFilters {
  employeeId: string;
  name: string;
  category: string;
  classification: string;
  status: string;
  project: string;
  entity: string;
  reason?: string; // Added reason filter
}

// Initial filter state
export const initialFilters: AttendanceFilters = {
  employeeId: "",
  name: "",
  category: "all",
  classification: "all",
  status: "all",
  project: "all",
  entity: "all",
  reason: "all" // Added default reason filter
};

// Filter attendance records based on filter criteria
export const filterRecords = (filters: AttendanceFilters) => {
  return mockAttendanceRecords.filter(record => {
    if (filters.employeeId && !record.employeeId.includes(filters.employeeId)) {
      return false;
    }
    if (filters.name && !record.employeeName.toLowerCase().includes(filters.name.toLowerCase())) {
      return false;
    }
    if (filters.category !== "all" && record.category !== filters.category) {
      return false;
    }
    if (filters.classification !== "all" && record.classification !== filters.classification) {
      return false;
    }
    if (filters.status !== "all" && record.status !== filters.status) {
      return false;
    }
    if (filters.project !== "all" && !record.checkInProject.includes(filters.project)) {
      return false;
    }
    // Added entity filter
    if (filters.entity !== "all" && record.entity !== filters.entity) {
      return false;
    }
    // Added reason filter
    if (filters.reason !== "all" && record.reason !== filters.reason) {
      return false;
    }
    return true;
  });
};

// List of available attendance reasons
export const attendanceReasons = {
  present: ["Medical", "Visa", "ID"],
  absent: ["Sick", "Casual"]
};
