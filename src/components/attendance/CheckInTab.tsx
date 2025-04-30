
import React, { useState } from "react";
import { Edit, UserCheck, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import ManualCheckInDialog from "./dialogs/ManualCheckInDialog";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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

  // Filter employees based on search query and filters
  const filteredEmployees = mockEmployees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         employee.id.toString().includes(searchQuery);
    const matchesProject = selectedProject === "all" || (employee.projectId?.toString() === selectedProject);
    const matchesLocation = selectedLocation === "all" || (employee.locationId?.toString() === selectedLocation);
    
    // Updated to handle status filtering including active/inactive
    const matchesStatus = selectedStatus === "all" || 
                         (selectedStatus === "checkedin" && employee.status === "checkedin") ||
                         (selectedStatus === "notcheckedin" && employee.status === "notcheckedin") ||
                         (selectedStatus === "active" && employee.status === "active") ||
                         (selectedStatus === "inactive" && employee.status === "inactive");
    
    return matchesSearch && (matchesProject || !employee.projectId) && matchesLocation && matchesStatus;
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
            {filteredEmployees.length === 0 ? (
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
