
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Layout } from "./components/layout/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import AttendanceHistory from "./pages/AttendanceHistory";
import BulkAttendance from "./pages/BulkAttendance";
import RoleMapping from "./pages/RoleMapping";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import Employees from "./pages/master/Employees";
import Roles from "./pages/master/Roles";
import Projects from "./pages/master/Projects";
import Users from "./pages/master/Users";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/attendance" element={<Layout><Attendance /></Layout>} />
            <Route path="/bulk-attendance" element={<Layout><BulkAttendance /></Layout>} />
            <Route path="/attendance-history" element={<Layout><AttendanceHistory /></Layout>} />
            <Route path="/role-mapping" element={<Layout><RoleMapping /></Layout>} />
            <Route path="/reports" element={<Layout><Reports /></Layout>} />
            <Route path="/profile" element={<Layout><Profile /></Layout>} />
            <Route path="/master/employees" element={<Layout><Employees /></Layout>} />
            <Route path="/master/roles" element={<Layout><Roles /></Layout>} />
            <Route path="/master/projects" element={<Layout><Projects /></Layout>} />
            <Route path="/master/users" element={<Layout><Users /></Layout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
