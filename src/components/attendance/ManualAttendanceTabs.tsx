
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ManualAttendanceTable from "./ManualAttendanceTable";
import CheckInTab from "./CheckInTab";
import CheckOutTab from "./CheckOutTab";
import ExceptionTab from "./ExceptionTab";
import { AttendanceFilters } from "./AttendanceFilterUtils";

interface ManualAttendanceTabsProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  filteredRecords: any[];
  filters: AttendanceFilters;
  projects: { id: number; name: string; coordinates?: { geofenceData: string }; location?: string }[];
  selectedDate: Date;
  dateSelected: boolean; // New prop to indicate if date has been explicitly selected
}

const ManualAttendanceTabs: React.FC<ManualAttendanceTabsProps> = ({
  activeTab,
  setActiveTab,
  filteredRecords,
  filters,
  projects,
  selectedDate,
  dateSelected // Add this prop
}) => {
  // Empty array for locations since we're not using them anymore
  const emptyLocations: { id: number; name: string }[] = [];

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-4 w-full mb-4">
        <TabsTrigger value="records">Attendance Records</TabsTrigger>
        <TabsTrigger value="check-in">Check In</TabsTrigger>
        <TabsTrigger value="check-out">Check Out</TabsTrigger>
        <TabsTrigger value="exceptions">Exceptions</TabsTrigger>
      </TabsList>
      
      <TabsContent value="records" className="mt-0">
        <ManualAttendanceTable records={filteredRecords} />
      </TabsContent>
      
      <TabsContent value="check-in" className="mt-0">
        <CheckInTab 
          searchQuery={filters.name || filters.employeeId}
          selectedProject={filters.project}
          selectedClassification={filters.classification}
          selectedCategory={filters.category}
          selectedStatus={filters.status}
          selectedEntity={filters.entity}
          projects={projects}
          locations={emptyLocations}
          selectedDate={selectedDate}
          dateSelected={dateSelected} // Pass the new prop
        />
      </TabsContent>
      
      <TabsContent value="check-out" className="mt-0">
        <CheckOutTab 
          searchQuery={filters.name || filters.employeeId}
          selectedProject={filters.project}
          selectedClassification={filters.classification}
          selectedCategory={filters.category}
          selectedStatus={filters.status}
          selectedEntity={filters.entity}
          projects={projects}
          locations={emptyLocations}
          selectedDate={selectedDate}
          dateSelected={dateSelected} // Pass the new prop
        />
      </TabsContent>
      
      <TabsContent value="exceptions" className="mt-0">
        <ExceptionTab 
          searchQuery={filters.name || filters.employeeId}
          selectedProject={filters.project}
          selectedClassification={filters.classification}
          selectedCategory={filters.category}
          selectedStatus={filters.status}
          selectedEntity={filters.entity}
          projects={projects}
          locations={emptyLocations}
          selectedDate={selectedDate}
          dateSelected={dateSelected} // Pass the new prop
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManualAttendanceTabs;
