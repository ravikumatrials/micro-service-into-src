
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface AttendanceType {
  id: string;
  attendanceTypeName: string;
}

interface AttendanceTypeFormProps {
  onSubmit: (data: Omit<AttendanceType, 'id'>) => void;
  initialData?: AttendanceType;
  mode: 'add' | 'edit';
  onCancel?: () => void;
}

export function AttendanceTypeForm({ onSubmit, initialData, mode, onCancel }: AttendanceTypeFormProps) {
  const [attendanceTypeName, setAttendanceTypeName] = useState(initialData?.attendanceTypeName || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!attendanceTypeName.trim()) {
      toast.error("Attendance Type Name is required");
      return;
    }

    onSubmit({
      attendanceTypeName: attendanceTypeName.trim()
    });

    if (mode === 'add') {
      setAttendanceTypeName("");
      toast.success("Attendance Type added successfully");
    } else {
      toast.success("Attendance Type updated successfully");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{mode === 'add' ? 'Add' : 'Edit'} Attendance Type</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="attendanceTypeName">Attendance Type Name *</Label>
            <Input
              id="attendanceTypeName"
              type="text"
              value={attendanceTypeName}
              onChange={(e) => setAttendanceTypeName(e.target.value)}
              placeholder='e.g., "Sick Leave", "Present (Visa/ID)"'
              required
            />
          </div>
          
          <div className="flex gap-2">
            <Button type="submit">
              {mode === 'add' ? 'Add' : 'Update'} Attendance Type
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
