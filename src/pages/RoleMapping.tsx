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
import { toast, useToast } from "@/components/ui/use-toast";
import { autoAssignRoleByClassification } from "@/utils/roleUtils";
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

const RoleMapping = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [entityFilter, setEntityFilter] = useState("all");
  const [classificationFilter, setClassificationFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  
  const [credentialsDialogOpen, setCredentialsDialogOpen] = useState(false);
  const [employeeForCredentials, setEmployeeForCredentials] = useState(null);
  
  const [bulkCredentialsDialogOpen, setBulkCredentialsDialogOpen] = useState(false);
  const [employeesForBulkCredentials, setEmployeesForBulkCredentials] = useState([]);
  
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  const [bulkRoleToAssign, setBulkRoleToAssign] = useState<string>("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [overwriteDialogOpen, setOverwriteDialogOpen] = useState(false);
  
  useEffect(() => {
    mockEmployees.forEach(employee => {
      if (!employee.currentRole) {
        const autoAssignedRole = autoAssignRoleByClassification(employee);
        
        if (autoAssignedRole && autoAssignedRole !== employee.currentRole) {
          employee.currentRole = autoAssignedRole;
          
          console.log(`Auto-assigned role '${autoAssignedRole}' to ${employee.name} based on classification '${employee.classification}'`);
        }
      }
    });
  }, []);

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
    mockEmployees.forEach(emp => {
      if (emp.id === selectedEmployee?.id) {
        emp.currentRole = role;
      }
    });
    
    setEmployeeForCredentials(selectedEmployee);
    setCredentialsDialogOpen(true);
  };

  const handleRemoveRole = () => {
    if (!selectedEmployee) return;

    mockEmployees.forEach(emp => {
      if (emp.id === selectedEmployee.id) {
        emp.currentRole = undefined;
      }
    });
    
    const auditLog = {
      employeeId: selectedEmployee.employeeId,
      removedRole: selectedEmployee.currentRole,
      removedBy: "Admin User",
      timestamp: new Date().toISOString(),
    };
    
    console.log("Role removal audit log:", auditLog);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setRoleFilter("all");
    setEntityFilter("all");
    setClassificationFilter("all");
    setCategoryFilter("all");
  };

  const handleSelectEmployee = (employeeId: number, checked: boolean) => {
    if (checked) {
      setSelectedEmployees([...selectedEmployees, employeeId]);
    } else {
      setSelectedEmployees(selectedEmployees.filter(id => id !== employeeId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allEmployeeIds = filteredEmployees.map(emp => emp.id);
      setSelectedEmployees(allEmployeeIds);
    } else {
      setSelectedEmployees([]);
    }
  };

  const areAllSelected = filteredEmployees.length > 0 && 
    filteredEmployees.every(emp => selectedEmployees.includes(emp.id));

  const handleBulkAssign = () => {
    if (!bulkRoleToAssign) {
      toast.error("Please select a role to assign");
      return;
    }

    const hasExistingRoles = selectedEmployees.some(id => {
      const emp = mockEmployees.find(e => e.id === id);
      return emp && emp.currentRole !== undefined;
    });

    if (hasExistingRoles) {
      setOverwriteDialogOpen(true);
    } else {
      setConfirmDialogOpen(true);
    }
  };

  const confirmBulkAssignment = () => {
    mockEmployees.forEach(emp => {
      if (selectedEmployees.includes(emp.id)) {
        emp.currentRole = bulkRoleToAssign;
      }
    });

    toast.success(`Role assigned to ${selectedEmployees.length} employees successfully.`);

    const selectedEmployeesData = mockEmployees.filter(emp => 
      selectedEmployees.includes(emp.id)
    );

    if (selectedEmployees.length >= 5) {
      setEmployeesForBulkCredentials(selectedEmployeesData);
      setBulkCredentialsDialogOpen(true);
    } else if (selectedEmployees.length === 1) {
      const employeeToSetup = mockEmployees.find(emp => emp.id === selectedEmployees[0]);
      if (employeeToSetup) {
        setEmployeeForCredentials(employeeToSetup);
        setCredentialsDialogOpen(true);
      }
    } else if (selectedEmployees.length > 1) {
      setEmployeesForBulkCredentials(selectedEmployeesData);
      setBulkCredentialsDialogOpen(true);
    }

    setSelectedEmployees([]);
    setBulkRoleToAssign("");
    setConfirmDialogOpen(false);
    setOverwriteDialogOpen(false);
  };

  const handleCredentialsDialogClose = (open: boolean) => {
    setCredentialsDialogOpen(open);
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
                  {employee.classification === "Laborer" ? 
                    (employee.currentRole ? "Update Role" : "Assign Role") :
                    (employee.currentRole ? "Update Role" : "Assign Role")
                  }
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
                      {employee.classification === "Laborer" ? 
                        "Update Role" : 
                        (employee.currentRole ? "Update Role" : "Assign Role")
                      }
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      <RoleAssignDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        employee={selectedEmployee}
        roles={mockRoles}
        onAssignRole={handleRoleAssigned}
        onRemoveRole={handleRemoveRole}
      />

      <SetLoginCredentialsDialog
        open={credentialsDialogOpen}
        onOpenChange={handleCredentialsDialogClose}
        employee={employeeForCredentials}
      />

      <BulkLoginCredentialsDialog
        open={bulkCredentialsDialogOpen}
        onOpenChange={setBulkCredentialsDialogOpen}
        employees={employeesForBulkCredentials}
      />

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
