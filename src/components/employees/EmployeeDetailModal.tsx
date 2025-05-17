
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User } from "lucide-react";

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Employee Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
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

          <Separator />

          {/* Recent Attendance History (Placeholder) */}
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-3">RECENT ATTENDANCE</h4>
            <div className="text-sm">
              {/* In a real application, this would fetch actual attendance data */}
              <div className="bg-gray-50 p-2 rounded-md mb-2">
                <div className="flex justify-between">
                  <span>{new Date().toLocaleDateString()}</span>
                  <Badge className="bg-green-100 text-green-800">Present</Badge>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Check-in: 08:30 AM • Check-out: 05:45 PM
                </div>
              </div>
              <div className="bg-gray-50 p-2 rounded-md mb-2">
                <div className="flex justify-between">
                  <span>{new Date(Date.now() - 86400000).toLocaleDateString()}</span>
                  <Badge className="bg-green-100 text-green-800">Present</Badge>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Check-in: 08:15 AM • Check-out: 05:30 PM
                </div>
              </div>
              <div className="bg-gray-50 p-2 rounded-md">
                <div className="flex justify-between">
                  <span>{new Date(Date.now() - 172800000).toLocaleDateString()}</span>
                  <Badge className="bg-green-100 text-green-800">Present</Badge>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Check-in: 08:45 AM • Check-out: 06:00 PM
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
