
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ManualAttendanceFiltersProps {
  filters: {
    employeeId: string;
    name: string;
    category: string;
    classification: string;
    project: string;
    location: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    employeeId: string;
    name: string;
    category: string;
    classification: string;
    project: string;
    location: string;
  }>>;
  onApplyFilters: () => void;
  onReset: () => void;
  isLoading?: boolean;
  projectOptions: string[];
  locationOptions: string[];
}

const categoryOptions = ["All", "Carpenter", "Mason", "Plumber", "Electrician", "Painter", "Laborer"];
const classificationOptions = ["All", "Laborer", "Staff"];

const ManualAttendanceFilters: React.FC<ManualAttendanceFiltersProps> = ({
  filters,
  setFilters,
  onApplyFilters,
  onReset,
  isLoading = false,
  projectOptions,
  locationOptions
}) => {
  // Handle numeric-only input for employee ID
  const handleEmployeeIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numeric values
    if (value === '' || /^[0-9\b]+$/.test(value)) {
      setFilters(prev => ({ ...prev, employeeId: value }));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6 border border-gray-200">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Filter Attendance Records</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Employee ID Filter - Numeric Only */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-1">
            Employee ID
          </Label>
          <Input
            type="text"
            placeholder="Enter ID number"
            value={filters.employeeId}
            onChange={handleEmployeeIdChange}
            className="w-full"
          />
        </div>

        {/* Name Filter */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name"
              value={filters.name}
              onChange={(e) => setFilters(prev => ({ ...prev, name: e.target.value }))}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </Label>
          <Select
            value={filters.category}
            onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-categories">All Categories</SelectItem>
              {categoryOptions.filter(opt => opt !== "All").map((option) => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Classification Filter */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-1">
            Classification
          </Label>
          <Select
            value={filters.classification}
            onValueChange={(value) => setFilters(prev => ({ ...prev, classification: value }))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Classifications" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-classifications">All Classifications</SelectItem>
              {classificationOptions.filter(opt => opt !== "All").map((option) => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Project Filter */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-1">
            Project
          </Label>
          <Select
            value={filters.project}
            onValueChange={(value) => setFilters(prev => ({ ...prev, project: value }))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Projects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-projects">All Projects</SelectItem>
              {projectOptions.map((project) => (
                <SelectItem key={project} value={project}>{project}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Location Filter */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </Label>
          <Select
            value={filters.location}
            onValueChange={(value) => setFilters(prev => ({ ...prev, location: value }))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-locations">All Locations</SelectItem>
              {locationOptions.map((location) => (
                <SelectItem key={location} value={location}>{location}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end mt-6">
        <Button
          variant="outline"
          onClick={onReset}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          disabled={isLoading}
        >
          Clear Filters
        </Button>
        <Button
          onClick={onApplyFilters}
          className="ml-3 px-6 py-2 bg-proscape hover:bg-proscape-dark text-white rounded-md text-sm font-medium shadow-sm transition-colors"
          disabled={isLoading}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default ManualAttendanceFilters;
