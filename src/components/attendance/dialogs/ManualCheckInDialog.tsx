
import React, { useState } from "react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Calendar } from "lucide-react";

interface Employee {
  id: number;
  name: string;
  employeeId: string;
  status?: string;
  project?: string;
  projectId?: number;
  location?: string;
  locationId?: number;
}

interface ManualCheckInDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: Employee | null;
  projects: { id: number; name: string }[];
  locations: { id: number; name: string }[];
  onComplete: (
    projectId: string, 
    locationId: string, 
    time: string,
    reason: string,
    attendanceReason?: string
  ) => void;
  attendanceReasons?: {
    id: string;
    label: string;
    category: "present-offsite" | "absent";
  }[];
  isOffSiteMarkingAvailable?: boolean;
}

const ManualCheckInDialog = ({ 
  open, 
  onOpenChange, 
  employee, 
  projects, 
  locations, 
  onComplete,
  attendanceReasons = [],
  isOffSiteMarkingAvailable = true
}: ManualCheckInDialogProps) => {
  const [projectId, setProjectId] = useState(employee?.projectId?.toString() || "");
  const [locationId, setLocationId] = useState(employee?.locationId?.toString() || "");
  const [time, setTime] = useState(format(new Date(), "HH:mm"));
  const [reason, setReason] = useState("");
  const [attendanceReason, setAttendanceReason] = useState("");
  const [isOffsite, setIsOffsite] = useState(false);

  // Reset form when dialog opens/closes or employee changes
  React.useEffect(() => {
    if (open && employee) {
      setProjectId(employee.projectId?.toString() || "");
      setLocationId(employee.locationId?.toString() || "");
      setTime(format(new Date(), "HH:mm"));
      setReason("");
      setAttendanceReason("");
      setIsOffsite(false);
    }
  }, [open, employee]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!projectId) {
      alert("Please select a project");
      return;
    }
    
    if (!time) {
      alert("Please enter check-in time");
      return;
    }
    
    // If offsite is checked, require an attendance reason
    if (isOffsite && !attendanceReason && isOffSiteMarkingAvailable) {
      alert("Please select an attendance reason for off-site check-in");
      return;
    }

    onComplete(projectId, locationId, time, reason, isOffsite ? attendanceReason : undefined);
  };

  if (!employee) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Manual Check-in for {employee.name}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="project">Project</Label>
            <Select value={projectId} onValueChange={setProjectId}>
              <SelectTrigger>
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id.toString()}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Select value={locationId} onValueChange={setLocationId}>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location.id} value={location.id.toString()}>
                    {location.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Check-in Time</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                id="time" 
                type="time" 
                value={time} 
                onChange={(e) => setTime(e.target.value)} 
                className="pl-10"
              />
            </div>
          </div>

          {isOffSiteMarkingAvailable && (
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="offsite"
                checked={isOffsite}
                onChange={(e) => setIsOffsite(e.target.checked)}
                className="rounded border-gray-300"
              />
              <Label htmlFor="offsite" className="cursor-pointer">Mark as off-site check-in</Label>
            </div>
          )}

          {isOffsite && isOffSiteMarkingAvailable && attendanceReasons.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="attendanceReason">Attendance Reason <span className="text-red-500">*</span></Label>
              <Select value={attendanceReason} onValueChange={setAttendanceReason}>
                <SelectTrigger>
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  {attendanceReasons.map((reason) => (
                    <SelectItem key={reason.id} value={reason.id}>
                      {reason.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="reason">Comment (Optional)</Label>
            <Textarea 
              id="reason" 
              placeholder="Enter reason for manual check-in"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ManualCheckInDialog;
