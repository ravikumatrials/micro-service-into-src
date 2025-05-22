
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import EmployeeField from "@/components/ManualFormFields/EmployeeField";
import ProjectField from "@/components/ManualFormFields/ProjectField";
import TimeField from "@/components/ManualFormFields/TimeField";
import ReasonField from "@/components/ManualFormFields/ReasonField";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Employee {
  id: number;
  employeeId: string;
  name: string;
  role?: string;
  project?: string;
  projectId?: number;
  location?: string;
  locationId?: number;
  status?: string;
  imageUrl?: string;
  classification?: string;
  category?: string;
  activeStatus?: "Active" | "Inactive";
  entity?: string;
}

interface ManualCheckInDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: Employee | null;
  projects: { id: number; name: string; location?: string; coordinates?: { geofenceData: string } }[];
  locations: { id: number; name: string }[];
  onComplete: (projectId: string, locationId: string, time: string, reason: string, attendanceReason?: string) => void;
}

const ManualCheckInDialog = ({
  open,
  onOpenChange,
  employee,
  projects,
  locations,
  onComplete
}: ManualCheckInDialogProps) => {
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [checkInTime, setCheckInTime] = useState<string>(format(new Date(), "HH:mm"));
  const [reason, setReason] = useState<string>("");
  const [attendanceReason, setAttendanceReason] = useState<string>("");
  const [isOffsite, setIsOffsite] = useState<boolean>(false);
  
  // Reset form when dialog opens/closes
  React.useEffect(() => {
    if (open) {
      // If employee already has assigned project, pre-select it
      if (employee?.projectId) {
        setSelectedProject(employee.projectId.toString());
        
        // If employee already has assigned location, pre-select it
        if (employee.locationId) {
          setSelectedLocation(employee.locationId.toString());
        }
      } else {
        setSelectedProject("");
        setSelectedLocation("");
      }
      
      setCheckInTime(format(new Date(), "HH:mm"));
      setReason("");
      setAttendanceReason("");
      setIsOffsite(false);
    }
  }, [open, employee]);

  const handleProjectChange = (value: string) => {
    setSelectedProject(value);
    
    // Reset location when project changes
    setSelectedLocation("");
    
    // Check if the project has location defined to determine if it's offsite
    const projectHasLocation = projects.find(p => p.id.toString() === value)?.location;
    setIsOffsite(!projectHasLocation);
  };

  const handleComplete = () => {
    onComplete(
      selectedProject,
      selectedLocation,
      checkInTime,
      reason,
      isOffsite ? attendanceReason : undefined
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Manual Check-In for {employee?.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Project Selection */}
          <ProjectField
            projects={projects}
            value={selectedProject}
            onChange={handleProjectChange}
            label="Project"
          />
          
          {/* Off-site warning and reason selection */}
          {isOffsite && (
            <>
              <Alert variant="default" className="bg-yellow-50 border border-yellow-100">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-700">
                  No location defined for this project. This will be marked as an off-site check-in.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-2">
                <Label htmlFor="attendance-reason" className="text-sm font-medium">
                  Attendance Reason (Required for Off-site)
                </Label>
                <Select 
                  value={attendanceReason} 
                  onValueChange={setAttendanceReason}
                >
                  <SelectTrigger id="attendance-reason" className="w-full">
                    <SelectValue placeholder="Select reason for off-site" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medical">Medical → Present (off-site)</SelectItem>
                    <SelectItem value="visa">Visa → Present (off-site)</SelectItem>
                    <SelectItem value="id">ID → Present (off-site)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
          
          {/* Check-in Time */}
          <TimeField
            label="Check-in Time"
            value={checkInTime}
            onChange={setCheckInTime}
          />
          
          {/* Reason for manual check-in */}
          <ReasonField
            label="Comments"
            placeholder="Enter any additional notes..."
            value={reason}
            onChange={setReason}
          />
        </div>

        <DialogFooter>
          <Button
            onClick={handleComplete}
            className="bg-proscape hover:bg-proscape-dark"
            disabled={!selectedProject || (isOffsite && !attendanceReason)}
          >
            Complete Check-in
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManualCheckInDialog;
