
import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import ManualAttendanceFilters from "@/components/attendance/ManualAttendanceFilters";
import ManualAttendanceTabs from "@/components/attendance/ManualAttendanceTabs";
import { filterRecords, initialFilters, AttendanceFilters } from "@/components/attendance/AttendanceFilterUtils";
import { mockProjects } from "@/data/mockProjects";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ManualAttendanceRecords = () => {
  const [filters, setFilters] = useState<AttendanceFilters>(initialFilters);
  const [activeTab, setActiveTab] = useState("records");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  // Apply the filter function to get filtered records
  const filteredRecords = filterRecords(filters);
  
  // Reset all filters
  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  // Apply filters
  const handleApplyFilters = () => {
    // In a real application, this might trigger a data fetch or other operations
    console.log("Applying filters:", filters);
    console.log("Selected date:", selectedDate);
  };

  return (
    <div className="space-y-5 px-1 pt-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Manual Attendance Records</h1>
        
        {/* Date Picker */}
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
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
                onSelect={(date) => date && setSelectedDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      {/* Filters Section */}
      <ManualAttendanceFilters 
        filters={filters}
        setFilters={setFilters}
        onReset={handleResetFilters}
        onApply={handleApplyFilters}
      />
      
      {/* Tabs Section */}
      <ManualAttendanceTabs 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        filteredRecords={filteredRecords}
        filters={filters}
        projects={mockProjects}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default ManualAttendanceRecords;
