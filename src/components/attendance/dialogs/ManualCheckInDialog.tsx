
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Clock, User } from "lucide-react";

// Define attendance reason options
const attendanceReasons = [
  { value: "medical", label: "Medical", type: "present_offsite" },
  { value: "visa", label: "Visa", type: "present_offsite" },
  { value: "id", label: "ID", type: "present_offsite" },
  { value: "sick", label: "Sick", type: "absent_excused" },
  { value: "casual", label: "Casual", type: "absent_unexcused" }
];

interface Employee {
  id: number;
  employeeId: string;
  name: string;
  role?: string;
  imageUrl: string;
}

interface ManualCheckInDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: Employee | null;
  projects: { id: number; name: string; coordinates?: { geofenceData: string } }[];
  locations: { id: number; name: string }[];
  onComplete: (projectId: string, locationId: string, time: string, reason: string, attendanceReason?: string, attendanceStatus?: string) => void;
}

const ManualCheckInDialog = ({
  open,
  onOpenChange,
  employee,
  projects,
  locations,
  onComplete
}: ManualCheckInDialogProps) => {
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [time, setTime] = useState<string>(format(new Date(), "HH:mm"));
  const [reason, setReason] = useState("");
  const [attendanceReason, setAttendanceReason] = useState("");
  const [attendanceStatus, setAttendanceStatus] = useState("present");
  const [isFacialCheckIn, setIsFacialCheckIn] = useState(true);
  
  // Determine if attendance reason field should be displayed
  const shouldShowAttendanceReason = !isFacialCheckIn && (
    attendanceStatus === "absent_excused" || 
    attendanceStatus === "absent_unexcused" || 
    attendanceStatus === "present_offsite"
  );
  
  // Reset form when dialog opens
  React.useEffect(() => {
    if (open) {
      setSelectedProject("");
      setSelectedLocation("");
      setTime(format(new Date(), "HH:mm"));
      setReason("");
      setAttendanceReason("");
      setAttendanceStatus("present");
      setIsFacialCheckIn(true);
      
      // Default to the first project if present
      if (projects.length > 0) {
        setSelectedProject(projects[0].id.toString());
      }
    }
  }, [open, projects]);
  
  // Update location options when project changes
  React.useEffect(() => {
    if (selectedProject && locations.length > 0) {
      // Find locations related to the selected project
      // For this implementation, we're just selecting the first location
      setSelectedLocation(locations[0]?.id.toString() || "");
    } else {
      setSelectedLocation("");
    }
  }, [selectedProject, locations]);
  
  // Handle attendance reason change
  const handleAttendanceReasonChange = (value: string) => {
    setAttendanceReason(value);
    
    // Update attendance status based on selected reason
    const selectedReasonObj = attendanceReasons.find(r => r.value === value);
    if (selectedReasonObj) {
      setAttendanceStatus(selectedReasonObj.type);
    }
  };
  
  // Toggle facial check-in status
  const handleFacialCheckInToggle = (value: boolean) => {
    setIsFacialCheckIn(value);
    if (value) {
      // Reset attendance reason when switching to facial check-in
      setAttendanceReason("");
      setAttendanceStatus("present");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!selectedProject || !time) return;
    
    // Check if attendance reason is required and provided
    if (shouldShowAttendanceReason && !attendanceReason) {
      // Show error or toast message here
      return;
    }
    
    onComplete(
      selectedProject, 
      selectedLocation, 
      time,
      reason,
      attendanceReason,
      attendanceStatus
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" /> Manual Check-In
          </DialogTitle>
        </DialogHeader>

        {employee && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-4 py-2">
              <div className="h-12 w-12 rounded-full overflow-hidden">
                <img 
                  src={employee.imageUrl} 
                  alt={employee.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium">{employee.name}</h4>
                <p className="text-sm text-gray-500">ID: {employee.employeeId}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="check-in-method">Check-In Method</Label>
              <div className="flex gap-2">
                <Button 
                  type="button" 
                  variant={isFacialCheckIn ? "default" : "outline"} 
                  size="sm"
                  onClick={() => handleFacialCheckInToggle(true)}
                >
                  Facial Recognition
                </Button>
                <Button 
                  type="button" 
                  variant={!isFacialCheckIn ? "default" : "outline"} 
                  size="sm"
                  onClick={() => handleFacialCheckInToggle(false)}
                >
                  Manual Entry
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="project">Project</Label>
              <Select 
                value={selectedProject} 
                onValueChange={setSelectedProject}
              >
                <SelectTrigger id="project">
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
            
            {selectedLocation && locations.length > 0 && (
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select 
                  value={selectedLocation} 
                  onValueChange={setSelectedLocation}
                >
                  <SelectTrigger id="location">
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
            )}
            
            <div className="space-y-2">
              <Label htmlFor="time" className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> Check-In Time
              </Label>
              <Input 
                id="time" 
                type="time" 
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            
            {/* Attendance Reason Dropdown - only for non-facial check-ins */}
            {!isFacialCheckIn && (
              <div className="space-y-2">
                <Label htmlFor="attendance-reason">
                  Attendance Reason <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={attendanceReason} 
                  onValueChange={handleAttendanceReasonChange}
                >
                  <SelectTrigger id="attendance-reason">
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    {attendanceReasons.map((reason) => (
                      <SelectItem key={reason.value} value={reason.value}>
                        {reason.label} → {reason.type === "present_offsite" ? "Present (Off-site)" : 
                                      reason.type === "absent_excused" ? "Absent (Excused)" : 
                                      "Absent (Unexcused)"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">
                  Required for manual check-ins without face recognition
                </p>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="reason">Additional Comments (Optional)</Label>
              <Input 
                id="reason" 
                placeholder="Add any additional comments" 
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-2 pt-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={!selectedProject || !time || (shouldShowAttendanceReason && !attendanceReason)}
              >
                Complete Check-In
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ManualCheckInDialog;
