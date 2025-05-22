
import React from "react";
import { Search, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FilterValues {
  employeeId: string;
  name: string;
  classification: string;
  category: string;
  status: string;
  project: string;
  entity: string;
  reason?: string; // Added reason field
}

interface SharedFilterPanelProps {
  filters: FilterValues;
  setFilters: React.Dispatch<React.SetStateAction<FilterValues>>;
  onReset: () => void;
  onApply: () => void;
}

const categoryOptions = ["All", "Carpenter", "Mason", "Plumber", "Electrician", "Painter", "Laborer"];
const classificationOptions = ["All", "Laborer", "Staff"];
const statusOptions = ["All", "Active", "Inactive"];
const projectOptions = ["All", "Main Building Construction", "Bridge Expansion", "Hospital Wing", "Warehouse Project"];
const entityOptions = ["All", "Tanseeq Landscaping LLC", "Tanseeq Construction Ltd", "Tanseeq Engineering Co"];
const reasonOptions = ["All", "Medical", "Visa", "ID", "Sick", "Casual"];  // Added reason options

const SharedFilterPanel: React.FC<SharedFilterPanelProps> = ({
  filters,
  setFilters,
  onReset,
  onApply
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Employee ID/Name Filter - Combined Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Employee Name/ID
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by Name or Employee ID"
              value={filters.name || filters.employeeId}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d+$/.test(value)) {
                  // If numeric, update employeeId
                  setFilters(prev => ({ ...prev, employeeId: value, name: '' }));
                } else {
                  // Otherwise, update name
                  setFilters(prev => ({ ...prev, name: value, employeeId: '' }));
                }
              }}
              className="pl-10"
            />
          </div>
        </div>

        {/* Entity Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Entity
          </label>
          <select
            value={filters.entity}
            onChange={(e) => setFilters(prev => ({ ...prev, entity: e.target.value }))}
            className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm"
          >
            {entityOptions.map((option) => (
              <option key={option} value={option === "All" ? "all" : option}>
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
              <option key={option} value={option === "All" ? "all" : option}>
                {option}
              </option>
            ))}
          </select>
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
              <option key={option} value={option === "All" ? "all" : option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm"
          >
            {statusOptions.map((option) => (
              <option key={option} value={option === "All" ? "all" : option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Project Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project
          </label>
          <select
            value={filters.project}
            onChange={(e) => setFilters(prev => ({ ...prev, project: e.target.value }))}
            className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm"
          >
            {projectOptions.map((option) => (
              <option key={option} value={option === "All" ? "all" : option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Reason Filter - New */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Attendance Reason
          </label>
          <select
            value={filters.reason || "all"}
            onChange={(e) => setFilters(prev => ({ ...prev, reason: e.target.value }))}
            className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm"
          >
            {reasonOptions.map((option) => (
              <option key={option} value={option === "All" ? "all" : option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end mt-4">
        <Button
          onClick={onReset}
          variant="outline"
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          <X className="h-4 w-4 mr-1" /> Clear All
        </Button>
        <Button
          onClick={onApply}
          className="ml-3 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium shadow-sm transition-colors"
        >
          <Check className="h-4 w-4 mr-1" /> Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default SharedFilterPanel;
