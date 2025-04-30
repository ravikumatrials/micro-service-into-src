
import { useState } from "react";
import ManualAttendanceFilters from "@/components/attendance/ManualAttendanceFilters";
import ManualAttendanceTable, { mockAttendanceRecords } from "@/components/attendance/ManualAttendanceTable";
import { useToast } from "@/hooks/use-toast";

// Mock project and location data
const PROJECTS = ["Main Building Construction", "Bridge Expansion", "Warehouse Project", "Hospital Wing", "Commercial Complex"];
const LOCATIONS = ["Downtown Site", "Bridge Zone A", "East Industrial", "North Medical District", "Central Business Area"];

const ManualAttendanceRecords = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    employeeId: "",
    name: "",
    category: "all-categories",
    classification: "all-classifications",
    project: "all-projects",
    location: "all-locations"
  });
  
  // Filtered records based on filter criteria
  const filteredRecords = mockAttendanceRecords.filter(record => {
    if (filters.employeeId && !record.employeeId.includes(filters.employeeId)) {
      return false;
    }
    if (filters.name && !record.employeeName.toLowerCase().includes(filters.name.toLowerCase())) {
      return false;
    }
    if (filters.category !== "all-categories" && record.category !== filters.category) {
      return false;
    }
    // For classification, project and location filters
    // In a real app, we would have these fields in the records
    // For now, we'll simulate filtering
    return true;
  });
  
  // Apply filters with loading simulation
  const handleApplyFilters = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Filters Applied",
        description: `Found ${filteredRecords.length} matching records`,
      });
    }, 800);
  };
  
  // Reset all filters
  const handleResetFilters = () => {
    setFilters({
      employeeId: "",
      name: "",
      category: "all-categories",
      classification: "all-classifications",
      project: "all-projects",
      location: "all-locations"
    });
    
    toast({
      title: "Filters Cleared",
      description: "All filters have been reset",
    });
  };

  return (
    <div className="space-y-5 px-1 pt-5">
      <h1 className="text-2xl font-bold text-gray-800">Manual Attendance Records</h1>
      
      {/* Enhanced Filters Section */}
      <ManualAttendanceFilters 
        filters={filters}
        setFilters={setFilters}
        onApplyFilters={handleApplyFilters}
        onReset={handleResetFilters}
        isLoading={isLoading}
        projectOptions={PROJECTS}
        locationOptions={LOCATIONS}
      />
      
      {/* Table Section with Loading State */}
      <div className={`transition-opacity duration-300 ${isLoading ? "opacity-50" : "opacity-100"}`}>
        <ManualAttendanceTable records={filteredRecords} />
      </div>
    </div>
  );
};

export default ManualAttendanceRecords;
