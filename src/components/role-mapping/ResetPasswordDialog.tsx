
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface ResetPasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: {
    name: string;
    employeeId: string;
    loginMethod?: string;
  } | null;
  // Add the onPasswordReset callback property
  onPasswordReset?: () => void;
}

export function ResetPasswordDialog({
  open,
  onOpenChange,
  employee,
  onPasswordReset,
}: ResetPasswordDialogProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  
  if (!employee) return null;
  
  const isEmailLogin = employee.loginMethod?.toLowerCase().includes("email");
  
  const handleReset = () => {
    // Form validation
    if (!newPassword || !confirmPassword) {
      setError("Please fill in all password fields");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    
    // Reset password logic would go here
    // For this demo, we'll just show a success message
    
    // Log the password reset - in a real app, this would be sent to the backend
    console.log("Password reset for employee:", employee.employeeId);
    
    if (isEmailLogin) {
      toast({
        title: "Password Reset Email Sent",
        description: `A password reset link has been sent to ${employee.name}'s email.`,
      });
    } else {
      toast({
        title: "Password Reset Successful",
        description: `Password for ${employee.name} has been reset. Please share the new password with the employee.`,
      });
    }
    
    // Call the onPasswordReset callback if provided
    if (onPasswordReset) {
      onPasswordReset();
    }
    
    // Reset form and close dialog
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    onOpenChange(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Reset form when dialog closes
      setNewPassword("");
      setConfirmPassword("");
      setError("");
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogDescription>
            Reset password for {employee.name} ({employee.employeeId})
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {isEmailLogin ? (
            <Alert className="bg-blue-50 border-blue-200">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-700">
                A password reset email will be sent to the employee's registered email address.
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="bg-amber-50 border-amber-200">
              <Info className="h-4 w-4 text-amber-500" />
              <AlertDescription className="text-amber-700">
                You will need to share the new password with the employee offline.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">New Password</label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Confirm Password</label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />
          </div>
          
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleReset}>
            Reset Password
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
