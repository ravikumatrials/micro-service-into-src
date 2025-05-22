
import React, { useState, useEffect } from "react";
import { Edit, User, Clipboard, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { format } from "date-fns";
import { isSameDay } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";

interface Employee {
  id: number;
  employeeId: string;
  name: string;
  role: string;
  project?: string;
  projectId?: number;
  location?: string;
  locationId?: number;
  imageUrl: string;
  classification: string;
  category: string;
  status: "Active" | "Inactive";
  entity?: string;
  isAbsent?: boolean;
  absentDate?: Date;
  absentReason?: string;
}

interface AbsenteesTabProps {
  searchQuery: string;
  selectedProject: string;
  selectedClassification: string;
  selectedCategory: string;
  selectedStatus: string;
  selectedEntity: string;
  projects: { id: number; name: string; location?: string; coordinates?: { geofenceData: string } }[];
  locations: { id: number; name: string }[];
  selectedDate: Date;
  dateSelected?: boolean;
}

const AbsenteesTab = ({
  searchQuery,
  selectedProject,
  selectedClassification,
  selectedCategory,
  selectedStatus,
  selectedEntity,
  projects,
  locations,
  selectedDate,
  dateSelected = true
}: AbsenteesTabProps) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<Record<number, boolean>>({});
  const [employeeReasons, setEmployeeReasons] = useState<Record<number, string>>({});
  const [comments, setComments] = useState<string>("");
  const [selectAll, setSelectAll] = useState(false);
  
  // Effect to refresh employee data when the date changes
  useEffect(() => {
    // In a real app, this would fetch data for the selected date
    fetchEmployeeData();
  }, [selectedDate]);
  
  // Function to fetch employee data (mock implementation)
  const fetchEmployeeData = () => {
    // Mock employees - in a real app, this would filter out employees already marked present
    const mockEmployees: Employee[] = [
      {
        id: 1,
        employeeId: "10001",
        name: "John Smith",
        role: "Construction Worker",
        category: "Carpenter",
        classification: "Laborer",
        status: "Active",
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
        status: "Active",
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
        status: "Active",
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
        status: "Active",
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
        status: "Active",
        imageUrl: "https://randomuser.me/api/portraits/women/4.jpg",
        entity: "Tanseeq Construction Ltd"
      }
    ];
    
    // Update employee status based on the selected date
    setEmployees(mockEmployees.map(emp => {
      // Check if employee has already been marked as absent for selected date
      const isAbsentForSelectedDate = emp.absentDate ? 
        isSameDay(emp.absentDate, selectedDate) : false;
        
      return {
        ...emp,
        isAbsent: isAbsentForSelectedDate,
        absentReason: isAbsentForSelectedDate ? emp.absentReason : undefined
      };
    }));
    
    // Reset selections and reasons
    setSelectedEmployees({});
    setEmployeeReasons({});
    setComments("");
    setSelectAll(false);
  };
  
  // Filter employees based on search query and filters
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         employee.employeeId.includes(searchQuery);
    const matchesProject = selectedProject === "all" || (employee.projectId?.toString() === selectedProject);
    const matchesClassification = selectedClassification === "all" || employee.classification === selectedClassification;
    const matchesCategory = selectedCategory === "all" || employee.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || employee.status === selectedStatus;
    const matchesEntity = selectedEntity === "all" || employee.entity === getEntityName(selectedEntity);
    
    return matchesSearch && (matchesProject || !employee.projectId) && 
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

  // Toggle selection of an employee
  const toggleSelectEmployee = (employeeId: number) => {
    setSelectedEmployees(prev => ({
      ...prev,
      [employeeId]: !prev[employeeId]
    }));
  };

  // Toggle select all employees
  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    
    const newSelectedEmployees: Record<number, boolean> = {};
    filteredEmployees.forEach(employee => {
      if (!employee.isAbsent) {
        newSelectedEmployees[employee.id] = newSelectAll;
      }
    });
    
    setSelectedEmployees(newSelectedEmployees);
  };

  // Set reason for an employee
  const setEmployeeReason = (employeeId: number, reason: string) => {
    setEmployeeReasons(prev => ({
      ...prev,
      [employeeId]: reason
    }));
  };

  // Get the count of selected employees
  const selectedEmployeeCount = Object.values(selectedEmployees).filter(Boolean).length;

  // Handle marking selected employees as absent
  const handleMarkAbsent = () => {
    if (!dateSelected) {
      toast.error("Date selection required", {
        description: "Please select an attendance date before marking absences."
      });
      return;
    }
    
    // Validate that all selected employees have reasons
    const selectedEmployeeIds = Object.entries(selectedEmployees)
      .filter(([_, isSelected]) => isSelected)
      .map(([id]) => parseInt(id, 10));
    
    // Check if any selected employee is missing a reason
    const missingReason = selectedEmployeeIds.some(id => !employeeReasons[id]);
    
    if (missingReason) {
      toast.error("Missing reason", {
        description: "Please select an absence reason for each employee."
      });
      return;
    }
    
    if (selectedEmployeeIds.length === 0) {
      toast.error("No employees selected", {
        description: "Please select at least one employee to mark as absent."
      });
      return;
    }
    
    // Update employee records in our state
    setEmployees(current => 
      current.map(emp => {
        if (selectedEmployeeIds.includes(emp.id)) {
          return {
            ...emp,
            isAbsent: true,
            absentDate: selectedDate,
            absentReason: employeeReasons[emp.id]
          };
        }
        return emp;
      })
    );
    
    // Show success toast
    toast.success(`${selectedEmployeeIds.length} employees marked as absent`, {
      description: `Absences recorded for ${format(selectedDate, "PPP")}`
    });
    
    // Reset selections and comments
    setSelectedEmployees({});
    setComments("");
    setSelectAll(false);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-md shadow p-4">
        <div className="mb-4">
          <h2 className="text-lg font-medium text-gray-700">Mark Employees as Absent</h2>
          <p className="text-sm text-gray-500">
            Select employees who did not come to the site and mark them as absent with a reason.
          </p>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox 
                  checked={selectAll} 
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead className="w-[170px]">Name</TableHead>
              <TableHead>Entity</TableHead>
              <TableHead>Classification</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="w-[200px]">Reason</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-10 text-gray-500">
                  No employees found matching your filters
                </TableCell>
              </TableRow>
            ) : (
              filteredEmployees.map((employee) => (
                <TableRow key={employee.id} className={employee.isAbsent ? "bg-gray-50" : ""}>
                  <TableCell>
                    {employee.isAbsent ? (
                      <div className="flex h-4 w-4 items-center justify-center">
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                    ) : (
                      <Checkbox 
                        checked={!!selectedEmployees[employee.id]} 
                        onCheckedChange={() => toggleSelectEmployee(employee.id)}
                      />
                    )}
                  </TableCell>
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
                    {employee.isAbsent ? (
                      <div className="text-sm text-gray-700">
                        {employee.absentReason === "sick" ? "Sick → Absent (excused)" : 
                         "Casual → Absent (unexcused/personal leave)"}
                      </div>
                    ) : (
                      <Select 
                        disabled={!selectedEmployees[employee.id]} 
                        value={employeeReasons[employee.id] || ""}
                        onValueChange={(value) => setEmployeeReason(employee.id, value)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select reason" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sick">Sick → Absent (excused)</SelectItem>
                          <SelectItem value="casual">Casual → Absent (unexcused)</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </TableCell>
                  <TableCell>
                    {employee.isAbsent ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Absent
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Not Marked
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        
        {selectedEmployeeCount > 0 && (
          <div className="mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <Label htmlFor="comments" className="text-sm font-medium text-gray-700">
                Additional Comments (Optional)
              </Label>
              <span className="text-sm text-gray-500">
                {selectedEmployeeCount} employees selected
              </span>
            </div>
            
            <Textarea 
              id="comments"
              className="w-full"
              placeholder="Enter any comments about these absences..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
            
            <div className="flex justify-end">
              <Button 
                onClick={handleMarkAbsent}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Mark Selected as Absent
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AbsenteesTab;
