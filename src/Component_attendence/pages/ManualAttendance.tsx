
import { useState, useEffect } from "react";
import { format } from "date-fns";
import ManualAttendanceFilters from "../src/components/ManualAttendanceFilters";
import ManualAttendanceTabs from "../src/components/ManualAttendanceTabs";
import { filterRecords, initialFilters } from "../src/components/AttendanceFilterUtils";
import { mockProjects } from "../src/data/attendanceData";
import { AttendanceFilters } from "../src/types/attendance";
import { toast } from "sonner";

const ManualAttendanceRecords = () => {
  const [filters, setFilters] = useState<AttendanceFilters>(initialFilters);
  const [activeTab, setActiveTab] = useState("check-in");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dateSelected, setDateSelected] = useState<boolean>(true);
  
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
    
    toast(`Filters applied - Showing attendance data for ${format(selectedDate, "PPP")}`);
  };

  // Handle date change
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setDateSelected(true);
      
      toast(`Date selected - Attendance date set to ${format(date, "PPP")}`);
    }
  };

  // Log to help with debugging
  useEffect(() => {
    console.log("ManualAttendanceRecords rendered with activeTab:", activeTab);
  }, [activeTab]);

  return (
    <div className="space-y-5 px-1 pt-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Manual Attendance Records</h1>
      </div>
      
      {/* Filters Section */}
      <ManualAttendanceFilters 
        filters={filters}
        setFilters={setFilters}
        onReset={handleResetFilters}
        onApply={handleApplyFilters}
      />
      
      {/* Tabs Section with Date Picker */}
      <ManualAttendanceTabs 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        filteredRecords={filteredRecords}
        filters={filters}
        projects={mockProjects}
        selectedDate={selectedDate}
        setSelectedDate={handleDateChange}
        dateSelected={dateSelected}
        setDateSelected={setDateSelected}
      />
    </div>
  );
};

export default ManualAttendanceRecords;
