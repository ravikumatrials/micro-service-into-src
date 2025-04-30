
import { useState } from "react";
import ManualAttendanceFilters from "@/components/attendance/ManualAttendanceFilters";
import ManualAttendanceTable, { mockAttendanceRecords } from "@/components/attendance/ManualAttendanceTable";

const ManualAttendanceRecords = () => {
  const [filters, setFilters] = useState({
    employeeId: "",
    name: "",
    category: "",
    classification: ""
  });
  
  // Filtered records based on filter criteria
  const filteredRecords = mockAttendanceRecords.filter(record => {
    if (filters.employeeId && !record.employeeId.includes(filters.employeeId)) {
      return false;
    }
    if (filters.name && !record.employeeName.toLowerCase().includes(filters.name.toLowerCase())) {
      return false;
    }
    if (filters.category && record.category !== filters.category) {
      return false;
    }
    // For classification, we would typically have this as a field in the records
    // For now, we'll assume all records match any classification filter
    return true;
  });
  
  // Reset all filters
  const handleResetFilters = () => {
    setFilters({
      employeeId: "",
      name: "",
      category: "",
      classification: ""
    });
  };

  return (
    <div className="space-y-5 px-1 pt-5">
      <h1 className="text-2xl font-bold text-gray-800">Manual Attendance Records</h1>
      
      {/* Filters Section */}
      <ManualAttendanceFilters 
        filters={filters}
        setFilters={setFilters}
        onReset={handleResetFilters}
      />
      
      {/* Stats Cards could go here */}
      
      {/* Table Section */}
      <ManualAttendanceTable records={filteredRecords} />
    </div>
  );
};

export default ManualAttendanceRecords;
