
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface Employee {
  id: number;
  name: string;
  employeeId: string;
  role: string;
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
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [time, setTime] = useState(() => {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
  });
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (selectedProject && time) {
      onComplete(selectedProject, selectedLocation, time, reason);
      // Reset form
      setSelectedProject("");
      setSelectedLocation("");
      setTime(() => {
        const now = new Date();
        return now.toTimeString().slice(0, 5);
      });
      setReason("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manual Check In</DialogTitle>
        </DialogHeader>
        
        {employee && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="font-medium">{employee.name}</p>
              <p className="text-sm text-gray-600">ID: {employee.employeeId}</p>
              <p className="text-sm text-gray-600">Role: {employee.role}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="project">Project *</Label>
              <Select value={selectedProject} onValueChange={setSelectedProject}>
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

            {locations.length > 0 && (
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
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
            )}

            <div className="space-y-2">
              <Label htmlFor="time">Check-in Time *</Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason</Label>
              <Textarea
                id="reason"
                placeholder="Enter reason for manual check-in"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={!selectedProject || !time}
              >
                Check In
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ManualCheckInDialog;
