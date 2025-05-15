import React, { useState, useMemo } from "react";
import { Download, FileText, Search, ChevronDown, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter
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
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { calculateWorkingHours, isOvertimeWorked, sumWorkingHours } from "@/utils/timeUtils";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { MOCK_ATTENDANCE_DATA } from "@/data/mockAttendance";

// Define interfaces for our data
interface ReportFilters {
  employeeIdName: string;
  entity: string;
  classification: string;
  category: string;
  project: string;
  fromDate: Date | undefined;
  toDate: Date | undefined;
  attendanceMode: string;
  showExceptionsOnly: boolean;
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
  checkInMode: "Face" | "Manual";
  checkOut: string;
  checkOutMode: "Face" | "Manual";
  location?: string; // Making location optional with '?' since it may not exist in all records
}

// Function to export exception report
const exportExceptionReport = (data: AttendanceRecord[]) => {
  // Filter records with missing check-outs
  const exceptionRecords = data.filter(record => record.checkIn && !record.checkOut);
  
  if (exceptionRecords.length === 0) {
    return false; // No records to export
  }
  
  // Format data for CSV - Updated to match the exception-only columns
  const csvHeader = "Employee ID,Name,Project,Location,Check-In Date,Check-In Time,Check-Out Date,Check-Out Time\n";
  const csvRows = exceptionRecords.map(record => {
    const checkInDate = format(new Date(record.date), "yyyy-MM-dd");
    const checkInTime = record.checkIn;
    
    return [
      record.employeeId,
      record.name,
      record.project,
      record.location || "N/A", // Use N/A if location is not available
      checkInDate,
      checkInTime,
      "", // Empty Check-Out Date
      ""  // Empty Check-Out Time
    ].join(",");
  });
  
  const csvContent = csvHeader + csvRows.join("\n");
  
  // Create a blob and download the file
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `exception_report_${format(new Date(), "yyyy-MM-dd")}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  return true; // Export successful
};

const Reports = () => {
  // Filter states
  const [filters, setFilters] = useState<ReportFilters>({
    employeeIdName: "",
    entity: "all",
    classification: "all",
    category: "all",
    project: "all",
    fromDate: undefined,
    toDate: undefined,
    attendanceMode: "all",
    showExceptionsOnly: false
  });
  
  const { toast } = useToast();
  
  // Report data from mock data
  const reportData = MOCK_ATTENDANCE_DATA;
  
  // Group reports by employee for summary view
  const groupedData = useMemo(() => {
    return reportData.reduce<Record<string, AttendanceRecord[]>>((acc, record) => {
      const key = `${record.employeeId}-${record.name}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(record);
      return acc;
    }, {});
  }, [reportData]);

  // Filter data based on current filters
  const filteredData = useMemo(() => {
    return reportData.filter(record => {
      // Filter exception records (missing check-outs)
      if (filters.showExceptionsOnly && !(record.checkIn && !record.checkOut)) {
        return false;
      }
      
      // Filter by employeeIdName (ID or name)
      if (filters.employeeIdName && 
          !record.employeeId.toLowerCase().includes(filters.employeeIdName.toLowerCase()) && 
          !record.name.toLowerCase().includes(filters.employeeIdName.toLowerCase())) {
        return false;
      }
      
      // Filter by entity
      if (filters.entity !== "all" && record.entity !== filters.entity) {
        return false;
      }
      
      // Filter by classification
      if (filters.classification !== "all" && record.classification !== filters.classification) {
        return false;
      }
      
      // Filter by category
      if (filters.category !== "all" && record.category !== filters.category) {
        return false;
      }
      
      // Filter by project
      if (filters.project !== "all" && record.project !== filters.project) {
        return false;
      }
      
      // Filter by date range
      if (filters.fromDate && new Date(record.date) < filters.fromDate) {
        return false;
      }
      
      if (filters.toDate && new Date(record.date) > filters.toDate) {
        return false;
      }
      
      // Filter by attendance mode
      if (filters.attendanceMode !== "all") {
        if (filters.attendanceMode === "face" && 
            (record.checkInMode !== "Face" || record.checkOutMode !== "Face")) {
          return false;
        }
        
        if (filters.attendanceMode === "manual" && 
            (record.checkInMode !== "Manual" || record.checkOutMode !== "Manual")) {
          return false;
        }
        
        if (filters.attendanceMode === "mixed" && 
            !((record.checkInMode === "Face" && record.checkOutMode === "Manual") || 
              (record.checkInMode === "Manual" && record.checkOutMode === "Face"))) {
          return false;
        }
      }
      
      return true;
    });
  }, [reportData, filters]);
  
  // Group filtered data by employee for summary view
  const filteredGroupedData = useMemo(() => {
    return filteredData.reduce<Record<string, AttendanceRecord[]>>((acc, record) => {
      const key = `${record.employeeId}-${record.name}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(record);
      return acc;
    }, {});
  }, [filteredData]);
  
  // View options
  const [viewType, setViewType] = useState<"detailed" | "summary">("detailed");

  const handleExport = () => {
    toast({
      title: "Success",
      description: "Report exported successfully",
    });
  };

  const handleExportExceptionReport = () => {
    const result = exportExceptionReport(filteredData);
    
    if (result) {
      toast({
        title: "Success",
        description: "Exception report exported successfully",
      });
    } else {
      toast({
        title: "No Data",
        description: "No exception records found to export",
        variant: "destructive",
      });
    }
  };

  const handleFilterApply = () => {
    toast({
      title: "Info",
      description: "Filters applied",
    });
  };
  
  const clearFilters = () => {
    setFilters({
      employeeIdName: "",
      entity: "all",
      classification: "all",
      category: "all",
      project: "all",
      fromDate: undefined, 
      toDate: undefined,
      attendanceMode: "all",
      showExceptionsOnly: false
    });
    toast({
      title: "Info",
      description: "Filters cleared",
    });
  };

  // Toggle exceptions only filter
  const toggleExceptionsOnly = () => {
    setFilters(prev => ({
      ...prev,
      showExceptionsOnly: !prev.showExceptionsOnly
    }));
  };

  // Count exception records (missing check-outs)
  const exceptionCount = useMemo(() => {
    return filteredData.filter(record => record.checkIn && !record.checkOut).length;
  }, [filteredData]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
        <div className="flex space-x-3">
          <Select 
            value={viewType} 
            onValueChange={(value) => setViewType(value as "detailed" | "summary")}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="View Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="detailed">Detailed View</SelectItem>
              <SelectItem value="summary">Summary View</SelectItem>
            </SelectContent>
          </Select>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="bg-proscape hover:bg-proscape/90"
              >
                <FileText className="h-4 w-4 mr-2" />
                Export Options
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleExport}>
                <FileText className="h-4 w-4 mr-2" />
                Export Full Report
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportExceptionReport}>
                <AlertTriangle className="h-4 w-4 mr-2" />
                Export Exception Report {exceptionCount > 0 && `(${exceptionCount})`}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
                    <SelectItem value="Tanseeq Construction">Tanseeq Construction</SelectItem>
                    <SelectItem value="Alpha Contractors">Alpha Contractors</SelectItem>
                    <SelectItem value="Beta Services Ltd">Beta Services Ltd</SelectItem>
                    <SelectItem value="Tanseeq Engineering">Tanseeq Engineering</SelectItem>
                    <SelectItem value="Delta Operations">Delta Operations</SelectItem>
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
                    <SelectItem value="Laborer">Laborer</SelectItem>
                    <SelectItem value="Staff">Staff</SelectItem>
                    <SelectItem value="Supervisor">Supervisor</SelectItem>
                    <SelectItem value="Contractor">Contractor</SelectItem>
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
                    <SelectItem value="Engineer">Engineer</SelectItem>
                    <SelectItem value="Supervisor">Supervisor</SelectItem>
                    <SelectItem value="Mason">Mason</SelectItem>
                    <SelectItem value="Carpenter">Carpenter</SelectItem>
                    <SelectItem value="Electrician">Electrician</SelectItem>
                    <SelectItem value="Plumber">Plumber</SelectItem>
                    <SelectItem value="Painter">Painter</SelectItem>
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
                    <SelectItem value="Main Building Construction">Main Building Construction</SelectItem>
                    <SelectItem value="Bridge Expansion">Bridge Expansion</SelectItem>
                    <SelectItem value="Interior Finishing">Interior Finishing</SelectItem>
                    <SelectItem value="Highway Project">Highway Project</SelectItem>
                    <SelectItem value="Commercial Complex">Commercial Complex</SelectItem>
                    <SelectItem value="Hospital Wing">Hospital Wing</SelectItem>
                    <SelectItem value="Stadium Renovation">Stadium Renovation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Attendance Mode Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Attendance Mode
                </label>
                <Select 
                  value={filters.attendanceMode} 
                  onValueChange={(value) => setFilters({...filters, attendanceMode: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select attendance mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Modes</SelectItem>
                    <SelectItem value="face">Face Recognition</SelectItem>
                    <SelectItem value="manual">Manual Entry</SelectItem>
                    <SelectItem value="mixed">Mixed (Face/Manual)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Date Range Filter and Exceptions Filter (Third Row) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
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
            
              {/* Action Buttons and Show Exceptions Only toggle */}
              <div className="flex justify-between">
                <div className="flex items-end">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="exceptions-only"
                      checked={filters.showExceptionsOnly}
                      onCheckedChange={toggleExceptionsOnly}
                    />
                    <label 
                      htmlFor="exceptions-only" 
                      className="text-sm font-medium cursor-pointer flex items-center"
                    >
                      {filters.showExceptionsOnly && (
                        <AlertTriangle className="h-4 w-4 text-amber-500 mr-1" />
                      )}
                      Show Exceptions Only
                    </label>
                  </div>
                </div>
                <div className="flex justify-end gap-2 items-end">
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                  <Button onClick={handleFilterApply}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exception Count Indicator */}
        {exceptionCount > 0 && (
          <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
              <span>Found <strong>{exceptionCount}</strong> records with missing check-outs</span>
            </div>
            <Button 
              size="sm" 
              variant="outline" 
              className="border-amber-300 text-amber-700 hover:bg-amber-100"
              onClick={handleExportExceptionReport}
            >
              <Download className="h-4 w-4 mr-1" />
              Export Exception Report
            </Button>
          </div>
        )}

        {/* Reports Section */}
        {viewType === "detailed" ? (
          // Detailed View - Shows all records in table format
          <div className="overflow-x-auto border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  {/* Render different columns based on exceptions-only mode */}
                  {filters.showExceptionsOnly ? (
                    // Exception-only columns
                    <>
                      <TableHead>Employee ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Check-In Date</TableHead>
                      <TableHead>Check-In Time</TableHead>
                      <TableHead>Check-Out Date</TableHead>
                      <TableHead>Check-Out Time</TableHead>
                    </>
                  ) : (
                    // Default columns
                    <>
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
                    </>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((row) => {
                    const workingHours = calculateWorkingHours(row.checkIn, row.checkOut);
                    const isOvertime = isOvertimeWorked(workingHours);
                    const isMissingCheckOut = row.checkIn && !row.checkOut;
                    
                    return (
                      <TableRow key={row.id} className={isMissingCheckOut ? "bg-amber-50" : ""}>
                        {/* Render different cell data based on exceptions-only mode */}
                        {filters.showExceptionsOnly ? (
                          // Exception-only cells
                          <>
                            <TableCell className="font-medium">{row.employeeId}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.project}</TableCell>
                            <TableCell>{row.location || "N/A"}</TableCell>
                            <TableCell>{format(new Date(row.date), "dd/MM/yyyy")}</TableCell>
                            <TableCell>{row.checkIn || "N/A"}</TableCell>
                            <TableCell>
                              {row.checkOut ? format(new Date(row.date), "dd/MM/yyyy") : (
                                <span className="text-red-600 text-sm font-medium">
                                  Missing
                                </span>
                              )}
                            </TableCell>
                            <TableCell>
                              {row.checkOut || (
                                <span className="text-red-600 text-sm font-medium flex items-center">
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  Missing
                                </span>
                              )}
                            </TableCell>
                          </>
                        ) : (
                          // Default cells
                          <>
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
                              {row.checkOut ? (
                                <>
                                  {row.checkOut} – <span className={row.checkOutMode === 'Face' ? 'text-green-600' : 'text-amber-600'}>{row.checkOutMode}</span>
                                </>
                              ) : (
                                <span className="text-red-600 text-sm font-medium flex items-center">
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  Missing
                                </span>
                              )}
                            </TableCell>
                            <TableCell>
                              {isMissingCheckOut ? (
                                <span className="text-amber-600 text-sm">Incomplete</span>
                              ) : isOvertime ? (
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
                          </>
                        )}
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={filters.showExceptionsOnly ? 8 : 10} className="text-center py-6">No records found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        ) : (
          // Summary View - Shows grouped employee records with totals
          <div className="space-y-4">
            {Object.entries(filteredGroupedData).length > 0 ? (
              Object.entries(filteredGroupedData).map(([key, records]) => {
                const [employeeId, name] = key.split("-");
                const totalHours = sumWorkingHours(records.map(r => 
                  calculateWorkingHours(r.checkIn, r.checkOut)
                ));
                const isEmployeeTotalOvertime = isOvertimeWorked(totalHours);
                const hasMissingCheckOuts = records.some(r => r.checkIn && !r.checkOut);
                
                return (
                  <Card key={key} className={`overflow-hidden ${hasMissingCheckOuts ? 'border-amber-300' : ''}`}>
                    <Collapsible>
                      <div className={`flex items-center justify-between p-4 ${hasMissingCheckOuts ? 'bg-amber-50' : 'bg-gray-50'} border-b`}>
                        <div className="flex items-center space-x-4">
                          <div>
                            <h3 className="font-semibold">{name}</h3>
                            <p className="text-sm text-gray-500">ID: {employeeId}</p>
                          </div>
                          {hasMissingCheckOuts && (
                            <span className="text-amber-600 text-xs font-medium flex items-center">
                              <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                              Missing check-outs
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Total Working Hours:</p>
                            <p className={cn(
                              "font-semibold", 
                              isEmployeeTotalOvertime ? "text-red-600" : "text-gray-900"
                            )}>
                              {totalHours}
                            </p>
                          </div>
                          <CollapsibleTrigger className="rounded-full w-6 h-6 flex items-center justify-center">
                            <ChevronDown className="h-4 w-4" />
                          </CollapsibleTrigger>
                        </div>
                      </div>
                      
                      <CollapsibleContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              {filters.showExceptionsOnly ? (
                                <>
                                  <TableHead>Project</TableHead>
                                  <TableHead>Location</TableHead>
                                  <TableHead>Check-In Date</TableHead>
                                  <TableHead>Check-In Time</TableHead>
                                  <TableHead>Check-Out Date</TableHead>
                                  <TableHead>Check-Out Time</TableHead>
                                </>
                              ) : (
                                <>
                                  <TableHead>Entity</TableHead>
                                  <TableHead>Project</TableHead>
                                  <TableHead>Date</TableHead>
                                  <TableHead>Check-In</TableHead>
                                  <TableHead>Check-Out</TableHead>
                                  <TableHead>Working Hours</TableHead>
                                </>
                              )}
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {records.map((record) => {
                              const workingHours = calculateWorkingHours(record.checkIn, record.checkOut);
                              const isOvertime = isOvertimeWorked(workingHours);
                              const isMissingCheckOut = record.checkIn && !record.checkOut;
                              
                              return (
                                <TableRow key={record.id} className={isMissingCheckOut ? "bg-amber-50" : ""}>
                                  {filters.showExceptionsOnly ? (
                                    <>
                                      <TableCell>{record.project}</TableCell>
                                      <TableCell>{record.location || "N/A"}</TableCell>
                                      <TableCell>{format(new Date(record.date), "dd/MM/yyyy")}</TableCell>
                                      <TableCell>{record.checkIn || "N/A"}</TableCell>
                                      <TableCell>
                                        {record.checkOut ? format(new Date(record.date), "dd/MM/yyyy") : (
                                          <span className="text-red-600 text-sm font-medium">
                                            Missing
                                          </span>
                                        )}
                                      </TableCell>
                                      <TableCell>
                                        {record.checkOut || (
                                          <span className="text-red-600 text-sm font-medium flex items-center">
                                            <AlertTriangle className="h-3 w-3 mr-1" />
                                            Missing
                                          </span>
                                        )}
                                      </TableCell>
                                    </>
                                  ) : (
                                    <>
                                      <TableCell>{record.entity}</TableCell>
                                      <TableCell>{record.project}</TableCell>
                                      <TableCell>{format(new Date(record.date), "dd/MM/yyyy")}</TableCell>
                                      <TableCell>
                                        {record.checkIn} – <span className={record.checkInMode === 'Face' ? 'text-green-600' : 'text-amber-600'}>{record.checkInMode}</span>
                                      </TableCell>
                                      <TableCell>
                                        {record.checkOut ? (
                                          <>
                                            {record.checkOut} – <span className={record.checkOutMode === 'Face' ? 'text-green-600' : 'text-amber-600'}>{record.checkOutMode}</span>
                                          </>
                                        ) : (
                                          <span className="text-red-600 text-sm font-medium flex items-center">
                                            <AlertTriangle className="h-3 w-3 mr-1" />
                                            Missing
                                          </span>
                                        )}
                                      </TableCell>
                                      <TableCell>
                                        {isMissingCheckOut ? (
                                          <span className="text-amber-600 text-sm">Incomplete</span>
                                        ) : isOvertime ? (
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
                                    </>
                                  )}
                                </TableRow>
                              );
                            })}
                          </TableBody>
                          <TableFooter>
                            <TableRow>
                              <TableCell colSpan={filters.showExceptionsOnly ? 5 : 5} className="text-right font-semibold">
                                Total Working Hours:
                              </TableCell>
                              <TableCell className={cn(
                                "font-semibold", 
                                isEmployeeTotalOvertime ? "text-red-600" : ""
                              )}>
                                {!filters.showExceptionsOnly ? totalHours : "N/A"}
                              </TableCell>
                            </TableRow>
                          </TableFooter>
                        </Table>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                );
              })
            ) : (
              <div className="text-center py-8 text-gray-500">No records found</div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default Reports;
