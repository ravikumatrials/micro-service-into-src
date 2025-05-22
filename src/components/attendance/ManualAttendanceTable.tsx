
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { getAttendanceReasonText, getAttendanceReasonBadgeColor } from "@/utils/attendanceUtils";

interface AttendanceRecord {
  id: number;
  employeeId: string;
  name: string;
  date: string;
  checkInTime?: string;
  checkOutTime?: string;
  project: string;
  location: string;
  attendanceStatus: string;
  shift: string;
  attendanceReason?: string;
}

interface ManualAttendanceTableProps {
  records: AttendanceRecord[];
}

const ManualAttendanceTable: React.FC<ManualAttendanceTableProps> = ({ records }) => {
  return (
    <div className="bg-white rounded-md shadow overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Employee ID</TableHead>
            <TableHead>Employee Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Check In</TableHead>
            <TableHead>Check Out</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Shift</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.length === 0 ? (
            <TableRow>
              <TableCell colSpan={11} className="text-center py-10 text-gray-500">
                No attendance records found. Try adjusting your filters.
              </TableCell>
            </TableRow>
          ) : (
            records.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{record.employeeId}</TableCell>
                <TableCell>{record.name}</TableCell>
                <TableCell>{record.date}</TableCell>
                <TableCell>{record.checkInTime || "-"}</TableCell>
                <TableCell>{record.checkOutTime || "-"}</TableCell>
                <TableCell>{record.project}</TableCell>
                <TableCell>{record.location}</TableCell>
                <TableCell>{record.attendanceStatus}</TableCell>
                <TableCell>{record.shift}</TableCell>
                <TableCell>
                  {record.attendanceReason ? (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAttendanceReasonBadgeColor(record.attendanceReason)}`}>
                      {getAttendanceReasonText(record.attendanceReason)}
                    </span>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManualAttendanceTable;
