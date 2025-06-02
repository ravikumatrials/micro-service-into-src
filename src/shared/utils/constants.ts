
export const PERMISSIONS = {
  MANUAL_ATTENDANCE: 'Manual Attendance',
  VIEW_REPORTS: 'View Reports',
  MANAGE_EMPLOYEES: 'Manage Employees',
  MANAGE_ROLES: 'Manage Roles',
  MANAGE_PROJECTS: 'Manage Projects',
  ATTENDANCE_ROLE_LOGIC: 'Attendance Role Logic',
} as const;

export const ROUTES = {
  CORE: {
    LOGIN: '/login',
    DASHBOARD: '/dashboard',
    PROFILE: '/profile',
  },
  ATTENDANCE: {
    MANUAL: '/manual-attendance',
    BULK: '/bulk-attendance',
    HISTORY: '/attendance-history',
  },
  MASTER: {
    EMPLOYEES: '/master/employees',
    ROLES: '/master/roles',
    PROJECTS: '/master/projects',
    ATTENDANCE_TYPE: '/master/attendance-type',
    ROLE_LOGIC: '/master/role-attendance-logic',
  },
  REPORT: {
    DASHBOARD: '/reports',
  },
} as const;
