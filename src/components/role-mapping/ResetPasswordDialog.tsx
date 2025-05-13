
import { useState, useEffect } from "react";
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
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, Eye, EyeOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ResetPasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    name: string;
    employeeId: string;
    email?: string;
    currentLoginMethod?: "employeeId" | "email";
  } | null;
  onPasswordReset?: () => void;
}

export function ResetPasswordDialog({
  open,
  onOpenChange,
  user,
  onPasswordReset,
}: ResetPasswordDialogProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setPassword("");
      setConfirmPassword("");
      setErrors({});
    }
  }, [open]);

  const validateForm = () => {
    const newErrors: {
      password?: string;
      confirmPassword?: string;
    } = {};
    
    // Check password length
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    // Check if passwords match
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = () => {
    if (!validateForm() || !user) return;
    
    // In a real app, this would call an API to reset the password
    console.log(`Resetting password for ${user.name} (${user.employeeId})`);
    
    if (user.currentLoginMethod === "employeeId") {
      // Update password for employeeId login
      console.log("Updating password for employee ID login");
      
      // In a real app, this would update the password in the database
      toast.success(`Password reset successfully for ${user.name}`);
    } else if (user.currentLoginMethod === "email" && user.email) {
      // Update password for email login and send notification
      console.log("Updating password for email login");
      console.log(`Sending password reset email to: ${user.email}`);
      
      // In a real app, this would send an email
      toast.success(`Password reset email sent to ${user.email}`);
    }
    
    // Reset form
    setPassword("");
    setConfirmPassword("");
    setErrors({});
    
    // Close dialog
    onOpenChange(false);
    
    // Call onPasswordReset callback if provided
    if (onPasswordReset) {
      onPasswordReset();
    }
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogDescription>
            {user.name} ({user.employeeId})
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {/* Display user information */}
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p className="font-medium">Employee ID:</p>
            <p>{user.employeeId}</p>
            
            <p className="font-medium">Email ID:</p>
            <p>{user.email || "–"}</p>
            
            <p className="font-medium">Login Method:</p>
            <Badge className="bg-purple-100 text-purple-800 inline-flex">
              {user.currentLoginMethod === "employeeId" ? "Employee ID" : "Email ID"}
            </Badge>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={errors.password ? "border-red-500" : ""}
                />
                <button
                  type="button"
                  className="absolute right-2 top-2.5 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={errors.confirmPassword ? "border-red-500" : ""}
                />
                <button
                  type="button"
                  className="absolute right-2 top-2.5 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>
          </div>
          
          {/* Display login method specific instructions */}
          {user.currentLoginMethod === "employeeId" ? (
            <div className="bg-blue-50 p-3 rounded-md flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">ℹ️</span>
              <p className="text-sm text-blue-700">
                Password will be reset for Employee ID login. You'll need to share the new password with the employee offline.
              </p>
            </div>
          ) : user.email && (
            <div className="bg-blue-50 p-3 rounded-md flex items-start gap-2">
              <Mail className="h-4 w-4 text-blue-500 mt-0.5" />
              <p className="text-sm text-blue-700">
                An email will be sent to {user.email} with instructions to set a new password.
              </p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleResetPassword}>
            Reset Password
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
