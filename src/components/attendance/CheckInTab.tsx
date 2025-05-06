
import React, { useState } from "react";
import { Edit, UserCheck, UserX, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import ManualCheckInDialog from "./dialogs/ManualCheckInDialog";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Employee {
  id: number;
  name: string;
  employeeId: string;
  role: string;
  project?: string;
  projectId?: number;
  location?: string;
  locationId?: number;
  status: "checkedin" | "notcheckedin";
  imageUrl: string;
  checkedInProject?: string;
  classification: string;
  category: string;
  activeStatus: "Active" | "Inactive";
  entity?: string;
}

interface CheckInTabProps {
  searchQuery: string;
  selectedProject: string;
  selectedStatus: string;
  selectedClassification: string;
  selectedCategory: string;
  selectedEntity: string;
  projects: { id: number; name: string; location?: string }[];
  locations: { id: number; name: string }[];
  selectedDate?: Date; // Added this prop to match what's being passed in ManualAttendanceTabs
}

const CheckInTab = ({ 
  searchQuery,
  selectedProject,
  selectedStatus,
  selectedClassification,
  selectedCategory,
  selectedEntity,
  projects,
  locations,
  selectedDate = new Date() // Default to today if not provided
}: CheckInTabProps) => {
  const [openManualDialog, setOpenManualDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  
  // Additional sample employees for the demonstration
  const mockEmployees: Employee[] = [
    {
      id: 1,
      employeeId: "10001",
      name: "John Smith",
      role: "Construction Worker",
      category: "Carpenter",
      classification: "Laborer",
      activeStatus: "Active",
      location: "Site A",
      locationId: 1,
      status: "notcheckedin",
      imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      entity: "Tanseeq Landscaping LLC"
    },
    {
      id: 2,
      employeeId: "10002",
      name: "Sarah Johnson",
      role: "Supervisor",
      category: "Mason",
      classification: "Staff",
      activeStatus: "Active",
      location: "Site B",
      locationId: 2,
      status: "notcheckedin",
      imageUrl: "https://randomuser.me/api/portraits/women/1.jpg",
      entity: "Tanseeq Construction Ltd"
    },
    {
      id: 3,
      employeeId: "10003",
      name: "Michael Brown",
      role: "Engineer",
      category: "Plumber",
      classification: "Staff",
      activeStatus: "Inactive",
      status: "checkedin",
      checkedInProject: "Highway Renovation",
      location: "Office",
      locationId: 3,
      imageUrl: "https://randomuser.me/api/portraits/men/2.jpg",
      entity: "Tanseeq Engineering Co"
    },
    {
      id: 4,
      employeeId: "10004",
      name: "Emily Davis",
      role: "Architect",
      category: "Electrician",
      classification: "Staff",
      activeStatus: "Active",
      location: "Site A",
      locationId: 1,
      status: "notcheckedin",
      imageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
      entity: "Tanseeq Landscaping LLC"
    },
    {
      id: 5,
      employeeId: "10005",
      name: "David Wilson",
      role: "Construction Worker",
      category: "Laborer",
      classification: "Laborer",
      activeStatus: "Active",
      checkedInProject: "Bridge Expansion Project",
      location: "Site B",
      locationId: 2,
      status: "checkedin",
      imageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
      entity: "Tanseeq Construction Ltd"
    },
    // Additional employees for testing
    {
      id: 6,
      employeeId: "10006",
      name: "Amanda Garcia",
      role: "Project Manager",
      category: "Mason",
      classification: "Staff",
      activeStatus: "Active",
      status: "notcheckedin",
      imageUrl: "https://randomuser.me/api/portraits/women/3.jpg",
      entity: "Tanseeq Engineering Co"
    },
    {
      id: 7,
      employeeId: "10007",
      name: "Robert Chen",
      role: "Foreman",
      category: "Carpenter",
      classification: "Laborer",
      activeStatus: "Active",
      status: "notcheckedin",
      imageUrl: "https://randomuser.me/api/portraits/men/4.jpg",
      entity: "Tanseeq Landscaping LLC"
    },
    {
      id: 8,
      employeeId: "10008",
      name: "Jennifer Lopez",
      role: "Safety Inspector",
      category: "Plumber",
      classification: "Staff",
      activeStatus: "Active",
      status: "notcheckedin",
      imageUrl: "https://randomuser.me/api/portraits/women/4.jpg",
      entity: "Tanseeq Construction Ltd"
    }
  ];

  // Filter employees based on search query and filters
  const filteredEmployees = mockEmployees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         employee.employeeId.includes(searchQuery);
    const matchesProject = selectedProject === "all" || (employee.projectId?.toString() === selectedProject);
    const matchesStatus = selectedStatus === "all" || employee.status === selectedStatus;
    const matchesClassification = selectedClassification === "all" || employee.classification === selectedClassification;
    const matchesCategory = selectedCategory === "all" || employee.category === selectedCategory;
    const matchesEntity = selectedEntity === "all" || employee.entity === getEntityName(selectedEntity);
    
    return matchesSearch && (matchesProject || !employee.projectId) && 
           matchesStatus && matchesClassification && matchesCategory && matchesEntity;
  });

  // Helper function to get entity name from entity ID
  const getEntityName = (entityId: string) => {
    if (entityId === "all") return "";
    
    // These would typically come from your entities array prop
    const entityMap = {
      "1": "Tanseeq Landscaping LLC",
      "2": "Tanseeq Construction Ltd",
      "3": "Tanseeq Engineering Co"
    };
    
    return entityMap[entityId as keyof typeof entityMap] || "";
  };

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
    const selectedLocationName = locations.find(l => l.id.toString() === locationId)?.name || "No location defined";
    
    // Handle auto check-out logic if employee was checked into another project
    if (selectedEmployee?.status === "checkedin" && selectedEmployee.checkedInProject) {
      toast.info(`${selectedEmployee.name} has been automatically checked out from ${selectedEmployee.checkedInProject}`, {
        description: `Auto checked-out at ${time}`
      });
    }
    
    toast.success(`${selectedEmployee?.name} has been manually checked in`, {
      description: `Project: ${selectedProjectName}, Location: ${selectedLocationName}`
    });
    
    if (!selectedLocationName || selectedLocationName === "No location defined") {
      toast.warning("Note: This project does not have a geofenced location assigned", {
        description: "Attendance has been recorded without GPS verification"
      });
    }
    
    setSelectedEmployee(null);
  };

  // Show notice if the selected project has no assigned location
  const selectedProjectHasLocation = () => {
    if (selectedProject === "all") return true;
    
    const project = projects.find(p => p.id.toString() === selectedProject);
    return project?.location ? true : false;
  };

  return (
    <div className="space-y-4">
      {selectedProject !== "all" && !selectedProjectHasLocation() && (
        <Alert className="bg-amber-50 border border-amber-200 mb-4">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          <AlertDescription className="text-amber-600">
            This project does not have a geofenced location assigned. Attendance will still be recorded without GPS verification.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="bg-white rounded-md shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Employee ID</TableHead>
              <TableHead className="w-[170px]">Employee Name</TableHead>
              <TableHead>Entity</TableHead>
              <TableHead>Classification</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Check-In Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.employeeId}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <img src={employee.imageUrl} alt={employee.name} />
                      </Avatar>
                      <div>{employee.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{employee.entity}</TableCell>
                  <TableCell>{employee.classification}</TableCell>
                  <TableCell>{employee.category}</TableCell>
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
                      <span>Mark Attendance</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                  No employees found matching your filters
                </TableCell>
              </TableRow>
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
