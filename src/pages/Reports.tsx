
import { useState } from "react";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";
import { ReportFilters } from "@/components/reports/ReportFilters";

const Reports = () => {
  // Filter states
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [projectFilter, setProjectFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [attendanceTypeFilter, setAttendanceTypeFilter] = useState("all");
  const [entryMethodFilter, setEntryMethodFilter] = useState("all");

  // Mock report data
  const reportData = [
    {
      id: 1,
      employeeName: "John Smith",
      employeeId: "EMP001",
      role: "Engineer",
      project: "Main Building Construction",
      location: "Site A",
      date: "2025-04-22",
      checkIn: "08:30 AM",
      checkOut: "05:15 PM",
      totalHours: "8h 45m",
      attendanceType: "Full Day",
      entryMethod: "Face",
      manualReason: "",
      exceptions: "",
      approvalStatus: "Approved",
    },
    {
      id: 2,
      employeeName: "Sarah Johnson",
      employeeId: "EMP002",
      role: "Supervisor",
      project: "Bridge Expansion",
      location: "Site B",
      date: "2025-04-22",
      checkIn: "09:15 AM",
      checkOut: "05:30 PM",
      totalHours: "8h 15m",
      attendanceType: "Full Day",
      entryMethod: "Manual",
      manualReason: "Face recognition system offline",
      exceptions: "Late arrival",
      approvalStatus: "Pending",
    }
  ];

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your report will be downloaded shortly.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
        <Button
          onClick={handleExport}
          className="bg-proscape hover:bg-proscape-dark"
        >
          <FileText className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <Card className="p-6 space-y-6">
        <ReportFilters
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          projectFilter={projectFilter}
          setProjectFilter={setProjectFilter}
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          attendanceTypeFilter={attendanceTypeFilter}
          setAttendanceTypeFilter={setAttendanceTypeFilter}
          entryMethodFilter={entryMethodFilter}
          setEntryMethodFilter={setEntryMethodFilter}
        />

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
              <tr>
                <th scope="col" className="px-4 py-3">Employee Name</th>
                <th scope="col" className="px-4 py-3">Employee ID</th>
                <th scope="col" className="px-4 py-3">Role</th>
                <th scope="col" className="px-4 py-3">Project</th>
                <th scope="col" className="px-4 py-3">Location</th>
                <th scope="col" className="px-4 py-3">Date</th>
                <th scope="col" className="px-4 py-3">Check In</th>
                <th scope="col" className="px-4 py-3">Check Out</th>
                <th scope="col" className="px-4 py-3">Total Hours</th>
                <th scope="col" className="px-4 py-3">Type</th>
                <th scope="col" className="px-4 py-3">Entry Method</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((row) => (
                <tr
                  key={row.id}
                  className={`border-b ${
                    row.exceptions ? "bg-red-50" : "hover:bg-gray-50"
                  }`}
                >
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {row.employeeName}
                  </td>
                  <td className="px-4 py-3">{row.employeeId}</td>
                  <td className="px-4 py-3">{row.role}</td>
                  <td className="px-4 py-3">{row.project}</td>
                  <td className="px-4 py-3">{row.location}</td>
                  <td className="px-4 py-3">{row.date}</td>
                  <td className="px-4 py-3">{row.checkIn}</td>
                  <td className="px-4 py-3">{row.checkOut}</td>
                  <td className="px-4 py-3">{row.totalHours}</td>
                  <td className="px-4 py-3">{row.attendanceType}</td>
                  <td className="px-4 py-3">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="text-left w-full">
                          {row.entryMethod}
                        </TooltipTrigger>
                        {row.manualReason && (
                          <TooltipContent>
                            <p>Reason: {row.manualReason}</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Reports;
