
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

interface ManualCheckOutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: Employee | null;
  projects: { id: number; name: string }[];
  onComplete: (projectId: string, time: string, reason: string) => void;
}

const ManualCheckOutDialog = ({
  open,
  onOpenChange,
  employee,
  projects,
  onComplete
}: ManualCheckOutDialogProps) => {
  const [selectedProject, setSelectedProject] = useState("select-project");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [reason, setReason] = useState("");
  
  const [errors, setErrors] = useState({
    project: false,
    time: false,
    reason: false
  });
  
  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      // Set current time as default
      setCheckOutTime(format(new Date(), "HH:mm"));
      setSelectedProject("select-project");
      setReason("");
      setErrors({
        project: false,
        time: false,
        reason: false
      });
    }
  }, [open]);
  
  const handleSubmit = () => {
    // Validation
    const newErrors = {
      project: selectedProject === "select-project",
      time: !checkOutTime,
      reason: !reason
    };
    
    setErrors(newErrors);
    
    if (Object.values(newErrors).some(Boolean)) {
      return;
    }
    
    onComplete(selectedProject, checkOutTime, reason);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center">
            <Edit className="mr-2 h-6 w-6" />
            Manual Check-Out
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
          
          {/* Check-out Time */}
          <div className="space-y-2">
            <Label htmlFor="time" className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Check-out Time <span className="text-red-500">*</span>
            </Label>
            <Input
              id="time"
              type="time"
              value={checkOutTime}
              onChange={(e) => setCheckOutTime(e.target.value)}
              className={errors.time ? "border-red-500" : ""}
            />
            {errors.time && (
              <p className="text-red-500 text-sm">Check-out time is required</p>
            )}
          </div>
          
          {/* Reason */}
          <div className="space-y-2">
            <Label htmlFor="reason">
              Reason for Manual Check-Out <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="reason"
              placeholder="Please provide a reason for manual check-out"
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
            Submit Check-Out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManualCheckOutDialog;
