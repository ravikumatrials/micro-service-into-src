
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Filter, RotateCcw } from "lucide-react";
import { format } from "date-fns";

interface ReportFiltersProps {
  filters: any;
  setFilters: React.Dispatch<React.SetStateAction<any>>;
}

const ReportFilters = ({ filters, setFilters }: ReportFiltersProps) => {
  const attendanceTypes = [
    { value: "all", label: "All Types" },
    { value: "present", label: "Present" },
    { value: "absent", label: "Absent" },
    { value: "sick-leave", label: "Sick Leave" },
    { value: "casual-leave", label: "Casual Leave" },
    { value: "visa", label: "Visa" }
  ];

  const roles = [
    { value: "all", label: "All Roles" },
    { value: "medical-officer", label: "Medical Officer" },
    { value: "camp-boss", label: "Camp Boss" },
    { value: "uae-officer", label: "UAE Officer" },
    { value: "engineer", label: "Engineer" },
    { value: "worker", label: "Worker" }
  ];

  const handleReset = () => {
    setFilters({
      dateRange: { from: null, to: null },
      project: "all",
      role: "all",
      attendanceType: "all",
      status: "all"
    });
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-medium">Report Filters</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Date Range</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Select dates
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="range" />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Project</label>
          <Select value={filters.project} onValueChange={(value) => setFilters(prev => ({ ...prev, project: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="main-building">Main Building</SelectItem>
              <SelectItem value="bridge-expansion">Bridge Expansion</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Role</label>
          <Select value={filters.role} onValueChange={(value) => setFilters(prev => ({ ...prev, role: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map(role => (
                <SelectItem key={role.value} value={role.value}>{role.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Attendance Type</label>
          <Select value={filters.attendanceType} onValueChange={(value) => setFilters(prev => ({ ...prev, attendanceType: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {attendanceTypes.map(type => (
                <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button onClick={handleReset} variant="outline" className="w-full">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ReportFilters;
