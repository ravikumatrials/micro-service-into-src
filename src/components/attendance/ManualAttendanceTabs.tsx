
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ManualAttendanceTable from "./ManualAttendanceTable";
import CheckInTab from "./CheckInTab";
import CheckOutTab from "./CheckOutTab";
import AbsenteesTab from "./AbsenteesTab";
import ExceptionTab from "./ExceptionTab";
import { AttendanceFilters } from "./AttendanceFilterUtils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface ManualAttendanceTabsProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  filteredRecords: any[];
  filters: AttendanceFilters;
  projects: { id: number; name: string; coordinates?: { geofenceData: string }; location?: string }[];
  selectedDate: Date;
  setSelectedDate: (date: Date | undefined) => void;
  dateSelected: boolean;
  setDateSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

const ManualAttendanceTabs: React.FC<ManualAttendanceTabsProps> = ({
  activeTab,
  setActiveTab,
  filteredRecords,
  filters,
  projects,
  selectedDate,
  setSelectedDate,
  dateSelected,
  setDateSelected
}) => {
  // Empty array for locations since we're not using them anymore
  const emptyLocations: { id: number; name: string }[] = [];

  return (
    <div className="space-y-4">
      {/* Date Picker Component - Now defaults to today's date */}
      <div className="flex justify-end items-center gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Attendance Date:</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[240px] justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? (
                  format(selectedDate, "PPP")
                ) : (
                  <span>Select Date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
                className="pointer-events-auto"
                // Disable future dates
                disabled={(date) => date > new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 w-full mb-4">
          <TabsTrigger value="records">Attendance Records</TabsTrigger>
          <TabsTrigger value="check-in">Check In</TabsTrigger>
          <TabsTrigger value="check-out">Check Out</TabsTrigger>
          <TabsTrigger value="absentees">Absentees</TabsTrigger>
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
            dateSelected={dateSelected}
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
            dateSelected={dateSelected}
          />
        </TabsContent>
        
        <TabsContent value="absentees" className="mt-0">
          <AbsenteesTab 
            searchQuery={filters.name || filters.employeeId}
            selectedProject={filters.project}
            selectedClassification={filters.classification}
            selectedCategory={filters.category}
            selectedStatus={filters.status}
            selectedEntity={filters.entity}
            projects={projects}
            locations={emptyLocations}
            selectedDate={selectedDate}
            dateSelected={dateSelected}
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
            dateSelected={dateSelected}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManualAttendanceTabs;
