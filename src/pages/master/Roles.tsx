
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Plus, Search, Edit, Trash, X } from "lucide-react";

// Mock data
const initialRoles = [
  { 
    id: 1, 
    code: "LAB", 
    name: "Labour", 
    description: "Regular construction worker with basic permissions", 
    permissions: ["Self Attendance"], 
    createdAt: "01/01/2023"
  },
  { 
    id: 2, 
    code: "SUP", 
    name: "Supervisor", 
    description: "Manages workers and can mark their attendance", 
    permissions: ["Self Attendance", "Mark Attendance", "View Reports"], 
    createdAt: "01/01/2023"
  },
  { 
    id: 3, 
    code: "SADM", 
    name: "Super Admin", 
    description: "Has full access to all system functionalities", 
    permissions: ["Self Attendance", "Mark Attendance", "View Reports", "Manage Employees", "Manage Roles", "Manage Projects", "Manage Locations", "Export Data", "System Settings"], 
    createdAt: "01/01/2023"
  },
  { 
    id: 4, 
    code: "RADM", 
    name: "Report Admin", 
    description: "Can view and export all reports", 
    permissions: ["Self Attendance", "View Reports", "Export Data"], 
    createdAt: "01/01/2023"
  },
];

// List of all possible permissions
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

const Roles = () => {
  const [roles, setRoles] = useState(initialRoles);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [newRole, setNewRole] = useState({
    code: "",
    name: "",
    description: "",
    permissions: []
  });

  // Filter roles based on search term
  const filteredRoles = roles.filter((role) => 
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePermissionChange = (permission) => {
    if (isEditModalOpen) {
      // For editing
      const updatedRole = {...selectedRole};
      if (updatedRole.permissions.includes(permission)) {
        updatedRole.permissions = updatedRole.permissions.filter(p => p !== permission);
      } else {
        updatedRole.permissions = [...updatedRole.permissions, permission];
      }
      setSelectedRole(updatedRole);
    } else {
      // For creating
      const updatedNewRole = {...newRole};
      if (updatedNewRole.permissions.includes(permission)) {
        updatedNewRole.permissions = updatedNewRole.permissions.filter(p => p !== permission);
      } else {
        updatedNewRole.permissions = [...updatedNewRole.permissions, permission];
      }
      setNewRole(updatedNewRole);
    }
  };

  const handleCreateRole = () => {
    // Generate a new ID that's one higher than the current max ID
    const maxId = Math.max(...roles.map(r => r.id));
    const newId = maxId + 1;
    
    const roleToAdd = {
      id: newId,
      code: newRole.code,
      name: newRole.name,
      description: newRole.description,
      permissions: newRole.permissions,
      createdAt: new Date().toLocaleDateString("en-US")
    };
    
    setRoles([...roles, roleToAdd]);
    setIsCreateModalOpen(false);
    
    // Reset form
    setNewRole({
      code: "",
      name: "",
      description: "",
      permissions: []
    });
  };

  const handleEditRole = (role) => {
    setSelectedRole({...role});
    setIsEditModalOpen(true);
  };

  const saveEditedRole = () => {
    const updatedRoles = roles.map(role => 
      role.id === selectedRole.id ? selectedRole : role
    );
    
    setRoles(updatedRoles);
    setIsEditModalOpen(false);
    setSelectedRole(null);
  };

  const deleteRole = (roleId) => {
    if (window.confirm("Are you sure you want to delete this role? This action cannot be undone.")) {
      const updatedRoles = roles.filter(role => role.id !== roleId);
      setRoles(updatedRoles);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Roles Management</h1>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center bg-proscape hover:bg-proscape-dark text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Role
        </button>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
              placeholder="Search by role name or code"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3">Role Code</th>
                <th scope="col" className="px-4 py-3">Role Name</th>
                <th scope="col" className="px-4 py-3">Description</th>
                <th scope="col" className="px-4 py-3">Permissions</th>
                <th scope="col" className="px-4 py-3">Created Date</th>
                <th scope="col" className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoles.length > 0 ? (
                filteredRoles.map(role => (
                  <tr key={role.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{role.code}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{role.name}</td>
                    <td className="px-4 py-3">{role.description}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.slice(0, 2).map((permission, index) => (
                          <span 
                            key={index} 
                            className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                          >
                            {permission}
                          </span>
                        ))}
                        {role.permissions.length > 2 && (
                          <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                            +{role.permissions.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">{role.createdAt}</td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEditRole(role)}
                          className="text-blue-500 hover:text-blue-700"
                          title="Edit Role"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => deleteRole(role.id)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete Role"
                          disabled={role.code === "SADM"} // Prevent deleting Super Admin
                        >
                          <Trash className={`h-4 w-4 ${role.code === "SADM" ? "opacity-50 cursor-not-allowed" : ""}`} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                    No roles found matching the search criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create Role Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Add New Role</h2>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role Code *
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
                    placeholder="Enter role code (e.g., ADMIN)"
                    value={newRole.code}
                    onChange={(e) => setNewRole({...newRole, code: e.target.value.toUpperCase()})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role Name *
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
                    placeholder="Enter role name"
                    value={newRole.name}
                    onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
                  placeholder="Enter role description"
                  rows={3}
                  value={newRole.description}
                  onChange={(e) => setNewRole({...newRole, description: e.target.value})}
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Permissions
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {allPermissions.map((permission, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`permission-${index}`}
                        className="h-4 w-4 text-proscape focus:ring-proscape border-gray-300 rounded"
                        checked={newRole.permissions.includes(permission)}
                        onChange={() => handlePermissionChange(permission)}
                      />
                      <label htmlFor={`permission-${index}`} className="ml-2 block text-sm text-gray-900">
                        {permission}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateRole}
                className="px-4 py-2 bg-proscape hover:bg-proscape-dark text-white rounded-md text-sm font-medium transition-colors"
                disabled={!newRole.code || !newRole.name}
              >
                Create Role
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Role Modal */}
      {isEditModalOpen && selectedRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Edit Role</h2>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role Code *
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape bg-gray-100"
                    value={selectedRole.code}
                    readOnly
                  />
                  <p className="mt-1 text-xs text-gray-500">Role code cannot be changed</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role Name *
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
                    value={selectedRole.name}
                    onChange={(e) => setSelectedRole({...selectedRole, name: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
                  rows={3}
                  value={selectedRole.description}
                  onChange={(e) => setSelectedRole({...selectedRole, description: e.target.value})}
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Permissions
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {allPermissions.map((permission, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`edit-permission-${index}`}
                        className="h-4 w-4 text-proscape focus:ring-proscape border-gray-300 rounded"
                        checked={selectedRole.permissions.includes(permission)}
                        onChange={() => handlePermissionChange(permission)}
                        disabled={selectedRole.code === "SADM" && permission === "System Settings"} // Prevent removing system settings from Super Admin
                      />
                      <label htmlFor={`edit-permission-${index}`} className="ml-2 block text-sm text-gray-900">
                        {permission}
                      </label>
                    </div>
                  ))}
                </div>
                {selectedRole.code === "SADM" && (
                  <p className="mt-2 text-xs text-amber-500">
                    Note: Some permissions cannot be removed from the Super Admin role
                  </p>
                )}
              </div>
            </div>
            
            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={saveEditedRole}
                className="px-4 py-2 bg-proscape hover:bg-proscape-dark text-white rounded-md text-sm font-medium transition-colors"
                disabled={!selectedRole.name}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roles;
