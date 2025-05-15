
// Define available roles
export const availableRoles = [
  { id: 1, name: "Labour", isSystemDefined: true },
  { id: 2, name: "Supervisor", isSystemDefined: false },
  { id: 3, name: "Super Admin", isSystemDefined: false },
  { id: 4, name: "Report Admin", isSystemDefined: false }
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
    }
    // For Staff classification, do not auto-assign any role (return undefined)
  }
  return employee.currentRole; // Keep existing role if any
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

// Function to handle role updates in both Role Mapping and Users screens
export const updateEmployeeRole = (
  employees: any[],
  employeeId: string, 
  newRole: string,
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
      
      // Update the currentRole property (for Role Mapping menu)
      if (emp.currentRole !== undefined) {
        emp.currentRole = newRole;
      }
      
      // Log the role change for auditing
      logRoleChange(employeeId, oldRole, newRole, oldRole ? "update" : "assign", performedBy);
      
      updated = true;
    }
  });
  
  return updated;
};

// Function to check if a role is valid based on permissions
export const isValidRole = (roleName: string, permissions: string[]) => {
  // Labour role is exempt from permission validation
  if (roleName === "Labour") {
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

// Generate a shared employee object that works in both Role Mapping and Users screens
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
