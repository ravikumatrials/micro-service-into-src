
import { useState } from "react";
import AttendanceFilters from "@/components/attendance/AttendanceFilters";
import ManualAttendanceTable, { mockAttendanceRecords } from "@/components/attendance/ManualAttendanceTable";
import { toast } from "sonner";

// Mock data for filters
const MOCK_ENTITIES = [
  "Tanseeq Landscaping LLC", 
  "Tanseeq Construction LLC", 
  "Tanseeq Investment LLC",
  "Tanseeq Design LLC",
  "Tanseeq Contracting LLC"
];

const MOCK_CATEGORIES = [
  "Carpenter", 
  "Mason", 
  "Plumber", 
  "Electrician", 
  "Engineer",
  "Supervisor",
  "Architect"
];

const MOCK_PROJECTS = [
  "Main Building Construction", 
  "Bridge Expansion", 
  "Warehouse Project", 
  "Hospital Wing", 
  "Commercial Complex"
];

const MOCK_LOCATIONS = [
  "Downtown Site", 
  "Bridge Zone A", 
  "East Industrial", 
  "North Medical District", 
  "Central Business Area",
  "Site A",
  "Site B",
  "Office"
];

// Define filter type
interface FilterValues {
  startDate: Date | null;
  endDate: Date | null;
  employeeId: string;
  name: string;
  entity: string;
  category: string;
  classification: string;
  project: string;
  location: string;
}

const ManualAttendanceRecords = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterValues>({
    startDate: null,
    endDate: null,
    employeeId: "",
    name: "",
    entity: "",
    category: "",
    classification: "",
    project: "",
    location: ""
  });
  
  // Function to filter records based on selected filters
  const getFilteredRecords = () => {
    return mockAttendanceRecords.filter(record => {
      // Filter by Employee ID
      if (activeFilters.employeeId && !record.employeeId.includes(activeFilters.employeeId)) {
        return false;
      }
      
      // Filter by Name
      if (activeFilters.name && !record.employeeName.toLowerCase().includes(activeFilters.name.toLowerCase())) {
        return false;
      }
      
      // Example of additional filters (in real app, these would be properly implemented)
      // Category and other filters would need proper implementation based on the data structure
      if (activeFilters.category && record.category !== activeFilters.category) {
        return false;
      }
      
      // Date range check would go here if the records contained date objects
      
      return true;
    });
  };
  
  // Apply filters with simulated loading
  const handleApplyFilters = (filters: FilterValues) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setActiveFilters(filters);
      setIsLoading(false);
      
      // Show success toast
      toast.success("Filters Applied", {
        description: `Found ${getFilteredRecords().length} matching records`,
      });
    }, 800);
  };
  
  // Clear all filters
  const handleClearFilters = () => {
    setActiveFilters({
      startDate: null,
      endDate: null,
      employeeId: "",
      name: "",
      entity: "",
      category: "",
      classification: "",
      project: "",
      location: ""
    });
    
    toast.info("Filters Cleared", {
      description: "All filters have been reset",
    });
  };

  return (
    <div className="space-y-5 px-1 pt-5">
      <h1 className="text-2xl font-bold text-gray-800">Manual Attendance Records</h1>
      
      {/* New Enhanced Filters Section */}
      <AttendanceFilters
        entities={MOCK_ENTITIES}
        categories={MOCK_CATEGORIES}
        projects={MOCK_PROJECTS}
        locations={MOCK_LOCATIONS}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
        isLoading={isLoading}
      />
      
      {/* Table Section with Loading State */}
      <div className={`transition-opacity duration-300 ${isLoading ? "opacity-50" : "opacity-100"}`}>
        <ManualAttendanceTable records={getFilteredRecords()} />
      </div>
    </div>
  );
};

export default ManualAttendanceRecords;
