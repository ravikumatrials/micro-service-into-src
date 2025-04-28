import React, { useState } from "react";
import { Edit, UserCheck, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import ManualCheckInDialog from "./dialogs/ManualCheckInDialog";
import { toast } from "sonner";

interface Employee {
  id: number;
  name: string;
  role: string;
  project?: string;
  projectId?: number;
  location?: string;
  locationId?: number;
  status: "checkedin" | "notcheckedin";
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
  
  // Mock employees data - note that employees don't have pre-assigned projects
  const mockEmployees: Employee[] = [
    {
      id: 1,
      name: "John Smith",
      role: "Construction Worker",
      location: "Site A",
      locationId: 1,
      status: "notcheckedin",
      imageUrl: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Supervisor",
      location: "Site B",
      locationId: 2,
      status: "notcheckedin",
      imageUrl: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      id: 3,
      name: "Michael Brown",
      role: "Engineer",
      status: "checkedin",
      checkedInProject: "Highway Renovation",
      location: "Office",
      locationId: 3,
      imageUrl: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      id: 4,
      name: "Emily Davis",
      role: "Architect",
      location: "Site A",
      locationId: 1,
      status: "notcheckedin",
      imageUrl: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      id: 5,
      name: "David Wilson",
      role: "Construction Worker",
      checkedInProject: "Bridge Expansion Project",
      location: "Site B",
      locationId: 2,
      status: "checkedin",
      imageUrl: "https://randomuser.me/api/portraits/men/3.jpg"
    }
  ];

  // Filter employees based on search query and filters
  const filteredEmployees = mockEmployees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         employee.id.toString().includes(searchQuery);
    const matchesProject = selectedProject === "all" || (employee.projectId?.toString() === selectedProject);
    const matchesLocation = selectedLocation === "all" || (employee.locationId?.toString() === selectedLocation);
    const matchesStatus = selectedStatus === "all" || employee.status === selectedStatus;
    
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

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-md shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Employee</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10 text-gray-500">
                  No employees found matching your filters
                </TableCell>
              </TableRow>
            ) : (
              filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <img src={employee.imageUrl} alt={employee.name} />
                      </Avatar>
                      <div>
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-sm text-gray-500">ID: {employee.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{employee.role}</TableCell>
                  <TableCell>
                    {employee.status === "checkedin" ? (
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
