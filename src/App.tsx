
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { PermissionGuard } from "./components/auth/PermissionGuard";

// Core microservice imports
import Login from "./Component_Dashabord/pages/Login";
import Dashboard from "./Component_Dashabord/pages/Dashboard";
import Profile from "./Component_Dashabord/pages/Profile";

// Attendance microservice imports
import ManualAttendanceRecords from "./Component_Folder/pages/ManualAttendance";
import BulkAttendance from "./Component_Folder/pages/BulkAttendance";
import AttendanceHistory from "./Component_Folder/pages/AttendanceHistory";

// Master microservice imports
import Employees from "./Component_master/pages/Employees";
import Roles from "./Component_master/pages/Roles";
import Projects from "./Component_master/pages/Projects";
import AttendanceType from "./Component_master/pages/AttendanceType";
import RoleAttendanceLogic from "./Component_master/pages/RoleAttendanceLogic";

// Reports microservice imports
import Reports from "./Component_report/pages/Reports";

import NotFound from "./pages/NotFound";

// Create a new QueryClient instance inside the component to ensure it's created when React is ready
const App = () => {
  // Initialize QueryClient inside the component
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            
            {/* Protected routes with permission guards */}
            <Route path="/manual-attendance" element={
              <PermissionGuard requiredPermission="Manual Attendance">
                <Layout><ManualAttendanceRecords /></Layout>
              </PermissionGuard>
            } />
            <Route path="/bulk-attendance" element={
              <PermissionGuard requiredPermission="Manual Attendance">
                <Layout><BulkAttendance /></Layout>
              </PermissionGuard>
            } />
            <Route path="/attendance-history" element={<Layout><AttendanceHistory /></Layout>} />
            <Route path="/reports" element={
              <PermissionGuard requiredPermission="View Reports">
                <Layout><Reports /></Layout>
              </PermissionGuard>
            } />
            <Route path="/profile" element={<Layout><Profile /></Layout>} />
            
            {/* Master routes with permission guards */}
            <Route path="/master/employees" element={
              <PermissionGuard requiredPermission="Manage Employees">
                <Layout><Employees /></Layout>
              </PermissionGuard>
            } />
            <Route path="/master/roles" element={
              <PermissionGuard requiredPermission="Manage Roles">
                <Layout><Roles /></Layout>
              </PermissionGuard>
            } />
            <Route path="/master/projects" element={
              <PermissionGuard requiredPermission="Manage Projects">
                <Layout><Projects /></Layout>
              </PermissionGuard>
            } />
            <Route path="/master/attendance-type" element={
              <PermissionGuard requiredPermission="Manage Projects">
                <Layout><AttendanceType /></Layout>
              </PermissionGuard>
            } />
            <Route path="/master/role-attendance-logic" element={
              <PermissionGuard requiredPermission="Attendance Role Logic">
                <Layout><RoleAttendanceLogic /></Layout>
              </PermissionGuard>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
