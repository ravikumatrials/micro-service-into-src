
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Eye, Trash, User, Search, Filter, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CloudDownload } from "lucide-react";
import { TanseeqImportModal } from "@/components/employees/TanseeqImportModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

// Sample entities for dummy data
const entities = [
  "Tanseeq Investment",
  "Tanseeq Landscaping LLC",
  "Al Maha Projects",
  "Zenith Infrastructure",
  "Gulf Builders International"
];

// Sample categories
const categories = ["Laborer", "Engineer", "Supervisor", "Manager", "Driver", "Consultant"];

// Sample classifications
const classifications = ["Laborer", "Staff"];

const initialEmployees = [
  { 
    id: 1, 
    name: "John Smith", 
    employeeId: "EMP001", 
    role: "Labour", 
    category: "Laborer",
    classification: "Laborer",
    entity: "Tanseeq Investment",
    contactNumber: "+971 50 123 4567",
    email: "john.smith@tanseeq.ae",
    faceEnrolled: true,
    status: "Active" 
  },
  { 
    id: 2, 
    name: "Sarah Johnson", 
    employeeId: "EMP002", 
    role: "Supervisor", 
    category: "Supervisor",
    classification: "Staff",
    entity: "Tanseeq Landscaping LLC",
    contactNumber: "+971 52 234 5678",
    email: "sarah.johnson@tanseeq.ae",
    faceEnrolled: true,
    status: "Active" 
  },
  { 
    id: 3, 
    name: "Robert Williams", 
    employeeId: "EMP003", 
    role: "Labour", 
    category: "Laborer",
    classification: "Laborer",
    entity: "Al Maha Projects",
    contactNumber: "+971 55 345 6789",
    email: "robert.williams@almaha.ae",
    faceEnrolled: false,
    status: "Active" 
  },
  { 
    id: 4, 
    name: "Emily Davis", 
    employeeId: "EMP004", 
    role: "Labour", 
    category: "Driver",
    classification: "Staff",
    entity: "Gulf Builders International",
    contactNumber: "+971 54 456 7890",
    email: "emily.davis@gulfbuilders.ae",
    faceEnrolled: true,
    status: "Active" 
  },
  { 
    id: 5, 
    name: "James Miller", 
    employeeId: "EMP005", 
    role: "Report Admin", 
    category: "Engineer",
    classification: "Staff",
    entity: "Zenith Infrastructure",
    contactNumber: "+971 56 567 8901",
    email: "james.miller@zenith.ae",
    faceEnrolled: true,
    status: "Active" 
  },
  { 
    id: 6, 
    name: "Jennifer Wilson", 
    employeeId: "EMP006", 
    role: "Labour", 
    category: "Consultant",
    classification: "Staff",
    entity: "Tanseeq Investment",
    contactNumber: "+971 50 678 9012",
    email: "jennifer.wilson@tanseeq.ae",
    faceEnrolled: false,
    status: "Inactive" 
  },
  { 
    id: 7, 
    name: "Michael Brown", 
    employeeId: "EMP007", 
    role: "Super Admin", 
    category: "Manager",
    classification: "Staff",
    entity: "Tanseeq Landscaping LLC",
    contactNumber: "+971 52 789 0123",
    email: "michael.brown@tanseeq.ae",
    faceEnrolled: true,
    status: "Active" 
  },
  { 
    id: 8, 
    name: "David Thompson", 
    employeeId: "EMP008", 
    role: "Labour", 
    category: "Laborer",
    classification: "Laborer",
    entity: "Al Maha Projects",
    contactNumber: "+971 55 890 1234",
    email: "david.thompson@almaha.ae",
    faceEnrolled: false,
    status: "Active" 
  },
];

const mockAttendanceRecords = [
  { 
    id: 1, 
    employee: "John Smith", 
    employeeId: "EMP001", 
    date: "22 Apr 2025", 
    checkInTime: "08:30 AM", 
    checkInMethod: "Face", 
    checkOutTime: "05:15 PM", 
    checkOutMethod: "Face", 
    project: "Main Building Construction",
    totalHours: "8h 45m",
    comment: ""
  },
  { 
    id: 2, 
    employee: "Sarah Johnson", 
    employeeId: "EMP002", 
    date: "22 Apr 2025", 
    checkInTime: "08:45 AM", 
    checkInMethod: "Face", 
    checkOutTime: "05:30 PM", 
    checkOutMethod: "Manual", 
    project: "Bridge Expansion Project",
    totalHours: "8h 45m",
    comment: "Employee forgot to check out. Manual checkout by supervisor."
  },
  { 
    id: 3, 
    employee: "Robert Williams", 
    employeeId: "EMP003", 
    date: "22 Apr 2025", 
    checkInTime: "09:15 AM", 
    checkInMethod: "Manual", 
    checkOutTime: "05:45 PM", 
    checkOutMethod: "Face", 
    project: "Highway Renovation",
    totalHours: "8h 30m",
    comment: "Late arrival due to transportation issue."
  },
  { 
    id: 4, 
    employee: "Emily Davis", 
    employeeId: "EMP004", 
    date: "22 Apr 2025", 
    checkInTime: "08:15 AM", 
    checkInMethod: "Face", 
    checkOutTime: "04:30 PM", 
    checkOutMethod: "Face", 
    project: "Main Building Construction",
    totalHours: "8h 15m",
    comment: ""
  },
  { 
    id: 5, 
    employee: "James Miller", 
    employeeId: "EMP005", 
    date: "22 Apr 2025", 
    checkInTime: "08:30 AM", 
    checkInMethod: "Face", 
    checkOutTime: "05:00 PM", 
    checkOutMethod: "Face", 
    project: "Highway Renovation",
    totalHours: "8h 30m",
    comment: ""
  },
  { 
    id: 6, 
    employee: "Jennifer Wilson", 
    employeeId: "EMP006", 
    date: "21 Apr 2025", 
    checkInTime: "08:30 AM", 
    checkInMethod: "Face", 
    checkOutTime: "05:15 PM", 
    checkOutMethod: "Face", 
    project: "Bridge Expansion Project",
    totalHours: "8h 45m",
    comment: ""
  },
  { 
    id: 7, 
    employee: "Michael Brown", 
    employeeId: "EMP007", 
    date: "21 Apr 2025", 
    checkInTime: "08:45 AM", 
    checkInMethod: "Face", 
    checkOutTime: "05:30 PM", 
    checkOutMethod: "Manual", 
    project: "Main Building Construction",
    totalHours: "8h 45m",
    comment: "Employee forgot to check out. Manual checkout by supervisor."
  },
  { 
    id: 8, 
    employee: "David Thompson", 
    employeeId: "EMP008", 
    date: "21 Apr 2025", 
    checkInTime: "08:15 AM", 
    checkInMethod: "Face", 
    checkOutTime: "05:00 PM", 
    checkOutMethod: "Face", 
    project: "Highway Renovation",
    totalHours: "8h 45m",
    comment: ""
  },
];

const Employees = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [entityFilter, setEntityFilter] = useState("all");
  const [classificationFilter, setClassificationFilter] = useState("all");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const navigate = useNavigate();
  const [isTanseeqModalOpen, setIsTanseeqModalOpen] = useState(false);
  
  // Current user role - in a real app, this would come from auth context
  const currentUserRole = "Super Admin";

  const filteredEmployees = employees.filter((employee) => {
    const searchMatch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = 
      statusFilter === "all" || 
      employee.status.toLowerCase() === statusFilter.toLowerCase();
    const categoryMatch = 
      categoryFilter === "all" || 
      employee.category.toLowerCase() === categoryFilter.toLowerCase();
    const entityMatch = 
      entityFilter === "all" || 
      employee.entity === entityFilter;
    const classificationMatch = 
      classificationFilter === "all" || 
      employee.classification === classificationFilter;

    return searchMatch && statusMatch && categoryMatch && entityMatch && classificationMatch;
  });

  const handleEmployeeView = (employee) => {
    setSelectedEmployee(employee);
    setIsViewModalOpen(true);
  };

  const handleDeleteConfirm = (employee) => {
    setSelectedEmployee(employee);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    const updatedEmployees = employees.filter(emp => emp.id !== selectedEmployee.id);
    setEmployees(updatedEmployees);
    setIsDeleteDialogOpen(false);
  };

  const toggleEmployeeStatus = (employeeId) => {
    const updatedEmployees = employees.map(emp => 
      emp.id === employeeId 
        ? {...emp, status: emp.status === "Active" ? "Inactive" : "Active"} 
        : emp
    );
    
    setEmployees(updatedEmployees);
  };

  const handleViewFullAttendanceHistory = (employeeId) => {
    setIsViewModalOpen(false);
    navigate(`/attendance-history?employeeId=${employeeId}`);
  };

  const handleTanseeqImport = (newEmployees) => {
    const maxId = Math.max(...employees.map(e => e.id));
    
    const employeesToAdd = newEmployees.map((emp, index) => ({
      id: maxId + index + 1,
      name: emp.name,
      employeeId: emp.employeeId,
      role: emp.role,
      category: categories[Math.floor(Math.random() * categories.length)],
      entity: entities[Math.floor(Math.random() * entities.length)],
      contactNumber: "+971 5" + Math.floor(Math.random() * 10) + " " + 
                    Math.floor(Math.random() * 900 + 100) + " " + 
                    Math.floor(Math.random() * 9000 + 1000),
      email: emp.name.toLowerCase().replace(" ", ".") + "@proscape.ae",
      faceEnrolled: false,
      status: "Active"
    }));
    
    setEmployees([...employees, ...employeesToAdd]);
  };

  // Get attendance records for selected employee
  const getEmployeeAttendanceRecords = (employeeId) => {
    return mockAttendanceRecords.filter(record => record.employeeId === employeeId).slice(0, 10);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Employees</h1>
        <div className="flex space-x-3">
          <button 
            onClick={() => setIsTanseeqModalOpen(true)}
            className="flex items-center bg-proscape hover:bg-proscape-dark text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            <CloudDownload className="h-4 w-4 mr-2" />
            Import from Tanseeq API
          </button>
        </div>
      </div>
      
      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
              placeholder="Search by name or employee ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600 mr-2">Status:</span>
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-proscape"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">Category:</span>
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-proscape"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map((category, index) => (
                  <option key={index} value={category.toLowerCase()}>{category}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">Classification:</span>
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-proscape"
                value={classificationFilter}
                onChange={(e) => setClassificationFilter(e.target.value)}
              >
                <option value="all">All Classifications</option>
                {classifications.map((classification, index) => (
                  <option key={index} value={classification}>{classification}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">Entity:</span>
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-proscape"
                value={entityFilter}
                onChange={(e) => setEntityFilter(e.target.value)}
              >
                <option value="all">All Entities</option>
                {entities.map((entity, index) => (
                  <option key={index} value={entity}>{entity}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Employee ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Classification</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map(employee => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">{employee.employeeId}</TableCell>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell className="max-w-[200px] truncate" title={employee.entity}>
                      {employee.entity}
                    </TableCell>
                    <TableCell>{employee.classification}</TableCell>
                    <TableCell>{employee.category}</TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          employee.status === "Active" 
                            ? "bg-green-100 text-green-800 hover:bg-green-200" 
                            : "bg-red-100 text-red-800 hover:bg-red-200"
                        }
                      >
                        {employee.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-3">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button 
                                onClick={() => handleEmployeeView(employee)}
                                className="text-blue-500 hover:text-blue-700 p-1"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>View Employee Details</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        {currentUserRole === "Super Admin" && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button 
                                  onClick={() => handleDeleteConfirm(employee)}
                                  className="text-red-500 hover:text-red-700 p-1"
                                >
                                  <Trash className="h-4 w-4" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Delete Employee</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                    No employees found matching the search criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{filteredEmployees.length}</span> of{" "}
            <span className="font-medium">{employees.length}</span> employees
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </Card>

      {/* Enhanced View Employee Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-4xl w-full">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Employee Details</DialogTitle>
          </DialogHeader>
          
          {selectedEmployee && (
            <div className="space-y-6">
              {/* Section 1: Personal Details */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex flex-col items-center space-y-2">
                  <Avatar className="h-36 w-36 border-2 border-gray-200">
                    {selectedEmployee.faceEnrolled ? (
                      <AvatarImage src="https://source.unsplash.com/random/?portrait" alt={selectedEmployee.name} />
                    ) : null}
                    <AvatarFallback className="text-2xl bg-gray-100">
                      <User className="h-16 w-16 text-gray-400" />
                    </AvatarFallback>
                  </Avatar>
                  {!selectedEmployee.faceEnrolled && (
                    <span className="text-xs text-gray-500">Profile not available</span>
                  )}
                </div>
                
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold">{selectedEmployee.name}</h3>
                      <p className="text-sm text-gray-500">{selectedEmployee.employeeId}</p>
                    </div>
                    
                    <div className="grid grid-cols-[120px_1fr] gap-2">
                      <div className="text-sm text-gray-600 font-medium">Entity:</div>
                      <div className="text-sm">{selectedEmployee.entity}</div>
                      
                      <div className="text-sm text-gray-600 font-medium">Classification:</div>
                      <div className="text-sm">{selectedEmployee.classification}</div>
                      
                      <div className="text-sm text-gray-600 font-medium">Category:</div>
                      <div className="text-sm">{selectedEmployee.category}</div>
                      
                      <div className="text-sm text-gray-600 font-medium">Status:</div>
                      <div>
                        <Badge 
                          className={
                            selectedEmployee.status === "Active" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {selectedEmployee.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-[120px_1fr] gap-2 content-start">
                    <div className="text-sm text-gray-600 font-medium">Contact Number:</div>
                    <div className="text-sm">{selectedEmployee.contactNumber}</div>
                    
                    <div className="text-sm text-gray-600 font-medium">Email ID:</div>
                    <div className="text-sm break-all">{selectedEmployee.email}</div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Section 2: Attendance History */}
              <div>
                <h3 className="text-md font-medium mb-3">Recent Attendance History</h3>
                <ScrollArea className="h-[300px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Check-In Time</TableHead>
                        <TableHead>Check-Out Time</TableHead>
                        <TableHead>Attendance Mode</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Comments</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getEmployeeAttendanceRecords(selectedEmployee.employeeId).map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>{record.date}</TableCell>
                          <TableCell>{record.checkInTime}</TableCell>
                          <TableCell>{record.checkOutTime}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                record.checkInMethod === "Face"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-blue-100 text-blue-800"
                              }
                            >
                              {record.checkInMethod}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">
                              Present
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {record.comment ? (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span className="text-blue-500 cursor-help">
                                      View Note
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">{record.comment}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            ) : (
                              "-"
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </div>
              
              <DialogFooter>
                <Button
                  onClick={() => handleViewFullAttendanceHistory(selectedEmployee.employeeId)}
                  variant="outline" 
                >
                  View Full Attendance History
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Employee</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedEmployee?.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {isTanseeqModalOpen && (
        <TanseeqImportModal 
          open={isTanseeqModalOpen}
          onOpenChange={() => setIsTanseeqModalOpen(false)}
          onImportComplete={handleTanseeqImport}
        />
      )}
    </div>
  );
};

export default Employees;
