
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Search, User, Check, X, Save } from "lucide-react";

const RoleMapping = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  
  // Mock data
  const employees = [
    { id: 1, name: "John Smith", employeeId: "EMP001", currentRole: "Labour" },
    { id: 2, name: "Sarah Johnson", employeeId: "EMP002", currentRole: "Supervisor" },
    { id: 3, name: "Robert Williams", employeeId: "EMP003", currentRole: "Labour" },
    { id: 4, name: "Emily Davis", employeeId: "EMP004", currentRole: "Labour" },
    { id: 5, name: "James Miller", employeeId: "EMP005", currentRole: "Report Admin" },
    { id: 6, name: "Jennifer Wilson", employeeId: "EMP006", currentRole: "Labour" },
    { id: 7, name: "Michael Brown", employeeId: "EMP007", currentRole: "Super Admin" },
    { id: 8, name: "David Thompson", employeeId: "EMP008", currentRole: "Labour" },
  ];
  
  const roles = [
    { id: 1, name: "Labour", permissions: ["Self Attendance"] },
    { id: 2, name: "Supervisor", permissions: ["Self Attendance", "Mark Attendance", "View Reports"] },
    { id: 3, name: "Super Admin", permissions: ["Self Attendance", "Mark Attendance", "View Reports", "Manage Employees", "Manage Roles", "Manage Projects", "Manage Locations", "Export Data", "System Settings"] },
    { id: 4, name: "Report Admin", permissions: ["Self Attendance", "View Reports", "Export Data"] },
  ];
  
  // All available permissions
  const allPermissions = [
    "Self Attendance",
    "Mark Attendance",
    "View Reports",
    "Manage Employees",
    "Manage Roles",
    "Manage Projects",
    "Manage Locations",
    "Export Data",
    "System Settings"
  ];
  
  // Filter employees based on search term
  const filteredEmployees = employees.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.currentRole.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee({
      ...employee,
      newRole: employee.currentRole,
      customPermissions: roles.find(r => r.name === employee.currentRole)?.permissions || []
    });
  };
  
  const handleRoleChange = (roleName) => {
    const rolePermissions = roles.find(r => r.name === roleName)?.permissions || [];
    setSelectedEmployee({
      ...selectedEmployee,
      newRole: roleName,
      customPermissions: [...rolePermissions]
    });
  };
  
  const togglePermission = (permission) => {
    const updatedPermissions = [...selectedEmployee.customPermissions];
    const index = updatedPermissions.indexOf(permission);
    
    if (index > -1) {
      updatedPermissions.splice(index, 1);
    } else {
      updatedPermissions.push(permission);
    }
    
    setSelectedEmployee({
      ...selectedEmployee,
      customPermissions: updatedPermissions
    });
  };
  
  const saveRoleMapping = () => {
    // In a real app, this would update the database
    alert(`Role updated for ${selectedEmployee.name} to ${selectedEmployee.newRole} with ${selectedEmployee.customPermissions.length} permissions`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Role Mapping</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="p-0 overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
                  placeholder="Search employees"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="overflow-y-auto max-h-[500px]">
              <ul className="divide-y divide-gray-200">
                {filteredEmployees.map(employee => (
                  <li 
                    key={employee.id}
                    className={`cursor-pointer hover:bg-gray-50 ${
                      selectedEmployee?.id === employee.id ? 'bg-gray-50' : ''
                    }`}
                    onClick={() => handleEmployeeSelect(employee)}
                  >
                    <div className="px-4 py-3">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{employee.name}</p>
                          <p className="text-sm text-gray-500">{employee.employeeId}</p>
                        </div>
                        <div>
                          <span 
                            className={`inline-flex items-center text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-800`}
                          >
                            {employee.currentRole}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
                
                {filteredEmployees.length === 0 && (
                  <li className="px-4 py-6 text-center text-gray-500">
                    No employees found matching the search criteria
                  </li>
                )}
              </ul>
            </div>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card className="p-6">
            {selectedEmployee ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{selectedEmployee.name}</h2>
                    <p className="text-gray-500">{selectedEmployee.employeeId}</p>
                  </div>
                  <span 
                    className={`inline-flex items-center text-sm font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-800`}
                  >
                    Current Role: {selectedEmployee.currentRole}
                  </span>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Assign Role
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {roles.map(role => (
                        <div
                          key={role.id}
                          onClick={() => handleRoleChange(role.name)}
                          className={`cursor-pointer p-3 rounded-md border text-center ${
                            selectedEmployee.newRole === role.name
                              ? 'border-proscape bg-proscape-lighter text-proscape'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <p className="font-medium">{role.name}</p>
                          <p className="text-xs text-gray-500 mt-1">{role.permissions.length} permissions</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Permissions
                      </label>
                      <span className="text-xs text-gray-500">
                        {selectedEmployee.customPermissions.length} of {allPermissions.length} selected
                      </span>
                    </div>
                    
                    <div className="border rounded-md p-4 space-y-3 max-h-[300px] overflow-y-auto">
                      {allPermissions.map((permission, index) => (
                        <div key={index} className="flex items-start">
                          <div 
                            onClick={() => togglePermission(permission)}
                            className={`h-5 w-5 flex-shrink-0 cursor-pointer rounded border ${
                              selectedEmployee.customPermissions.includes(permission)
                                ? 'bg-proscape border-proscape'
                                : 'border-gray-300'
                            }`}
                          >
                            {selectedEmployee.customPermissions.includes(permission) && (
                              <Check className="h-4 w-4 text-white" />
                            )}
                          </div>
                          <label className="ml-3 block text-sm">
                            <span className="text-gray-700 font-medium">{permission}</span>
                            <span className="text-gray-500 block text-xs">
                              {permission === "Self Attendance" && "Mark own attendance using face recognition"}
                              {permission === "Mark Attendance" && "Mark attendance for other employees"}
                              {permission === "View Reports" && "View attendance reports and statistics"}
                              {permission === "Manage Employees" && "Add, edit, and delete employee records"}
                              {permission === "Manage Roles" && "Create and modify user roles and permissions"}
                              {permission === "Manage Projects" && "Create and modify project information"}
                              {permission === "Manage Locations" && "Add and edit location data"}
                              {permission === "Export Data" && "Export reports and attendance data"}
                              {permission === "System Settings" && "Configure system-wide settings"}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setSelectedEmployee(null)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveRoleMapping}
                      className="flex items-center px-4 py-2 bg-proscape hover:bg-proscape-dark text-white rounded-md text-sm font-medium"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Role Mapping
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-10">
                <User className="h-12 w-12 mx-auto text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No Employee Selected</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Select an employee from the list to assign roles and permissions
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RoleMapping;
