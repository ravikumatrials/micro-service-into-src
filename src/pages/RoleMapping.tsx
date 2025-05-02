
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { RoleMappingFilters } from "@/components/role-mapping/RoleMappingFilters";
import { RoleAssignDialog } from "@/components/role-mapping/RoleAssignDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockEmployees = [
  { id: 1, name: "John Smith", employeeId: "EMP001", location: "Site A", project: "Project X", currentRole: "Labour" },
  { id: 2, name: "Sarah Johnson", employeeId: "EMP002", location: "Site B", project: "Project Y", currentRole: "Supervisor" },
  { id: 3, name: "Robert Williams", employeeId: "EMP003", location: "Site A", project: "Project X", currentRole: undefined },
  { id: 4, name: "Emily Davis", employeeId: "EMP004", location: "Site C", project: "Project Z", currentRole: "Labour" },
];

const mockRoles = [
  { id: 1, name: "Labour" },
  { id: 2, name: "Supervisor" },
  { id: 3, name: "Super Admin" },
  { id: 4, name: "Report Admin" },
];

const RoleMapping = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const filteredEmployees = mockEmployees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || employee.currentRole === roleFilter;
    
    return matchesSearch && matchesRole;
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
            roles={mockRoles}
          />
        </Card>
      </div>

      <Card className="p-0 overflow-hidden">
        {isMobile ? (
          <div className="divide-y divide-gray-200">
            {filteredEmployees.map((employee) => (
              <div key={employee.id} className="p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{employee.name}</h3>
                    <p className="text-sm text-gray-500">{employee.employeeId}</p>
                  </div>
                  {employee.currentRole && (
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      {employee.currentRole}
                    </Badge>
                  )}
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
                <TableHead>Employee Name</TableHead>
                <TableHead>Employee ID</TableHead>
                <TableHead>Current Role</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.employeeId}</TableCell>
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

      <RoleAssignDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        employee={selectedEmployee}
        roles={mockRoles}
        onAssignRole={handleRoleAssigned}
      />
    </div>
  );
};

export default RoleMapping;
