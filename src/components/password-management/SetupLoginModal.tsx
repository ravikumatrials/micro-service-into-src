
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
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type SetupLoginModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: any;
  onLoginSetup: (loginData: { loginId: string; password: string }) => void;
};

export function SetupLoginModal({ 
  open, 
  onOpenChange, 
  employee, 
  onLoginSetup 
}: SetupLoginModalProps) {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = () => {
    // Validation
    if (!loginId.trim()) {
      toast({
        title: "Validation Error",
        description: "Email or Employee ID is required.",
        variant: "destructive"
      });
      return;
    }

    if (!password) {
      toast({
        title: "Validation Error", 
        description: "Password is required.",
        variant: "destructive"
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Validation Error",
        description: "Password and Confirm Password must match.",
        variant: "destructive"
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Validation Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive"
      });
      return;
    }

    // Simulate checking for unique login ID (in real app, check against database)
    // For demo purposes, we'll assume it's unique
    
    onLoginSetup({ loginId, password });
    
    // Reset form
    setLoginId("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Setup Login for Employee</DialogTitle>
          <DialogDescription>
            Create login credentials for {employee?.name} (Employee ID: {employee?.employeeId})
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="loginId">Email or Employee ID *</Label>
            <Input
              id="loginId"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              placeholder="Enter email or employee ID for login"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password *</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (minimum 6 characters)"
              />
              <button
                type="button"
                className="absolute right-2 top-2.5 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password *</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
              />
              <button
                type="button"
                className="absolute right-2 top-2.5 text-gray-500 hover:text-gray-700"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            type="button" 
            onClick={handleSubmit}
          >
            Setup Login
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
