
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data type for attendance records
interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  category: string;
  checkInTime: string;
  checkInProject: string;
  checkOutTime: string | null;
  checkOutProject: string | null;
  role: string;
}

interface ManualAttendanceTableProps {
  records: AttendanceRecord[];
}

const ManualAttendanceTable: React.FC<ManualAttendanceTableProps> = ({
  records
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 hover:bg-gray-50">
            <TableHead className="font-semibold">Employee</TableHead>
            <TableHead className="font-semibold">Category</TableHead>
            <TableHead className="font-semibold">Check-In (Project)</TableHead>
            <TableHead className="font-semibold">Check-Out (Project)</TableHead>
            <TableHead className="font-semibold">Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.length > 0 ? (
            records.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">
                  <div>
                    <div className="font-medium">{record.employeeName}</div>
                    <div className="text-xs text-gray-500">ID: {record.employeeId}</div>
                  </div>
                </TableCell>
                <TableCell>{record.category}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{record.checkInTime}</div>
                    <div className="text-xs text-gray-500">{record.checkInProject}</div>
                  </div>
                </TableCell>
                <TableCell>
                  {record.checkOutTime ? (
                    <div>
                      <div className="font-medium">{record.checkOutTime}</div>
                      <div className="text-xs text-gray-500">{record.checkOutProject || "Same as check-in"}</div>
                    </div>
                  ) : (
                    <span className="text-gray-500">Not checked out</span>
                  )}
                </TableCell>
                <TableCell>{record.role}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                No attendance records found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

// Mock data for demonstration
export const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: "1",
    employeeId: "10001",
    employeeName: "Ahmed Mohammed",
    category: "Carpenter",
    checkInTime: "08:15 AM (Apr 29, 2025)",
    checkInProject: "Main Building Construction",
    checkOutTime: "05:30 PM (Apr 29, 2025)",
    checkOutProject: "Main Building Construction",
    role: "Supervisor"
  },
  {
    id: "2",
    employeeId: "10002",
    employeeName: "Fatima Ali",
    category: "Mason",
    checkInTime: "08:00 AM (Apr 29, 2025)",
    checkInProject: "Bridge Expansion",
    checkOutTime: "04:45 PM (Apr 29, 2025)",
    checkOutProject: "Bridge Expansion",
    role: "Laborer"
  },
  {
    id: "3",
    employeeId: "10003",
    employeeName: "Mohammed Khalid",
    category: "Plumber",
    checkInTime: "07:50 AM (Apr 29, 2025)",
    checkInProject: "Warehouse Project",
    checkOutTime: null,
    checkOutProject: null,
    role: "Specialist"
  },
  {
    id: "4",
    employeeId: "10004",
    employeeName: "Sara Ibrahim",
    category: "Electrician",
    checkInTime: "09:15 AM (Apr 29, 2025)",
    checkInProject: "Hospital Wing",
    checkOutTime: "06:00 PM (Apr 29, 2025)",
    checkOutProject: "Hospital Wing",
    role: "Senior Technician"
  }
];

export default ManualAttendanceTable;
