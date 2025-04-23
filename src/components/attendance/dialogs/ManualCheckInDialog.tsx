
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit, Clock } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";

interface Employee {
  id: number;
  name: string;
  imageUrl: string;
}

interface ManualCheckInDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: Employee | null;
  projects: { id: number; name: string }[];
  locations: { id: number; name: string }[];
  onComplete: (projectId: string, locationId: string, time: string, reason: string) => void;
}

const ManualCheckInDialog = ({
  open,
  onOpenChange,
  employee,
  projects,
  locations,
  onComplete
}: ManualCheckInDialogProps) => {
  const [selectedProject, setSelectedProject] = useState("select-project");
  const [selectedLocation, setSelectedLocation] = useState("select-location");
  const [checkInTime, setCheckInTime] = useState("");
  const [reason, setReason] = useState("");
  
  const [errors, setErrors] = useState({
    project: false,
    location: false,
    time: false,
    reason: false
  });
  
  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      // Set current time as default
      setCheckInTime(format(new Date(), "HH:mm"));
      setSelectedProject("select-project");
      setSelectedLocation("select-location");
      setReason("");
      setErrors({
        project: false,
        location: false,
        time: false,
        reason: false
      });
    }
  }, [open]);
  
  const handleSubmit = () => {
    // Validation
    const newErrors = {
      project: selectedProject === "select-project",
      location: selectedLocation === "select-location",
      time: !checkInTime,
      reason: !reason
    };
    
    setErrors(newErrors);
    
    if (Object.values(newErrors).some(Boolean)) {
      return;
    }
    
    onComplete(selectedProject, selectedLocation, checkInTime, reason);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center">
            <Edit className="mr-2 h-6 w-6" />
            Manual Check-In
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-5">
          {/* Employee info */}
          {employee && (
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-proscape">
                <img 
                  src={employee.imageUrl} 
                  alt={employee.name}
                  className="h-full w-full object-cover" 
                />
              </div>
              <div>
                <h3 className="text-lg font-medium">{employee.name}</h3>
                <p className="text-gray-500">ID: {employee.id}</p>
              </div>
            </div>
          )}
          
          {/* Project */}
          <div className="space-y-2">
            <Label htmlFor="project">Project <span className="text-red-500">*</span></Label>
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger id="project" className={errors.project ? "border-red-500" : ""}>
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="select-project">Select project</SelectItem>
                {projects.map(project => (
                  <SelectItem key={project.id} value={project.id.toString()}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.project && (
              <p className="text-red-500 text-sm">Project is required</p>
            )}
          </div>
          
          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location <span className="text-red-500">*</span></Label>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger id="location" className={errors.location ? "border-red-500" : ""}>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="select-location">Select location</SelectItem>
                {locations.map(location => (
                  <SelectItem key={location.id} value={location.id.toString()}>
                    {location.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.location && (
              <p className="text-red-500 text-sm">Location is required</p>
            )}
          </div>
          
          {/* Check-in Time */}
          <div className="space-y-2">
            <Label htmlFor="time" className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Check-in Time <span className="text-red-500">*</span>
            </Label>
            <Input
              id="time"
              type="time"
              value={checkInTime}
              onChange={(e) => setCheckInTime(e.target.value)}
              className={errors.time ? "border-red-500" : ""}
            />
            {errors.time && (
              <p className="text-red-500 text-sm">Check-in time is required</p>
            )}
          </div>
          
          {/* Reason */}
          <div className="space-y-2">
            <Label htmlFor="reason">
              Reason for Manual Check-In <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="reason"
              placeholder="Please provide a reason for manual check-in"
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className={errors.reason ? "border-red-500" : ""}
            />
            {errors.reason && (
              <p className="text-red-500 text-sm">Reason is required</p>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            className="bg-proscape hover:bg-proscape-dark"
          >
            Submit Check-In
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManualCheckInDialog;
