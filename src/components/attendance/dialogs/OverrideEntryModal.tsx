
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";

interface OverrideEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: {
    id: string;
    employeeId: string;
    employeeName: string;
    category: string;
    classification: string;
    status: string;
    entity: string;
  };
  date: Date;
  projects: { id: number; name: string }[];
}

export const OverrideEntryModal: React.FC<OverrideEntryModalProps> = ({
  isOpen,
  onClose,
  employee,
  date,
  projects,
}) => {
  // Status and reason state
  const [attendanceStatus, setAttendanceStatus] = useState<"present" | "absent">("present");
  const [presentReason, setPresentReason] = useState<string>("");
  const [absentReason, setAbsentReason] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [projectId, setProjectId] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Present reason options
  const presentReasons = [
    { value: "medical", label: "Medical" },
    { value: "visa", label: "Visa" },
    { value: "id", label: "ID" },
  ];

  // Absent reason options
  const absentReasons = [
    { value: "sick", label: "Sick" },
    { value: "casual", label: "Casual" },
  ];

  // Reset form
  const resetForm = () => {
    setAttendanceStatus("present");
    setPresentReason("");
    setAbsentReason("");
    setComment("");
    setProjectId("");
  };

  // Handle form submission
  const handleSubmit = () => {
    // Form validation
    if (attendanceStatus === "present" && !presentReason) {
      toast({
        title: "Validation Error",
        description: "Please select a reason for present status",
        variant: "destructive",
      });
      return;
    }

    if (attendanceStatus === "absent" && !absentReason) {
      toast({
        title: "Validation Error",
        description: "Please select a reason for absent status",
        variant: "destructive",
      });
      return;
    }

    if (!comment.trim()) {
      toast({
        title: "Validation Error",
        description: "Please provide a comment",
        variant: "destructive",
      });
      return;
    }

    if (attendanceStatus === "present" && !projectId) {
      toast({
        title: "Validation Error",
        description: "Please select a project",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    setIsSubmitting(true);

    // In a real application, this is where you would make an API call
    setTimeout(() => {
      const reason = attendanceStatus === "present" ? presentReason : absentReason;
      
      toast({
        title: "Attendance Override Submitted",
        description: `${employee.employeeName} marked as ${attendanceStatus} (${reason}) for ${format(date, "MMM dd, yyyy")}`,
      });

      setIsSubmitting(false);
      resetForm();
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Override Attendance Entry</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div>
            <h3 className="text-lg font-semibold">{employee.employeeName}</h3>
            <p className="text-sm text-gray-500">
              {employee.employeeId} • {employee.classification} • {employee.category}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Date: {format(date, "MMMM dd, yyyy")}
            </p>
          </div>

          <div className="space-y-2">
            <Label>Attendance Status</Label>
            <RadioGroup
              value={attendanceStatus}
              onValueChange={(value) => setAttendanceStatus(value as "present" | "absent")}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="present" id="present" />
                <Label htmlFor="present">Present</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="absent" id="absent" />
                <Label htmlFor="absent">Absent</Label>
              </div>
            </RadioGroup>
          </div>

          {attendanceStatus === "present" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="present-reason">Present Reason</Label>
                <Select value={presentReason} onValueChange={setPresentReason}>
                  <SelectTrigger id="present-reason">
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    {presentReasons.map(reason => (
                      <SelectItem key={reason.value} value={reason.value}>{reason.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="project">Project</Label>
                <Select value={projectId} onValueChange={setProjectId}>
                  <SelectTrigger id="project">
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map(project => (
                      <SelectItem key={project.id} value={project.id.toString()}>{project.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {attendanceStatus === "absent" && (
            <div className="space-y-2">
              <Label htmlFor="absent-reason">Absence Reason</Label>
              <Select value={absentReason} onValueChange={setAbsentReason}>
                <SelectTrigger id="absent-reason">
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  {absentReasons.map(reason => (
                    <SelectItem key={reason.value} value={reason.value}>{reason.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="comment">Comment (Required)</Label>
            <Textarea
              id="comment"
              placeholder="Enter justification details..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
