
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
  reason?: string; // Added reason field
}

interface ManualAttendanceTableProps {
  records: AttendanceRecord[];
}

const ManualAttendanceTable: React.FC<ManualAttendanceTableProps> = ({
  records
}) => {
  return (
    <div className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee ID</TableHead>
            <TableHead>Employee Name</TableHead>
            <TableHead>Classification</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Check-In (Project)</TableHead>
            <TableHead>Check-Out (Project)</TableHead>
            <TableHead>Reason</TableHead>
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
                  <div>
                    <div>{record.checkInTime}</div>
                    <div className="text-xs text-gray-500">{record.checkInProject}</div>
                  </div>
                </TableCell>
                <TableCell>
                  {record.checkOutTime ? (
                    <div>
                      <div>{record.checkOutTime}</div>
                      <div className="text-xs text-gray-500">{record.checkOutProject || "Same as check-in"}</div>
                    </div>
                  ) : (
                    <span className="text-gray-500">Not checked out</span>
                  )}
                </TableCell>
                <TableCell>
                  {record.reason ? (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      record.reason === "Sick" || record.reason === "Casual" 
                        ? "bg-red-100 text-red-800" 
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      {record.reason}
                    </span>
                  ) : (
                    <span className="text-gray-500">-</span>
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
    entity: "Entity 2",
    reason: "Medical" // Example of tagged attendance with reason
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
    entity: "Entity 3",
    reason: "Sick" // Example of tagged attendance with reason
  },
  {
    id: "5", 
    employeeId: "10005",
    employeeName: "Khalid Ahmed",
    category: "Electrician",
    classification: "Staff",
    status: "Active",
    checkInTime: "",
    checkInProject: "",
    checkOutTime: null,
    checkOutProject: null,
    role: "Junior Technician",
    location: "Site B",
    entity: "Entity 2",
    reason: "Visa" // Tagged as present with reason
  },
  {
    id: "6", 
    employeeId: "10006",
    employeeName: "Aisha Mohammed",
    category: "Painter",
    classification: "Laborer",
    status: "Active",
    checkInTime: "",
    checkInProject: "",
    checkOutTime: null,
    checkOutProject: null,
    role: "Team Lead",
    location: "Site A",
    entity: "Entity 1",
    reason: "Casual" // Tagged as absent with reason
  }
];

export default ManualAttendanceTable;
