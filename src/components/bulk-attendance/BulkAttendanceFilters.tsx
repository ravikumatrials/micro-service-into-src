
import { useState } from 'react';
import { Calendar, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";

// Types for filter props
export interface BulkAttendanceFilterProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  project: string;
  setProject: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  classification: string;
  setClassification: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onImportClick: () => void;
  onMarkAttendance: () => void;
  selectedEmployeesCount: number;
  projectOptions: string[];
  locationOptions: string[];
  categoryOptions: string[];
  classificationOptions: string[];
}

const BulkAttendanceFilters = ({
  date,
  setDate,
  project,
  setProject,
  location,
  setLocation,
  category,
  setCategory,
  classification,
  setClassification,
  status,
  setStatus,
  searchQuery,
  setSearchQuery,
  onImportClick,
  onMarkAttendance,
  selectedEmployeesCount,
  projectOptions,
  locationOptions,
  categoryOptions,
  classificationOptions
}: BulkAttendanceFilterProps) => {
  return (
    <Card className="p-5 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {/* Date Filter */}
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full flex justify-between font-normal"
              >
                {date ? format(date, "PPP") : "Select date"}
                <Calendar className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Project Filter */}
        <div className="space-y-2">
          <Label htmlFor="project">Project</Label>
          <Select value={project} onValueChange={setProject}>
            <SelectTrigger>
              <SelectValue placeholder="All Projects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-projects">All Projects</SelectItem>
              {projectOptions.map((p) => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Location Filter */}
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger>
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-locations">All Locations</SelectItem>
              {locationOptions.map((l) => (
                <SelectItem key={l} value={l}>{l}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Classification Filter */}
        <div className="space-y-2">
          <Label htmlFor="classification">Classification</Label>
          <Select value={classification} onValueChange={setClassification}>
            <SelectTrigger>
              <SelectValue placeholder="All Classifications" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-classifications">All Classifications</SelectItem>
              {classificationOptions.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Category Filter */}
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-categories">All Categories</SelectItem>
              {categoryOptions.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status Filter */}
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="present">Present</SelectItem>
              <SelectItem value="absent">Absent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Search and Action Buttons */}
      <div className="flex flex-col md:flex-row justify-between mt-4 gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search by name or ID..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={onImportClick}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
              <path d="M7.5 1.05005C4.03656 1.05005 1.05 4.03661 1.05 7.50005C1.05 10.9635 4.03656 13.95 7.5 13.95C10.9634 13.95 13.95 10.9635 13.95 7.50005C13.95 4.03661 10.9634 1.05005 7.5 1.05005ZM7.5 1.95005C10.4634 1.95005 13.05 4.53661 13.05 7.50005C13.05 10.4635 10.4634 13.05 7.5 13.05C4.53656 13.05 1.95 10.4635 1.95 7.50005C1.95 4.53661 4.53656 1.95005 7.5 1.95005ZM3.57874 7.50005C3.57874 5.38868 5.29126 3.67616 7.40263 3.67616C8.50674 3.67616 9.35376 3.96653 10.0123 4.54717C10.6231 5.08525 11.046 5.88056 11.3243 6.84702C11.3525 6.96045 11.3233 7.08038 11.2462 7.16958C11.169 7.25878 11.0521 7.30566 10.9359 7.29859C10.8197 7.29152 10.7096 7.23124 10.6452 7.13382C10.5809 7.03639 10.57 6.91377 10.6154 6.8067C10.3734 5.97733 10.0255 5.35799 9.57044 4.9583C9.06787 4.51613 8.42252 4.32616 7.5 4.32616C5.67492 4.32616 4.22874 5.77235 4.22874 7.50005H3.57874Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg> Import
          </Button>
          <Button 
            className="bg-proscape hover:bg-proscape-dark text-white"
            onClick={onMarkAttendance}
            disabled={selectedEmployeesCount === 0}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4">
              <path d="M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM1.82708 7.49988C1.82708 4.36686 4.36689 1.82704 7.49991 1.82704C10.6329 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49988ZM10.1589 5.53774C10.3178 5.31191 10.2636 5.00001 10.0378 4.84109C9.81194 4.68217 9.50004 4.73642 9.34112 4.96225L6.51977 8.97154L5.35681 7.78706C5.16334 7.59002 4.84677 7.58711 4.64973 7.78058C4.45268 7.97404 4.44978 8.29061 4.64325 8.48765L6.22658 10.1003C6.33054 10.2062 6.47617 10.2604 6.62407 10.2483C6.77197 10.2363 6.90686 10.1591 6.99226 10.0377L10.1589 5.53774Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg> Mark Attendance
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default BulkAttendanceFilters;
