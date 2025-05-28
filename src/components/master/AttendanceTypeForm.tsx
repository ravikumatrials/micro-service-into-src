
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

type AttendanceTypeFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  editingItem?: any;
};

export function AttendanceTypeForm({ isOpen, onClose, onSave, editingItem }: AttendanceTypeFormProps) {
  const [formData, setFormData] = useState({
    attendanceTypeName: ""
  });

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem);
    } else {
      setFormData({
        attendanceTypeName: ""
      });
    }
  }, [editingItem, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.attendanceTypeName.trim()) {
      return;
    }
    
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {editingItem ? "Edit Attendance Type" : "Add Attendance Type"}
          </DialogTitle>
          <DialogDescription>
            Configure attendance type for the system.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="attendanceTypeName">Attendance Type Name *</Label>
            <Input
              id="attendanceTypeName"
              value={formData.attendanceTypeName}
              onChange={(e) => handleInputChange("attendanceTypeName", e.target.value)}
              placeholder="e.g., Present, Sick Leave"
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!formData.attendanceTypeName.trim()}>
              {editingItem ? "Update Type" : "Create Type"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
