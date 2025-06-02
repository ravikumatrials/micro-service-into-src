
// Shared constants across microservices
export const PERMISSIONS = {
  MANUAL_ATTENDANCE: "Manual Attendance",
  VIEW_REPORTS: "View Reports",
  MANAGE_EMPLOYEES: "Manage Employees",
  MANAGE_PROJECTS: "Manage Projects", 
  MANAGE_ROLES: "Manage Roles",
  ATTENDANCE_ROLE_LOGIC: "Attendance Role Logic"
} as const;

export const ROUTES = {
  CORE: {
    LOGIN: "/core/login",
    DASHBOARD: "/core/dashboard", 
    PROFILE: "/core/profile"
  },
  ATTENDANCE: {
    MANUAL: "/attendance/manual-attendance",
    BULK: "/attendance/bulk-attendance",
    HISTORY: "/attendance/attendance-history"
  },
  MASTER: {
    EMPLOYEES: "/master/employees",
    PROJECTS: "/master/projects",
    ROLES: "/master/roles",
    ATTENDANCE_TYPE: "/master/attendance-type",
    ROLE_LOGIC: "/master/role-attendance-logic"
  },
  REPORT: {
    DASHBOARD: "/report/dashboard"
  }
} as const;
