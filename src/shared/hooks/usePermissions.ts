
import { useState, useEffect } from 'react';

export const usePermissions = () => {
  const [permissions, setPermissions] = useState<string[]>([]);

  useEffect(() => {
    // Mock function to get current user permissions
    // In a real app, this would come from an auth context or API
    const userPermissions = [
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
    ];
    
    setPermissions(userPermissions);
  }, []);

  const hasPermission = (permission: string) => {
    return permissions.includes(permission);
  };

  return { permissions, hasPermission };
};
