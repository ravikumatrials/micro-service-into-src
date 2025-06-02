
// Shared hook for permission management across microservices
import { PERMISSIONS } from "../utils/constants";

// Define the permission type based on the PERMISSIONS values
type PermissionType = typeof PERMISSIONS[keyof typeof PERMISSIONS];

// Mock function to get current user permissions - in a real app, this would come from an auth context
const getUserPermissions = (): PermissionType[] => {
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
  
  const hasPermission = (permission: PermissionType) => {
    return userPermissions.includes(permission);
  };

  return {
    permissions: userPermissions,
    hasPermission
  };
};
