
import { useState } from 'react';
import { Calendar, CheckCircle, CheckCheck, Search, Upload, FileUp, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Mock data for employees
const MOCK_EMPLOYEES = [
  { id: "EMP001", name: "John Smith", category: "Carpenter", classification: "Laborer", entity: "Acme Construction", project: "Main Building Construction" },
  { id: "EMP002", name: "Sarah Johnson", category: "Mason", classification: "Laborer", entity: "Acme Construction", project: "Main Building Construction" },
  { id: "EMP003", name: "Emily Davis", category: "Plumber", classification: "Laborer", entity: "Skyline Builders", project: "Bridge Expansion" },
  { id: "EMP004", name: "Robert Williams", category: "Electrician", classification: "Laborer", entity: "Skyline Builders", project: "Bridge Expansion" },
  { id: "EMP005", name: "Michael Brown", category: "Supervisor", classification: "Staff", entity: "Acme Construction", project: "Warehouse Project" },
  { id: "EMP006", name: "Lisa Wilson", category: "Carpenter", classification: "Laborer", entity: "Metro Developers", project: "Main Building Construction" },
  { id: "EMP007", name: "David Lee", category: "Manager", classification: "Staff", entity: "Metro Developers", project: "Warehouse Project" },
  { id: "EMP008", name: "Jennifer Taylor", category: "Electrician", classification: "Laborer", entity: "Skyline Builders", project: "Bridge Expansion" },
  { id: "EMP009", name: "James Anderson", category: "Mason", classification: "Laborer", entity: "Acme Construction", project: "Main Building Construction" },
  { id: "EMP010", name: "Maria Garcia", category: "Site Engineer", classification: "Staff", entity: "Metro Developers", project: "Warehouse Project" },
];

// Updated Excel data with the new column structure
const DUMMY_EXCEL_DATA = [
  { 
    id: "101", 
    name: "Ahmed Khan", 
    category: "Mason", 
    classification: "Laborer", 
    project: "Project A",
    location: "Downtown Site",
    checkInDate: "2025-05-07",
    checkOutDate: "2025-05-07",
    checkInTime: "08:00",
    checkOutTime: "17:00"
  },
  { 
    id: "102", 
    name: "Ramesh Iyer", 
    category: "Electrician", 
    classification: "Staff", 
    project: "Project B",
    location: "Bridge Zone A",
    checkInDate: "2025-05-07",
    checkOutDate: "2025-05-07",
    checkInTime: "08:30",
    checkOutTime: "17:30"
  },
  { 
    id: "103", 
    name: "Sara Al Marzooqi", 
    category: "Engineer", 
    classification: "Staff", 
    project: "Project A",
    location: "Site Office",
    checkInDate: "2025-05-07",
    checkOutDate: "2025-05-07",
    checkInTime: "09:00",
    checkOutTime: "18:00"
  },
  { 
    id: "104", 
    name: "John Peterson", 
    category: "Carpenter", 
    classification: "Laborer", 
    project: "Project C",
    location: "Building 7",
    checkInDate: "2025-05-07",
    checkOutDate: "2025-05-07",
    checkInTime: "07:30",
    checkOutTime: "16:30"
  },
  { 
    id: "105", 
    name: "Ali Mohammed", 
    category: "Supervisor", 
    classification: "Staff", 
    project: "Project B",
    location: "North Tower",
    checkInDate: "2025-05-07",
    checkOutDate: "2025-05-07",
    checkInTime: "08:15",
    checkOutTime: "17:45"
  },
];

// Mock data for filter options
const PROJECTS = ["Main Building Construction", "Bridge Expansion", "Warehouse Project"];
const ENTITIES = ["Acme Construction", "Skyline Builders", "Metro Developers"];
const CATEGORIES = ["Carpenter", "Mason", "Electrician", "Plumber", "Supervisor", "Manager", "Site Engineer"];
const CLASSIFICATIONS = ["Laborer", "Staff"];
const LOCATIONS = ["Downtown Site", "Bridge Zone A", "Site Office", "Building 7", "North Tower"];

const BulkAttendance = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [project, setProject] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [classification, setClassification] = useState<string>("");
  const [status, setStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // State for selected employees and modal
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [attendanceType, setAttendanceType] = useState<"check-in" | "check-out">("check-in");
  const [attendanceTime, setAttendanceTime] = useState(format(new Date(), "HH:mm"));
  const [reason, setReason] = useState("");
  
  // Import state
  const [isImportMode, setIsImportMode] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importPreviewData, setImportPreviewData] = useState<typeof DUMMY_EXCEL_DATA>([]);
  const [importComments, setImportComments] = useState<{ [id: string]: string }>({});
  
  // New state for tracking if data has been imported
  const [isDataImported, setIsDataImported] = useState(false);
  // New state for showing success message
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // Import filters state
  const [importProjectFilter, setImportProjectFilter] = useState<string>("");
  const [importCategoryFilter, setImportCategoryFilter] = useState<string>("");
  const [importClassificationFilter, setImportClassificationFilter] = useState<string>("");
  const [importLocationFilter, setImportLocationFilter] = useState<string>("");
  const [importSearchQuery, setImportSearchQuery] = useState<string>("");

  // Filter employees based on filters
  const filteredEmployees = isDataImported ? MOCK_EMPLOYEES.filter((employee) => {
    if (project && employee.project !== project) return false;
    if (category && employee.category !== category) return false;
    if (classification && employee.classification !== classification) return false;
    if (searchQuery && 
        !employee.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !employee.id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  }) : [];
  
  // Filter imported employees based on import filters
  const filteredImportEmployees = importPreviewData.filter((employee) => {
    if (importProjectFilter && employee.project !== importProjectFilter) return false;
    if (importCategoryFilter && employee.category !== importCategoryFilter) return false;
    if (importClassificationFilter && employee.classification !== importClassificationFilter) return false;
    if (importLocationFilter && employee.location !== importLocationFilter) return false;
    if (importSearchQuery && 
        !employee.name.toLowerCase().includes(importSearchQuery.toLowerCase()) && 
        !employee.id.toLowerCase().includes(importSearchQuery.toLowerCase())) return false;
    return true;
  });

  // Handle select all
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(filteredEmployees.map(e => e.id));
    }
    setSelectAll(!selectAll);
  };
  
  // Handle checkbox change
  const handleCheckboxChange = (employeeId: string) => {
    setSelectedEmployees(prev => 
      prev.includes(employeeId) 
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  // Handle mark attendance
  const handleMarkAttendance = () => {
    setIsModalOpen(true);
  };

  // Handle confirmation
  const handleConfirm = () => {
    toast({
      title: "Success!",
      description: `Attendance marked for ${selectedEmployees.length} employees on ${format(date || new Date(), "MMM dd, yyyy")}.`,
    });
    setIsModalOpen(false);
    setSelectedEmployees([]);
    setSelectAll(false);
  };
  
  // Handle import button click
  const handleImportClick = () => {
    setIsImportMode(true);
  };
  
  // Clear import filters
  const clearImportFilters = () => {
    setImportProjectFilter("");
    setImportCategoryFilter("");
    setImportClassificationFilter("");
    setImportLocationFilter("");
    setImportSearchQuery("");
  };
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImportFile(file);
      
      // In a real app, we would parse the Excel file here
      // For this prototype, we'll use the dummy data
      setImportPreviewData(DUMMY_EXCEL_DATA);
    }
  };
  
  // Handle marking attendance for a single employee from import
  const handleMarkEmployeeAttendance = (employeeId: string) => {
    const comment = importComments[employeeId] || '';
    
    toast({
      title: "Success!",
      description: `Attendance marked for employee ${employeeId}${comment ? ' with comment: ' + comment : ''}`,
    });
    
    // In a real app, we would update the database here
    // For this prototype, just remove the employee from the list
    setImportPreviewData(prev => prev.filter(emp => emp.id !== employeeId));
  };
  
  // Handle comment change for an employee
  const handleCommentChange = (employeeId: string, comment: string) => {
    setImportComments(prev => ({
      ...prev,
      [employeeId]: comment
    }));
  };
  
  // Exit import mode
  const exitImportMode = () => {
    setIsImportMode(false);
    setImportFile(null);
    setImportPreviewData([]);
    clearImportFilters();
    setImportComments({});
  };

  // Generate and download template with updated columns
  const downloadTemplate = () => {
    // Create a table structure that can be used as a template with updated columns
    const headers = [
      "Employee ID", 
      "Name", 
      "Category", 
      "Classification", 
      "Project", 
      "Location",
      "Check-In Date",
      "Check-Out Date",
      "Check-In Time",
      "Check-Out Time"
    ];
    
    const sampleRows = [
      ["EMP001", "John Smith", "Carpenter", "Laborer", "Main Building Construction", "Downtown Site", "2025-05-07", "2025-05-07", "08:00", "17:00"],
      ["EMP002", "Sarah Johnson", "Mason", "Laborer", "Bridge Expansion", "Bridge Zone A", "2025-05-07", "2025-05-07", "08:30", "17:30"],
      ["", "", "", "", "", "", "", "", "", ""]
    ];
    
    // Create CSV content
    let csvContent = headers.join(",") + "\n";
    sampleRows.forEach(row => {
      csvContent += row.join(",") + "\n";
    });
    
    // Create a blob and download it
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bulk_attendance_template.csv';
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    // Show success toast
    toast({
      title: "Template Downloaded",
      description: "You can fill this template and import it back to mark attendance.",
    });
  };

  // If in import mode, show the import view
  if (isImportMode) {
    return (
      <div className="space-y-5 px-1 pt-5">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-2xl font-bold text-gray-800">Bulk Attendance Import</h1>
          <Button
            variant="outline"
            onClick={exitImportMode}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" /> Cancel Import
          </Button>
        </div>
        
        <Card className="p-6 mb-6 shadow-sm">
          {!importFile ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="max-w-lg text-center">
                <Upload className="h-16 w-16 text-gray-400 mb-4 mx-auto" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">Upload an Excel file to import attendance data</h3>
                <p className="text-gray-500 mb-6">The file should follow the template format with all required columns.</p>
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <Label 
                      htmlFor="file-upload" 
                      className="bg-proscape hover:bg-proscape-dark text-white px-6 py-3 rounded cursor-pointer flex items-center gap-2"
                    >
                      <FileUp className="h-5 w-5" />
                      Choose Excel File
                    </Label>
                    <Input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      accept=".xlsx, .xls, .csv"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="text-center">
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2"
                      onClick={downloadTemplate}
                    >
                      <Download className="h-4 w-4" /> Download Template
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-medium">Imported Data</h3>
                  <p className="text-sm text-gray-500">
                    {importFile.name} • {importPreviewData.length} employees
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setImportFile(null);
                    setImportPreviewData([]);
                    clearImportFilters();
                    setImportComments({});
                  }}
                >
                  Change File
                </Button>
              </div>
              
              {/* Filter Section */}
              <Card className="p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {/* Project Filter */}
                  <div className="space-y-1">
                    <Label htmlFor="import-project" className="text-sm">Project</Label>
                    <Select value={importProjectFilter} onValueChange={setImportProjectFilter}>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="All Projects" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Projects</SelectItem>
                        {PROJECTS.map((p) => (
                          <SelectItem key={p} value={p}>{p}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Category Filter */}
                  <div className="space-y-1">
                    <Label htmlFor="import-category" className="text-sm">Category</Label>
                    <Select value={importCategoryFilter} onValueChange={setImportCategoryFilter}>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Categories</SelectItem>
                        {CATEGORIES.map((c) => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Classification Filter */}
                  <div className="space-y-1">
                    <Label htmlFor="import-classification" className="text-sm">Classification</Label>
                    <Select value={importClassificationFilter} onValueChange={setImportClassificationFilter}>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="All Classifications" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Classifications</SelectItem>
                        {CLASSIFICATIONS.map((c) => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Location Filter */}
                  <div className="space-y-1">
                    <Label htmlFor="import-location" className="text-sm">Location</Label>
                    <Select value={importLocationFilter} onValueChange={setImportLocationFilter}>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="All Locations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Locations</SelectItem>
                        {LOCATIONS.map((l) => (
                          <SelectItem key={l} value={l}>{l}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Search by Name/ID */}
                  <div className="space-y-1">
                    <Label htmlFor="import-search" className="text-sm">Search by Name/ID</Label>
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="import-search"
                        placeholder="Search..."
                        className="pl-8 h-9"
                        value={importSearchQuery}
                        onChange={(e) => setImportSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Reset Filters Button */}
                <div className="mt-3 flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={clearImportFilters} 
                    className="text-xs"
                  >
                    <X className="h-3 w-3 mr-1" /> Clear Filters
                  </Button>
                </div>
              </Card>
              
              <Separator className="my-4" />
              
              {/* Preview Table with streamlined layout */}
              <div className="border rounded mb-4">
                <div className="max-h-96 overflow-y-auto">
                  <Table>
                    <TableHeader className="sticky top-0 bg-gray-50">
                      <TableRow>
                        <TableHead>Employee ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Classification</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Check-In Date</TableHead>
                        <TableHead>Check-Out Date</TableHead>
                        <TableHead>Check-In Time</TableHead>
                        <TableHead>Check-Out Time</TableHead>
                        <TableHead>Comments</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredImportEmployees.length > 0 ? (
                        filteredImportEmployees.map((employee) => (
                          <TableRow key={employee.id}>
                            <TableCell className="font-medium">{employee.id}</TableCell>
                            <TableCell>{employee.name}</TableCell>
                            <TableCell>{employee.category}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                employee.classification === "Staff" 
                                  ? "bg-blue-100 text-blue-700" 
                                  : "bg-green-100 text-green-700"
                              }`}>
                                {employee.classification}
                              </span>
                            </TableCell>
                            <TableCell>{employee.project}</TableCell>
                            <TableCell>{employee.location}</TableCell>
                            <TableCell>{employee.checkInDate}</TableCell>
                            <TableCell>{employee.checkOutDate}</TableCell>
                            <TableCell>{employee.checkInTime}</TableCell>
                            <TableCell>{employee.checkOutTime}</TableCell>
                            <TableCell>
                              <Input 
                                placeholder="Optional comment..." 
                                className="w-full h-8 text-sm"
                                value={importComments[employee.id] || ''}
                                onChange={(e) => handleCommentChange(employee.id, e.target.value)}
                              />
                            </TableCell>
                            <TableCell>
                              <Button
                                size="sm"
                                onClick={() => handleMarkEmployeeAttendance(employee.id)}
                                className="h-8 bg-proscape hover:bg-proscape-dark text-white"
                              >
                                Mark Attendance
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={12} className="text-center py-8 text-gray-400">
                            No employees found matching the filters.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              {/* Summary */}
              <div className="mb-4 text-sm text-gray-600">
                <p>Showing {filteredImportEmployees.length} of {importPreviewData.length} employees</p>
              </div>
            </>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-5 px-1 pt-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-5">Bulk Attendance</h1>
        
        {/* Filter Section */}
        <Card className="p-5 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
                  <SelectItem value="">All Projects</SelectItem>
                  {PROJECTS.map((p) => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
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
                  <SelectItem value="">All Classifications</SelectItem>
                  {CLASSIFICATIONS.map((c) => (
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
                  <SelectItem value="">All Categories</SelectItem>
                  {CATEGORIES.map((c) => (
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
                onClick={downloadTemplate}
              >
                <Download className="h-4 w-4" /> Download Template
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handleImportClick}
              >
                <FileUp className="h-4 w-4" /> Import
              </Button>
            </div>
          </div>
        </Card>

        {/* Success Message */}
        {showSuccessMessage && isDataImported && (
          <Alert className="mb-4 bg-green-50 border-green-200 text-green-800">
            <AlertDescription className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
              Employees imported successfully.
            </AlertDescription>
          </Alert>
        )}

        {/* Employees Table or Empty State */}
        {isDataImported ? (
          <Card className="p-0 overflow-x-auto shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">
                    <Checkbox 
                      checked={selectAll} 
                      onCheckedChange={handleSelectAll} 
                      aria-label="Select all employees"
                    />
                  </TableHead>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Classification</TableHead>
                  <TableHead>Project</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <Checkbox 
                          checked={selectedEmployees.includes(employee.id)}
                          onCheckedChange={() => handleCheckboxChange(employee.id)}
                          aria-label={`Select ${employee.name}`}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{employee.id}</TableCell>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell>{employee.category}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          employee.classification === "Staff" 
                            ? "bg-blue-100 text-blue-700" 
                            : "bg-green-100 text-green-700"
                        }`}>
                          {employee.classification}
                        </span>
                      </TableCell>
                      <TableCell>{employee.project}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-400">
                      No employees found matching the filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        ) : (
          <Card className="p-8 shadow-sm text-center flex flex-col items-center justify-center min-h-[300px]">
            <div className="max-w-lg">
              <Upload className="h-16 w-16 text-gray-400 mb-4 mx-auto" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">Please import an Excel file to mark attendance</h3>
              <p className="text-gray-500 mb-6">You can upload up to 500 employees at once.</p>
              <div className="flex justify-center">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={handleImportClick}
                >
                  <FileUp className="h-4 w-4" /> Import File
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Show Mark Attendance button only if data has been imported */}
        {isDataImported && filteredEmployees.length > 0 && (
          <div className="flex justify-end mt-6">
            <Button 
              className="bg-proscape hover:bg-proscape-dark text-white"
              onClick={handleMarkAttendance}
              disabled={selectedEmployees.length === 0}
            >
              <CheckCircle className="mr-2 h-4 w-4" /> Mark Attendance
            </Button>
          </div>
        )}

        {/* Summary Footer - Only show if data is imported */}
        {isDataImported && filteredEmployees.length > 0 && (
          <div className="mt-4 flex justify-between items-center text-sm text-gray-600 px-2">
            <p>Total: {filteredEmployees.length} employees</p>
            <p>Selected: {selectedEmployees.length} employees</p>
          </div>
        )}
      </div>

      {/* Mark Attendance Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Mark Bulk Attendance</DialogTitle>
            <DialogDescription>
              You're marking attendance for {selectedEmployees.length} employees on {format(date || new Date(), "MMM dd, yyyy")}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-3">
            <div className="space-y-2">
              <Label htmlFor="attendance-type">Attendance Type</Label>
              <Select 
                value={attendanceType} 
                onValueChange={(value) => setAttendanceType(value as "check-in" | "check-out")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="check-in">Check-In</SelectItem>
                  <SelectItem value="check-out">Check-Out</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input 
                id="time"
                type="time" 
                value={attendanceTime}
                onChange={(e) => setAttendanceTime(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason/Comment</Label>
              <Input 
                id="reason"
                placeholder="Reason for manual entry..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
              <p className="text-xs text-gray-500">Required for manual entry</p>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-proscape hover:bg-proscape-dark text-white"
              onClick={handleConfirm}
              disabled={!reason.trim()}
            >
              <CheckCheck className="mr-2 h-4 w-4" /> Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BulkAttendance;
