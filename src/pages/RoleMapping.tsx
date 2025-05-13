
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { RoleMappingFilters } from "@/components/role-mapping/RoleMappingFilters";
import { RoleAssignDialog } from "@/components/role-mapping/RoleAssignDialog";
import { SetLoginCredentialsDialog } from "@/components/role-mapping/SetLoginCredentialsDialog";
import { BulkLoginCredentialsDialog } from "@/components/role-mapping/BulkLoginCredentialsDialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Check, CheckCheck } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

const mockEmployees = [
  { id: 1, name: "John Smith", employeeId: "EMP001", location: "Site A", project: "Project X", entity: "Tanseeq Investment", category: "Carpenter", classification: "Laborer", currentRole: "Labour", email: "john.smith@example.com" },
  { id: 2, name: "Sarah Johnson", employeeId: "EMP002", location: "Site B", project: "Project Y", entity: "Tanseeq Landscaping LLC", category: "Manager", classification: "Staff", currentRole: "Supervisor", email: "sarah.johnson@example.com" },
  { id: 3, name: "Robert Williams", employeeId: "EMP003", location: "Site A", project: "Project X", entity: "Gulf Builders International", category: "Electrician", classification: "Laborer", currentRole: undefined, email: "robert.williams@example.com" },
  { id: 4, name: "Emily Davis", employeeId: "EMP004", location: "Site C", project: "Project Z", entity: "Al Maha Projects", category: "Plumber", classification: "Laborer", currentRole: "Labour", email: "emily.davis@example.com" },
];

const mockRoles = [
  { id: 1, name: "Labour" },
  { id: 2, name: "Supervisor" },
  { id: 3, name: "Super Admin" },
  { id: 4, name: "Report Admin" },
];

// Function to auto-assign roles based on classification
const autoAssignRoleBasedOnClassification = (employee) => {
  if (!employee.currentRole) {
    if (employee.classification === "Laborer") {
      return "Labour"; // Automatically assign Labour role
    }
    // For Staff classification, do not auto-assign any role
  }
  return employee.currentRole; // Keep existing role if any
};

const RoleMapping = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [entityFilter, setEntityFilter] = useState("all");
  const [classificationFilter, setClassificationFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  
  // Add state for login credentials modal
  const [credentialsDialogOpen, setCredentialsDialogOpen] = useState(false);
  const [employeeForCredentials, setEmployeeForCredentials] = useState(null);
  
  // Add state for bulk credentials modal
  const [bulkCredentialsDialogOpen, setBulkCredentialsDialogOpen] = useState(false);
  const [employeesForBulkCredentials, setEmployeesForBulkCredentials] = useState([]);
  
  // Bulk selection state
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  const [bulkRoleToAssign, setBulkRoleToAssign] = useState<string>("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [overwriteDialogOpen, setOverwriteDialogOpen] = useState(false);
  
  // Auto-assign roles for employees without roles when component mounts
  useEffect(() => {
    // Process employees when the component loads
    mockEmployees.forEach(employee => {
      // If no role is assigned yet, check if we should auto-assign one
      if (!employee.currentRole) {
        const autoAssignedRole = autoAssignRoleBasedOnClassification(employee);
        
        if (autoAssignedRole && autoAssignedRole !== employee.currentRole) {
          // In a real app, this would be an API call
          employee.currentRole = autoAssignedRole;
          
          console.log(`Auto-assigned role '${autoAssignedRole}' to ${employee.name} based on classification '${employee.classification}'`);
        }
      }
    });
  }, []);

  // Extract unique values for filters
  const entities = Array.from(new Set(mockEmployees.map(emp => emp.entity)));
  const classifications = Array.from(new Set(mockEmployees.map(emp => emp.classification)));
  const categories = Array.from(new Set(mockEmployees.map(emp => emp.category)));

  const filteredEmployees = mockEmployees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || employee.currentRole === roleFilter;
    const matchesEntity = entityFilter === "all" || employee.entity === entityFilter;
    const matchesClassification = classificationFilter === "all" || employee.classification === classificationFilter;
    const matchesCategory = categoryFilter === "all" || employee.category === categoryFilter;
    
    return matchesSearch && matchesRole && matchesEntity && matchesClassification && matchesCategory;
  });

  const handleAssignRole = (employee) => {
    setSelectedEmployee(employee);
    setDialogOpen(true);
  };

  const handleRoleAssigned = (role: string) => {
    // In a real app, this would update the backend
    mockEmployees.forEach(emp => {
      if (emp.id === selectedEmployee?.id) {
        emp.currentRole = role;
      }
    });
    
    // Always open credentials dialog after role assignment
    setEmployeeForCredentials(selectedEmployee);
    setCredentialsDialogOpen(true);
  };

  // Handle role removal
  const handleRemoveRole = () => {
    if (!selectedEmployee) return;

    // In a real app, this would update the backend
    mockEmployees.forEach(emp => {
      if (emp.id === selectedEmployee.id) {
        emp.currentRole = undefined;
      }
    });
    
    // Create audit log
    const auditLog = {
      employeeId: selectedEmployee.employeeId,
      removedRole: selectedEmployee.currentRole,
      removedBy: "Admin User", // This would come from authentication in a real app
      timestamp: new Date().toISOString(),
    };
    
    // In a real app, this would be sent to a backend API to store in the audit logs
    console.log("Role removal audit log:", auditLog);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setRoleFilter("all");
    setEntityFilter("all");
    setClassificationFilter("all");
    setCategoryFilter("all");
  };

  // Handle checkbox selection
  const handleSelectEmployee = (employeeId: number, checked: boolean) => {
    if (checked) {
      setSelectedEmployees([...selectedEmployees, employeeId]);
    } else {
      setSelectedEmployees(selectedEmployees.filter(id => id !== employeeId));
    }
  };

  // Handle "Select All" checkbox
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allEmployeeIds = filteredEmployees.map(emp => emp.id);
      setSelectedEmployees(allEmployeeIds);
    } else {
      setSelectedEmployees([]);
    }
  };

  // Check if all currently visible employees are selected
  const areAllSelected = filteredEmployees.length > 0 && 
    filteredEmployees.every(emp => selectedEmployees.includes(emp.id));

  // Handle bulk role assignment
  const handleBulkAssign = () => {
    if (!bulkRoleToAssign) {
      toast.error("Please select a role to assign");
      return;
    }

    // Check if any selected employees already have roles
    const hasExistingRoles = selectedEmployees.some(id => {
      const emp = mockEmployees.find(e => e.id === id);
      return emp && emp.currentRole !== undefined;
    });

    if (hasExistingRoles) {
      // Show overwrite confirmation dialog
      setOverwriteDialogOpen(true);
    } else {
      // Show regular confirmation dialog
      setConfirmDialogOpen(true);
    }
  };

  // Confirm bulk assignment
  const confirmBulkAssignment = () => {
    // In a real app, this would update the backend
    mockEmployees.forEach(emp => {
      if (selectedEmployees.includes(emp.id)) {
        emp.currentRole = bulkRoleToAssign;
      }
    });

    // Show success toast
    toast.success(`Role assigned to ${selectedEmployees.length} employees successfully.`);

    // Prepare for bulk credentials setup
    const selectedEmployeesData = mockEmployees.filter(emp => 
      selectedEmployees.includes(emp.id)
    );

    // For 5 or more employees, open the bulk credentials dialog
    if (selectedEmployees.length >= 5) {
      setEmployeesForBulkCredentials(selectedEmployeesData);
      setBulkCredentialsDialogOpen(true);
    } 
    // For a single employee, use the existing credentials dialog
    else if (selectedEmployees.length === 1) {
      // Find the employee to set credentials for
      const employeeToSetup = mockEmployees.find(emp => emp.id === selectedEmployees[0]);
      if (employeeToSetup) {
        setEmployeeForCredentials(employeeToSetup);
        setCredentialsDialogOpen(true);
      }
    }
    // For 2-4 employees, we'll still use the bulk dialog for consistency
    else if (selectedEmployees.length > 1) {
      setEmployeesForBulkCredentials(selectedEmployeesData);
      setBulkCredentialsDialogOpen(true);
    }

    // Reset selection state
    setSelectedEmployees([]);
    setBulkRoleToAssign("");
    setConfirmDialogOpen(false);
    setOverwriteDialogOpen(false);
  };

  // Function to handle the credentials dialog close and update UI
  const handleCredentialsDialogClose = (open: boolean) => {
    setCredentialsDialogOpen(open);
    // If dialog is closing, also close the role assign dialog
    if (!open) {
      setDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Role Mapping</h1>
        
        <Card className="p-4">
          <RoleMappingFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            roleFilter={roleFilter}
            setRoleFilter={setRoleFilter}
            entityFilter={entityFilter}
            setEntityFilter={setEntityFilter}
            classificationFilter={classificationFilter}
            setClassificationFilter={setClassificationFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            roles={mockRoles}
            entities={entities}
            classifications={classifications}
            categories={categories}
            onClearFilters={handleClearFilters}
          />
        </Card>
      </div>

      {/* Bulk Action Bar - Shown when employees are selected */}
      {selectedEmployees.length > 0 && (
        <Card className="p-4 bg-blue-50 border-blue-200 sticky top-0 z-10">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCheck className="h-5 w-5 text-blue-600" />
              <span className="font-medium">{selectedEmployees.length} employees selected</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Select value={bulkRoleToAssign} onValueChange={setBulkRoleToAssign}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  {mockRoles.map((role) => (
                    <SelectItem key={role.id} value={role.name}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                onClick={handleBulkAssign} 
                disabled={!bulkRoleToAssign}
                className="w-full sm:w-auto"
              >
                Assign Role
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setSelectedEmployees([])}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      <Card className="p-0 overflow-hidden">
        {isMobile ? (
          <div className="divide-y divide-gray-200">
            {filteredEmployees.map((employee) => (
              <div key={employee.id} className="p-4 space-y-2">
                <div className="flex items-center gap-3">
                  <Checkbox 
                    checked={selectedEmployees.includes(employee.id)}
                    onCheckedChange={(checked) => handleSelectEmployee(employee.id, !!checked)}
                    aria-label={`Select ${employee.name}`}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{employee.name}</h3>
                        <p className="text-sm text-gray-500">{employee.employeeId}</p>
                        <div className="mt-2 space-y-1">
                          <p className="text-sm">
                            <span className="font-medium">Entity:</span> {employee.entity}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Classification:</span> {employee.classification}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Category:</span> {employee.category}
                          </p>
                        </div>
                      </div>
                      {employee.currentRole && (
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          {employee.currentRole}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-2"
                  onClick={() => handleAssignRole(employee)}
                >
                  {employee.currentRole ? "Update Role" : "Assign Role"}
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">
                  <Checkbox 
                    checked={areAllSelected}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all employees"
                  />
                </TableHead>
                <TableHead>Employee ID</TableHead>
                <TableHead>Employee Name</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Classification</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Current Role</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedEmployees.includes(employee.id)}
                      onCheckedChange={(checked) => handleSelectEmployee(employee.id, !!checked)}
                      aria-label={`Select ${employee.name}`}
                    />
                  </TableCell>
                  <TableCell>{employee.employeeId}</TableCell>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.entity}</TableCell>
                  <TableCell>{employee.classification}</TableCell>
                  <TableCell>{employee.category}</TableCell>
                  <TableCell>
                    {employee.currentRole && (
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        {employee.currentRole}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      onClick={() => handleAssignRole(employee)}
                    >
                      {employee.currentRole ? "Update Role" : "Assign Role"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      {/* Regular Role Assign Dialog - Modified to work with sequential flow */}
      <RoleAssignDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        employee={selectedEmployee}
        roles={mockRoles}
        onAssignRole={handleRoleAssigned}
        onRemoveRole={handleRemoveRole}
      />

      {/* Set Login Credentials Dialog - For single employee, now part of the sequential flow */}
      <SetLoginCredentialsDialog
        open={credentialsDialogOpen}
        onOpenChange={handleCredentialsDialogClose}
        employee={employeeForCredentials}
      />

      {/* Bulk Login Credentials Dialog - For multiple employees */}
      <BulkLoginCredentialsDialog
        open={bulkCredentialsDialogOpen}
        onOpenChange={setBulkCredentialsDialogOpen}
        employees={employeesForBulkCredentials}
      />

      {/* Standard confirmation dialog */}
      <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Bulk Role Assignment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to assign the role '{bulkRoleToAssign}' to {selectedEmployees.length} selected employees?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmBulkAssignment}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Overwrite confirmation dialog */}
      <AlertDialog open={overwriteDialogOpen} onOpenChange={setOverwriteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Overwrite Existing Roles</AlertDialogTitle>
            <AlertDialogDescription>
              This action will overwrite existing role mappings for the selected employees. Continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmBulkAssignment}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RoleMapping;
