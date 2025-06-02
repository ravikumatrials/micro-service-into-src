
import { Routes, Route } from "react-router-dom";
import { Layout } from "../../components/layout/Layout";
import { PermissionGuard } from "../../components/auth/PermissionGuard";
import ReportDashboard from "./pages/ReportDashboard";

export const ReportRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={
        <PermissionGuard requiredPermission="View Reports">
          <Layout><ReportDashboard /></Layout>
        </PermissionGuard>
      } />
    </Routes>
  );
};
