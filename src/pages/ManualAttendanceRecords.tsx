
import { useState } from "react";
import { FilterSection } from "@/components/attendance/FilterSection";
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
  employee: string;
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
    employee: "",
    entity: "",
    category: "",
    classification: "",
    project: "",
    location: ""
  });
  
  // Function to filter records based on selected filters
  const getFilteredRecords = () => {
    return mockAttendanceRecords.filter(record => {
      // Filter by Employee ID or Name
      if (activeFilters.employee && 
          !(record.employeeId.includes(activeFilters.employee) || 
            record.employeeName.toLowerCase().includes(activeFilters.employee.toLowerCase()))) {
        return false;
      }
      
      // Category filter
      if (activeFilters.category && record.category !== activeFilters.category) {
        return false;
      }
      
      // Project filter
      if (activeFilters.project && record.checkInProject !== activeFilters.project) {
        return false;
      }
      
      // Date range check
      // In a real implementation, this would check if record date falls within selected range
      
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
      
      const filteredCount = getFilteredRecords().length;
      
      // Show success toast
      if (filteredCount > 0) {
        toast.success("Filters Applied", {
          description: `Found ${filteredCount} matching records`,
        });
      } else {
        toast.info("No Results Found", {
          description: "Try adjusting your filter criteria",
        });
      }
    }, 800);
  };
  
  // Clear all filters
  const handleClearFilters = () => {
    setActiveFilters({
      startDate: null,
      endDate: null,
      employee: "",
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
      
      {/* Filters Section */}
      <FilterSection
        availableProjects={MOCK_PROJECTS}
        availableLocations={MOCK_LOCATIONS}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
        currentFilters={activeFilters}
      />
      
      {/* Table Section with Loading State */}
      <div className={`transition-opacity duration-300 ${isLoading ? "opacity-50" : "opacity-100"}`}>
        {getFilteredRecords().length > 0 ? (
          <ManualAttendanceTable records={getFilteredRecords()} />
        ) : (
          <div className="bg-white rounded-md p-8 text-center shadow-sm border border-gray-200">
            <p className="text-gray-500 text-lg">No results found. Try adjusting your filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManualAttendanceRecords;
