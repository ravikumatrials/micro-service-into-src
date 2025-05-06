
import React, { useState } from "react";
import { Edit, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import ManualCheckOutDialog from "./dialogs/ManualCheckOutDialog";
import { toast } from "sonner";

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
  projects: { id: number; name: string }[];
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
    const matchesEntity = selectedEntity === "all" || employee.entity === selectedEntity;
    
    return matchesSearch && matchesProject && matchesLocation && 
           matchesClassification && matchesCategory && matchesStatus && matchesEntity;
  });

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
    setSelectedEmployee(null);
  };

  return (
    <div className="space-y-4">
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
                  <TableCell>{employee.project}</TableCell>
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
