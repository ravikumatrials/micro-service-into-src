
import { useMemo } from 'react';

// Mock function to get current user permissions - in a real app, this would come from an auth context
export function usePermissions() {
  const permissions = useMemo(() => [
    "Manual Attendance", 
    "View Reports", 
    "Manage Employees", 
    "Manage Projects", 
    "Manage Locations", 
    "Export Reports", 
    "Face Enroll", 
    "Manage Roles", 
    "Role Mapping", 
    "Manage Users",
    "Attendance Role Logic"
  ], []);

  const hasPermission = (permission: string) => {
    return permissions.includes(permission);
  };

  return {
    permissions,
    hasPermission,
  };
}
