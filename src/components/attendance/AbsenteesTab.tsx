
import React, { useState, useEffect } from "react";
import { Edit, UserX, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import { toast } from "sonner";
import { format } from "date-fns";
import { isSameDay } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  status: "active" | "inactive";
  imageUrl: string;
  classification: string;
  category: string;
  entity?: string;
  attendanceStatus?: "absent";
  attendanceReason?: string;
  reasonCategory?: "absent";
  absentDate?: Date; // Track when employee was marked as absent
}

interface AbsenteesTabProps {
  searchQuery: string;
  selectedProject: string;
  selectedStatus: string;
  selectedClassification: string;
  selectedCategory: string;
  selectedEntity: string;
  projects: { id: number; name: string; location?: string; coordinates?: { geofenceData: string } }[];
  locations: { id: number; name: string }[];
  selectedDate: Date;
  dateSelected?: boolean;
  attendanceReasons: {
    id: string;
    label: string;
    category: "present-offsite" | "absent";
  }[];
}

const AbsenteesTab = ({ 
  searchQuery,
  selectedProject,
  selectedStatus,
  selectedClassification,
  selectedCategory,
  selectedEntity,
  projects,
  locations,
  selectedDate,
  dateSelected = true,
  attendanceReasons
}: AbsenteesTabProps) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  const [employeeReasons, setEmployeeReasons] = useState<{[key: number]: string}>({});
  
  // Effect to refresh employee data when the date changes
  useEffect(() => {
    // Here you would typically fetch data for the selected date
    fetchEmployeeData();
  }, [selectedDate]);
  
  // Function to fetch employee data (mock implementation)
  const fetchEmployeeData = () => {
    // Mock employees who might be absent
    const mockEmployees: Employee[] = [
      {
        id: 1,
        employeeId: "10001",
        name: "John Smith",
        role: "Construction Worker",
        category: "Carpenter",
        classification: "Laborer",
        status: "active",
        project: "Main Building Construction",
        projectId: 1,
        location: "Site A",
        locationId: 1,
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
        status: "active",
        project: "Bridge Expansion Project",
        projectId: 2,
        location: "Site B",
        locationId: 2,
        imageUrl: "https://randomuser.me/api/portraits/women/1.jpg",
        entity: "Tanseeq Construction Ltd"
      },
      {
        id: 6,
        employeeId: "10006",
        name: "Amanda Garcia",
        role: "Project Manager",
        category: "Mason",
        classification: "Staff",
        status: "active",
        project: "Dubai Mall Expansion",
        projectId: 4,
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
        status: "active",
        project: "Highway Renovation",
        projectId: 3,
        imageUrl: "https://randomuser.me/api/portraits/men/4.jpg",
        entity: "Tanseeq Landscaping LLC"
      }
    ];
    
    // Update employee status based on the selected date
    setEmployees(mockEmployees.map(emp => {
      // Check if employee has already been marked as absent for the selected date
      const wasAbsentOnSelectedDate = emp.absentDate ? 
        isSameDay(emp.absentDate, selectedDate) : false;
        
      return {
        ...emp,
        attendanceStatus: wasAbsentOnSelectedDate ? "absent" : undefined,
        attendanceReason: wasAbsentOnSelectedDate ? emp.attendanceReason : undefined
      };
    }));
    
    // Reset selected employees and reasons when date changes
    setSelectedEmployees([]);
    setEmployeeReasons({});
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
    const entityMap: {[key: string]: string} = {
      "1": "Tanseeq Landscaping LLC",
      "2": "Tanseeq Construction Ltd",
      "3": "Tanseeq Engineering Co"
    };
    
    return entityMap[entityId] || "";
  };

  // Handle select all employees
  const handleSelectAll = () => {
    if (selectedEmployees.length === filteredEmployees.length) {
      // If all are selected, deselect all
      setSelectedEmployees([]);
    } else {
      // Select all filtered employees
      setSelectedEmployees(filteredEmployees.map(emp => emp.id));
    }
  };

  // Handle individual employee selection
  const handleSelectEmployee = (employeeId: number) => {
    if (selectedEmployees.includes(employeeId)) {
      setSelectedEmployees(selectedEmployees.filter(id => id !== employeeId));
      
      // Remove reason for this employee
      const updatedReasons = {...employeeReasons};
      delete updatedReasons[employeeId];
      setEmployeeReasons(updatedReasons);
    } else {
      setSelectedEmployees([...selectedEmployees, employeeId]);
    }
  };

  // Handle reason selection for an employee
  const handleReasonChange = (employeeId: number, reasonId: string) => {
    setEmployeeReasons({
      ...employeeReasons,
      [employeeId]: reasonId
    });
  };

  // Mark selected employees as absent
  const handleMarkAbsent = () => {
    if (!dateSelected) {
      toast.error("Date selection required", {
        description: "Please select an attendance date before marking employees as absent."
      });
      return;
    }
    
    // Validate that all selected employees have reasons
    const missingReasons = selectedEmployees.filter(id => !employeeReasons[id]);
    if (missingReasons.length > 0) {
      toast.error("Missing reasons", {
        description: `Please select a reason for all marked employees (${missingReasons.length} missing)`
      });
      return;
    }
    
    // Process absent marking
    const markedEmployees = selectedEmployees.map(id => {
      const employee = employees.find(emp => emp.id === id);
      const reasonId = employeeReasons[id];
      const reasonLabel = attendanceReasons.find(r => r.id === reasonId)?.label || "";
      
      return {
        id,
        name: employee?.name,
        reason: reasonLabel
      };
    });
    
    // Update employee records
    setEmployees(employees.map(emp => {
      if (selectedEmployees.includes(emp.id)) {
        const reasonId = employeeReasons[emp.id];
        return {
          ...emp,
          attendanceStatus: "absent",
          attendanceReason: reasonId,
          reasonCategory: "absent",
          absentDate: selectedDate
        };
      }
      return emp;
    }));
    
    // Show success toast
    toast.success(`${selectedEmployees.length} employees marked as absent`, {
      description: `Successfully recorded absence for ${format(selectedDate, "PPP")}`
    });
    
    // Reset selections after marking
    setSelectedEmployees([]);
    setEmployeeReasons({});
  };

  return (
    <div className="space-y-4">
      {selectedEmployees.length > 0 && (
        <div className="flex items-center justify-between bg-blue-50 p-4 rounded-md border border-blue-100">
          <div className="flex items-center gap-2">
            <Check className="text-blue-500" />
            <span className="font-medium">{selectedEmployees.length} employees selected</span>
          </div>
          <Button 
            onClick={handleMarkAbsent}
            variant="default"
          >
            Mark as Absent
          </Button>
        </div>
      )}
      
      <div className="bg-white rounded-md shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox 
                  checked={selectedEmployees.length === filteredEmployees.length && filteredEmployees.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="w-[80px]">Employee ID</TableHead>
              <TableHead className="w-[170px]">Employee Name</TableHead>
              <TableHead>Entity</TableHead>
              <TableHead>Classification</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Reason</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => {
                const isSelected = selectedEmployees.includes(employee.id);
                const isAlreadyAbsent = employee.attendanceStatus === "absent";
                
                return (
                <TableRow key={employee.id}>
                  <TableCell>
                    <Checkbox 
                      checked={isSelected || isAlreadyAbsent}
                      onCheckedChange={() => !isAlreadyAbsent && handleSelectEmployee(employee.id)}
                      disabled={isAlreadyAbsent}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{employee.employeeId}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <img src={employee.imageUrl} alt={employee.name} />
                      </Avatar>
                      <div>
                        {employee.name}
                        {isAlreadyAbsent && (
                          <div className="text-xs text-red-500">
                            Already marked absent
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{employee.entity}</TableCell>
                  <TableCell>{employee.classification}</TableCell>
                  <TableCell>{employee.project || "Unassigned"}</TableCell>
                  <TableCell>
                    {isAlreadyAbsent ? (
                      <span className="text-gray-500">
                        {attendanceReasons.find(r => r.id === employee.attendanceReason)?.label || "Not specified"}
                      </span>
                    ) : isSelected ? (
                      <Select 
                        value={employeeReasons[employee.id] || ""}
                        onValueChange={(value) => handleReasonChange(employee.id, value)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select reason" />
                        </SelectTrigger>
                        <SelectContent>
                          {attendanceReasons.map(reason => (
                            <SelectItem key={reason.id} value={reason.id}>
                              {reason.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <span className="text-gray-400">No reason</span>
                    )}
                  </TableCell>
                </TableRow>
              )})
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
    </div>
  );
};

export default AbsenteesTab;
