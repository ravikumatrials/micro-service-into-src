
import { Routes, Route } from "react-router-dom";
import { Layout } from "../../components/layout/Layout";
import { PermissionGuard } from "../../components/auth/PermissionGuard";
import ManualAttendance from "./pages/ManualAttendance";
import BulkUpload from "./pages/BulkUpload";
import AttendanceHistory from "./pages/AttendanceHistory";

export function AttendanceRoutes() {
  return (
    <Routes>
      <Route path="/manual-attendance" element={
        <PermissionGuard requiredPermission="Manual Attendance">
          <Layout><ManualAttendance /></Layout>
        </PermissionGuard>
      } />
      <Route path="/bulk-attendance" element={
        <PermissionGuard requiredPermission="Manual Attendance">
          <Layout><BulkUpload /></Layout>
        </PermissionGuard>
      } />
      <Route path="/attendance-history" element={<Layout><AttendanceHistory /></Layout>} />
    </Routes>
  );
}
