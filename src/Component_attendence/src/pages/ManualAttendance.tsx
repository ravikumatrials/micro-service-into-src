
import React, { useState } from "react";
import { Button } from "../components/ui/button";
import ManualAttendanceFilters from "../components/ManualAttendanceFilters";
import ManualAttendanceTabs from "../components/ManualAttendanceTabs";
import { initialFilters, filterRecords } from "../components/AttendanceFilterUtils";
import { mockProjects } from "../data/attendanceData";
import { AttendanceFilters } from "../types/attendance";

const ManualAttendance = () => {
  const [activeTab, setActiveTab] = useState("check-in");
  const [filters, setFilters] = useState<AttendanceFilters>(initialFilters);
  const [filteredRecords, setFilteredRecords] = useState(filterRecords(initialFilters));
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dateSelected, setDateSelected] = useState(true);

  const handleApplyFilters = () => {
    setFilteredRecords(filterRecords(filters));
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
    setFilteredRecords(filterRecords(initialFilters));
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-6">Manual Attendance</h1>

      {/* Filters */}
      <ManualAttendanceFilters
        filters={filters}
        setFilters={setFilters}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      />

      {/* Tabs */}
      <ManualAttendanceTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        filteredRecords={filteredRecords}
        filters={filters}
        projects={mockProjects}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        dateSelected={dateSelected}
        setDateSelected={setDateSelected}
      />
    </div>
  );
};

export default ManualAttendance;
