
// Define available roles
export const availableRoles = [
  { id: 1, name: "Labour", isSystemDefined: true },
  { id: 2, name: "Supervisor", isSystemDefined: false },
  { id: 3, name: "Super Admin", isSystemDefined: false },
  { id: 4, name: "Report Admin", isSystemDefined: false },
  { id: 5, name: "Staff", isSystemDefined: true }
];

// Define the roles that should be visible in Role Mapping view
export const roleMappingVisibleRoles = ["Staff", "Labour"];

// Check if a role should be visible in Role Mapping view
export const isRoleMappingVisibleRole = (role?: string): boolean => {
  return !role || roleMappingVisibleRoles.includes(role);
};

// Auto-assign a role based on classification
export const autoAssignRoleByClassification = (employee: {
  classification?: string;
  currentRole?: string;
}) => {
  // Only assign a role if one isn't already assigned
  if (!employee.currentRole) {
    // Logic for auto-assignment
    if (employee.classification === "Laborer") {
      return "Labour"; // Automatically assign Labour role
    } else if (employee.classification === "Staff") {
      return "Staff"; // Automatically assign Staff role
    }
    // For other classifications, do not auto-assign any role (return undefined)
  }
  return employee.currentRole; // Keep existing role if any
};

// Define the system roles which are special cases
export const systemDefinedRoles = ["Labour", "Staff"];

// Check if a role is a system-defined role
export const isSystemDefinedRole = (role?: string): boolean => {
  return role ? systemDefinedRoles.includes(role) : false;
};

// Log role changes for audit purposes
export const logRoleChange = (
  employeeId: string,
  oldRole: string | undefined,
  newRole: string | undefined,
  actionType: "assign" | "update" | "remove",
  performedBy: string = "System"
) => {
  const auditLog = {
    employeeId,
    oldRole,
    newRole,
    actionType,
    performedBy,
    timestamp: new Date().toISOString(),
  };
  
  // In a real app, this would send the audit log to a backend API
  console.log("Role change audit log:", auditLog);
  
  return auditLog;
};

// Function to handle role updates in Employees and Users screens
export const updateEmployeeRole = (
  employees: any[],
  employeeId: string, 
  newRole: string | null,
  performedBy: string = "Admin User"
) => {
  let updated = false;
  
  // Find and update the employee in the employees array
  employees.forEach(emp => {
    if (emp.employeeId === employeeId) {
      const oldRole = emp.currentRole || emp.role;
      
      // Update the role property (for Users menu)
      if (emp.role !== undefined) {
        emp.role = newRole;
      }
      
      // Update the currentRole property (for Employees menu)
      if (emp.currentRole !== undefined) {
        emp.currentRole = newRole;
      }
      
      // Log the role change for auditing
      if (newRole === null) {
        logRoleChange(employeeId, oldRole, undefined, "remove", performedBy);
      } else if (oldRole) {
        logRoleChange(employeeId, oldRole, newRole, "update", performedBy);
      } else {
        logRoleChange(employeeId, undefined, newRole, "assign", performedBy);
      }
      
      updated = true;
    }
  });
  
  return updated;
};

// Function to check if a role is valid based on permissions
export const isValidRole = (roleName: string, permissions: string[]) => {
  // System-defined roles like Labour and Staff are exempt from permission validation
  if (systemDefinedRoles.includes(roleName)) {
    return true;
  }
  
  // All other roles must have at least one permission
  return permissions.length > 0;
};

// Function to find if an employee already exists in a given array
export const findEmployeeById = (employees: any[], employeeId: string) => {
  return employees.find(emp => 
    emp.employeeId === employeeId || 
    emp.employeeId === employeeId
  );
};

// Generate a shared employee object that works in both Employees and Users screens
export const createSharedEmployeeObject = (employee: any) => {
  return {
    id: employee.id || Math.floor(Math.random() * 10000), // Generate ID if not exists
    employeeId: employee.employeeId,
    name: employee.name,
    entity: employee.entity,
    category: employee.category,
    classification: employee.classification,
    status: employee.status || "Active",
    role: employee.role || employee.currentRole, // Handle both naming conventions
    currentRole: employee.role || employee.currentRole, // Handle both naming conventions
    email: employee.email,
    hasAccount: employee.hasAccount !== undefined ? employee.hasAccount : false,
    loginMethod: employee.loginMethod || null
  };
};

// Check if a role makes an employee a system user (should appear in Users submenu)
export const isSystemUserRole = (role?: string): boolean => {
  if (!role) return false;
  return !roleMappingVisibleRoles.includes(role);
};

// Move employee between Employees and Users lists based on role changes
export const handleEmployeeRoleTransition = (
  employee: any,
  newRole: string | null,
  employeesList: any[],
  usersList: any[]
): { updatedEmployees: any[], updatedUsers: any[] } => {
  const updatedEmployees = [...employeesList];
  const updatedUsers = [...usersList];
  
  // If role is removed or set to Staff/Labour, employee should be in Employees list
  if (newRole === null || roleMappingVisibleRoles.includes(newRole)) {
    // Remove from Users list if present
    const userIndex = updatedUsers.findIndex(u => u.employeeId === employee.employeeId);
    if (userIndex !== -1) {
      updatedUsers.splice(userIndex, 1);
    }
    
    // Add to Employees list if not already there
    const employeeIndex = updatedEmployees.findIndex(e => e.employeeId === employee.employeeId);
    if (employeeIndex === -1) {
      // Create employee object with consistent properties
      const employeeObj = {
        ...employee,
        currentRole: newRole,
        role: newRole
      };
      updatedEmployees.push(employeeObj);
    } else {
      // Update existing employee
      updatedEmployees[employeeIndex].currentRole = newRole;
      updatedEmployees[employeeIndex].role = newRole;
    }
  } 
  // If role is set to a system user role (not Staff/Labour), employee should be in Users list
  else {
    // Remove from Employees list
    const employeeIndex = updatedEmployees.findIndex(e => e.employeeId === employee.employeeId);
    if (employeeIndex !== -1) {
      updatedEmployees.splice(employeeIndex, 1);
    }
    
    // Add to or update in Users list
    const userIndex = updatedUsers.findIndex(u => u.employeeId === employee.employeeId);
    if (userIndex === -1) {
      // Create new user object
      const userObj = {
        ...employee,
        role: newRole,
        currentRole: newRole,
        status: "Active"
      };
      updatedUsers.push(userObj);
    } else {
      // Update existing user
      updatedUsers[userIndex].role = newRole;
      updatedUsers[userIndex].currentRole = newRole;
    }
  }
  
  return { updatedEmployees, updatedUsers };
};
