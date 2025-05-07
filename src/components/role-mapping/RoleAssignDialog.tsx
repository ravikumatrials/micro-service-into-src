
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
import { Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useState } from "react";

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
  onRemoveRole?: () => void;
}

export function RoleAssignDialog({
  open,
  onOpenChange,
  employee,
  roles,
  onAssignRole,
  onRemoveRole,
}: RoleAssignDialogProps) {
  const [confirmRemoveOpen, setConfirmRemoveOpen] = useState(false);

  const handleAssign = (role: string) => {
    onAssignRole(role);
    onOpenChange(false);
    toast.success(`Role successfully ${employee?.currentRole ? 'updated' : 'assigned'} for ${employee?.name}`);
  };

  const handleRemoveClick = () => {
    setConfirmRemoveOpen(true);
  };

  const confirmRemoveRole = () => {
    setConfirmRemoveOpen(false);
    onOpenChange(false);
    
    if (onRemoveRole) {
      onRemoveRole();
      
      // Log the audit trail - in a real app, this would be sent to the backend
      const auditLog = {
        employeeId: employee?.employeeId,
        removedRole: employee?.currentRole,
        removedBy: "Admin User", // This would come from the auth context in a real app
        timestamp: new Date().toISOString()
      };
      
      console.log("Role removal audit log:", auditLog);
      
      toast.success(`Role successfully removed from ${employee?.name}`);
    }
  };

  if (!employee) return null;

  return (
    <>
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
            
            {employee.currentRole && onRemoveRole && (
              <div className="pt-2">
                <Button 
                  variant="destructive" 
                  onClick={handleRemoveClick}
                  className="w-full flex items-center justify-center"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove Role
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Confirmation Dialog for Role Removal */}
      <AlertDialog open={confirmRemoveOpen} onOpenChange={setConfirmRemoveOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Role Removal</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove the role from Employee {employee.employeeId}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRemoveRole} className="bg-red-600 hover:bg-red-700">
              Yes, Remove Role
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
