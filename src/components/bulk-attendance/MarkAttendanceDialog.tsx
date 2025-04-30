
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

interface MarkAttendanceDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCount: number;
  date: Date | undefined;
  attendanceType: "check-in" | "check-out";
  setAttendanceType: (value: "check-in" | "check-out") => void;
  attendanceTime: string;
  setAttendanceTime: (value: string) => void;
  reason: string;
  setReason: (value: string) => void;
  onConfirm: () => void;
}

const MarkAttendanceDialog = ({
  isOpen,
  onOpenChange,
  selectedCount,
  date,
  attendanceType,
  setAttendanceType,
  attendanceTime,
  setAttendanceTime,
  reason,
  setReason,
  onConfirm,
}: MarkAttendanceDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Mark Bulk Attendance</DialogTitle>
          <DialogDescription>
            You're marking attendance for {selectedCount} employees on {format(date || new Date(), "MMM dd, yyyy")}.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-3">
          <div className="space-y-2">
            <Label htmlFor="attendance-type">Attendance Type</Label>
            <Select 
              value={attendanceType} 
              onValueChange={(value) => setAttendanceType(value as "check-in" | "check-out")}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="check-in">Check-In</SelectItem>
                <SelectItem value="check-out">Check-Out</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input 
              id="time"
              type="time" 
              value={attendanceTime}
              onChange={(e) => setAttendanceTime(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason/Comment</Label>
            <Input 
              id="reason"
              placeholder="Reason for manual entry..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <p className="text-xs text-gray-500">Required for manual entry</p>
          </div>
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button 
            className="bg-proscape hover:bg-proscape-dark text-white"
            onClick={onConfirm}
            disabled={!reason.trim()}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4">
              <path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg> Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MarkAttendanceDialog;
