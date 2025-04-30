
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ManualAttendanceFiltersProps {
  filters: {
    employeeId: string;
    name: string;
    category: string;
    classification: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    employeeId: string;
    name: string;
    category: string;
    classification: string;
  }>>;
  onReset: () => void;
}

const categoryOptions = ["All", "Carpenter", "Mason", "Plumber", "Electrician", "Painter", "Laborer"];
const classificationOptions = ["All", "Laborer", "Staff"];

const ManualAttendanceFilters: React.FC<ManualAttendanceFiltersProps> = ({
  filters,
  setFilters,
  onReset
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Employee ID Filter - Numeric Only */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Employee ID
          </label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
            className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm"
          >
            {categoryOptions.map((option) => (
              <option key={option} value={option === "All" ? "all-categories" : option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Classification Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Classification
          </label>
          <select
            value={filters.classification}
            onChange={(e) => setFilters(prev => ({ ...prev, classification: e.target.value }))}
            className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm"
          >
            {classificationOptions.map((option) => (
              <option key={option} value={option === "All" ? "all-classifications" : option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end mt-4">
        <button
          onClick={onReset}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          Reset Filters
        </button>
        <button
          className="ml-3 px-6 py-2 bg-proscape hover:bg-proscape-dark text-white rounded-md text-sm font-medium shadow-sm transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default ManualAttendanceFilters;
