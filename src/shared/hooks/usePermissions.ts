
// Shared hook for permission management across microservices
import { PERMISSIONS } from "../utils/constants";

// Mock function to get current user permissions - in a real app, this would come from an auth context
const getUserPermissions = () => {
  // For testing, return Super Admin permissions
  return [
    PERMISSIONS.MANUAL_ATTENDANCE,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.MANAGE_EMPLOYEES,
    PERMISSIONS.MANAGE_PROJECTS,
    PERMISSIONS.MANAGE_ROLES,
    PERMISSIONS.ATTENDANCE_ROLE_LOGIC
  ];
};

export const usePermissions = () => {
  const userPermissions = getUserPermissions();
  
  const hasPermission = (permission: string) => {
    return userPermissions.includes(permission);
  };

  return {
    permissions: userPermissions,
    hasPermission
  };
};
