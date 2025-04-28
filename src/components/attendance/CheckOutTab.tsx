import React, { useState } from "react";
import { Edit, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import ManualCheckOutDialog from "./dialogs/ManualCheckOutDialog";
import { toast } from "sonner";

interface Employee {
  id: number;
  name: string;
  role: string;
  project: string;
  projectId: number;
  location: string;
  locationId: number;
  checkInTime: string;
  imageUrl: string;
}

interface CheckOutTabProps {
  searchQuery: string;
  selectedProject: string;
  selectedLocation: string;
  projects: { id: number; name: string }[];
  locations: { id: number; name: string }[];
}

const CheckOutTab = ({
  searchQuery,
  selectedProject,
  selectedLocation,
  projects,
  locations
}: CheckOutTabProps) => {
  const [openManualDialog, setOpenManualDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const mockCheckedInEmployees: Employee[] = [
    {
      id: 3,
      name: "Michael Brown",
      role: "Engineer",
      project: "Highway Renovation",
      projectId: 3,
      location: "Office",
      locationId: 3,
      checkInTime: "08:30 AM",
      imageUrl: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      id: 5,
      name: "David Wilson",
      role: "Construction Worker",
      project: "Bridge Expansion Project",
      projectId: 2,
      location: "Site B",
      locationId: 2,
      checkInTime: "09:15 AM",
      imageUrl: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    {
      id: 7,
      name: "Jane Cooper",
      role: "Project Manager",
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
                         employee.id.toString().includes(searchQuery);
    const matchesProject = selectedProject === "all" || employee.projectId.toString() === selectedProject;
    const matchesLocation = selectedLocation === "all" || employee.locationId.toString() === selectedLocation;
    
    return matchesSearch && matchesProject && matchesLocation;
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
              <TableHead className="w-[250px]">Employee</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Check-in Time</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-gray-500">
                  No checked-in employees found matching your filters
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
                  <TableCell>{employee.project}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-gray-600">
                      <UserCheck className="h-4 w-4 mr-1 text-green-600" />
                      <span>{employee.checkInTime}</span>
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
                      <span>Manual</span>
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
