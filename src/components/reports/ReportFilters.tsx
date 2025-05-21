
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ReportFiltersProps {
  projectFilter: string;
  setProjectFilter: (value: string) => void;
  locationFilter: string;
  setLocationFilter: (value: string) => void;
  roleFilter: string;
  setRoleFilter: (value: string) => void;
  attendanceTypeFilter: string;
  setAttendanceTypeFilter: (value: string) => void;
  entryMethodFilter: string;
  setEntryMethodFilter: (value: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
  reasonFilter?: string;
  setReasonFilter?: (value: string) => void;
}

export function ReportFilters({
  projectFilter,
  setProjectFilter,
  locationFilter,
  setLocationFilter,
  roleFilter,
  setRoleFilter,
  attendanceTypeFilter,
  setAttendanceTypeFilter,
  entryMethodFilter,
  setEntryMethodFilter,
  searchTerm,
  setSearchTerm,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  reasonFilter = "all",
  setReasonFilter = () => {},
}: ReportFiltersProps) {
  return (
    <div className="space-y-4 bg-white p-4 rounded-lg border border-gray-200">
      <div className="grid grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date Range
          </label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full"
            />
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search Employee
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="text"
              className="pl-10"
              placeholder="Search by name or ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project
          </label>
          <Select value={projectFilter} onValueChange={setProjectFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Projects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="main-building">Main Building</SelectItem>
              <SelectItem value="highway">Highway Project</SelectItem>
              <SelectItem value="bridge">Bridge Construction</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="site-a">Site A</SelectItem>
              <SelectItem value="site-b">Site B</SelectItem>
              <SelectItem value="site-c">Site C</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="engineer">Engineer</SelectItem>
              <SelectItem value="supervisor">Supervisor</SelectItem>
              <SelectItem value="worker">Worker</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Attendance Type
          </label>
          <Select value={attendanceTypeFilter} onValueChange={setAttendanceTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="full-day">Full Day</SelectItem>
              <SelectItem value="half-day">Half Day</SelectItem>
              <SelectItem value="absent">Absent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Entry Method
          </label>
          <Select value={entryMethodFilter} onValueChange={setEntryMethodFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Methods" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Methods</SelectItem>
              <SelectItem value="face">Face Recognition</SelectItem>
              <SelectItem value="manual">Manual Entry</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Attendance Reason
          </label>
          <Select value={reasonFilter} onValueChange={setReasonFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Reasons" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reasons</SelectItem>
              <SelectItem value="medical">Medical (Off-site)</SelectItem>
              <SelectItem value="visa">Visa (Off-site)</SelectItem>
              <SelectItem value="id">ID (Off-site)</SelectItem>
              <SelectItem value="sick">Sick (Excused)</SelectItem>
              <SelectItem value="casual">Casual (Unexcused)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
