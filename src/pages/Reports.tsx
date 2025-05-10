
import React, { useState } from "react";
import { Download, FileText, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { calculateWorkingHours, isOvertimeWorked } from "@/utils/timeUtils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Define interfaces for our data
interface ReportFilters {
  employeeIdName: string;
  entity: string;
  classification: string;
  category: string;
  project: string;
  fromDate: Date | undefined;
  toDate: Date | undefined;
}

interface AttendanceRecord {
  id: number;
  employeeId: string;
  name: string;
  entity: string;
  classification: string;
  category: string;
  project: string;
  date: string;
  checkIn: string;
  checkInMode: 'Face' | 'Manual';
  checkOut: string;
  checkOutMode: 'Face' | 'Manual';
}

const Reports = () => {
  // Filter states
  const [filters, setFilters] = useState<ReportFilters>({
    employeeIdName: "",
    entity: "",
    classification: "",
    category: "",
    project: "",
    fromDate: undefined,
    toDate: undefined
  });

  // Mock report data
  const reportData: AttendanceRecord[] = [
    {
      id: 1,
      employeeId: "EMP001",
      name: "John Smith",
      entity: "Tanseeq Construction",
      classification: "Staff",
      category: "Engineer",
      project: "Main Building Construction",
      date: "2025-04-22",
      checkIn: "08:30 AM",
      checkInMode: "Face",
      checkOut: "05:15 PM", 
      checkOutMode: "Face"
    },
    {
      id: 2,
      employeeId: "EMP002",
      name: "Sarah Johnson",
      entity: "Alpha Contractors",
      classification: "Laborer",
      category: "Mason",
      project: "Bridge Expansion",
      date: "2025-04-22",
      checkIn: "09:15 AM",
      checkInMode: "Face",
      checkOut: "05:30 PM",
      checkOutMode: "Manual"
    },
    {
      id: 3,
      employeeId: "EMP003",
      name: "Mohammed Al Farsi",
      entity: "Tanseeq Construction",
      classification: "Staff",
      category: "Supervisor", 
      project: "Main Building Construction",
      date: "2025-04-22",
      checkIn: "07:45 AM",
      checkInMode: "Face",
      checkOut: "06:20 PM",
      checkOutMode: "Face"
    },
    {
      id: 4,
      employeeId: "EMP004",
      name: "Lisa Wong",
      entity: "Beta Services Ltd",
      classification: "Laborer",
      category: "Carpenter",
      project: "Interior Finishing",
      date: "2025-04-22",
      checkIn: "08:00 AM",
      checkInMode: "Manual",
      checkOut: "04:45 PM",
      checkOutMode: "Manual"
    }
  ];

  const handleExport = () => {
    toast.success("Report exported successfully");
  };

  const handleFilterApply = () => {
    toast.info("Filters applied");
    // In a real app, this would trigger data fetching with the applied filters
  };
  
  const clearFilters = () => {
    setFilters({
      employeeIdName: "",
      entity: "",
      classification: "",
      category: "",
      project: "",
      fromDate: undefined, 
      toDate: undefined
    });
    toast.info("Filters cleared");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
        <Button
          onClick={handleExport}
          className="bg-proscape hover:bg-proscape/90"
        >
          <FileText className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <Card className="p-6 space-y-6">
        {/* Filters Section */}
        <div className="space-y-4 bg-white rounded-lg border border-gray-200">
          <div className="p-4">
            <h3 className="text-lg font-medium mb-4">Filters</h3>
            
            {/* First Row of Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {/* Employee ID/Name Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employee ID / Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    className="pl-10"
                    placeholder="Search by ID or name"
                    value={filters.employeeIdName}
                    onChange={(e) => setFilters({...filters, employeeIdName: e.target.value})}
                  />
                </div>
              </div>
              
              {/* Entity Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Entity
                </label>
                <Select 
                  value={filters.entity} 
                  onValueChange={(value) => setFilters({...filters, entity: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select entity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Entities</SelectItem>
                    <SelectItem value="tanseeq">Tanseeq Construction</SelectItem>
                    <SelectItem value="alpha">Alpha Contractors</SelectItem>
                    <SelectItem value="beta">Beta Services Ltd</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Classification Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Classification
                </label>
                <Select 
                  value={filters.classification} 
                  onValueChange={(value) => setFilters({...filters, classification: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select classification" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classifications</SelectItem>
                    <SelectItem value="laborer">Laborer</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Second Row of Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <Select 
                  value={filters.category} 
                  onValueChange={(value) => setFilters({...filters, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="engineer">Engineer</SelectItem>
                    <SelectItem value="supervisor">Supervisor</SelectItem>
                    <SelectItem value="mason">Mason</SelectItem>
                    <SelectItem value="carpenter">Carpenter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Project Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project
                </label>
                <Select 
                  value={filters.project} 
                  onValueChange={(value) => setFilters({...filters, project: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Projects</SelectItem>
                    <SelectItem value="main-building">Main Building Construction</SelectItem>
                    <SelectItem value="bridge">Bridge Expansion</SelectItem>
                    <SelectItem value="interior">Interior Finishing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Date Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Range
                </label>
                <div className="flex space-x-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "justify-start text-left font-normal w-full",
                          !filters.fromDate && "text-muted-foreground"
                        )}
                      >
                        {filters.fromDate ? format(filters.fromDate, "dd/MM/yyyy") : "From Date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={filters.fromDate}
                        onSelect={(date) => setFilters({...filters, fromDate: date})}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "justify-start text-left font-normal w-full",
                          !filters.toDate && "text-muted-foreground"
                        )}
                      >
                        {filters.toDate ? format(filters.toDate, "dd/MM/yyyy") : "To Date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={filters.toDate}
                        onSelect={(date) => setFilters({...filters, toDate: date})}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
              <Button onClick={handleFilterApply}>
                Apply Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Reports Table */}
        <div className="overflow-x-auto border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Classification</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Check-In</TableHead>
                <TableHead>Check-Out</TableHead>
                <TableHead>Working Hours</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportData.map((row) => {
                const workingHours = calculateWorkingHours(row.checkIn, row.checkOut);
                const isOvertime = isOvertimeWorked(workingHours);
                
                return (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium">{row.employeeId}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.entity}</TableCell>
                    <TableCell>{row.classification}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>{row.project}</TableCell>
                    <TableCell>{format(new Date(row.date), "dd/MM/yyyy")}</TableCell>
                    <TableCell>
                      {row.checkIn} – <span className={row.checkInMode === 'Face' ? 'text-green-600' : 'text-amber-600'}>{row.checkInMode}</span>
                    </TableCell>
                    <TableCell>
                      {row.checkOut} – <span className={row.checkOutMode === 'Face' ? 'text-green-600' : 'text-amber-600'}>{row.checkOutMode}</span>
                    </TableCell>
                    <TableCell>
                      {isOvertime ? (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="text-red-600 font-bold">
                                {workingHours}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Exceeds standard working hours</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ) : (
                        workingHours
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default Reports;
