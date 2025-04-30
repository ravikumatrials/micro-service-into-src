
import React, { useState } from "react";
import { Edit, UserCheck, UserX, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import ManualCheckInDialog from "./dialogs/ManualCheckInDialog";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Employee {
  id: number;
  name: string;
  entity: string;
  classification: string;
  category: string;
  role: string;
  project?: string;
  projectId?: number;
  location?: string;
  locationId?: number;
  status: "active" | "inactive" | "checkedin" | "notcheckedin";
  imageUrl: string;
  checkedInProject?: string;
}

interface CheckInTabProps {
  searchQuery: string;
  selectedProject: string;
  selectedLocation: string;
  selectedStatus: string;
  projects: { id: number; name: string }[];
  locations: { id: number; name: string }[];
}

// Define the entities and categories for filter dropdowns
const entityOptions = [
  "All Entities",
  "Tanseeq Landscaping LLC",
  "Tanseeq Investment LLC",
  "Tanseeq Construction LLC",
  "Tanseeq Design LLC",
  "Tanseeq Contracting LLC"
];

const categoryOptions = [
  "All Categories",
  "Carpenter", 
  "Mason", 
  "Plumber", 
  "Electrician", 
  "Engineer", 
  "Architect",
  "Construction Worker",
  "Supervisor"
];

const classificationOptions = ["All Classifications", "Laborer", "Staff"];
const statusOptions = ["All Statuses", "Active", "Inactive"];

const CheckInTab = ({ 
  searchQuery,
  selectedProject,
  selectedLocation,
  selectedStatus,
  projects,
  locations
}: CheckInTabProps) => {
  const [openManualDialog, setOpenManualDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Filter state
  const [filters, setFilters] = useState({
    employeeId: "",
    name: "",
    entity: "All Entities",
    category: "All Categories",
    classification: "All Classifications",
    status: "All Statuses",
    project: "all",
    location: "all"
  });
  
  // Mock employees data with additional fields
  const mockEmployees: Employee[] = [
    {
      id: 10001,
      name: "John Smith",
      entity: "Tanseeq Landscaping LLC",
      classification: "Laborer",
      category: "Construction Worker",
      role: "Construction Worker",
      location: "Site A",
      locationId: 1,
      status: "active",
      imageUrl: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      id: 10002,
      name: "Sarah Johnson",
      entity: "Tanseeq Investment LLC",
      classification: "Staff",
      category: "Supervisor",
      role: "Supervisor",
      location: "Site B",
      locationId: 2,
      status: "active",
      imageUrl: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      id: 10003,
      name: "Michael Brown",
      entity: "Tanseeq Construction LLC",
      classification: "Staff",
      category: "Engineer",
      role: "Engineer",
      status: "inactive",
      checkedInProject: "Highway Renovation",
      location: "Office",
      locationId: 3,
      imageUrl: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      id: 10004,
      name: "Emily Davis",
      entity: "Tanseeq Design LLC",
      classification: "Staff",
      category: "Architect",
      role: "Architect",
      location: "Site A",
      locationId: 1,
      status: "active",
      imageUrl: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      id: 10005,
      name: "David Wilson",
      entity: "Tanseeq Contracting LLC",
      classification: "Laborer",
      category: "Carpenter",
      role: "Construction Worker",
      checkedInProject: "Bridge Expansion Project",
      location: "Site B",
      locationId: 2,
      status: "active",
      imageUrl: "https://randomuser.me/api/portraits/men/3.jpg"
    }
  ];

  // Apply filters function
  const applyFilters = () => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Filters applied successfully");
    }, 500);
  };

  // Reset filters function
  const resetFilters = () => {
    setFilters({
      employeeId: "",
      name: "",
      entity: "All Entities",
      category: "All Categories",
      classification: "All Classifications",
      status: "All Statuses",
      project: "all",
      location: "all"
    });
    toast.info("Filters have been reset");
  };

  // Handle numeric-only input for employee ID
  const handleEmployeeIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numeric values
    if (value === '' || /^[0-9\b]+$/.test(value)) {
      setFilters(prev => ({ ...prev, employeeId: value }));
    }
  };

  // Filter employees based on search query and filters
  const filteredEmployees = mockEmployees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         employee.id.toString().includes(searchQuery);
    const matchesProject = selectedProject === "all" || (employee.projectId?.toString() === selectedProject);
    const matchesLocation = selectedLocation === "all" || (employee.locationId?.toString() === selectedLocation);
    
    // Custom filters
    const matchesEmployeeId = filters.employeeId === "" || employee.id.toString().includes(filters.employeeId);
    const matchesName = filters.name === "" || employee.name.toLowerCase().includes(filters.name.toLowerCase());
    const matchesEntity = filters.entity === "All Entities" || employee.entity === filters.entity;
    const matchesCategory = filters.category === "All Categories" || employee.category === filters.category;
    const matchesClassification = filters.classification === "All Classifications" || 
                                 employee.classification === filters.classification;
    const matchesStatusFilter = filters.status === "All Statuses" || 
                               (filters.status === "Active" && employee.status === "active") ||
                               (filters.status === "Inactive" && employee.status === "inactive");
    
    // Updated to handle status filtering including active/inactive
    const matchesStatus = selectedStatus === "all" || 
                         (selectedStatus === "checkedin" && employee.status === "checkedin") ||
                         (selectedStatus === "notcheckedin" && employee.status === "notcheckedin") ||
                         (selectedStatus === "active" && employee.status === "active") ||
                         (selectedStatus === "inactive" && employee.status === "inactive");
    
    return matchesSearch && 
           (matchesProject || !employee.projectId) && 
           matchesLocation && 
           matchesStatus && 
           matchesEmployeeId && 
           matchesName && 
           matchesEntity && 
           matchesCategory && 
           matchesClassification && 
           matchesStatusFilter;
  });

  const handleManualCheckIn = (employee: Employee) => {
    setSelectedEmployee(employee);
    setOpenManualDialog(true);
  };

  const handleManualCheckInComplete = (
    projectId: string, 
    locationId: string, 
    time: string,
    reason: string
  ) => {
    setOpenManualDialog(false);
    
    const selectedProjectName = projects.find(p => p.id.toString() === projectId)?.name;
    const selectedLocationName = locations.find(l => l.id.toString() === locationId)?.name;
    
    // Handle auto check-out logic if employee was checked into another project
    if (selectedEmployee?.status === "checkedin" && selectedEmployee.checkedInProject) {
      toast.info(`${selectedEmployee.name} has been automatically checked out from ${selectedEmployee.checkedInProject}`, {
        description: `Auto checked-out at ${time}`
      });
    }
    
    toast.success(`${selectedEmployee?.name} has been manually checked in`, {
      description: `Project: ${selectedProjectName}, Location: ${selectedLocationName}`
    });
    setSelectedEmployee(null);
  };

  // Helper function to render truncated text with tooltip
  const renderTruncatedText = (text: string, maxLength: number = 20) => {
    if (text.length <= maxLength) return text;
    
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="cursor-help">{text.substring(0, maxLength)}...</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{text}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <div className="space-y-4">
      {/* Filters Section */}
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-4 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-800">Filter Employees</h3>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">Refine your search</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Employee ID Filter - Numeric Only */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Employee ID
            </Label>
            <Input
              type="text"
              placeholder="Enter ID number"
              value={filters.employeeId}
              onChange={handleEmployeeIdChange}
              className="w-full"
            />
          </div>

          {/* Name Filter */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by name"
                value={filters.name}
                onChange={(e) => setFilters(prev => ({ ...prev, name: e.target.value }))}
                className="pl-10"
              />
            </div>
          </div>

          {/* Entity Filter */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Entity
            </Label>
            <Select
              value={filters.entity}
              onValueChange={(value) => setFilters(prev => ({ ...prev, entity: value }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Entities" />
              </SelectTrigger>
              <SelectContent>
                {entityOptions.map((option) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Category Filter */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </Label>
            <Select
              value={filters.category}
              onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((option) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Classification Filter */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Classification
            </Label>
            <Select
              value={filters.classification}
              onValueChange={(value) => setFilters(prev => ({ ...prev, classification: value }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Classifications" />
              </SelectTrigger>
              <SelectContent>
                {classificationOptions.map((option) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </Label>
            <Select
              value={filters.status}
              onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Project Filter */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Project
            </Label>
            <Select
              value={filters.project}
              onValueChange={(value) => setFilters(prev => ({ ...prev, project: value }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Projects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id.toString()}>{project.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Location Filter */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </Label>
            <Select
              value={filters.location}
              onValueChange={(value) => setFilters(prev => ({ ...prev, location: value }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location.id} value={location.id.toString()}>{location.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mt-6">
          <Button
            variant="outline"
            onClick={resetFilters}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            disabled={isLoading}
          >
            Clear Filters
          </Button>
          <Button
            onClick={applyFilters}
            className="ml-3 px-6 py-2 bg-proscape hover:bg-proscape-dark text-white rounded-md text-sm font-medium shadow-sm transition-colors"
            disabled={isLoading}
          >
            Apply Filters
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-md shadow overflow-hidden">
        <Table>
          <TableHeader className="sticky top-0 bg-gray-50">
            <TableRow>
              <TableHead className="font-semibold">Employee ID</TableHead>
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Entity</TableHead>
              <TableHead className="font-semibold">Classification</TableHead>
              <TableHead className="font-semibold">Category</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="text-right font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10">
                  <div className="flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-proscape"></div>
                    <p className="mt-2 text-sm text-gray-500">Loading employees...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredEmployees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                  No employees found matching your filters
                </TableCell>
              </TableRow>
            ) : (
              filteredEmployees.map((employee, index) => (
                <TableRow key={employee.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <TableCell className="font-medium">{employee.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <img src={employee.imageUrl} alt={employee.name} />
                      </Avatar>
                      <div>
                        {renderTruncatedText(employee.name)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{renderTruncatedText(employee.entity)}</TableCell>
                  <TableCell>{employee.classification}</TableCell>
                  <TableCell>{employee.category}</TableCell>
                  <TableCell>
                    {employee.status === "active" ? (
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                        Active
                      </Badge>
                    ) : employee.status === "inactive" ? (
                      <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
                        Inactive
                      </Badge>
                    ) : employee.status === "checkedin" ? (
                      <div className="flex items-center text-green-600">
                        <UserCheck className="h-4 w-4 mr-1" />
                        <span>Checked In</span>
                        {employee.checkedInProject && (
                          <span className="ml-1 text-xs text-gray-500">({employee.checkedInProject})</span>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center text-gray-500">
                        <UserX className="h-4 w-4 mr-1" />
                        <span>Not Checked In</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      onClick={() => handleManualCheckIn(employee)} 
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-1 text-xs"
                    >
                      <Edit className="h-3 w-3" />
                      <span>Manual</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Manual Check In Dialog */}
      <ManualCheckInDialog
        open={openManualDialog}
        onOpenChange={setOpenManualDialog}
        employee={selectedEmployee}
        projects={projects}
        locations={locations}
        onComplete={handleManualCheckInComplete}
      />
    </div>
  );
};

export default CheckInTab;
