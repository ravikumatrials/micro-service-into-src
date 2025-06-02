
import { Routes, Route } from "react-router-dom";
import { Layout } from "../../components/layout/Layout";
import { PermissionGuard } from "../../components/auth/PermissionGuard";
import EmployeeMaster from "./pages/EmployeeMaster";
import ProjectMaster from "./pages/ProjectMaster";
import RoleMaster from "./pages/RoleMaster";
import AttendanceTypeMaster from "./pages/AttendanceTypeMaster";
import RoleAttendanceLogic from "./pages/RoleAttendanceLogic";

export const MasterRoutes = () => {
  return (
    <Routes>
      <Route path="/employees" element={
        <PermissionGuard requiredPermission="Manage Employees">
          <Layout><EmployeeMaster /></Layout>
        </PermissionGuard>
      } />
      <Route path="/roles" element={
        <PermissionGuard requiredPermission="Manage Roles">
          <Layout><RoleMaster /></Layout>
        </PermissionGuard>
      } />
      <Route path="/projects" element={
        <PermissionGuard requiredPermission="Manage Projects">
          <Layout><ProjectMaster /></Layout>
        </PermissionGuard>
      } />
      <Route path="/attendance-type" element={
        <PermissionGuard requiredPermission="Manage Projects">
          <Layout><AttendanceTypeMaster /></Layout>
        </PermissionGuard>
      } />
      <Route path="/role-attendance-logic" element={
        <PermissionGuard requiredPermission="Attendance Role Logic">
          <Layout><RoleAttendanceLogic /></Layout>
        </PermissionGuard>
      } />
    </Routes>
  );
};
