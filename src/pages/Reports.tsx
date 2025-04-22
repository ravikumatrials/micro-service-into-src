
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Calendar, Download, Filter, Printer, Search, ChevronDown, ChevronUp } from "lucide-react";

const Reports = () => {
  const [reportType, setReportType] = useState("daily");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [projectFilter, setProjectFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);
  
  // Mock report data
  const reportData = [
    {
      id: 1,
      date: "22 Apr 2025",
      project: "Main Building Construction",
      totalEmployees: 245,
      present: 220,
      absent: 25,
      late: 18,
      earlyLeave: 5,
      hoursCovered: 1760,
      employees: [
        { name: "John Smith", status: "Present", checkIn: "08:30 AM", checkOut: "05:15 PM", hours: "8h 45m" },
        { name: "Sarah Johnson", status: "Present", checkIn: "08:45 AM", checkOut: "05:30 PM", hours: "8h 45m" },
        { name: "Emily Davis", status: "Present", checkIn: "08:15 AM", checkOut: "04:30 PM", hours: "8h 15m" },
        { name: "Robert Williams", status: "Late", checkIn: "09:15 AM", checkOut: "05:45 PM", hours: "8h 30m" },
        { name: "James Miller", status: "Early Leave", checkIn: "08:30 AM", checkOut: "03:00 PM", hours: "6h 30m" }
      ]
    },
    {
      id: 2,
      date: "22 Apr 2025",
      project: "Bridge Expansion Project",
      totalEmployees: 180,
      present: 170,
      absent: 10,
      late: 12,
      earlyLeave: 3,
      hoursCovered: 1360,
      employees: [
        { name: "Jennifer Wilson", status: "Present", checkIn: "08:30 AM", checkOut: "05:15 PM", hours: "8h 45m" },
        { name: "Michael Brown", status: "Late", checkIn: "09:00 AM", checkOut: "05:30 PM", hours: "8h 30m" }
      ]
    },
    {
      id: 3,
      date: "22 Apr 2025",
      project: "Highway Renovation",
      totalEmployees: 120,
      present: 110,
      absent: 10,
      late: 8,
      earlyLeave: 2,
      hoursCovered: 880,
      employees: [
        { name: "David Thompson", status: "Present", checkIn: "08:15 AM", checkOut: "05:00 PM", hours: "8h 45m" }
      ]
    },
    {
      id: 4,
      date: "21 Apr 2025",
      project: "Main Building Construction",
      totalEmployees: 245,
      present: 225,
      absent: 20,
      late: 15,
      earlyLeave: 4,
      hoursCovered: 1800,
      employees: []
    },
    {
      id: 5,
      date: "21 Apr 2025",
      project: "Bridge Expansion Project",
      totalEmployees: 180,
      present: 165,
      absent: 15,
      late: 10,
      earlyLeave: 5,
      hoursCovered: 1320,
      employees: []
    },
    {
      id: 6,
      date: "21 Apr 2025",
      project: "Highway Renovation",
      totalEmployees: 120,
      present: 105,
      absent: 15,
      late: 7,
      earlyLeave: 3,
      hoursCovered: 840,
      employees: []
    },
  ];

  // Filter report data based on filters
  const filteredReportData = reportData.filter(item => {
    const dateMatch = startDate && endDate 
      ? new Date(item.date) >= new Date(startDate) && new Date(item.date) <= new Date(endDate)
      : true;
    const projectMatch = projectFilter 
      ? item.project === projectFilter
      : true;
    
    return dateMatch && projectMatch;
  });

  const toggleRowExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };
  
  const getTotalStats = () => {
    return filteredReportData.reduce((acc, curr) => {
      acc.totalEmployees += curr.totalEmployees;
      acc.present += curr.present;
      acc.absent += curr.absent;
      acc.late += curr.late;
      acc.earlyLeave += curr.earlyLeave;
      acc.hoursCovered += curr.hoursCovered;
      return acc;
    }, { totalEmployees: 0, present: 0, absent: 0, late: 0, earlyLeave: 0, hoursCovered: 0 });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
        <div className="flex space-x-3">
          <button className="flex items-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </button>
          <button className="flex items-center bg-proscape hover:bg-proscape-dark text-white px-4 py-2 rounded-md text-sm font-medium">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      <Card className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Report Type
            </label>
            <div className="relative">
              <select
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape appearance-none"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="daily">Daily Report</option>
                <option value="weekly">Weekly Report</option>
                <option value="monthly">Monthly Report</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {reportType === "custom" ? "Start Date" : "Date"}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
          </div>
          
          {reportType === "custom" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project
            </label>
            <select
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape appearance-none"
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
            >
              <option value="">All Projects</option>
              <option value="Main Building Construction">Main Building Construction</option>
              <option value="Bridge Expansion Project">Bridge Expansion Project</option>
              <option value="Highway Renovation">Highway Renovation</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <select
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape appearance-none"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              <option value="">All Departments</option>
              <option value="Construction">Construction</option>
              <option value="Engineering">Engineering</option>
              <option value="Electrical">Electrical</option>
              <option value="Plumbing">Plumbing</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button className="w-full bg-proscape hover:bg-proscape-dark text-white px-4 py-2 rounded-md text-sm font-medium">
              Generate Report
            </button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-blue-50 border-l-4 border-blue-400">
          <h3 className="text-sm font-medium text-blue-800 mb-1">Total Employees</h3>
          <p className="text-2xl font-bold text-blue-900">{getTotalStats().totalEmployees}</p>
        </Card>
        
        <Card className="p-4 bg-green-50 border-l-4 border-green-400">
          <h3 className="text-sm font-medium text-green-800 mb-1">Present</h3>
          <p className="text-2xl font-bold text-green-900">{getTotalStats().present}</p>
          <p className="text-xs text-green-700 mt-1">
            {Math.round((getTotalStats().present / getTotalStats().totalEmployees) * 100)}% attendance rate
          </p>
        </Card>
        
        <Card className="p-4 bg-red-50 border-l-4 border-red-400">
          <h3 className="text-sm font-medium text-red-800 mb-1">Absent</h3>
          <p className="text-2xl font-bold text-red-900">{getTotalStats().absent}</p>
          <p className="text-xs text-red-700 mt-1">
            {Math.round((getTotalStats().absent / getTotalStats().totalEmployees) * 100)}% absence rate
          </p>
        </Card>
        
        <Card className="p-4 bg-amber-50 border-l-4 border-amber-400">
          <h3 className="text-sm font-medium text-amber-800 mb-1">Total Hours</h3>
          <p className="text-2xl font-bold text-amber-900">{getTotalStats().hoursCovered}</p>
        </Card>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3"></th>
                <th scope="col" className="px-4 py-3">Date</th>
                <th scope="col" className="px-4 py-3">Project</th>
                <th scope="col" className="px-4 py-3">Total Employees</th>
                <th scope="col" className="px-4 py-3">Present</th>
                <th scope="col" className="px-4 py-3">Absent</th>
                <th scope="col" className="px-4 py-3">Late</th>
                <th scope="col" className="px-4 py-3">Early Leave</th>
                <th scope="col" className="px-4 py-3">Hours Covered</th>
              </tr>
            </thead>
            <tbody>
              {filteredReportData.length > 0 ? (
                <>
                  {filteredReportData.map(item => (
                    <>
                      <tr 
                        key={item.id} 
                        className={`border-b hover:bg-gray-50 cursor-pointer ${expandedRow === item.id ? 'bg-gray-50' : ''}`}
                        onClick={() => toggleRowExpand(item.id)}
                      >
                        <td className="px-4 py-3">
                          {expandedRow === item.id ? (
                            <ChevronUp className="h-4 w-4 text-gray-500" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-gray-500" />
                          )}
                        </td>
                        <td className="px-4 py-3">{item.date}</td>
                        <td className="px-4 py-3 font-medium text-gray-900">{item.project}</td>
                        <td className="px-4 py-3">{item.totalEmployees}</td>
                        <td className="px-4 py-3">
                          <span className="text-green-600 font-medium">{item.present}</span>
                          <span className="text-xs text-gray-500 ml-1">
                            ({Math.round((item.present / item.totalEmployees) * 100)}%)
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-red-600 font-medium">{item.absent}</span>
                          <span className="text-xs text-gray-500 ml-1">
                            ({Math.round((item.absent / item.totalEmployees) * 100)}%)
                          </span>
                        </td>
                        <td className="px-4 py-3">{item.late}</td>
                        <td className="px-4 py-3">{item.earlyLeave}</td>
                        <td className="px-4 py-3">{item.hoursCovered}</td>
                      </tr>
                      
                      {expandedRow === item.id && (
                        <tr>
                          <td colSpan={9} className="px-0 py-0 border-b">
                            <div className="p-4 bg-gray-50">
                              <h4 className="font-medium text-gray-900 mb-2">Employee Details</h4>
                              {item.employees.length > 0 ? (
                                <table className="w-full text-sm text-left text-gray-500 border rounded-md overflow-hidden">
                                  <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                    <tr>
                                      <th scope="col" className="px-4 py-2">Name</th>
                                      <th scope="col" className="px-4 py-2">Status</th>
                                      <th scope="col" className="px-4 py-2">Check In</th>
                                      <th scope="col" className="px-4 py-2">Check Out</th>
                                      <th scope="col" className="px-4 py-2">Hours</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {item.employees.map((employee, idx) => (
                                      <tr key={idx} className="border-b bg-white hover:bg-gray-50">
                                        <td className="px-4 py-2 font-medium text-gray-900">{employee.name}</td>
                                        <td className="px-4 py-2">
                                          <span 
                                            className={`inline-flex items-center text-xs font-medium px-2 py-1 rounded-full ${
                                              employee.status === "Present" 
                                                ? "bg-green-100 text-green-800" 
                                                : employee.status === "Late"
                                                ? "bg-amber-100 text-amber-800"
                                                : "bg-blue-100 text-blue-800"
                                            }`}
                                          >
                                            {employee.status}
                                          </span>
                                        </td>
                                        <td className="px-4 py-2">{employee.checkIn}</td>
                                        <td className="px-4 py-2">{employee.checkOut}</td>
                                        <td className="px-4 py-2">{employee.hours}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              ) : (
                                <p className="text-gray-500 text-sm">No detailed data available for this date</p>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                  
                  <tr className="bg-gray-50 font-medium">
                    <td className="px-4 py-3"></td>
                    <td className="px-4 py-3" colSpan={2}>Total / Average</td>
                    <td className="px-4 py-3">{getTotalStats().totalEmployees}</td>
                    <td className="px-4 py-3">
                      <span className="text-green-600">{getTotalStats().present}</span>
                      <span className="text-xs text-gray-500 ml-1">
                        ({Math.round((getTotalStats().present / getTotalStats().totalEmployees) * 100)}%)
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-red-600">{getTotalStats().absent}</span>
                      <span className="text-xs text-gray-500 ml-1">
                        ({Math.round((getTotalStats().absent / getTotalStats().totalEmployees) * 100)}%)
                      </span>
                    </td>
                    <td className="px-4 py-3">{getTotalStats().late}</td>
                    <td className="px-4 py-3">{getTotalStats().earlyLeave}</td>
                    <td className="px-4 py-3">{getTotalStats().hoursCovered}</td>
                  </tr>
                </>
              ) : (
                <tr>
                  <td colSpan={9} className="px-4 py-6 text-center text-gray-500">
                    No report data found for the selected criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Reports;
