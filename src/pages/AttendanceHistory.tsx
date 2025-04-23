
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { 
  Calendar, 
  Clock, 
  Download, 
  Eye,
  Filter, 
  MessageCircle,
  Search, 
  ChevronDown,
  ChevronUp,
  User 
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { format, isWithinInterval, parseISO, isAfter, isBefore } from "date-fns";

const AttendanceHistory = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [employeeFilter, setEmployeeFilter] = useState("");
  const [projectFilter, setProjectFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [attendanceModeFilter, setAttendanceModeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [timeRangeFilter, setTimeRangeFilter] = useState("");
  const [commentedOnlyFilter, setCommentedOnlyFilter] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  
  // Mock attendance data
  const attendanceRecords = [
    { 
      id: 1, 
      employee: "John Smith", 
      employeeId: "EMP001",
      role: "Site Engineer",
      date: "2025-04-22",
      checkInTime: "08:30 AM", 
      checkInMethod: "Face", 
      checkOutTime: "05:15 PM", 
      checkOutMethod: "Face",
      project: "Main Building Construction",
      location: "Site A",
      status: "Present",
      totalHours: "8h 45m",
      comment: "Worked on foundation inspection"
    },
    { 
      id: 2, 
      employee: "Sarah Johnson", 
      employeeId: "EMP002",
      role: "Project Manager",
      date: "2025-04-22",
      checkInTime: "08:45 AM", 
      checkInMethod: "Face", 
      checkOutTime: "05:30 PM", 
      checkOutMethod: "Manual",
      project: "Bridge Expansion Project",
      location: "Site B",
      status: "Present",
      totalHours: "8h 45m",
      comment: "Employee forgot to check out. Manual checkout by supervisor."
    },
    { 
      id: 3, 
      employee: "Robert Williams", 
      employeeId: "EMP003",
      role: "Architect",
      date: "2025-04-22",
      checkInTime: "09:15 AM", 
      checkInMethod: "Manual", 
      checkOutTime: "05:45 PM", 
      checkOutMethod: "Face",
      project: "Highway Renovation",
      location: "Office",
      status: "Present",
      totalHours: "8h 30m",
      comment: "Late arrival due to transportation issue."
    },
    { 
      id: 4, 
      employee: "Emily Davis", 
      employeeId: "EMP004",
      role: "Civil Engineer",
      date: "2025-04-22",
      checkInTime: "08:15 AM", 
      checkInMethod: "Face", 
      checkOutTime: "04:30 PM", 
      checkOutMethod: "Face",
      project: "Main Building Construction",
      location: "Site A",
      status: "Present",
      totalHours: "8h 15m",
      comment: ""
    },
    { 
      id: 5, 
      employee: "James Miller", 
      employeeId: "EMP005",
      role: "Safety Officer",
      date: "2025-04-22",
      checkInTime: "08:30 AM", 
      checkInMethod: "Face", 
      checkOutTime: "05:00 PM", 
      checkOutMethod: "Face",
      project: "Highway Renovation",
      location: "Site C",
      status: "Present",
      totalHours: "8h 30m",
      comment: ""
    },
    { 
      id: 6, 
      employee: "Jennifer Wilson", 
      employeeId: "EMP006",
      role: "Surveyor",
      date: "2025-04-21",
      checkInTime: "08:30 AM", 
      checkInMethod: "Face", 
      checkOutTime: "05:15 PM", 
      checkOutMethod: "Face",
      project: "Bridge Expansion Project",
      location: "Site B",
      status: "Present",
      totalHours: "8h 45m",
      comment: ""
    },
    { 
      id: 7, 
      employee: "Michael Brown", 
      employeeId: "EMP007",
      role: "Construction Worker",
      date: "2025-04-21",
      checkInTime: "08:45 AM", 
      checkInMethod: "Face", 
      checkOutTime: "05:30 PM", 
      checkOutMethod: "Manual",
      project: "Main Building Construction",
      location: "Site A",
      status: "Present",
      totalHours: "8h 45m",
      comment: "Employee forgot to check out. Manual checkout by supervisor."
    },
    { 
      id: 8, 
      employee: "David Thompson", 
      employeeId: "EMP008",
      role: "Electrician",
      date: "2025-04-21",
      checkInTime: "08:15 AM", 
      checkInMethod: "Face", 
      checkOutTime: "05:00 PM", 
      checkOutMethod: "Face",
      project: "Highway Renovation",
      location: "Site C",
      status: "Present",
      totalHours: "8h 45m",
      comment: ""
    },
    { 
      id: 9, 
      employee: "Jessica Martinez", 
      employeeId: "EMP009",
      role: "Plumber",
      date: "2025-04-20",
      checkInTime: "", 
      checkInMethod: "", 
      checkOutTime: "", 
      checkOutMethod: "",
      project: "Main Building Construction",
      location: "Site A",
      status: "Absent",
      totalHours: "0h 0m",
      comment: "Sick leave"
    },
    { 
      id: 10, 
      employee: "Christopher Lee", 
      employeeId: "EMP010",
      role: "HVAC Technician",
      date: "2025-04-20",
      checkInTime: "08:30 AM", 
      checkInMethod: "Manual", 
      checkOutTime: "04:30 PM", 
      checkOutMethod: "Manual",
      project: "Bridge Expansion Project",
      location: "Site B",
      status: "Present",
      totalHours: "8h 0m",
      comment: "System issue - manual check-in and check-out"
    },
    { 
      id: 11, 
      employee: "Daniel Clark", 
      employeeId: "EMP011",
      role: "Site Supervisor",
      date: "2025-04-19",
      checkInTime: "08:00 AM", 
      checkInMethod: "Face", 
      checkOutTime: "06:00 PM", 
      checkOutMethod: "Face",
      project: "Highway Renovation",
      location: "Site C",
      status: "Present",
      totalHours: "10h 0m",
      comment: "Extended working hours due to project deadline"
    },
    { 
      id: 12, 
      employee: "Michelle Rodriguez", 
      employeeId: "EMP012",
      role: "Interior Designer",
      date: "2025-04-19",
      checkInTime: "", 
      checkInMethod: "", 
      checkOutTime: "", 
      checkOutMethod: "",
      project: "Main Building Construction",
      location: "Office",
      status: "Absent",
      totalHours: "0h 0m",
      comment: "Planned leave"
    },
  ];

  // Get unique roles for filter dropdown
  const roles = [...new Set(attendanceRecords.map(record => record.role))];

  // Time range options
  const timeRangeOptions = ["", "Before 9 AM", "After 6 PM", "9 AM - 6 PM"];

  // Filter records based on filters
  const filteredRecords = attendanceRecords.filter(record => {
    // Date range filter
    const dateMatch = (!startDate && !endDate) ? true : 
      (startDate && endDate) ? 
        isWithinInterval(parseISO(record.date), { 
          start: parseISO(startDate), 
          end: parseISO(endDate) 
        }) : 
        (startDate && !endDate) ? 
          parseISO(record.date) >= parseISO(startDate) : 
          parseISO(record.date) <= parseISO(endDate);
    
    // Employee filter
    const employeeMatch = !employeeFilter ? true : 
      record.employee.toLowerCase().includes(employeeFilter.toLowerCase()) || 
      record.employeeId.toLowerCase().includes(employeeFilter.toLowerCase());
    
    // Project filter
    const projectMatch = !projectFilter ? true : record.project === projectFilter;
    
    // Location filter
    const locationMatch = !locationFilter ? true : record.location === locationFilter;
    
    // Attendance mode filter
    const modeMatch = !attendanceModeFilter ? true : 
      attendanceModeFilter === "Face" ? 
        (record.checkInMethod === "Face" && record.checkOutMethod === "Face") : 
        (record.checkInMethod === "Manual" || record.checkOutMethod === "Manual");
    
    // Status filter
    const statusMatch = !statusFilter ? true : record.status === statusFilter;

    // Advanced filters
    // Role filter
    const roleMatch = !roleFilter ? true : record.role === roleFilter;

    // Time range filter
    let timeMatch = true;
    if (timeRangeFilter) {
      const checkInTime = record.checkInTime;
      if (timeRangeFilter === "Before 9 AM") {
        timeMatch = checkInTime && checkInTime < "09:00 AM";
      } else if (timeRangeFilter === "After 6 PM") {
        timeMatch = record.checkOutTime && record.checkOutTime > "06:00 PM";
      } else if (timeRangeFilter === "9 AM - 6 PM") {
        timeMatch = (checkInTime && checkInTime >= "09:00 AM") && 
                   (record.checkOutTime && record.checkOutTime <= "06:00 PM");
      }
    }

    // Commented records only filter
    const commentMatch = !commentedOnlyFilter ? true : record.comment !== "";
    
    return dateMatch && employeeMatch && projectMatch && locationMatch && 
           modeMatch && statusMatch && roleMatch && timeMatch && commentMatch;
  });

  // Get current page records for pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  // Get unique projects and locations for filter dropdowns
  const projects = [...new Set(attendanceRecords.map(record => record.project))];
  const locations = [...new Set(attendanceRecords.map(record => record.location))];

  // Format date for display
  const formatDate = (dateString) => {
    try {
      return format(parseISO(dateString), "MMM dd, yyyy");
    } catch (error) {
      return dateString;
    }
  };

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    startDate, endDate, employeeFilter, projectFilter, locationFilter, 
    attendanceModeFilter, statusFilter, roleFilter, timeRangeFilter, commentedOnlyFilter
  ]);

  // Component for rendering comment tooltips
  const CommentTooltip = ({ comment }) => {
    if (!comment) return null;
    
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="text-gray-500 hover:text-gray-700 transition-colors">
              <MessageCircle className="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p>{comment}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  // Mobile card view component
  const MobileCard = ({ record }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 mb-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-medium text-gray-900">{record.employee}</h3>
            <p className="text-sm text-gray-500">{record.employeeId} • {record.role}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              record.status === "Present" 
                ? "bg-green-100 text-green-800" 
                : "bg-red-100 text-red-800"
            }`}>
              {record.status}
            </span>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-500 hover:text-gray-700"
            >
              {isExpanded ? 
                <ChevronUp className="h-5 w-5" /> : 
                <ChevronDown className="h-5 w-5" />
              }
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
          <div>
            <p className="text-gray-500">Date:</p>
            <p>{formatDate(record.date)}</p>
          </div>
          <div>
            <p className="text-gray-500">Project:</p>
            <p className="truncate">{record.project}</p>
          </div>
          <div>
            <p className="text-gray-500">Check In:</p>
            <p className="flex items-center">
              {record.checkInTime || "-"}
              {record.checkInMethod && (
                <span className={`ml-1 px-1 text-xs rounded ${
                  record.checkInMethod === "Face" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-amber-100 text-amber-800"
                }`}>
                  {record.checkInMethod}
                </span>
              )}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Check Out:</p>
            <p className="flex items-center">
              {record.checkOutTime || "-"}
              {record.checkOutMethod && (
                <span className={`ml-1 px-1 text-xs rounded ${
                  record.checkOutMethod === "Face" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-amber-100 text-amber-800"
                }`}>
                  {record.checkOutMethod}
                </span>
              )}
            </p>
          </div>
        </div>
        
        {isExpanded && (
          <div className="border-t pt-3 mt-2 space-y-2 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-gray-500">Location:</p>
                <p>{record.location}</p>
              </div>
              <div>
                <p className="text-gray-500">Total Hours:</p>
                <p>{record.totalHours}</p>
              </div>
            </div>
            {record.comment && (
              <div>
                <p className="text-gray-500">Comment:</p>
                <p className="italic">{record.comment}</p>
              </div>
            )}
          </div>
        )}
        
        <div className="flex justify-between items-center text-sm mt-3">
          <div className="flex items-center">
            {record.comment && <CommentTooltip comment={record.comment} />}
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <button 
                className="text-proscape hover:text-proscape-dark transition-colors"
                aria-label="View details"
              >
                <Eye className="h-4 w-4" />
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Attendance Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Date</p>
                    <p className="text-sm">{formatDate(record.date)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Employee ID</p>
                    <p className="text-sm">{record.employeeId}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Employee Name</p>
                    <p className="text-sm">{record.employee}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Role</p>
                    <p className="text-sm">{record.role}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Project</p>
                    <p className="text-sm">{record.project}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Location</p>
                    <p className="text-sm">{record.location}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Check In Time</p>
                    <p className="text-sm">
                      {record.checkInTime || "-"}
                      {record.checkInMethod && (
                        <span 
                          className={`ml-2 inline-flex items-center text-xs font-medium px-2 py-1 rounded-full ${
                            record.checkInMethod === "Face" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {record.checkInMethod}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Check Out Time</p>
                    <p className="text-sm">
                      {record.checkOutTime || "-"}
                      {record.checkOutMethod && (
                        <span 
                          className={`ml-2 inline-flex items-center text-xs font-medium px-2 py-1 rounded-full ${
                            record.checkOutMethod === "Face" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {record.checkOutMethod}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Total Hours</p>
                    <p className="text-sm">{record.totalHours}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <p className="text-sm">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        record.status === "Present" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {record.status}
                      </span>
                    </p>
                  </div>
                  <div className="space-y-1 col-span-2">
                    <p className="text-sm font-medium text-gray-500">Comment</p>
                    <p className="text-sm">{record.comment || "-"}</p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Attendance History</h1>
        <button className="flex items-center bg-proscape hover:bg-proscape-dark text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </button>
      </div>

      <Card className="p-4 md:p-6">
        {/* Filters */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
            {/* Date Range Picker */}
            <div className="xl:col-span-2 grid grid-cols-2 gap-2">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                <div className="flex items-center">
                  <Calendar className="absolute left-3 top-[calc(50%+4px)] transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="date"
                    className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape text-sm"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                <div className="flex items-center">
                  <Calendar className="absolute left-3 top-[calc(50%+4px)] transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="date"
                    className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape text-sm"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            {/* Employee Search */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
              <div className="flex items-center">
                <Search className="absolute left-3 top-[calc(50%+4px)] transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape text-sm"
                  placeholder="Search name or ID"
                  value={employeeFilter}
                  onChange={(e) => setEmployeeFilter(e.target.value)}
                />
              </div>
            </div>
            
            {/* Project Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
              <select
                className="pl-3 pr-8 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape text-sm"
                value={projectFilter}
                onChange={(e) => setProjectFilter(e.target.value)}
              >
                <option value="">All Projects</option>
                {projects.map((project, index) => (
                  <option key={index} value={project}>{project}</option>
                ))}
              </select>
            </div>
            
            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <select
                className="pl-3 pr-8 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape text-sm"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <option value="">All Locations</option>
                {locations.map((location, index) => (
                  <option key={index} value={location}>{location}</option>
                ))}
              </select>
            </div>
            
            {/* Combined Attendance Mode and Status Filters */}
            <div className="grid grid-cols-2 gap-2">
              {/* Attendance Mode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mode</label>
                <select
                  className="pl-3 pr-8 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape text-sm"
                  value={attendanceModeFilter}
                  onChange={(e) => setAttendanceModeFilter(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Face">Face</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
              
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  className="pl-3 pr-8 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape text-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </div>
            </div>
          </div>

          {/* Advanced Search Button */}
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
              className="flex items-center text-sm font-medium text-proscape hover:text-proscape-dark transition-colors"
            >
              <Filter className="h-4 w-4 mr-1" />
              Advanced Search
              {showAdvancedSearch ? 
                <ChevronUp className="h-4 w-4 ml-1" /> : 
                <ChevronDown className="h-4 w-4 ml-1" />
              }
            </button>
            
            <div className="text-sm text-gray-500">
              Found: <span className="font-medium">{filteredRecords.length}</span> records
            </div>
          </div>

          {/* Advanced Search Fields */}
          {showAdvancedSearch && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              {/* Role Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  className="pl-3 pr-8 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape text-sm"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <option value="">All Roles</option>
                  {roles.map((role, index) => (
                    <option key={index} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              {/* Time Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time Range</label>
                <select
                  className="pl-3 pr-8 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape text-sm"
                  value={timeRangeFilter}
                  onChange={(e) => setTimeRangeFilter(e.target.value)}
                >
                  <option value="">All Times</option>
                  {timeRangeOptions.slice(1).map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Commented Records Only Filter */}
              <div className="flex items-center pt-6">
                <input
                  type="checkbox"
                  id="commentedOnly"
                  className="h-4 w-4 text-proscape rounded border-gray-300 focus:ring-proscape"
                  checked={commentedOnlyFilter}
                  onChange={(e) => setCommentedOnlyFilter(e.target.checked)}
                />
                <label htmlFor="commentedOnly" className="ml-2 block text-sm text-gray-700">
                  Show only records with comments
                </label>
              </div>
            </div>
          )}
        </div>
        
        {/* Mobile view */}
        <div className="md:hidden space-y-4 mt-6">
          {currentRecords.length > 0 ? (
            currentRecords.map((record) => (
              <MobileCard key={record.id} record={record} />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">No attendance records found</div>
          )}
        </div>
        
        {/* Desktop view */}
        <div className="hidden md:block overflow-x-auto mt-6">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Employee</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentRecords.length > 0 ? (
                currentRecords.map((record, index) => (
                  <TableRow key={record.id} className={index % 2 === 0 ? "bg-white hover:bg-gray-50/80" : "bg-gray-50/50 hover:bg-gray-50/80"} 
                    style={{ transition: "background-color 0.2s ease" }}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{record.employee}</div>
                        <div className="text-xs text-gray-500">{record.employeeId}</div>
                      </div>
                    </TableCell>
                    <TableCell>{record.role}</TableCell>
                    <TableCell>{record.project}</TableCell>
                    <TableCell>{record.location}</TableCell>
                    <TableCell>{formatDate(record.date)}</TableCell>
                    <TableCell>
                      {record.checkInTime ? (
                        <div className="flex items-center">
                          <span>{record.checkInTime}</span>
                          {record.checkInMethod && (
                            <span 
                              className={`ml-2 inline-flex items-center text-xs font-medium px-2 py-1 rounded-full ${
                                record.checkInMethod === "Face" 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {record.checkInMethod}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {record.checkOutTime ? (
                        <div className="flex items-center">
                          <span>{record.checkOutTime}</span>
                          {record.checkOutMethod && (
                            <span 
                              className={`ml-2 inline-flex items-center text-xs font-medium px-2 py-1 rounded-full ${
                                record.checkOutMethod === "Face" 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {record.checkOutMethod}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        record.status === "Present" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {record.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <CommentTooltip comment={record.comment} />
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <button 
                            className="text-gray-500 hover:text-proscape transition-colors"
                            aria-label="View details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Attendance Details</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-500">Date</p>
                                <p className="text-sm">{formatDate(record.date)}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-500">Employee ID</p>
                                <p className="text-sm">{record.employeeId}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-500">Employee Name</p>
                                <p className="text-sm">{record.employee}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-500">Role</p>
                                <p className="text-sm">{record.role}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-500">Project</p>
                                <p className="text-sm">{record.project}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-500">Location</p>
                                <p className="text-sm">{record.location}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-500">Check In Time</p>
                                <p className="text-sm">
                                  {record.checkInTime || "-"}
                                  {record.checkInMethod && (
                                    <span 
                                      className={`ml-2 inline-flex items-center text-xs font-medium px-2 py-1 rounded-full ${
                                        record.checkInMethod === "Face" 
                                          ? "bg-green-100 text-green-800" 
                                          : "bg-amber-100 text-amber-800"
                                      }`}
                                    >
                                      {record.checkInMethod}
                                    </span>
                                  )}
                                </p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-500">Check Out Time</p>
                                <p className="text-sm">
                                  {record.checkOutTime || "-"}
                                  {record.checkOutMethod && (
                                    <span 
                                      className={`ml-2 inline-flex items-center text-xs font-medium px-2 py-1 rounded-full ${
                                        record.checkOutMethod === "Face" 
                                          ? "bg-green-100 text-green-800" 
                                          : "bg-amber-100 text-amber-800"
                                      }`}
                                    >
                                      {record.checkOutMethod}
                                    </span>
                                  )}
                                </p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-500">Total Hours</p>
                                <p className="text-sm">{record.totalHours}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-500">Status</p>
                                <p className="text-sm">
                                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                    record.status === "Present" 
                                      ? "bg-green-100 text-green-800" 
                                      : "bg-red-100 text-red-800"
                                  }`}>
                                    {record.status}
                                  </span>
                                </p>
                              </div>
                              <div className="space-y-1 col-span-2">
                                <p className="text-sm font-medium text-gray-500">Comment</p>
                                <p className="text-sm">{record.comment || "-"}</p>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10} className="h-24 text-center">
                    No attendance records found matching the search criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{currentRecords.length}</span> of{" "}
            <span className="font-medium">{filteredRecords.length}</span> records
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              Previous
            </button>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AttendanceHistory;
