
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ResetPasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    name: string;
    employeeId: string;
    email?: string;
    currentLoginMethod?: "employeeId" | "email";
    hasAccount?: boolean;
  } | null;
}

export function ResetPasswordDialog({
  open,
  onOpenChange,
  user,
}: ResetPasswordDialogProps) {
  const [loginMethod, setLoginMethod] = useState<"employeeId" | "email">("employeeId");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});

  // When the dialog opens, set the default login method based on user data
  useEffect(() => {
    if (user && open) {
      // If user has a current login method, use that as default
      if (user.currentLoginMethod) {
        setLoginMethod(user.currentLoginMethod);
      } else if (user.email) {
        // If no current method but email exists, default to email
        setLoginMethod("email");
      } else {
        // Default to employee ID if no email
        setLoginMethod("employeeId");
      }
      
      // Reset form fields
      setPassword("");
      setConfirmPassword("");
      setErrors({});
    }
  }, [user, open]);

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
    if (loginMethod === "employeeId") {
      // Reset password for employee ID login (would be API call in real app)
      console.log("Resetting password for:", user.employeeId, password);
      
      // Show success toast
      toast.success("Password reset. Please share it offline with the employee.");
    } else {
      // Reset password for email login (would be API call in real app)
      console.log("Resetting password for email:", user.email, password);
      
      // In a real app, this would trigger a reset email
      console.log("Sending reset email to:", user.email);
      
      // Show success toast
      toast.success("Password reset and notification email sent to the employee.");
    }
    
    // Reset form
    setPassword("");
    setConfirmPassword("");
    setErrors({});
    
    // Close dialog
    onOpenChange(false);
  };

  if (!user) return null;

  const noAccount = user.hasAccount === false;
  const hasCurrentLoginMethod = user.currentLoginMethod !== undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {noAccount ? "Set Password" : "Reset Password"}
          </DialogTitle>
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
            
            {/* Always display current login method section */}
            <p className="font-medium">Current Login Method:</p>
            {hasCurrentLoginMethod ? (
              <Badge className="bg-purple-100 text-purple-800 inline-flex">
                {user.currentLoginMethod === "employeeId" ? "Employee ID" : "Email ID"}
              </Badge>
            ) : (
              <Badge className="bg-gray-100 text-gray-800 inline-flex">
                Not Set
              </Badge>
            )}
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">Select login method:</h4>
            <RadioGroup 
              value={loginMethod}
              onValueChange={(value) => setLoginMethod(value as "employeeId" | "email")}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="employeeId" id="reset-employeeId" />
                <Label htmlFor="reset-employeeId">Login via Employee ID</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem 
                  value="email" 
                  id="reset-email" 
                  disabled={!user.email}
                />
                <Label 
                  htmlFor="reset-email" 
                  className={!user.email ? "text-gray-400" : ""}
                >
                  Login via Email ID {!user.email && "(Email not available)"}
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reset-password">New Password</Label>
              <Input
                id="reset-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reset-confirmPassword">Confirm Password</Label>
              <Input
                id="reset-confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={errors.confirmPassword ? "border-red-500" : ""}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>
          </div>
          
          {/* Display login method specific instructions */}
          {loginMethod === "employeeId" ? (
            <div className="bg-blue-50 p-3 rounded-md flex items-start gap-2">
              <Lock className="h-4 w-4 text-blue-500 mt-0.5" />
              <p className="text-sm text-blue-700">
                {noAccount ? "Password will be set" : "Password will be reset"} for Employee ID login. 
                You'll need to share the new password with the employee offline.
              </p>
            </div>
          ) : user.email && (
            <div className="bg-blue-50 p-3 rounded-md flex items-start gap-2">
              <Mail className="h-4 w-4 text-blue-500 mt-0.5" />
              <p className="text-sm text-blue-700">
                An email will be sent to {user.email} with {noAccount ? "login" : "password reset"} instructions.
              </p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleResetPassword}>
            {noAccount ? "Create Password" : "Reset Password"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
