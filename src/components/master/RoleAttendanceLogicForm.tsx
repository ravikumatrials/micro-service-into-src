
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type RoleAttendanceLogicFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  editingItem?: any;
};

const attendanceTypeOptions = [
  "Sick Leave",
  "Casual Leave", 
  "Present",
  "Check-In",
  "Check-Out",
  "Check-In / Check-Out"
];

export function RoleAttendanceLogicForm({ isOpen, onClose, onSave, editingItem }: RoleAttendanceLogicFormProps) {
  const [formData, setFormData] = useState({
    roleName: "",
    attendanceType: "",
    projectRequired: true,
    locationRequired: true,
    autoSubmit: false,
    requiresComment: false,
    defaultCommentLabel: "",
    description: ""
  });

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem);
    } else {
      setFormData({
        roleName: "",
        attendanceType: "",
        projectRequired: true,
        locationRequired: true,
        autoSubmit: false,
        requiresComment: false,
        defaultCommentLabel: "",
        description: ""
      });
    }
  }, [editingItem, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {editingItem ? "Edit Role Attendance Logic" : "Add Role Attendance Logic"}
          </DialogTitle>
          <DialogDescription>
            Configure attendance behavior and requirements for this role.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="roleName">Role Name *</Label>
                <Input
                  id="roleName"
                  value={formData.roleName}
                  onChange={(e) => handleInputChange("roleName", e.target.value)}
                  placeholder="Enter role name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="attendanceType">Attendance Type *</Label>
                <Select 
                  value={formData.attendanceType} 
                  onValueChange={(value) => handleInputChange("attendanceType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select attendance type" />
                  </SelectTrigger>
                  <SelectContent>
                    {attendanceTypeOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="defaultCommentLabel">Default Comment Label</Label>
                <Input
                  id="defaultCommentLabel"
                  value={formData.defaultCommentLabel}
                  onChange={(e) => handleInputChange("defaultCommentLabel", e.target.value)}
                  placeholder="e.g., Enter sick leave reason"
                />
              </div>
            </div>

            {/* Right Column - Toggles */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="projectRequired">Project Required</Label>
                <Switch
                  id="projectRequired"
                  checked={formData.projectRequired}
                  onCheckedChange={(checked) => handleInputChange("projectRequired", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="locationRequired">Location Required</Label>
                <Switch
                  id="locationRequired"
                  checked={formData.locationRequired}
                  onCheckedChange={(checked) => handleInputChange("locationRequired", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="autoSubmit">Auto Submit</Label>
                <Switch
                  id="autoSubmit"
                  checked={formData.autoSubmit}
                  onCheckedChange={(checked) => handleInputChange("autoSubmit", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="requiresComment">Requires Comment</Label>
                <Switch
                  id="requiresComment"
                  checked={formData.requiresComment}
                  onCheckedChange={(checked) => handleInputChange("requiresComment", checked)}
                />
              </div>
            </div>
          </div>

          {/* Description - Full Width */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Optional notes for admin use"
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {editingItem ? "Update Logic" : "Create Logic"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
