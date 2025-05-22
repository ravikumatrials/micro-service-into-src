
import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";

interface TagAttendanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: any;
  date: Date;
  projects: { id: number; name: string }[];
}

const TagAttendanceDialog: React.FC<TagAttendanceDialogProps> = ({
  open,
  onOpenChange,
  employee,
  date,
  projects
}) => {
  const [attendanceType, setAttendanceType] = useState<"present" | "absent">("present");
  const [reason, setReason] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Reset form when dialog opens
  React.useEffect(() => {
    if (open) {
      setAttendanceType("present");
      setReason("");
      setComment("");
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!reason) {
      toast({
        title: "Error",
        description: "Please select a reason",
        variant: "destructive"
      });
      return;
    }
    
    if (!comment.trim()) {
      toast({
        title: "Error",
        description: "Please provide a comment",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      toast({
        title: "Success",
        description: `${employee?.employeeName} marked as ${attendanceType} (${reason}) for ${format(date, "PP")}`,
      });
      
      // Close dialog
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to tag attendance",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!employee) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Mark Attendance</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <div>
                <p className="font-medium text-gray-700">{employee?.employeeName} ({employee?.employeeId})</p>
                <p className="text-sm text-gray-500">Date: {format(date, "PPPP")}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="attendance-type">Attendance Type</Label>
              <RadioGroup 
                value={attendanceType}
                onValueChange={(value: "present" | "absent") => {
                  setAttendanceType(value);
                  setReason(""); // Reset reason when type changes
                }}
                className="flex space-x-4"
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
            
            <div className="space-y-2">
              <Label htmlFor="reason">Reason</Label>
              <Select value={reason} onValueChange={setReason}>
                <SelectTrigger>
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  {attendanceType === "present" ? (
                    <>
                      <SelectItem value="Medical">Medical</SelectItem>
                      <SelectItem value="Visa">Visa</SelectItem>
                      <SelectItem value="ID">ID</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="Sick">Sick</SelectItem>
                      <SelectItem value="Casual">Casual</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="comment">Comment (Required)</Label>
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Enter comment..."
                className="min-h-[80px]"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || !reason || !comment.trim()}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TagAttendanceDialog;
