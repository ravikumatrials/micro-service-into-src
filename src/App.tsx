
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Microservice Routes
import { CoreRoutes } from "./modules/core/routes";
import { AttendanceRoutes } from "./modules/attendance/routes";
import { MasterRoutes } from "./modules/master/routes";
import { ReportRoutes } from "./modules/report/routes";

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
            
            {/* Core Module Routes */}
            <Route path="/*" element={<CoreRoutes />} />
            
            {/* Attendance Module Routes */}
            <Route path="/attendance/*" element={<AttendanceRoutes />} />
            
            {/* Master Module Routes */}
            <Route path="/master/*" element={<MasterRoutes />} />
            
            {/* Report Module Routes */}
            <Route path="/report/*" element={<ReportRoutes />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
