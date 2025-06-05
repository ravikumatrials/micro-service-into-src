
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { Layout } from "./components/layout/Layout";
import { AuthProvider } from "./contexts/AuthContext";

// Master service pages
import Projects from "./pages/Projects";
import Employees from "./pages/Employees";
import Roles from "./pages/Roles";
import AttendanceType from "./pages/AttendanceType";
import RoleAttendanceLogic from "./pages/RoleAttendanceLogic";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/projects" element={<Layout><Projects /></Layout>} />
            <Route path="/employees" element={<Layout><Employees /></Layout>} />
            <Route path="/roles" element={<Layout><Roles /></Layout>} />
            <Route path="/attendance-type" element={<Layout><AttendanceType /></Layout>} />
            <Route path="/role-attendance-logic" element={<Layout><RoleAttendanceLogic /></Layout>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
