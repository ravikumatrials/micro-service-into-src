
import { useState } from 'react';
import { Calendar, CheckCircle, CheckCheck, Search, Upload, FileUp, X } from "lucide-react";
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
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

// Mock data for employees
const MOCK_EMPLOYEES = [
  { id: "EMP001", name: "John Smith", category: "Carpenter", classification: "Laborer", entity: "Acme Construction", project: "Main Building Construction", location: "Downtown Site" },
  { id: "EMP002", name: "Sarah Johnson", category: "Mason", classification: "Laborer", entity: "Acme Construction", project: "Main Building Construction", location: "Downtown Site" },
  { id: "EMP003", name: "Emily Davis", category: "Plumber", classification: "Laborer", entity: "Skyline Builders", project: "Bridge Expansion", location: "Bridge Zone A" },
  { id: "EMP004", name: "Robert Williams", category: "Electrician", classification: "Laborer", entity: "Skyline Builders", project: "Bridge Expansion", location: "Bridge Zone A" },
  { id: "EMP005", name: "Michael Brown", category: "Supervisor", classification: "Staff", entity: "Acme Construction", project: "Warehouse Project", location: "East Industrial" },
  { id: "EMP006", name: "Lisa Wilson", category: "Carpenter", classification: "Laborer", entity: "Metro Developers", project: "Main Building Construction", location: "Downtown Site" },
  { id: "EMP007", name: "David Lee", category: "Manager", classification: "Staff", entity: "Metro Developers", project: "Warehouse Project", location: "East Industrial" },
  { id: "EMP008", name: "Jennifer Taylor", category: "Electrician", classification: "Laborer", entity: "Skyline Builders", project: "Bridge Expansion", location: "Bridge Zone A" },
  { id: "EMP009", name: "James Anderson", category: "Mason", classification: "Laborer", entity: "Acme Construction", project: "Main Building Construction", location: "Downtown Site" },
  { id: "EMP010", name: "Maria Garcia", category: "Site Engineer", classification: "Staff", entity: "Metro Developers", project: "Warehouse Project", location: "East Industrial" },
];

// Mock data for filter options
const PROJECTS = ["Main Building Construction", "Bridge Expansion", "Warehouse Project"];
const LOCATIONS = ["Downtown Site", "Bridge Zone A", "East Industrial"];
const ENTITIES = ["Acme Construction", "Skyline Builders", "Metro Developers"];
const CATEGORIES = ["Carpenter", "Mason", "Electrician", "Plumber", "Supervisor", "Manager", "Site Engineer"];
const CLASSIFICATIONS = ["Laborer", "Staff"];

const BulkAttendance = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [project, setProject] = useState<string>("");
  const [location, setLocation] = useState<string>("");
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
  
  // Import drawer state
  const [isImportDrawerOpen, setIsImportDrawerOpen] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importPreviewData, setImportPreviewData] = useState<typeof MOCK_EMPLOYEES>([]);
  const [importComment, setImportComment] = useState("");
  const [importAttendanceType, setImportAttendanceType] = useState<"check-in" | "check-out">("check-in");
  
  // Import filters state
  const [importProjectFilter, setImportProjectFilter] = useState<string>("");
  const [importLocationFilter, setImportLocationFilter] = useState<string>("");
  const [importCategoryFilter, setImportCategoryFilter] = useState<string>("");
  const [importClassificationFilter, setImportClassificationFilter] = useState<string>("");
  const [importSearchQuery, setImportSearchQuery] = useState<string>("");
  const [importSelectedEmployees, setImportSelectedEmployees] = useState<string[]>([]);
  const [importSelectAll, setImportSelectAll] = useState(false);

  // Filter employees based on filters
  const filteredEmployees = MOCK_EMPLOYEES.filter((employee) => {
    if (project && employee.project !== project) return false;
    if (location && employee.location !== location) return false;
    if (category && employee.category !== category) return false;
    if (classification && employee.classification !== classification) return false;
    if (searchQuery && 
        !employee.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !employee.id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });
  
  // Filter imported employees based on import filters
  const filteredImportEmployees = importPreviewData.filter((employee) => {
    if (importProjectFilter && employee.project !== importProjectFilter) return false;
    if (importLocationFilter && employee.location !== importLocationFilter) return false;
    if (importCategoryFilter && employee.category !== importCategoryFilter) return false;
    if (importClassificationFilter && employee.classification !== importClassificationFilter) return false;
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
  
  // Handle import select all
  const handleImportSelectAll = () => {
    if (importSelectAll) {
      setImportSelectedEmployees([]);
    } else {
      setImportSelectedEmployees(filteredImportEmployees.map(e => e.id));
    }
    setImportSelectAll(!importSelectAll);
  };

  // Handle checkbox change
  const handleCheckboxChange = (employeeId: string) => {
    setSelectedEmployees(prev => 
      prev.includes(employeeId) 
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };
  
  // Handle import checkbox change
  const handleImportCheckboxChange = (employeeId: string) => {
    setImportSelectedEmployees(prev => 
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
    setIsImportDrawerOpen(true);
  };
  
  // Clear import filters
  const clearImportFilters = () => {
    setImportProjectFilter("");
    setImportLocationFilter("");
    setImportCategoryFilter("");
    setImportClassificationFilter("");
    setImportSearchQuery("");
  };
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImportFile(file);
      
      // In a real app, we would parse the file here
      // For this prototype, we'll just simulate it with mock data
      setImportPreviewData(MOCK_EMPLOYEES);
    }
  };
  
  // Handle import attendance marking
  const handleImportAttendanceMark = () => {
    if (importComment.trim() === "") {
      toast({
        title: "Error",
        description: "Please provide a reason for the import.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Success!",
      description: `Attendance ${importAttendanceType === "check-in" ? "check-in" : "check-out"} marked for ${importSelectedEmployees.length} employees on ${format(date || new Date(), "MMM dd, yyyy")}.`,
    });
    setIsImportDrawerOpen(false);
    setImportFile(null);
    setImportPreviewData([]);
    setImportComment("");
    setImportSelectedEmployees([]);
    setImportSelectAll(false);
    clearImportFilters();
  };

  return (
    <div className="space-y-5 px-1 pt-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-5">Bulk Attendance</h1>
        
        {/* Filter Section */}
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
                  <SelectItem value="">All Projects</SelectItem>
                  {PROJECTS.map((p) => (
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
                  <SelectItem value="">All Locations</SelectItem>
                  {LOCATIONS.map((l) => (
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
                onClick={handleImportClick}
              >
                <FileUp className="h-4 w-4" /> Import
              </Button>
              <Button 
                className="bg-proscape hover:bg-proscape-dark text-white"
                onClick={handleMarkAttendance}
                disabled={selectedEmployees.length === 0}
              >
                <CheckCircle className="mr-2 h-4 w-4" /> Mark Attendance
              </Button>
            </div>
          </div>
        </Card>

        {/* Employees Table */}
        <Card className="p-0 overflow-x-auto shadow-sm">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs uppercase bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 w-16">
                  <Checkbox 
                    checked={selectAll} 
                    onCheckedChange={handleSelectAll} 
                    aria-label="Select all employees"
                  />
                </th>
                <th className="px-4 py-3">Employee ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Classification</th>
                <th className="px-4 py-3">Project</th>
                <th className="px-4 py-3">Location</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <Checkbox 
                        checked={selectedEmployees.includes(employee.id)}
                        onCheckedChange={() => handleCheckboxChange(employee.id)}
                        aria-label={`Select ${employee.name}`}
                      />
                    </td>
                    <td className="px-4 py-3 font-medium">{employee.id}</td>
                    <td className="px-4 py-3">{employee.name}</td>
                    <td className="px-4 py-3">{employee.category}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        employee.classification === "Staff" 
                          ? "bg-blue-100 text-blue-700" 
                          : "bg-green-100 text-green-700"
                      }`}>
                        {employee.classification}
                      </span>
                    </td>
                    <td className="px-4 py-3">{employee.project}</td>
                    <td className="px-4 py-3">{employee.location}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-400">
                    No employees found matching the filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>

        {/* Summary Footer */}
        <div className="mt-4 flex justify-between items-center text-sm text-gray-600 px-2">
          <p>Total: {filteredEmployees.length} employees</p>
          <p>Selected: {selectedEmployees.length} employees</p>
        </div>
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
      
      {/* Enhanced Import Drawer */}
      <Drawer open={isImportDrawerOpen} onOpenChange={setIsImportDrawerOpen}>
        <DrawerContent className="max-h-[90vh] p-0">
          <DrawerHeader className="px-6 py-4 border-b">
            <DrawerTitle className="text-xl">Import Attendance Data</DrawerTitle>
            <DrawerDescription>
              Upload an Excel or Word file containing employee data for bulk attendance marking.
            </DrawerDescription>
          </DrawerHeader>
          
          <div className="p-6 overflow-y-auto">
            {!importFile ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="mx-auto flex flex-col items-center">
                  <Upload className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Upload Attendance Data</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Supported formats: Excel (.xlsx) or Word (.doc/.docx)
                  </p>
                  <Input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept=".xlsx,.doc,.docx"
                    onChange={handleFileChange}
                  />
                  <Label 
                    htmlFor="file-upload" 
                    className="bg-proscape hover:bg-proscape-dark text-white px-4 py-2 rounded cursor-pointer"
                  >
                    Select File
                  </Label>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-medium">Preview Data</h3>
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
                      setImportSelectedEmployees([]);
                      setImportSelectAll(false);
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
                
                {/* Preview Table */}
                <div className="border rounded mb-4">
                  <div className="max-h-64 overflow-y-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          <th className="px-4 py-2 w-16">
                            <Checkbox 
                              checked={importSelectAll} 
                              onCheckedChange={handleImportSelectAll}
                              aria-label="Select all employees"
                            />
                          </th>
                          <th className="px-4 py-2 text-left">Employee ID</th>
                          <th className="px-4 py-2 text-left">Name</th>
                          <th className="px-4 py-2 text-left">Category</th>
                          <th className="px-4 py-2 text-left">Classification</th>
                          <th className="px-4 py-2 text-left">Project</th>
                          <th className="px-4 py-2 text-left">Location</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredImportEmployees.length > 0 ? (
                          filteredImportEmployees.map((employee) => (
                            <tr key={employee.id} className="border-t hover:bg-gray-50">
                              <td className="px-4 py-2">
                                <Checkbox 
                                  checked={importSelectedEmployees.includes(employee.id)}
                                  onCheckedChange={() => handleImportCheckboxChange(employee.id)}
                                  aria-label={`Select ${employee.name}`}
                                />
                              </td>
                              <td className="px-4 py-2 font-medium">{employee.id}</td>
                              <td className="px-4 py-2">{employee.name}</td>
                              <td className="px-4 py-2">{employee.category}</td>
                              <td className="px-4 py-2">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  employee.classification === "Staff" 
                                    ? "bg-blue-100 text-blue-700" 
                                    : "bg-green-100 text-green-700"
                                }`}>
                                  {employee.classification}
                                </span>
                              </td>
                              <td className="px-4 py-2">{employee.project}</td>
                              <td className="px-4 py-2">{employee.location}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={7} className="text-center py-8 text-gray-400">
                              No employees found matching the filters.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Summary */}
                <div className="mb-4 text-sm text-gray-600">
                  <p>Showing {filteredImportEmployees.length} of {importPreviewData.length} employees</p>
                  <p>Selected: {importSelectedEmployees.length} employees</p>
                </div>
                
                {/* Attendance Type and Comment */}
                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Attendance Type</Label>
                      <Select 
                        value={importAttendanceType} 
                        onValueChange={(value) => setImportAttendanceType(value as "check-in" | "check-out")}
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
                        id="import-time"
                        type="time" 
                        value={attendanceTime}
                        onChange={(e) => setAttendanceTime(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="importComment">Reason/Comment</Label>
                    <Textarea 
                      id="importComment"
                      placeholder="Enter reason for bulk attendance marking..."
                      value={importComment}
                      onChange={(e) => setImportComment(e.target.value)}
                      rows={3}
                    />
                    <p className="text-xs text-gray-500">Required for manual entry</p>
                  </div>
                </div>
              </>
            )}
          </div>

          <DrawerFooter className="border-t p-4">
            <div className="flex justify-end gap-2">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
              <Button 
                className="bg-proscape hover:bg-proscape-dark text-white"
                onClick={handleImportAttendanceMark}
                disabled={!importFile || !importComment.trim() || importSelectedEmployees.length === 0}
              >
                <CheckCircle className="mr-2 h-4 w-4" /> Mark Attendance
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default BulkAttendance;
