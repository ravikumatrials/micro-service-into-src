import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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

interface RoleAttendanceLogicFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  editingItem: any;
}

export const RoleAttendanceLogicForm: React.FC<RoleAttendanceLogicFormProps> = ({
  isOpen,
  onClose,
  onSave,
  editingItem,
}) => {
  const [roleName, setRoleName] = useState("");
  const [attendanceType, setAttendanceType] = useState("");
  const [projectRequired, setProjectRequired] = useState(false);
  const [locationRequired, setLocationRequired] = useState(false);
  const [requiresComment, setRequiresComment] = useState(false);
  const [defaultCommentLabel, setDefaultCommentLabel] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingItem) {
      setRoleName(editingItem.roleName || "");
      setAttendanceType(editingItem.attendanceType || "");
      setProjectRequired(editingItem.projectRequired || false);
      setLocationRequired(editingItem.locationRequired || false);
      setRequiresComment(editingItem.requiresComment || false);
      setDefaultCommentLabel(editingItem.defaultCommentLabel || "");
      setDescription(editingItem.description || "");
    } else {
      // Reset form fields when not editing
      setRoleName("");
      setAttendanceType("");
      setProjectRequired(false);
      setLocationRequired(false);
      setRequiresComment(false);
      setDefaultCommentLabel("");
      setDescription("");
    }
  }, [editingItem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      roleName,
      attendanceType,
      projectRequired,
      locationRequired,
      requiresComment,
      defaultCommentLabel,
      description,
    };
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{editingItem ? "Edit Role Logic" : "Add Role Logic"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="roleName">Role Name</Label>
            <Input
              id="roleName"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="attendanceType">Attendance Type</Label>
            <Select value={attendanceType} onValueChange={setAttendanceType}>
              <SelectTrigger>
                <SelectValue placeholder="Select attendance type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Present">Present</SelectItem>
                <SelectItem value="Absent">Absent</SelectItem>
                <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                <SelectItem value="Casual Leave">Casual Leave</SelectItem>
                <SelectItem value="Present (Visa/ID)">Present (Visa/ID)</SelectItem>
                <SelectItem value="Exception">Exception</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="projectRequired">Project Required</Label>
            <Switch
              id="projectRequired"
              checked={projectRequired}
              onCheckedChange={setProjectRequired}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="locationRequired">Location Required</Label>
            <Switch
              id="locationRequired"
              checked={locationRequired}
              onCheckedChange={setLocationRequired}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="requiresComment">Requires Comment</Label>
            <Switch
              id="requiresComment"
              checked={requiresComment}
              onCheckedChange={setRequiresComment}
            />
          </div>
          {requiresComment && (
            <div>
              <Label htmlFor="defaultCommentLabel">Default Comment Label</Label>
              <Input
                id="defaultCommentLabel"
                value={defaultCommentLabel}
                onChange={(e) => setDefaultCommentLabel(e.target.value)}
              />
            </div>
          )}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {editingItem ? "Update" : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
