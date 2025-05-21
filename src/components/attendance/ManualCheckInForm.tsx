
import { useState, useEffect } from "react";
import { User, MapPin, AlertCircle } from "lucide-react";
import EmployeeField from "../ManualFormFields/EmployeeField";
import ProjectField from "../ManualFormFields/ProjectField";
import TimeField from "../ManualFormFields/TimeField";
import ReasonField from "../ManualFormFields/ReasonField";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FormField } from "@/components/ui/form";

interface ManualCheckInFormProps {
  projects: { id: number; name: string; coordinates?: { geofenceData: string } }[];
}

// Define attendance reason options
const attendanceReasons = [
  { value: "medical", label: "Medical", type: "present_offsite" },
  { value: "visa", label: "Visa", type: "present_offsite" },
  { value: "id", label: "ID", type: "present_offsite" },
  { value: "sick", label: "Sick", type: "absent_excused" },
  { value: "casual", label: "Casual", type: "absent_unexcused" }
];

const ManualCheckInForm = ({ projects }: ManualCheckInFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    employeeId: "",
    project: "",
    checkInTime: "",
    reason: "",
    attendanceStatus: "present", // New field: 'present', 'present_offsite', 'absent_excused', 'absent_unexcused'
    attendanceReason: "" // New field for attendance reason dropdown
  });
  
  // Location states
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [assignedLocation, setAssignedLocation] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  
  // Track if the check-in is a facial recognition check-in
  const [isFacialCheckIn, setIsFacialCheckIn] = useState(false);
  
  // Determine if attendance reason field should be displayed
  const shouldShowAttendanceReason = !isFacialCheckIn && (
    formData.attendanceStatus === "absent_excused" || 
    formData.attendanceStatus === "absent_unexcused" || 
    formData.attendanceStatus === "present_offsite"
  );

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // When project is selected, fetch assigned location
    if (field === "project" && value) {
      fetchAssignedLocation(value);
    } else if (field === "project" && !value) {
      // Reset location info if project is deselected
      setAssignedLocation(null);
      setLocationError(null);
    }
    
    // Update attendance status based on selected reason
    if (field === "attendanceReason" && value) {
      const selectedReason = attendanceReasons.find(reason => reason.value === value);
      if (selectedReason) {
        setFormData(prev => ({ ...prev, attendanceStatus: selectedReason.type }));
      }
    }
  };

  // Get assigned location for the selected project
  const fetchAssignedLocation = (projectId: string) => {
    setLocationError(null);
    setIsLoadingLocation(true);
    
    try {
      // Find the selected project
      const selectedProject = projects.find(p => p.id.toString() === projectId);
      
      // Dummy location assignment based on project
      if (selectedProject) {
        const dummyLocations: { [key: string]: string } = {
          "1": "Dubai Expo Zone - Sector 3B",
          "2": "Sheikh Zayed Road - Site 17",
          "3": "Al Quoz Industrial Area - Block C",
          "4": "Business Bay - Tower 4 Plot",
          "5": "Dubai Marina - Waterfront Development"
        };
        
        const locationName = dummyLocations[projectId] || `${selectedProject.name} Site`;
        
        setTimeout(() => {
          setIsLoadingLocation(false);
          setAssignedLocation(`Project Location: ${locationName}`);
          toast({
            title: "Location assigned",
            description: "Project's assigned location has been retrieved."
          });
        }, 500); // Short delay to simulate fetch
      } else {
        // If project doesn't exist
        setIsLoadingLocation(false);
        setLocationError("No location assigned to this project.");
      }
    } catch (error) {
      console.error("Error fetching assigned location:", error);
      setLocationError("Failed to retrieve project location. Please try again.");
      setIsLoadingLocation(false);
    }
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
    
    // Check if location was successfully fetched
    if (!assignedLocation) {
      toast({
        title: "Location Required",
        description: "Project must have an assigned location to complete check-in",
        variant: "destructive"
      });
      return;
    }
    
    // Validate attendance reason is provided when required
    if (shouldShowAttendanceReason && !formData.attendanceReason) {
      toast({
        title: "Attendance Reason Required",
        description: "Please select an attendance reason for this check-in",
        variant: "destructive"
      });
      return;
    }
    
    // Submit form logic would go here
    toast({
      title: "Manual Check-In Recorded",
      description: `Employee ${formData.employeeId} checked in successfully${formData.attendanceReason ? ` (${attendanceReasons.find(r => r.value === formData.attendanceReason)?.label})` : ''}`,
    });
    
    // Reset form
    setFormData({
      employeeId: "",
      project: "",
      checkInTime: "",
      reason: "",
      attendanceStatus: "present",
      attendanceReason: ""
    });
    setAssignedLocation(null);
  };

  return (
    <div className="w-full max-w-3xl mx-auto border-2 rounded-2xl p-12 bg-white shadow-2xl animate-fade-in">
      <h3 className="text-3xl font-semibold text-gray-900 mb-10 flex items-center gap-4">
        <User className="h-10 w-10 text-proscape" />
        Manual Check In
      </h3>
      
      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Project selection comes first */}
        <ProjectField 
          projects={projects}
          value={formData.project}
          onChange={(value) => handleChange("project", value)}
        />
        
        {/* Location Status Section - only shown after project selection */}
        {formData.project && (
          <>
            {isLoadingLocation && (
              <div className="mb-4 flex items-center justify-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                <span className="text-gray-600">Retrieving assigned location...</span>
              </div>
            )}
            
            {locationError && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{locationError}</AlertDescription>
              </Alert>
            )}
            
            {assignedLocation && !locationError && (
              <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-100">
                <div className="flex items-center text-green-700">
                  <MapPin className="h-5 w-5 mr-2 text-green-600" />
                  <span className="font-medium">{assignedLocation}</span>
                </div>
                <p className="text-sm text-green-600 mt-1">
                  This assigned location will be saved with the attendance record.
                </p>
              </div>
            )}
          </>
        )}
        
        <EmployeeField 
          label="Employee ID or Name" 
          placeholder="Enter employee ID or name" 
          value={formData.employeeId}
          onChange={(value) => handleChange("employeeId", value)}
        />
        
        <TimeField 
          label="Check In Time" 
          value={formData.checkInTime}
          onChange={(value) => handleChange("checkInTime", value)}
        />
        
        {/* New Attendance Reason dropdown - only shown when applicable */}
        <div className={`${shouldShowAttendanceReason ? 'block' : 'hidden'} space-y-2`}>
          <Label className="text-xl font-medium text-gray-700">
            Attendance Reason <span className="text-red-500">*</span>
          </Label>
          <Select 
            value={formData.attendanceReason} 
            onValueChange={(value) => handleChange("attendanceReason", value)}
          >
            <SelectTrigger className="w-full px-5 py-4 text-xl border-gray-300">
              <SelectValue placeholder="Select a reason" />
            </SelectTrigger>
            <SelectContent>
              {attendanceReasons.map((reason) => (
                <SelectItem key={reason.value} value={reason.value}>
                  {reason.label} → {reason.type === "present_offsite" ? "Present (Off-site)" : 
                                    reason.type === "absent_excused" ? "Absent (Excused)" : 
                                    "Absent (Unexcused)"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-gray-500">
            Required for manual check-ins without face recognition
          </p>
        </div>
        
        <ReasonField 
          label="Additional Comments (Optional)" 
          placeholder="Enter any additional comments" 
          value={formData.reason}
          onChange={(value) => handleChange("reason", value)}
        />
        
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-proscape hover:bg-proscape-dark text-white px-10 py-4 rounded-xl text-xl font-medium transition-colors shadow-md"
            disabled={isLoadingLocation || !assignedLocation || (shouldShowAttendanceReason && !formData.attendanceReason)}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManualCheckInForm;
