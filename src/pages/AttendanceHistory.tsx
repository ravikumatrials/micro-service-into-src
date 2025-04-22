
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Calendar, Camera, Clock, Download, Filter, Search, User } from "lucide-react";

const AttendanceHistory = () => {
  const [dateFilter, setDateFilter] = useState("");
  const [employeeFilter, setEmployeeFilter] = useState("");
  const [projectFilter, setProjectFilter] = useState("");
  const [methodFilter, setMethodFilter] = useState("all");
  
  // Mock attendance data
  const attendanceRecords = [
    { 
      id: 1, 
      employee: "John Smith", 
      employeeId: "EMP001", 
      date: "22 Apr 2025", 
      checkInTime: "08:30 AM", 
      checkInMethod: "Face", 
      checkOutTime: "05:15 PM", 
      checkOutMethod: "Face", 
      project: "Main Building Construction",
      totalHours: "8h 45m",
      comment: ""
    },
    { 
      id: 2, 
      employee: "Sarah Johnson", 
      employeeId: "EMP002", 
      date: "22 Apr 2025", 
      checkInTime: "08:45 AM", 
      checkInMethod: "Face", 
      checkOutTime: "05:30 PM", 
      checkOutMethod: "Manual", 
      project: "Bridge Expansion Project",
      totalHours: "8h 45m",
      comment: "Employee forgot to check out. Manual checkout by supervisor."
    },
    { 
      id: 3, 
      employee: "Robert Williams", 
      employeeId: "EMP003", 
      date: "22 Apr 2025", 
      checkInTime: "09:15 AM", 
      checkInMethod: "Manual", 
      checkOutTime: "05:45 PM", 
      checkOutMethod: "Face", 
      project: "Highway Renovation",
      totalHours: "8h 30m",
      comment: "Late arrival due to transportation issue."
    },
    { 
      id: 4, 
      employee: "Emily Davis", 
      employeeId: "EMP004", 
      date: "22 Apr 2025", 
      checkInTime: "08:15 AM", 
      checkInMethod: "Face", 
      checkOutTime: "04:30 PM", 
      checkOutMethod: "Face", 
      project: "Main Building Construction",
      totalHours: "8h 15m",
      comment: ""
    },
    { 
      id: 5, 
      employee: "James Miller", 
      employeeId: "EMP005", 
      date: "22 Apr 2025", 
      checkInTime: "08:30 AM", 
      checkInMethod: "Face", 
      checkOutTime: "05:00 PM", 
      checkOutMethod: "Face", 
      project: "Highway Renovation",
      totalHours: "8h 30m",
      comment: ""
    },
    { 
      id: 6, 
      employee: "Jennifer Wilson", 
      employeeId: "EMP006", 
      date: "21 Apr 2025", 
      checkInTime: "08:30 AM", 
      checkInMethod: "Face", 
      checkOutTime: "05:15 PM", 
      checkOutMethod: "Face", 
      project: "Bridge Expansion Project",
      totalHours: "8h 45m",
      comment: ""
    },
    { 
      id: 7, 
      employee: "Michael Brown", 
      employeeId: "EMP007", 
      date: "21 Apr 2025", 
      checkInTime: "08:45 AM", 
      checkInMethod: "Face", 
      checkOutTime: "05:30 PM", 
      checkOutMethod: "Manual", 
      project: "Main Building Construction",
      totalHours: "8h 45m",
      comment: "Employee forgot to check out. Manual checkout by supervisor."
    },
    { 
      id: 8, 
      employee: "David Thompson", 
      employeeId: "EMP008", 
      date: "21 Apr 2025", 
      checkInTime: "08:15 AM", 
      checkInMethod: "Face", 
      checkOutTime: "05:00 PM", 
      checkOutMethod: "Face", 
      project: "Highway Renovation",
      totalHours: "8h 45m",
      comment: ""
    },
  ];

  // Filter records based on filters
  const filteredRecords = attendanceRecords.filter(record => {
    const dateMatch = dateFilter ? record.date.includes(dateFilter) : true;
    const employeeMatch = employeeFilter ? 
      record.employee.toLowerCase().includes(employeeFilter.toLowerCase()) || 
      record.employeeId.toLowerCase().includes(employeeFilter.toLowerCase()) 
      : true;
    const projectMatch = projectFilter ? record.project === projectFilter : true;
    const methodMatch = methodFilter === "all" ? true : 
      methodFilter === "face" ? 
        (record.checkInMethod === "Face" && record.checkOutMethod === "Face") : 
        (record.checkInMethod === "Manual" || record.checkOutMethod === "Manual");
    
    return dateMatch && employeeMatch && projectMatch && methodMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Attendance History</h1>
        <button className="flex items-center bg-proscape hover:bg-proscape-dark text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </button>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
                placeholder="Search employee or ID"
                value={employeeFilter}
                onChange={(e) => setEmployeeFilter(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <select
                className="pl-3 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape appearance-none"
                value={projectFilter}
                onChange={(e) => setProjectFilter(e.target.value)}
              >
                <option value="">All Projects</option>
                <option value="Main Building Construction">Main Building Construction</option>
                <option value="Bridge Expansion Project">Bridge Expansion Project</option>
                <option value="Highway Renovation">Highway Renovation</option>
              </select>
            </div>
            
            <div className="relative">
              <div className="flex space-x-2">
                <button
                  onClick={() => setMethodFilter("all")}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium ${
                    methodFilter === "all" 
                      ? "bg-proscape text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setMethodFilter("face")}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium ${
                    methodFilter === "face" 
                      ? "bg-proscape text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Camera className="h-4 w-4 inline mr-1" />
                  Face
                </button>
                <button
                  onClick={() => setMethodFilter("manual")}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium ${
                    methodFilter === "manual" 
                      ? "bg-proscape text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <User className="h-4 w-4 inline mr-1" />
                  Manual
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3">Date</th>
                <th scope="col" className="px-4 py-3">Employee ID</th>
                <th scope="col" className="px-4 py-3">Employee Name</th>
                <th scope="col" className="px-4 py-3">Check In</th>
                <th scope="col" className="px-4 py-3">Check Out</th>
                <th scope="col" className="px-4 py-3">Total Hours</th>
                <th scope="col" className="px-4 py-3">Project</th>
                <th scope="col" className="px-4 py-3">Comment</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map(record => (
                  <tr key={record.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{record.date}</td>
                    <td className="px-4 py-3">{record.employeeId}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{record.employee}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <span>{record.checkInTime}</span>
                        <span 
                          className={`ml-2 inline-flex items-center text-xs font-medium px-2 py-1 rounded-full ${
                            record.checkInMethod === "Face" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {record.checkInMethod}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <span>{record.checkOutTime}</span>
                        <span 
                          className={`ml-2 inline-flex items-center text-xs font-medium px-2 py-1 rounded-full ${
                            record.checkOutMethod === "Face" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {record.checkOutMethod}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{record.totalHours}</td>
                    <td className="px-4 py-3">{record.project}</td>
                    <td className="px-4 py-3">
                      {record.comment ? (
                        <div className="max-w-xs truncate" title={record.comment}>
                          {record.comment}
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-4 py-6 text-center text-gray-500">
                    No attendance records found matching the search criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{filteredRecords.length}</span> of{" "}
            <span className="font-medium">{attendanceRecords.length}</span> records
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AttendanceHistory;
