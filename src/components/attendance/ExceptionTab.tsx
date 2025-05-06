
import React, { useState } from "react";
import { Edit, AlertCircle } from "lucide-react";
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
  location?: string;
  locationId?: number;
  checkInTime: string;
  imageUrl: string;
  classification: string;
  category: string;
  status: "Active" | "Inactive";
  entity?: string;
  exceptionReason?: string;
}

interface ExceptionTabProps {
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

const ExceptionTab = ({
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
}: ExceptionTabProps) => {
  const [openManualDialog, setOpenManualDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // Mock employees with pending checkouts
  const mockPendingCheckouts: Employee[] = [
    {
      id: 8,
      employeeId: "10008",
      name: "Thomas Harris",
      role: "Construction Worker",
      project: "Main Building Construction",
      projectId: 1,
      location: "Site A",
      locationId: 1,
      checkInTime: "08:15 AM",
      imageUrl: "https://randomuser.me/api/portraits/men/4.jpg",
      classification: "Laborer",
      category: "Carpenter",
      status: "Active",
      exceptionReason: "No checkout recorded for yesterday"
    },
    {
      id: 9,
      employeeId: "10009",
      name: "Jennifer White",
      role: "Electrician",
      project: "Bridge Expansion Project",
      projectId: 2,
      location: "Site B",
      locationId: 2,
      checkInTime: "09:00 AM",
      imageUrl: "https://randomuser.me/api/portraits/women/5.jpg",
      classification: "Staff",
      category: "Electrician",
      status: "Inactive",
      exceptionReason: "No checkout recorded for yesterday"
    },
    // Additional employees with exceptions
    {
      id: 14,
      employeeId: "10014",
      name: "Fatima Al-Qahtani",
      role: "Project Engineer",
      project: "Marina Towers",
      projectId: 5,
      checkInTime: "07:30 AM",
      imageUrl: "https://randomuser.me/api/portraits/women/8.jpg",
      classification: "Staff",
      category: "Mason",
      status: "Active",
      entity: "Tanseeq Engineering Co",
      exceptionReason: "No checkout recorded for yesterday"
    },
    {
      id: 15,
      employeeId: "10015",
      name: "Carlos Rodriguez",
      role: "Foreman",
      project: "Dubai Mall Expansion",
      projectId: 4,
      checkInTime: "06:45 AM",
      imageUrl: "https://randomuser.me/api/portraits/men/9.jpg",
      classification: "Laborer",
      category: "Carpenter",
      status: "Active",
      entity: "Tanseeq Construction Ltd",
      exceptionReason: "No checkout recorded for yesterday"
    },
    {
      id: 16,
      employeeId: "10016",
      name: "Aisha Mohammed",
      role: "Safety Manager",
      project: "Highway Renovation",
      projectId: 3,
      checkInTime: "08:05 AM",
      imageUrl: "https://randomuser.me/api/portraits/women/9.jpg",
      classification: "Staff",
      category: "Plumber",
      status: "Active",
      entity: "Tanseeq Engineering Co",
      exceptionReason: "GPS not detected during check-in"
    },
    {
      id: 17,
      employeeId: "10017",
      name: "John Peterson",
      role: "Electrician",
      project: "Marina Towers",
      projectId: 5,
      checkInTime: "07:50 AM",
      imageUrl: "https://randomuser.me/api/portraits/men/10.jpg",
      classification: "Laborer",
      category: "Electrician",
      status: "Active",
      entity: "Tanseeq Landscaping LLC",
      exceptionReason: "Manually checked in outside of geofence"
    }
  ];

  // Filter employees based on search query and filters
  const filteredPendingCheckouts = mockPendingCheckouts.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         employee.employeeId.includes(searchQuery);
    const matchesProject = selectedProject === "all" || employee.projectId.toString() === selectedProject;
    const matchesLocation = selectedLocation === "all" || 
                          (employee.locationId && employee.locationId.toString() === selectedLocation);
    const matchesClassification = selectedClassification === "all" || employee.classification === selectedClassification;
    const matchesCategory = selectedCategory === "all" || employee.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || employee.status === selectedStatus;
    const matchesEntity = selectedEntity === "all" || employee.entity === getEntityName(selectedEntity);
    
    return matchesSearch && matchesProject && (matchesLocation || !employee.locationId) && 
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
    
    toast.success(`${selectedEmployee?.name} exception has been resolved`, {
      description: `Project: ${selectedProjectName}, Time: ${time}, Reason: ${reason.substring(0, 30)}${reason.length > 30 ? '...' : ''}`
    });
    
    // Check if project has location and show warning if not
    const project = projects.find(p => p.id.toString() === projectId);
    if (!project?.location) {
      toast.warning("Note: This project does not have a geofenced location assigned", {
        description: "Exception has been resolved without GPS verification"
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
            This project does not have a geofenced location assigned. Attendance exceptions will still be processed without GPS verification.
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
            {filteredPendingCheckouts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                  No pending checkouts found matching your filters
                </TableCell>
              </TableRow>
            ) : (
              filteredPendingCheckouts.map((employee) => (
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
                  <TableCell>{employee.checkInTime}</TableCell>
                  <TableCell>
                    <div>
                      <div>{employee.project}</div>
                      {!employee.location && (
                        <div className="text-xs text-amber-600 mt-0.5">
                          No location defined – attendance will proceed without GPS verification
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        onClick={() => handleManualCheckOut(employee)} 
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-1 text-xs"
                      >
                        <Edit className="h-3 w-3" />
                        <span>Mark Attendance</span>
                      </Button>
                    </div>
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

export default ExceptionTab;
