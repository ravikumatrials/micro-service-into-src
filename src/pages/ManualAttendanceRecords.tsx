
import { useState } from "react";
import { format } from "date-fns";
import ManualAttendanceFilters from "@/components/attendance/ManualAttendanceFilters";
import ManualAttendanceTabs from "@/components/attendance/ManualAttendanceTabs";
import { filterRecords, initialFilters, AttendanceFilters } from "@/components/attendance/AttendanceFilterUtils";
import { mockProjects } from "@/data/mockProjects";
import { toast } from "@/hooks/use-toast";

// Define types for the attendance reason
interface AttendanceReason {
  id: string;
  label: string;
  category: "present-offsite" | "absent";
}

// Define attendance reasons
export const attendanceReasons: AttendanceReason[] = [
  { id: "medical", label: "Medical", category: "present-offsite" },
  { id: "visa", label: "Visa", category: "present-offsite" },
  { id: "id", label: "ID", category: "present-offsite" },
  { id: "sick", label: "Sick", category: "absent" },
  { id: "casual", label: "Casual", category: "absent" },
];

// Extend the AttendanceRecord type interface (will be used in components)
export interface ExtendedAttendanceRecord {
  id: number;
  employeeId: string;
  name: string;
  checkInTime?: string;
  checkOutTime?: string;
  status: string;
  attendanceReason?: string;
  reasonCategory?: "present-offsite" | "absent";
  date: Date;
  project: string;
  location?: string;
  // Add any other fields that might be needed
}

const ManualAttendanceRecords = () => {
  const [filters, setFilters] = useState<AttendanceFilters>(initialFilters);
  const [activeTab, setActiveTab] = useState("check-in"); // Default to check-in tab
  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // Default to today's date
  const [dateSelected, setDateSelected] = useState<boolean>(true); // Default to true since we're auto-selecting today
  
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
    
    toast({
      title: "Filters applied",
      description: `Showing attendance data for ${format(selectedDate, "PPP")}`,
    });
  };

  // Handle date change
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setDateSelected(true);
      
      toast({
        title: "Date selected",
        description: `Attendance date set to ${format(date, "PPP")}`,
      });
    }
  };

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
        filteredRecords={filteredRecords as unknown as ExtendedAttendanceRecord[]}
        filters={filters}
        projects={mockProjects}
        selectedDate={selectedDate}
        setSelectedDate={handleDateChange}
        dateSelected={dateSelected}
        setDateSelected={setDateSelected}
        attendanceReasons={attendanceReasons}
      />
    </div>
  );
};

export default ManualAttendanceRecords;
