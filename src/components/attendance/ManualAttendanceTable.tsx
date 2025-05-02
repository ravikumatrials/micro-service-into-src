
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Mock data type for attendance records
export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  category: string;
  classification: string;
  status: "Active" | "Inactive";
  checkInTime: string;
  checkInProject: string;
  checkOutTime: string | null;
  checkOutProject: string | null;
  role: string;
  location: string;
  entity: string;
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
            <TableHead className="font-semibold">Employee ID</TableHead>
            <TableHead className="font-semibold">Employee Name</TableHead>
            <TableHead className="font-semibold">Classification</TableHead>
            <TableHead className="font-semibold">Category</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Check-In (Project)</TableHead>
            <TableHead className="font-semibold">Check-Out (Project)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.length > 0 ? (
            records.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{record.employeeId}</TableCell>
                <TableCell>{record.employeeName}</TableCell>
                <TableCell>{record.classification}</TableCell>
                <TableCell>{record.category}</TableCell>
                <TableCell>
                  <Badge 
                    variant={record.status === "Active" ? "default" : "destructive"}
                    className={record.status === "Active" ? "bg-green-100 text-green-800 hover:bg-green-200" : ""}
                  >
                    {record.status}
                  </Badge>
                </TableCell>
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
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-gray-500">
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
    classification: "Laborer",
    status: "Active",
    checkInTime: "08:15 AM (Apr 29, 2025)",
    checkInProject: "Main Building Construction",
    checkOutTime: "05:30 PM (Apr 29, 2025)",
    checkOutProject: "Main Building Construction",
    role: "Supervisor",
    location: "Site A",
    entity: "Entity 1"
  },
  {
    id: "2",
    employeeId: "10002",
    employeeName: "Fatima Ali",
    category: "Mason",
    classification: "Staff",
    status: "Active",
    checkInTime: "08:00 AM (Apr 29, 2025)",
    checkInProject: "Bridge Expansion",
    checkOutTime: "04:45 PM (Apr 29, 2025)",
    checkOutProject: "Bridge Expansion",
    role: "Laborer",
    location: "Site B",
    entity: "Entity 2"
  },
  {
    id: "3",
    employeeId: "10003",
    employeeName: "Mohammed Khalid",
    category: "Plumber",
    classification: "Laborer",
    status: "Inactive",
    checkInTime: "07:50 AM (Apr 29, 2025)",
    checkInProject: "Warehouse Project",
    checkOutTime: null,
    checkOutProject: null,
    role: "Specialist",
    location: "Site C",
    entity: "Entity 1"
  },
  {
    id: "4",
    employeeId: "10004",
    employeeName: "Sara Ibrahim",
    category: "Electrician",
    classification: "Staff",
    status: "Active",
    checkInTime: "09:15 AM (Apr 29, 2025)",
    checkInProject: "Hospital Wing",
    checkOutTime: "06:00 PM (Apr 29, 2025)",
    checkOutProject: "Hospital Wing",
    role: "Senior Technician",
    location: "Site A",
    entity: "Entity 3"
  }
];

export default ManualAttendanceTable;
