
import React, { useState, useEffect } from "react";
import { Edit, UserX } from "lucide-react";
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Avatar } from "./ui/avatar";
import ManualCheckInDialog from "./dialogs/ManualCheckInDialog";
import { toast } from "sonner";
import { format } from "date-fns";
import { isSameDay } from "../lib/utils";

interface Employee {
  id: number;
  employeeId: string;
  name: string;
  role: string;
  project: string;
  projectId: number;
  location: string;
  locationId: number;
  imageUrl: string;
  classification: string;
  category: string;
  status: "Active" | "Inactive";
  entity?: string;
  checkedInDate?: Date;
}

interface CheckInTabProps {
  searchQuery: string;
  selectedProject: string;
  selectedLocation?: string;
  selectedClassification: string;
  selectedCategory: string;
  selectedStatus: string;
  selectedEntity: string;
  projects: { id: number; name: string; location?: string; coordinates?: { geofenceData: string } }[];
  locations: { id: number; name: string }[];
  selectedDate: Date;
  dateSelected?: boolean;
}

const CheckInTab = ({
  searchQuery,
  selectedProject,
  selectedLocation = "all",
  selectedClassification,
  selectedCategory,
  selectedStatus,
  selectedEntity,
  projects,
  locations,
  selectedDate,
  dateSelected = true
}: CheckInTabProps) => {
  const [openManualDialog, setOpenManualDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [notCheckedInEmployees, setNotCheckedInEmployees] = useState<Employee[]>([]);
  
  useEffect(() => {
    fetchNotCheckedInEmployees();
  }, [selectedDate]);
  
  const fetchNotCheckedInEmployees = () => {
    const mockNotCheckedInEmployees: Employee[] = [
      {
        id: 1,
        employeeId: "10001",
        name: "John Smith",
        role: "Site Manager",
        classification: "Staff",
        category: "Engineer",
        status: "Active",
        project: "Main Building Construction",
        projectId: 1,
        location: "Site A",
        locationId: 1,
        imageUrl: "https://randomuser.me/api/portraits/men/1.jpg"
      },
      {
        id: 2,
        employeeId: "10002",
        name: "Sarah Johnson",
        role: "Safety Officer",
        classification: "Staff",
        category: "Safety",
        status: "Active",
        project: "Bridge Expansion Project",
        projectId: 2,
        location: "Site B",
        locationId: 2,
        imageUrl: "https://randomuser.me/api/portraits/women/1.jpg"
      }
    ];
    
    setNotCheckedInEmployees(mockNotCheckedInEmployees.map(employee => {
      const hasCheckinForSelectedDate = employee.checkedInDate ? 
        isSameDay(employee.checkedInDate, selectedDate) : false;
        
      return {
        ...employee,
        checkedInDate: hasCheckinForSelectedDate ? employee.checkedInDate : undefined
      };
    }));
  };

  const filteredEmployees = notCheckedInEmployees.filter(employee => {
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

  const getEntityName = (entityId: string) => {
    if (entityId === "all") return "";
    
    const entityMap = {
      "1": "Tanseeq Landscaping LLC",
      "2": "Tanseeq Construction Ltd",
      "3": "Tanseeq Engineering Co"
    };
    
    return entityMap[entityId as keyof typeof entityMap] || "";
  };

  const handleManualCheckIn = (employee: Employee) => {
    if (employee.checkedInDate && isSameDay(employee.checkedInDate, selectedDate)) {
      toast.error("Duplicate attendance", {
        description: `${employee.name} already has check-in marked for ${format(selectedDate, "PPP")}.`
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
    
    toast.success(`${selectedEmployee?.name} has been manually checked in`, {
      description: `Project: ${selectedProjectName}, Time: ${time}, Date: ${format(selectedDate, "PPP")}`
    });
    
    if (selectedEmployee) {
      setNotCheckedInEmployees(current => 
        current.map(emp => 
          emp.id === selectedEmployee.id 
            ? { ...emp, checkedInDate: selectedDate }
            : emp
        )
      );
    }
    
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
              <TableHead>Status</TableHead>
              <TableHead>Project</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                  No employees found matching your filters for {format(selectedDate, "PPP")}
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
                      <UserX className="h-4 w-4 mr-1 text-red-600" />
                      <span>{employee.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>{employee.project}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      onClick={() => handleManualCheckIn(employee)} 
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-1 text-xs"
                      disabled={employee.checkedInDate && isSameDay(employee.checkedInDate, selectedDate)}
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
