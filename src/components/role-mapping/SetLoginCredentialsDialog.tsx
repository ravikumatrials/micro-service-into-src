
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface SetLoginCredentialsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: {
    name: string;
    employeeId: string;
    email?: string;
  } | null;
}

export function SetLoginCredentialsDialog({
  open,
  onOpenChange,
  employee,
}: SetLoginCredentialsDialogProps) {
  const [loginMethod, setLoginMethod] = useState<"employeeId" | "email">("employeeId");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});

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

  const handleSave = () => {
    if (!validateForm() || !employee) return;
    
    // In a real app, this would call an API to save the credentials
    if (loginMethod === "employeeId") {
      // Store employee ID + password (would be API call in real app)
      console.log("Storing credentials for:", employee.employeeId, password);
      
      // Show success toast
      toast.success("Login created. Please share the credentials offline.");
    } else {
      // Store email + password (would be API call in real app)
      console.log("Storing credentials for email:", employee.email, password);
      
      // In a real app, this would trigger an email
      console.log("Sending email to:", employee.email);
      
      // Show success toast
      toast.success("Login created and email notification sent.");
    }
    
    // Reset form
    setPassword("");
    setConfirmPassword("");
    setErrors({});
    
    // Close dialog
    onOpenChange(false);
  };

  if (!employee) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set Login Credentials</DialogTitle>
          <DialogDescription>
            {employee.name} ({employee.employeeId})
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h4 className="font-medium">How should this employee log in?</h4>
            <RadioGroup 
              value={loginMethod}
              onValueChange={(value) => setLoginMethod(value as "employeeId" | "email")}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="employeeId" id="employeeId" />
                <Label htmlFor="employeeId">Login via Employee ID</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="email" />
                <Label htmlFor="email">Login via Email ID</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Set Password</Label>
              <Input
                id="password"
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
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
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
        </div>
        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Credentials
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
