
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Define interface for component props
interface AssignRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: {
    name: string;
    employeeId: string;
    email?: string;
  } | null;
  roles: { name: string; id?: number }[];
  onAssignRole: (role: string) => void;
}

export function AssignRoleDialog({
  open,
  onOpenChange,
  employee,
  roles,
  onAssignRole,
}: AssignRoleDialogProps) {
  // State for the dialog steps
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [loginMethod, setLoginMethod] = useState<"employeeId" | "email">("employeeId");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Reset the dialog state when it opens or employee changes
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetState();
    }
    onOpenChange(open);
  };
  
  // Reset all state to default values
  const resetState = () => {
    setStep(1);
    setSelectedRole("");
    setLoginMethod("employeeId");
    setPassword("");
    setConfirmPassword("");
    setError("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  // Handle continuing to step 2
  const handleContinue = () => {
    if (!selectedRole) {
      setError("Please select a role");
      return;
    }
    
    // Default to employee's email if available, otherwise use employeeId
    if (employee?.email) {
      setLoginMethod("email");
    } else {
      setLoginMethod("employeeId");
    }
    
    setError("");
    setStep(2);
  };

  // Handle assigning the role with credentials
  const handleAssign = () => {
    // Validate form
    if (!password || !confirmPassword) {
      setError("Please fill in all password fields");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    
    // If email login method is selected but no email is provided
    if (loginMethod === "email" && !employee?.email) {
      setError("Employee does not have an email address");
      return;
    }
    
    // Log the role assignment (in a real app, this would be sent to the backend)
    console.log("Assigning role to employee:", employee?.employeeId);
    console.log("Selected role:", selectedRole);
    console.log("Login method:", loginMethod);
    
    // Call the parent component's callback
    onAssignRole(selectedRole);
    
    toast({
      title: "Role Assigned Successfully",
      description: `${employee?.name} has been assigned the role of ${selectedRole}.`,
    });
    
    // Reset state and close dialog
    resetState();
    onOpenChange(false);
  };
  
  // Format the display of login method
  const getLoginMethodDisplay = () => {
    if (selectedRole && employee) {
      if (loginMethod === "email" && employee.email) {
        return `Login Method: Email ID – ${employee.email}`;
      } else {
        return `Login Method: Employee ID – ${employee.employeeId}`;
      }
    }
    return "";
  };

  if (!employee) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign Role</DialogTitle>
          <DialogDescription>
            Assign a role to {employee.name} ({employee.employeeId})
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {step === 1 ? (
            // Step 1: Select Role
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Select Role</label>
                <Select 
                  value={selectedRole} 
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
              
              {selectedRole && (
                <Alert className="bg-blue-50 border-blue-200">
                  <Info className="h-4 w-4 text-blue-500" />
                  <AlertDescription className="text-blue-700">
                    {getLoginMethodDisplay()}
                  </AlertDescription>
                </Alert>
              )}
              
              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}
            </div>
          ) : (
            // Step 2: Set Login Credentials
            <div className="space-y-4">
              {/* Login Method Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Login Method</label>
                <RadioGroup 
                  value={loginMethod} 
                  onValueChange={(value) => setLoginMethod(value as "employeeId" | "email")}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="employeeId" id="employeeId" />
                    <label htmlFor="employeeId" className="text-sm">
                      Employee ID: {employee.employeeId}
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value="email" 
                      id="email" 
                      disabled={!employee.email}
                    />
                    <label 
                      htmlFor="email" 
                      className={`text-sm ${!employee.email ? "text-gray-400" : ""}`}
                    >
                      Email ID: {employee.email || "Not available"}
                    </label>
                  </div>
                </RadioGroup>
              </div>
              
              {/* Password fields with visibility toggle */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">New Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}
            </div>
          )}
        </div>
        
        <DialogFooter>
          {step === 1 ? (
            // Step 1 Footer
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleContinue} disabled={!selectedRole}>
                Assign
              </Button>
            </>
          ) : (
            // Step 2 Footer
            <>
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={handleAssign}>
                Submit
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
