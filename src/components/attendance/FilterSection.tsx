
import React, { useState } from "react";
import { CalendarIcon, ChevronDown, Check, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

interface FilterValues {
  startDate: Date | null;
  endDate: Date | null;
  employee: string;
  entity: string;
  category: string;
  classification: string;
  project: string;
  location: string;
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
  const [isLoading, setIsLoading] = useState(false);

  // Handle input updates
  const handleInput = (key: keyof FilterValues, value: string | Date | null) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Handle employee ID input - allow only numeric values
  const handleEmployeeIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^[0-9\b]+$/.test(value)) {
      handleInput("employee", value);
    }
  };

  // Main "Apply Filters" click
  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onApply(filters);
      setIsLoading(false);
    }, 800);
  };

  // "Clear All" click
  const handleClear = () => {
    setFilters({
      startDate: null,
      endDate: null,
      employee: "",
      entity: "",
      category: "",
      classification: "",
      project: "",
      location: ""
    });
    onClear();
  };

  // Utility: Format date for input field display
  const formatDate = (d: Date | null) => (d ? format(d, "MMM dd, yyyy") : "");

  return (
    <form
      onSubmit={handleApply}
      className="bg-white rounded-lg shadow-sm p-5 mb-6 border border-gray-200"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Date Range Picker - Row 1, Col 1-2 */}
        <div className="flex space-x-4">
          {/* From Date */}
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  disabled={isLoading}
                  type="button"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-green-600" />
                  {filters.startDate ? (
                    formatDate(filters.startDate)
                  ) : (
                    <span className="text-gray-400">Start Date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filters.startDate!}
                  onSelect={(date) => handleInput("startDate", date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {/* To Date */}
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  disabled={isLoading}
                  type="button"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-green-600" />
                  {filters.endDate ? (
                    formatDate(filters.endDate)
                  ) : (
                    <span className="text-gray-400">End Date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filters.endDate!}
                  onSelect={(date) => handleInput("endDate", date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        {/* Employee ID - Numeric only */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
          <div className="relative">
            <Input
              type="text"
              placeholder="Enter Employee ID"
              value={filters.employee}
              onChange={handleEmployeeIdChange}
              disabled={isLoading}
              className="pl-8"
            />
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
        
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search by Name"
              value={filters.employee}
              onChange={(e) => handleInput("employee", e.target.value)}
              disabled={isLoading}
              className="pl-8"
            />
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
        
        {/* Entity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Entity</label>
          <select
            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 disabled:cursor-not-allowed disabled:opacity-50"
            value={filters.entity}
            onChange={(e) => handleInput("entity", e.target.value)}
            disabled={isLoading}
          >
            <option value="all-entities">All Entities</option>
            <option value="Tanseeq Landscaping LLC">Tanseeq Landscaping LLC</option>
            <option value="Tanseeq Construction LLC">Tanseeq Construction LLC</option>
            <option value="Tanseeq Investment LLC">Tanseeq Investment LLC</option>
            <option value="Tanseeq Design LLC">Tanseeq Design LLC</option>
            <option value="Tanseeq Contracting LLC">Tanseeq Contracting LLC</option>
          </select>
        </div>
        
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 disabled:cursor-not-allowed disabled:opacity-50"
            value={filters.category}
            onChange={(e) => handleInput("category", e.target.value)}
            disabled={isLoading}
          >
            <option value="all-categories">All Categories</option>
            <option value="Carpenter">Carpenter</option>
            <option value="Mason">Mason</option>
            <option value="Plumber">Plumber</option>
            <option value="Electrician">Electrician</option>
            <option value="Engineer">Engineer</option>
            <option value="Supervisor">Supervisor</option>
            <option value="Architect">Architect</option>
          </select>
        </div>
        
        {/* Classification */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Classification</label>
          <select
            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 disabled:cursor-not-allowed disabled:opacity-50"
            value={filters.classification}
            onChange={(e) => handleInput("classification", e.target.value)}
            disabled={isLoading}
          >
            <option value="all-classifications">All Classifications</option>
            <option value="Laborer">Laborer</option>
            <option value="Staff">Staff</option>
          </select>
        </div>
        
        {/* Project */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
          <select
            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 disabled:cursor-not-allowed disabled:opacity-50"
            value={filters.project}
            onChange={(e) => handleInput("project", e.target.value)}
            disabled={isLoading}
          >
            <option value="all-projects">All Projects</option>
            {availableProjects.map((project, i) => (
              <option key={i} value={project}>{project}</option>
            ))}
          </select>
        </div>
        
        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <select
            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 disabled:cursor-not-allowed disabled:opacity-50"
            value={filters.location}
            onChange={(e) => handleInput("location", e.target.value)}
            disabled={isLoading}
          >
            <option value="all-locations">All Locations</option>
            {availableLocations.map((location, i) => (
              <option key={i} value={location}>{location}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-end mt-6 space-x-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleClear}
          disabled={isLoading}
          className="text-gray-600"
        >
          <X className="mr-1 h-4 w-4" />
          Clear All
        </Button>
        <Button 
          type="submit"
          disabled={isLoading}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Applying...
            </span>
          ) : (
            <>
              <Check className="mr-1 h-4 w-4" />
              Apply Filters
            </>
          )}
        </Button>
      </div>
    </form>
  );
};
