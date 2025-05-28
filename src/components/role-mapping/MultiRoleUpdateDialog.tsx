
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
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

type MultiRoleUpdateDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: any;
  availableRoles: string[];
  onUpdateRoles: (roles: string[]) => void;
  onRemoveAllRoles: () => void;
};

export function MultiRoleUpdateDialog({ 
  open, 
  onOpenChange, 
  employee, 
  availableRoles, 
  onUpdateRoles,
  onRemoveAllRoles
}: MultiRoleUpdateDialogProps) {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  useEffect(() => {
    if (open && employee) {
      setSelectedRoles(employee.assignedRoles || []);
    }
  }, [open, employee]);

  const handleRoleToggle = (role: string, checked: boolean) => {
    if (checked) {
      setSelectedRoles(prev => [...prev, role]);
    } else {
      setSelectedRoles(prev => prev.filter(r => r !== role));
    }
  };

  const handleSubmit = () => {
    onUpdateRoles(selectedRoles);
    onOpenChange(false);
  };

  const handleRemoveAll = () => {
    onRemoveAllRoles();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Roles</DialogTitle>
          <DialogDescription>
            Update roles for {employee?.name} (Employee ID: {employee?.employeeId})
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Available Roles</Label>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {availableRoles.map((role) => (
                <div key={role} className="flex items-center space-x-2">
                  <Checkbox
                    id={role}
                    checked={selectedRoles.includes(role)}
                    onCheckedChange={(checked) => handleRoleToggle(role, !!checked)}
                  />
                  <label
                    htmlFor={role}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {role}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {selectedRoles.length > 0 && (
            <div className="space-y-2">
              <Label>Selected Roles ({selectedRoles.length})</Label>
              <div className="flex flex-wrap gap-1">
                {selectedRoles.map((role) => (
                  <Badge key={role} className="bg-green-100 text-green-800">
                    {role}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between">
          <Button 
            type="button" 
            variant="destructive" 
            onClick={handleRemoveAll}
          >
            Remove All Roles
          </Button>
          <div className="flex space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={handleSubmit}
            >
              Update Roles ({selectedRoles.length})
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
