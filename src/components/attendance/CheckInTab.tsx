import React, { useState, useEffect } from "react";
import { Edit, UserCheck, UserX, AlertCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import ManualCheckInDialog from "./dialogs/ManualCheckInDialog";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { format } from "date-fns";
import { isSameDay } from "@/lib/utils";

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
  attendanceDate?: Date; // Added to track the date of attendance
}

interface CheckInTabProps {
  searchQuery: string;
  selectedProject: string;
  selectedStatus: string;
  selectedClassification: string;
  selectedCategory: string;
  selectedEntity: string;
  projects: { id: number; name: string; location?: string; coordinates?: { geofenceData: string } }[];
  locations: { id: number; name: string }[];
  selectedDate: Date; // Now required
  dateSelected?: boolean; // New prop to indicate if date has been explicitly selected
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
  selectedDate,
  dateSelected = false
}: CheckInTabProps) => {
  const [openManualDialog, setOpenManualDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showLocationWarning, setShowLocationWarning] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  
  // Effect to check if selected project has a location and update warning state
  useEffect(() => {
    if (selectedProject !== "all") {
      const projectHasLocation = projects.find(p => p.id.toString() === selectedProject)?.location;
      setShowLocationWarning(!projectHasLocation);
    } else {
      setShowLocationWarning(false); // Hide warning when "all projects" is selected
    }
  }, [selectedProject, projects]);

  // Effect to refresh employee data when the date changes
  useEffect(() => {
    if (dateSelected) {
      // Here you would typically fetch data for the selected date
      // For now, we'll use mock data
      fetchEmployeeData();
    }
  }, [selectedDate, dateSelected]);
  
  // Function to fetch employee data (mock implementation)
  const fetchEmployeeData = () => {
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
    
    // Update employee status based on the selected date
    // In a real application, this would come from an API call
    setEmployees(mockEmployees.map(emp => {
      // Check if employee has already been marked for the selected date
      // This is a simplified check - in a real app, this would check against stored attendance records
      const hasAttendanceForSelectedDate = emp.attendanceDate ? 
        isSameDay(emp.attendanceDate, selectedDate) : false;
        
      return {
        ...emp,
        // If the employee has attendance for this date, show them as checked in
        status: hasAttendanceForSelectedDate ? "checkedin" : "notcheckedin"
      };
    }));
  };

  // Filter employees based on search query and filters
  const filteredEmployees = employees.filter(employee => {
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
    if (!dateSelected) {
      toast.error("Date selection required", {
        description: "Please select an attendance date before marking attendance."
      });
      return;
    }
    
    // Check if employee already has attendance for this date
    if (employee.attendanceDate && isSameDay(employee.attendanceDate, selectedDate)) {
      toast.error("Duplicate attendance", {
        description: `${employee.name} already has attendance marked for ${format(selectedDate, "PPP")}.`
      });
      return;
    }
    
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
      description: `Project: ${selectedProjectName}, Date: ${format(selectedDate, "PPP")}`
    });
    
    // Update the employee's attendance record in our state
    if (selectedEmployee) {
      setEmployees(current => 
        current.map(emp => 
          emp.id === selectedEmployee.id 
            ? { ...emp, status: "checkedin", attendanceDate: selectedDate, checkedInProject: selectedProjectName }
            : emp
        )
      );
    }
    
    setSelectedEmployee(null);
  };

  return (
    <div className="space-y-4">
      {!dateSelected && (
        <Alert className="bg-orange-50 border border-orange-200 mb-4">
          <Calendar className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            Please select an attendance date before marking attendance
          </AlertDescription>
        </Alert>
      )}
      
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
              <TableHead>Entity</TableHead>
              <TableHead>Classification</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Check-In Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!dateSelected ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-orange-500">
                  Please select an attendance date to view employees
                </TableCell>
              </TableRow>
            ) : filteredEmployees.length > 0 ? (
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
                      disabled={employee.attendanceDate && isSameDay(employee.attendanceDate, selectedDate)}
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
