
import { useState } from "react";
import { User } from "lucide-react";
import EmployeeField from "../ManualFormFields/EmployeeField";
import ProjectField from "../ManualFormFields/ProjectField";
import TimeField from "../ManualFormFields/TimeField";
import ReasonField from "../ManualFormFields/ReasonField";
import { useToast } from "@/hooks/use-toast";

interface ManualCheckInFormProps {
  projects: { id: number; name: string }[];
}

const ManualCheckInForm = ({ projects }: ManualCheckInFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    employeeId: "",
    project: "",
    checkInTime: "",
    reason: ""
  });
  
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate employee ID is numeric
    if (formData.employeeId && !/^\d+$/.test(formData.employeeId)) {
      toast({
        title: "Invalid Employee ID",
        description: "Employee ID must contain only numeric values",
        variant: "destructive"
      });
      return;
    }
    
    // Validation (simplified)
    if (!formData.employeeId || !formData.project || !formData.checkInTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Submit form logic would go here
    toast({
      title: "Manual Check-In Recorded",
      description: `Employee ${formData.employeeId} checked in successfully`,
    });
    
    // Reset form
    setFormData({
      employeeId: "",
      project: "",
      checkInTime: "",
      reason: ""
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto border-2 rounded-2xl p-12 bg-white shadow-2xl animate-fade-in">
      <h3 className="text-3xl font-semibold text-gray-900 mb-10 flex items-center gap-4">
        <User className="h-10 w-10 text-proscape" />
        Manual Check In
      </h3>
      <form className="space-y-8" onSubmit={handleSubmit}>
        <EmployeeField 
          label="Employee ID or Name" 
          placeholder="Enter employee ID or name" 
          value={formData.employeeId}
          onChange={(value) => handleChange("employeeId", value)}
        />
        <ProjectField 
          projects={projects}
          value={formData.project}
          onChange={(value) => handleChange("project", value)}
        />
        <TimeField 
          label="Check In Time" 
          value={formData.checkInTime}
          onChange={(value) => handleChange("checkInTime", value)}
        />
        <ReasonField 
          label="Reason for Manual Check In" 
          placeholder="Enter reason" 
          value={formData.reason}
          onChange={(value) => handleChange("reason", value)}
        />
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-proscape hover:bg-proscape-dark text-white px-10 py-4 rounded-xl text-xl font-medium transition-colors shadow-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManualCheckInForm;
