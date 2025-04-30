
import React, { useState } from "react";
import { CalendarIcon, ChevronDown, Check, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface FilterValues {
  startDate: Date | null;
  endDate: Date | null;
  employee: string;
  project: string;
  location: string;
  mode: string;
  status: string;
  advanced: string;
}

interface FilterSectionProps {
  availableProjects: string[];
  availableLocations: string[];
  onApply: (filters: FilterValues) => void;
  onClear: () => void;
  currentFilters: FilterValues;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  availableProjects,
  availableLocations,
  onApply,
  onClear,
  currentFilters,
}) => {
  // Local working state for input bindings
  const [filters, setFilters] = useState<FilterValues>(currentFilters);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Handle input updates
  const handleInput = (key: keyof FilterValues, value: string | Date | null) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Main "Apply Filters" click
  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(filters);
  };

  // "Clear All" click
  const handleClear = () => {
    setFilters({
      startDate: null,
      endDate: null,
      employee: "",
      project: "",
      location: "",
      mode: "",
      status: "",
      advanced: "",
    });
    onClear();
  };

  // Utility: Format date for input field display
  const displayDate = (d: Date | null) => (d ? format(d, "MMM dd, yyyy") : "");

  return (
    <form
      onSubmit={handleApply}
      className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6 border border-gray-200"
    >
      {/* Main Filters */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Date Range Picker */}
        <div className="flex space-x-2 items-end">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  className="w-full justify-start text-left font-normal pl-3"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-proscape" />
                  {filters.startDate ? displayDate(filters.startDate) : <span className="text-muted-foreground">Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filters.startDate!}
                  onSelect={(date) => handleInput("startDate", date)}
                  className="p-3 pointer-events-auto"
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  className="w-full justify-start text-left font-normal pl-3"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-proscape" />
                  {filters.endDate ? displayDate(filters.endDate) : <span className="text-muted-foreground">Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filters.endDate!}
                  onSelect={(date) => handleInput("endDate", date)}
                  className="p-3 pointer-events-auto"
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Employee Name / ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name / ID</label>
          <div className="relative flex items-center">
            <Search className="absolute left-3 top-2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape text-sm"
              placeholder="Search by Name or ID"
              value={filters.employee}
              onChange={(e) => handleInput("employee", e.target.value)}
            />
          </div>
        </div>

        {/* Project */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
          <select
            className="pl-3 pr-8 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape text-sm appearance-none"
            value={filters.project}
            onChange={(e) => handleInput("project", e.target.value)}
          >
            <option value="">All Projects</option>
            {availableProjects.map((proj, i) => (
              <option key={i} value={proj}>{proj}</option>
            ))}
          </select>
        </div>
        {/* Row 2 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <select
            className="pl-3 pr-8 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape text-sm appearance-none"
            value={filters.location}
            onChange={(e) => handleInput("location", e.target.value)}
          >
            <option value="">All Locations</option>
            {availableLocations.map((loc, i) => (
              <option key={i} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Attendance Mode</label>
          <select
            className="pl-3 pr-8 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape text-sm appearance-none"
            value={filters.mode}
            onChange={(e) => handleInput("mode", e.target.value)}
          >
            <option value="">All</option>
            <option value="Face">Face</option>
            <option value="Manual">Manual</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            className="pl-3 pr-8 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape text-sm appearance-none"
            value={filters.status}
            onChange={(e) => handleInput("status", e.target.value)}
          >
            <option value="">All</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>
      </div>

      {/* Divider and Advanced Search Trigger */}
      <div className="flex items-center justify-between mt-6">
        <button
          type="button"
          onClick={() => setShowAdvanced((v) => !v)}
          className="flex items-center text-sm text-proscape hover:text-proscape-dark font-medium transition-colors"
        >
          <ChevronDown className={`h-4 w-4 mr-1 transition-transform ${showAdvanced ? "rotate-180" : ""}`} />
          Advanced Search
        </button>
        <div className="flex-grow border-t border-gray-200 mx-4" />
        <div>
          <Button type="submit" className="bg-proscape hover:bg-proscape-dark text-white px-4 py-2 mr-2">
            <Check className="h-4 w-4 mr-2" /> Apply Filters
          </Button>
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center text-sm text-gray-500 hover:text-proscape-dark transition-colors"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </button>
        </div>
      </div>

      {/* Advanced Search */}
      {showAdvanced && (
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Advanced Search
          </label>
          <div className="relative flex items-center">
            <Search className="absolute left-3 top-2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape text-sm"
              placeholder="Search by role, comments, time, or any keyword…"
              value={filters.advanced}
              onChange={(e) => handleInput("advanced", e.target.value)}
            />
          </div>
        </div>
      )}
    </form>
  );
};
