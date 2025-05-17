
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User } from "lucide-react";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface EmployeeDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: any | null;
}

export function EmployeeDetailModal({
  open,
  onOpenChange,
  employee,
}: EmployeeDetailModalProps) {
  if (!employee) return null;

  // Mock attendance history data for demonstration
  const attendanceHistory = [
    {
      date: new Date(2025, 4, 17), // May 17, 2025
      checkIn: "08:15 AM",
      checkOut: "05:45 PM",
      project: "Main Building Construction",
      location: "Abu Dhabi Site A",
      mode: "Face",
      workingHours: "9.5",
      comments: ""
    },
    {
      date: new Date(2025, 4, 16), // May 16, 2025
      checkIn: "08:05 AM",
      checkOut: "05:30 PM",
      project: "Main Building Construction",
      location: "Abu Dhabi Site A",
      mode: "Face",
      workingHours: "9.42",
      comments: ""
    },
    {
      date: new Date(2025, 4, 15), // May 15, 2025
      checkIn: "08:45 AM",
      checkOut: "05:15 PM",
      project: "Main Building Construction",
      location: "Abu Dhabi Site A",
      mode: "Manual",
      workingHours: "8.5",
      comments: "Employee forgot to check in with face recognition"
    },
    {
      date: new Date(2025, 4, 14), // May 14, 2025
      checkIn: "08:30 AM",
      checkOut: "06:00 PM",
      project: "Main Building Construction",
      location: "Abu Dhabi Site B",
      mode: "Face",
      workingHours: "9.5",
      comments: ""
    },
    {
      date: new Date(2025, 4, 13), // May 13, 2025
      checkIn: "09:00 AM",
      checkOut: "04:30 PM",
      project: "Main Building Construction",
      location: "Abu Dhabi Site B",
      mode: "Manual",
      workingHours: "7.5",
      comments: "Early departure due to medical appointment"
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Employee Details</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="general">General Information</TabsTrigger>
            <TabsTrigger value="attendance">Attendance History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-6">
            {/* Employee Profile Section */}
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="" alt={employee.name} />
                <AvatarFallback className="text-2xl bg-gray-200">
                  <User size={40} className="text-gray-500" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-medium">{employee.name}</h3>
                <p className="text-sm text-gray-500">{employee.email}</p>
                <div className="mt-1">
                  <Badge
                    className={
                      employee.status === "Active" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {employee.status}
                  </Badge>
                </div>
              </div>
            </div>

            <Separator />

            {/* General Information */}
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-3">GENERAL INFORMATION</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Employee ID</p>
                  <p className="text-sm text-gray-500">{employee.employeeId}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Entity</p>
                  <p className="text-sm text-gray-500">{employee.entity}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Category</p>
                  <p className="text-sm text-gray-500">{employee.category}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Classification</p>
                  <p className="text-sm text-gray-500">{employee.classification}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Contact Number</p>
                  <p className="text-sm text-gray-500">{employee.contactNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Role</p>
                  <p className="text-sm text-gray-500">{employee.role || "Unassigned"}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Face Enrollment Status */}
            {employee.hasOwnProperty('faceEnrolled') && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-3">FACE ENROLLMENT</h4>
                <div className="flex items-center space-x-2">
                  <Badge
                    className={
                      employee.faceEnrolled 
                        ? "bg-green-100 text-green-800" 
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    {employee.faceEnrolled ? "Enrolled" : "Not Enrolled"}
                  </Badge>
                  {employee.faceEnrolled && (
                    <p className="text-sm text-gray-500">Last Updated: {new Date().toLocaleDateString()}</p>
                  )}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="attendance" className="space-y-4">
            <h4 className="text-sm font-medium text-gray-500 mb-3">ATTENDANCE HISTORY</h4>
            
            {/* Improved Attendance History UI */}
            <div className="overflow-x-auto rounded-md border">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-In</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-Out</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mode</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {attendanceHistory.map((record, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {format(record.date, "MMM dd, yyyy")}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{record.checkIn}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{record.checkOut}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{record.project}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{record.location}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <Badge
                          className={record.mode === "Face" ? "bg-blue-100 text-blue-800" : "bg-orange-100 text-orange-800"}
                        >
                          {record.mode}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">{record.workingHours}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 max-w-[200px] truncate" title={record.comments}>
                        {record.comments || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
