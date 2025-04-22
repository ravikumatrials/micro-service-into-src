
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import AttendanceHistory from "./pages/AttendanceHistory";
import RoleMapping from "./pages/RoleMapping";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import Employees from "./pages/master/Employees";
import Roles from "./pages/master/Roles";
import Location from "./pages/master/Location";
import Projects from "./pages/master/Projects";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/attendance" element={<Layout><Attendance /></Layout>} />
          <Route path="/attendance-history" element={<Layout><AttendanceHistory /></Layout>} />
          <Route path="/role-mapping" element={<Layout><RoleMapping /></Layout>} />
          <Route path="/reports" element={<Layout><Reports /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
          <Route path="/master/employees" element={<Layout><Employees /></Layout>} />
          <Route path="/master/roles" element={<Layout><Roles /></Layout>} />
          <Route path="/master/location" element={<Layout><Location /></Layout>} />
          <Route path="/master/projects" element={<Layout><Projects /></Layout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
