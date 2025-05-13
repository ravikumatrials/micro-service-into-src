
// Define available roles
export const availableRoles = [
  { id: 1, name: "Labour" },
  { id: 2, name: "Supervisor" },
  { id: 3, name: "Super Admin" },
  { id: 4, name: "Report Admin" }
];

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
