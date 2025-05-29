
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { PermissionGuard } from "./components/auth/PermissionGuard";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import AttendanceHistory from "./pages/AttendanceHistory";
import BulkAttendance from "./pages/BulkAttendance";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import Employees from "./pages/master/Employees";
import Roles from "./pages/master/Roles";
import Projects from "./pages/master/Projects";
import NotFound from "./pages/NotFound";
import ManualAttendanceRecords from "./pages/ManualAttendanceRecords";
import RoleAttendanceLogic from "./pages/master/RoleAttendanceLogic";

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
            <Route path="/attendance" element={
              <PermissionGuard requiredPermission="Manual Attendance">
                <Layout><Attendance /></Layout>
              </PermissionGuard>
            } />
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
