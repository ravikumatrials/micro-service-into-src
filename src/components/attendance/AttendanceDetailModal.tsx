
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AttendanceRecord {
  id: number;
  employeeId: string;
  name: string;
  project: string;
  category: string;
  entity: string;
  date: string;
  checkInTime: string;
  checkOutTime: string | null;
  mode: string;
  classification?: string;
  comment?: string;
}

interface AttendanceDetailModalProps {
  record: AttendanceRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

const AttendanceDetailModal: React.FC<AttendanceDetailModalProps> = ({
  record,
  isOpen,
  onClose,
}) => {
  if (!record) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Attendance Details</DialogTitle>
          <DialogDescription>
            Complete attendance information for {record.name}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4 py-4">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-500">Employee ID</p>
              <p>{record.employeeId}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-500">Name</p>
              <p>{record.name}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-500">Category</p>
              <p>{record.category}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-500">Classification</p>
              <p>{record.classification || "Not specified"}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-500">Project</p>
              <p>{record.project}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-500">Entity</p>
              <p>{record.entity}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-500">Date</p>
              <p>{record.date}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-500">Attendance Mode</p>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  record.mode === "Face"
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                {record.mode}
              </span>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-500">Check-In Time</p>
              <p>{record.checkInTime}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-500">Check-Out Time</p>
              <p>{record.checkOutTime || "Not checked out"}</p>
            </div>
          </div>

          {record.comment && (
            <div className="space-y-1 col-span-2">
              <p className="text-sm font-semibold text-gray-500">Comment / Reason</p>
              <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">{record.comment}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AttendanceDetailModal;
