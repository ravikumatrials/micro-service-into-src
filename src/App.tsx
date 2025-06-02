
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { PermissionGuard } from "./components/auth/PermissionGuard";

// Auth & Core Service Pages
import Login from "./services/auth/pages/Login";
import Dashboard from "./services/core/pages/Dashboard";
import Profile from "./pages/Profile";

// Attendance Service Pages
import ManualAttendance from "./services/attendance/pages/ManualAttendance";
import Attendance from "./pages/Attendance";
import AttendanceHistory from "./pages/AttendanceHistory";
import BulkAttendance from "./pages/BulkAttendance";

// Report Service Pages
import Reports from "./services/report/pages/Reports";

// Master Service Pages
import MasterDashboard from "./services/master/pages/MasterDashboard";
import Employees from "./pages/master/Employees";
import Roles from "./pages/master/Roles";
import Projects from "./pages/master/Projects";
import AttendanceType from "./pages/master/AttendanceType";
import RoleAttendanceLogic from "./pages/master/RoleAttendanceLogic";

import NotFound from "./pages/NotFound";

const App = () => {
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth Service Routes */}
            <Route path="/auth/login" element={<Login />} />
            
            {/* Core Service Routes */}
            <Route path="/" element={<Navigate to="/core/dashboard" />} />
            <Route path="/core/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/dashboard" element={<Navigate to="/core/dashboard" />} />
            <Route path="/login" element={<Navigate to="/auth/login" />} />
            <Route path="/profile" element={<Layout><Profile /></Layout>} />
            
            {/* Attendance Service Routes */}
            <Route path="/attendance/manual" element={
              <PermissionGuard requiredPermission="Manual Attendance">
                <Layout><ManualAttendance /></Layout>
              </PermissionGuard>
            } />
            <Route path="/attendance" element={
              <PermissionGuard requiredPermission="Manual Attendance">
                <Layout><Attendance /></Layout>
              </PermissionGuard>
            } />
            <Route path="/attendance/bulk" element={
              <PermissionGuard requiredPermission="Manual Attendance">
                <Layout><BulkAttendance /></Layout>
              </PermissionGuard>
            } />
            <Route path="/attendance/history" element={<Layout><AttendanceHistory /></Layout>} />
            
            {/* Legacy redirects for attendance */}
            <Route path="/manual-attendance" element={<Navigate to="/attendance/manual" />} />
            <Route path="/bulk-attendance" element={<Navigate to="/attendance/bulk" />} />
            <Route path="/attendance-history" element={<Navigate to="/attendance/history" />} />
            
            {/* Report Service Routes */}
            <Route path="/report/reports" element={
              <PermissionGuard requiredPermission="View Reports">
                <Layout><Reports /></Layout>
              </PermissionGuard>
            } />
            <Route path="/reports" element={<Navigate to="/report/reports" />} />
            
            {/* Master Service Routes */}
            <Route path="/master/dashboard" element={
              <PermissionGuard requiredPermission="Manage Employees">
                <Layout><MasterDashboard /></Layout>
              </PermissionGuard>
            } />
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
