
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
import { toast } from "@/components/ui/use-toast";
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
  roles: { name: string; id?: number }[];
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
  const [selectedRole, setSelectedRole] = useState<string>("");

  // Initialize selectedRole when dialog opens
  const handleOpenChange = (open: boolean) => {
    if (open && employee?.currentRole) {
      setSelectedRole(employee.currentRole);
    } else if (!open) {
      // Clear selection when dialog closes
      setTimeout(() => setSelectedRole(""), 300);
    }
    onOpenChange(open);
  };

  const handleAssign = () => {
    if (!selectedRole) {
      toast({
        title: "Error",
        description: "Please select a role",
        variant: "destructive"
      });
      return;
    }
    
    onAssignRole(selectedRole);
    // Note: Dialog will be kept open by parent component until credentials are set
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
      
      toast({
        title: "Success",
        description: `Role successfully removed from ${employee?.name}`
      });
    }
  };

  if (!employee) return null;

  // Determine the dialog title and button text based on the context
  const getDialogTitle = () => {
    if (employee.currentRole) {
      return "Update Role";
    } else {
      return "Assign Role";
    }
  };

  const getButtonText = () => {
    if (employee.currentRole) {
      return "Update Role";
    } else {
      return "Assign Role";
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {getDialogTitle()}
            </DialogTitle>
            <DialogDescription>
              {employee.name} ({employee.employeeId})
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Select Role</label>
              <Select 
                value={selectedRole || employee.currentRole || ""} 
                onValueChange={(value) => setSelectedRole(value)}
              >
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
            
            <div className="pt-2 flex justify-between">
              {employee.currentRole && onRemoveRole && (
                <Button 
                  variant="destructive" 
                  onClick={handleRemoveClick}
                  className="flex items-center justify-center"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove Role
                </Button>
              )}
              
              <Button 
                variant="default" 
                onClick={handleAssign}
                className={employee.currentRole && onRemoveRole ? "" : "w-full"}
              >
                {getButtonText()}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Confirmation Dialog for Role Removal */}
      <AlertDialog open={confirmRemoveOpen} onOpenChange={setConfirmRemoveOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Role Removal</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove the role from {employee.name}? This will move the employee back to the Employees list.
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
