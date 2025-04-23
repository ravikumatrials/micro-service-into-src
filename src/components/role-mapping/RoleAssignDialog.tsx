
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface RoleAssignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: {
    name: string;
    employeeId: string;
    currentRole?: string;
  } | null;
  roles: { name: string }[];
  onAssignRole: (role: string) => void;
}

export function RoleAssignDialog({
  open,
  onOpenChange,
  employee,
  roles,
  onAssignRole,
}: RoleAssignDialogProps) {
  const handleAssign = (role: string) => {
    onAssignRole(role);
    onOpenChange(false);
    toast.success(`Role successfully ${employee?.currentRole ? 'updated' : 'assigned'} for ${employee?.name}`);
  };

  if (!employee) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {employee.currentRole ? "Update Role" : "Assign Role"}
          </DialogTitle>
          <DialogDescription>
            {employee.name} ({employee.employeeId})
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Select Role</label>
            <Select defaultValue={employee.currentRole} onValueChange={handleAssign}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.name} value={role.name}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
