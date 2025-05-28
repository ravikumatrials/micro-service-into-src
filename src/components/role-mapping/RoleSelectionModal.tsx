
import { useState } from "react";
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
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

type RoleSelectionModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: any;
  availableRoles: string[];
  onContinue: (selectedRoles: string[]) => void;
};

export function RoleSelectionModal({ 
  open, 
  onOpenChange, 
  employee, 
  availableRoles,
  onContinue 
}: RoleSelectionModalProps) {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const handleAddRole = (roleToAdd: string) => {
    if (roleToAdd && !selectedRoles.includes(roleToAdd)) {
      setSelectedRoles([...selectedRoles, roleToAdd]);
    }
  };

  const handleRemoveRole = (roleToRemove: string) => {
    setSelectedRoles(selectedRoles.filter(role => role !== roleToRemove));
  };

  const handleContinue = () => {
    if (selectedRoles.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please select at least one role.",
        variant: "destructive"
      });
      return;
    }

    onContinue(selectedRoles);
  };

  const handleClose = () => {
    setSelectedRoles([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Roles to Assign</DialogTitle>
          <DialogDescription>
            Select roles to assign to {employee?.name} (Employee ID: {employee?.employeeId})
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Assigned Roles *</Label>
            <Select onValueChange={handleAddRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role to add" />
              </SelectTrigger>
              <SelectContent>
                {availableRoles
                  .filter(role => !selectedRoles.includes(role))
                  .map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedRoles.length > 0 && (
            <div className="space-y-2">
              <Label>Selected Roles:</Label>
              <div className="flex flex-wrap gap-2">
                {selectedRoles.map((role) => (
                  <Badge key={role} className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                    {role}
                    <button
                      type="button"
                      onClick={() => handleRemoveRole(role)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <X size={12} />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            type="button" 
            onClick={handleContinue}
            disabled={selectedRoles.length === 0}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
