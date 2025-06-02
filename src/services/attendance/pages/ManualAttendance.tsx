
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import AttendanceFilters from "../components/AttendanceFilters";
import AttendanceTabs from "../components/AttendanceTabs";
import { filterRecords, initialFilters, AttendanceFilters as FilterType } from "../utils/attendanceUtils";
import { mockProjects } from "@/data/mockProjects";
import { toast } from "@/hooks/use-toast";

const ManualAttendance = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterType>(initialFilters);
  const [activeTab, setActiveTab] = useState("check-in");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dateSelected, setDateSelected] = useState<boolean>(true);
  
  const filteredRecords = filterRecords(filters);
  
  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  const handleApplyFilters = () => {
    console.log("Applying filters:", filters);
    console.log("Selected date:", selectedDate);
    
    toast({
      title: "Filters applied",
      description: `Showing attendance data for ${format(selectedDate, "PPP")}`,
    });
  };

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
      
      <AttendanceFilters 
        filters={filters}
        setFilters={setFilters}
        onReset={handleResetFilters}
        onApply={handleApplyFilters}
      />
      
      <AttendanceTabs 
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

export default ManualAttendance;
