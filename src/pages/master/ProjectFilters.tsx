
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function ProjectFilters({
  filters,
  setFilters,
  locations,
  employees
}: {
  filters: any, setFilters: (v: any) => void, locations: string[], employees: {id:string, name:string}[]
}) {
  const [datePopoverOpen, setDatePopoverOpen] = useState(false);

  return (
    <div className="bg-card/80 rounded-md p-4 mb-2 flex flex-col gap-3 md:grid md:grid-cols-5 md:gap-4 md:items-end">
      {/* Project Name */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Project Name</label>
        <Input
          placeholder="Search project..."
          value={filters.name}
          onChange={e => setFilters(f => ({ ...f, name: e.target.value }))}
          className="text-base"
        />
      </div>
      {/* Location Dropdown */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Location</label>
        <select
          value={filters.location}
          onChange={e => setFilters(f => ({ ...f, location: e.target.value }))}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-proscape text-base"
        >
          <option value="">All</option>
          {locations.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>
      {/* Status Dropdown */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Status</label>
        <select
          value={filters.status}
          onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-proscape text-base"
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      {/* Date Range Filter */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Date Range</label>
        <Popover open={datePopoverOpen} onOpenChange={setDatePopoverOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left" type="button">
              <CalendarIcon className="w-4 h-4 mr-2" />
              {filters.dateRange?.start && filters.dateRange?.end
                ? `${format(filters.dateRange.start, "dd-MMM-yyyy")} ~ ${format(filters.dateRange.end, "dd-MMM-yyyy")}`
                : <span className="text-gray-400">Pick range</span>}
              <ChevronDown className="w-4 h-4 ml-auto opacity-60" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={filters.dateRange}
              onSelect={(range) => {
                setFilters(f => ({ ...f, dateRange: range }));
              }}
              initialFocus
              className="p-3 pointer-events-auto"
            />
            <div className="flex justify-between p-2 border-t">
              <Button 
                variant="link" 
                className="px-0 text-xs text-gray-700" 
                onClick={() => setFilters(f => ({ ...f, dateRange: undefined }))}
              >
                Clear Selection
              </Button>
              <Button 
                variant="link" 
                className="px-0 text-xs text-proscape" 
                onClick={() => setDatePopoverOpen(false)}
              >
                Done
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      {/* Assigned Employee */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Assigned Employee</label>
        <Input
          placeholder="Search employee..."
          value={filters.employee}
          onChange={e => setFilters(f => ({ ...f, employee: e.target.value }))}
          className="text-base"
        />
      </div>
    </div>
  );
}
