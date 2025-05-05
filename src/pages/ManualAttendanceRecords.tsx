
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ManualAttendanceFilters from "@/components/attendance/ManualAttendanceFilters";
import ManualAttendanceTable, { mockAttendanceRecords } from "@/components/attendance/ManualAttendanceTable";
import CheckInTab from "@/components/attendance/CheckInTab";
import CheckOutTab from "@/components/attendance/CheckOutTab";
import ExceptionTab from "@/components/attendance/ExceptionTab";

const ManualAttendanceRecords = () => {
  const [filters, setFilters] = useState({
    employeeId: "",
    name: "",
    category: "all",
    classification: "all",
    status: "all",
    project: "all",
    location: "all"
  });

  const [activeTab, setActiveTab] = useState("records");
  
  // Mock data for projects with coordinates added for geolocation matching
  const mockProjects = [
    { 
      id: 1, 
      name: "Main Building Construction",
      coordinates: { 
        geofenceData: JSON.stringify([
          { lat: 25.276987, lng: 55.296249 },
          { lat: 25.277987, lng: 55.297249 },
          { lat: 25.278987, lng: 55.296249 },
          { lat: 25.277987, lng: 55.295249 }
        ])
      }
    },
    { 
      id: 2, 
      name: "Bridge Expansion Project",
      coordinates: { 
        geofenceData: JSON.stringify([
          { lat: 25.266987, lng: 55.286249 },
          { lat: 25.267987, lng: 55.287249 },
          { lat: 25.268987, lng: 55.286249 },
          { lat: 25.267987, lng: 55.285249 }
        ])
      }
    },
    { 
      id: 3, 
      name: "Highway Renovation",
      coordinates: { 
        geofenceData: JSON.stringify([
          { lat: 25.256987, lng: 55.276249 },
          { lat: 25.257987, lng: 55.277249 },
          { lat: 25.258987, lng: 55.276249 },
          { lat: 25.257987, lng: 55.275249 }
        ])
      }
    },
    { 
      id: 4, 
      name: "Warehouse Project",
      coordinates: { 
        geofenceData: JSON.stringify([
          { lat: 25.246987, lng: 55.266249 },
          { lat: 25.247987, lng: 55.267249 },
          { lat: 25.248987, lng: 55.266249 },
          { lat: 25.247987, lng: 55.265249 }
        ])
      }
    },
    { 
      id: 5, 
      name: "Hospital Wing" 
      // No coordinates, won't show up in location-based projects
    }
  ];
  
  // Mock locations (only used for backward compatibility with CheckOutTab and ExceptionTab)
  const mockLocations = [
    { id: 1, name: "Site A" },
    { id: 2, name: "Site B" },
    { id: 3, name: "Office" },
    { id: 4, name: "Site C" }
  ];
  
  // Filtered records based on filter criteria
  const filteredRecords = mockAttendanceRecords.filter(record => {
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
    if (filters.location !== "all" && record.location !== filters.location) {
      return false;
    }
    if (filters.project !== "all" && !record.checkInProject.includes(filters.project)) {
      return false;
    }
    return true;
  });
  
  // Reset all filters
  const handleResetFilters = () => {
    setFilters({
      employeeId: "",
      name: "",
      category: "all",
      classification: "all",
      status: "all",
      project: "all",
      location: "all"
    });
  };

  // Apply filters
  const handleApplyFilters = () => {
    // In a real application, this might trigger a data fetch or other operations
    // For this demo, the filters are already applied via the filteredRecords variable
    console.log("Applying filters:", filters);
  };

  return (
    <div className="space-y-5 px-1 pt-5">
      <h1 className="text-2xl font-bold text-gray-800">Manual Attendance Records</h1>
      
      {/* Filters Section */}
      <ManualAttendanceFilters 
        filters={filters}
        setFilters={setFilters}
        onReset={handleResetFilters}
        onApply={handleApplyFilters}
      />
      
      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full mb-4">
          <TabsTrigger value="records">Attendance Records</TabsTrigger>
          <TabsTrigger value="check-in">Check In</TabsTrigger>
          <TabsTrigger value="check-out">Check Out</TabsTrigger>
        </TabsList>
        
        <TabsContent value="records" className="mt-0">
          {/* Table Section */}
          <ManualAttendanceTable records={filteredRecords} />
        </TabsContent>
        
        <TabsContent value="check-in" className="mt-0">
          <CheckInTab 
            searchQuery={filters.name || filters.employeeId}
            selectedProject={filters.project}
            selectedLocation={filters.location}
            selectedStatus="all"
            selectedClassification={filters.classification}
            selectedCategory={filters.category}
            selectedActiveStatus={filters.status}
            projects={mockProjects}
            locations={mockLocations}
          />
        </TabsContent>
        
        <TabsContent value="check-out" className="mt-0">
          <CheckOutTab 
            searchQuery={filters.name || filters.employeeId}
            selectedProject={filters.project}
            selectedLocation={filters.location}
            selectedClassification={filters.classification}
            selectedCategory={filters.category}
            selectedStatus={filters.status}
            projects={mockProjects}
            locations={mockLocations}
          />
        </TabsContent>
        
        <TabsContent value="exceptions" className="mt-0">
          <ExceptionTab 
            searchQuery={filters.name || filters.employeeId}
            selectedProject={filters.project}
            selectedLocation={filters.location}
            selectedClassification={filters.classification}
            selectedCategory={filters.category}
            selectedStatus={filters.status}
            projects={mockProjects}
            locations={mockLocations}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManualAttendanceRecords;
