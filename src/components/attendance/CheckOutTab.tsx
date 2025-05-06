import React, { useState, useEffect } from "react";
import { Edit, UserCheck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import ManualCheckOutDialog from "./dialogs/ManualCheckOutDialog";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Employee {
  id: number;
  employeeId: string;
  name: string;
  role: string;
  project: string;
  projectId: number;
  location: string;
  locationId: number;
  checkInTime: string;
  imageUrl: string;
  classification: string;
  category: string;
  status: "Active" | "Inactive";
  entity?: string;
}

interface CheckOutTabProps {
  searchQuery: string;
  selectedProject: string;
  selectedLocation?: string; // Making this optional
  selectedClassification: string;
  selectedCategory: string;
  selectedStatus: string;
  selectedEntity: string;
  projects: { id: number; name: string; location?: string; coordinates?: { geofenceData: string } }[];
  locations: { id: number; name: string }[];
  selectedDate?: Date; // Make this optional for backwards compatibility
}

const CheckOutTab = ({
  searchQuery,
  selectedProject,
  selectedLocation = "all", // Providing default value
  selectedClassification,
  selectedCategory,
  selectedStatus,
  selectedEntity,
  projects,
  locations,
  selectedDate = new Date() // Default to today if not provided
}: CheckOutTabProps) => {
  const [openManualDialog, setOpenManualDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showLocationWarning, setShowLocationWarning] = useState(false);

  // Effect to check if selected project has a location and update warning state
  useEffect(() => {
    if (selectedProject !== "all") {
      const projectHasLocation = projects.find(p => p.id.toString() === selectedProject)?.location;
      setShowLocationWarning(!projectHasLocation);
    } else {
      setShowLocationWarning(false); // Hide warning when "all projects" is selected
    }
  }, [selectedProject, projects]);
  
  const mockCheckedInEmployees: Employee[] = [
    {
      id: 3,
      employeeId: "10003",
      name: "Michael Brown",
      role: "Engineer",
      classification: "Staff",
      category: "Plumber",
      status: "Inactive",
      project: "Highway Renovation",
      projectId: 3,
      location: "Office",
      locationId: 3,
      checkInTime: "08:30 AM",
      imageUrl: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      id: 5,
      employeeId: "10005",
      name: "David Wilson",
      role: "Construction Worker",
      classification: "Laborer",
      category: "Painter",
      status: "Active",
      project: "Bridge Expansion Project",
      projectId: 2,
      location: "Site B",
      locationId: 2,
      checkInTime: "09:15 AM",
      imageUrl: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    {
      id: 7,
      employeeId: "10007",
      name: "Jane Cooper",
      role: "Project Manager",
      classification: "Staff",
      category: "Mason",
      status: "Active",
      project: "Main Building Construction",
      projectId: 1,
      location: "Site A",
      locationId: 1,
      checkInTime: "08:00 AM",
      imageUrl: "https://randomuser.me/api/portraits/women/4.jpg"
    },
    // Additional sample records
    {
      id: 11,
      employeeId: "10011",
      name: "Robert Green",
      role: "Foreman",
      classification: "Staff",
      category: "Carpenter",
      status: "Active",
      project: "Dubai Mall Expansion",
      projectId: 4,
      location: "Mall Site",
      locationId: 4,
      checkInTime: "07:45 AM",
      imageUrl: "https://randomuser.me/api/portraits/men/5.jpg",
      entity: "Tanseeq Construction Ltd"
    },
    {
      id: 12,
      employeeId: "10012",
      name: "Linda Martinez",
      role: "Safety Inspector",
      classification: "Staff",
      category: "Electrician",
      status: "Active",
      project: "Marina Towers",
      projectId: 5,
      location: "Marina Site",
      locationId: 5,
      checkInTime: "08:10 AM",
      imageUrl: "https://randomuser.me/api/portraits/women/6.jpg",
      entity: "Tanseeq Engineering Co"
    },
    {
      id: 13,
      employeeId: "10013",
      name: "Ahmed Hassan",
      role: "Crane Operator",
      classification: "Laborer",
      category: "Mason",
      status: "Active",
      project: "Highway Renovation",
      projectId: 3,
      location: "Highway Site",
      locationId: 6,
      checkInTime: "06:30 AM",
      imageUrl: "https://randomuser.me/api/portraits/men/7.jpg",
      entity: "Tanseeq Landscaping LLC"
    }
  ];

  const filteredEmployees = mockCheckedInEmployees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         employee.employeeId.includes(searchQuery);
    const matchesProject = selectedProject === "all" || employee.projectId.toString() === selectedProject;
    const matchesLocation = selectedLocation === "all" || employee.locationId.toString() === selectedLocation;
    const matchesClassification = selectedClassification === "all" || employee.classification === selectedClassification;
    const matchesCategory = selectedCategory === "all" || employee.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || employee.status === selectedStatus;
    const matchesEntity = selectedEntity === "all" || employee.entity === getEntityName(selectedEntity);
    
    return matchesSearch && matchesProject && matchesLocation && 
           matchesClassification && matchesCategory && matchesStatus && matchesEntity;
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

  const handleManualCheckOut = (employee: Employee) => {
    setSelectedEmployee(employee);
    setOpenManualDialog(true);
  };

  const handleManualCheckOutComplete = (
    projectId: string, 
    time: string,
    reason: string
  ) => {
    setOpenManualDialog(false);
    
    const selectedProjectName = projects.find(p => p.id.toString() === projectId)?.name;
    
    toast.success(`${selectedEmployee?.name} has been manually checked out`, {
      description: `Project: ${selectedProjectName}, Time: ${time}, Reason: ${reason.substring(0, 30)}${reason.length > 30 ? '...' : ''}`
    });
    
    // Check if project has location and show warning if not
    const project = projects.find(p => p.id.toString() === projectId);
    if (!project?.location) {
      toast.warning("Note: This project does not have a geofenced location assigned", {
        description: "Attendance has been recorded without GPS verification"
      });
    }
    
    setSelectedEmployee(null);
  };

  return (
    <div className="space-y-4">
      {showLocationWarning && (
        <Alert className="bg-white border border-gray-200 mb-4">
          <AlertCircle className="h-4 w-4 text-gray-400" />
          <AlertDescription className="text-gray-500 italic">
            No location defined – attendance will proceed without GPS verification
          </AlertDescription>
        </Alert>
      )}
      
      <div className="bg-white rounded-md shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Employee ID</TableHead>
              <TableHead className="w-[170px]">Employee Name</TableHead>
              <TableHead>Classification</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Check-in Time</TableHead>
              <TableHead>Project</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                  No checked-in employees found matching your filters
                </TableCell>
              </TableRow>
            ) : (
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
                  <TableCell>{employee.classification}</TableCell>
                  <TableCell>{employee.category}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-gray-600">
                      <UserCheck className="h-4 w-4 mr-1 text-green-600" />
                      <span>{employee.checkInTime}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>{employee.project}</div>
                      {!employee.location && (
                        <div className="text-xs text-gray-500 italic mt-0.5">
                          No location defined – attendance will proceed without GPS verification
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      onClick={() => handleManualCheckOut(employee)} 
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
            )}
          </TableBody>
        </Table>
      </div>

      {/* Manual Check Out Dialog */}
      <ManualCheckOutDialog
        open={openManualDialog}
        onOpenChange={setOpenManualDialog}
        employee={selectedEmployee}
        projects={projects}
        onComplete={handleManualCheckOutComplete}
      />
    </div>
  );
};

export default CheckOutTab;
