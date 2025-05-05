
import { useState, useEffect } from "react";
import { User, Loader, MapPin, AlertCircle } from "lucide-react";
import EmployeeField from "../ManualFormFields/EmployeeField";
import ProjectField from "../ManualFormFields/ProjectField";
import TimeField from "../ManualFormFields/TimeField";
import ReasonField from "../ManualFormFields/ReasonField";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ManualCheckInFormProps {
  projects: { id: number; name: string; coordinates?: { geofenceData: string } }[];
}

const ManualCheckInForm = ({ projects }: ManualCheckInFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    employeeId: "",
    project: "",
    checkInTime: "",
    reason: ""
  });
  
  // Location states
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // When project is selected, fetch location
    if (field === "project" && value) {
      fetchCurrentLocation();
    }
  };

  // Get current location when project is selected
  const fetchCurrentLocation = () => {
    setLocationError(null);
    setIsLoadingLocation(true);
    
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setCurrentLocation(location);
        setIsLoadingLocation(false);
        toast({
          title: "Location detected",
          description: "Your current location has been detected and will be saved with the attendance record."
        });
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLocationError(
          error.code === 1
            ? "Location access denied. Please enable location services."
            : "Unable to retrieve your location. Please try again."
        );
        setIsLoadingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
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
    if (!currentLocation) {
      toast({
        title: "Location Required",
        description: "Please allow location access to complete check-in",
        variant: "destructive"
      });
      return;
    }
    
    // Submit form logic would go here
    // In a real implementation, we would include the currentLocation in the data sent to the server
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
    setCurrentLocation(null);
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
                <Loader className="h-5 w-5 text-proscape animate-spin mr-2" />
                <span className="text-gray-600">Detecting current location...</span>
              </div>
            )}
            
            {locationError && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{locationError}</AlertDescription>
              </Alert>
            )}
            
            {currentLocation && !locationError && (
              <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-100">
                <div className="flex items-center text-green-700">
                  <MapPin className="h-5 w-5 mr-2 text-green-600" />
                  <span className="font-medium">Location detected</span>
                </div>
                <p className="text-sm text-green-600 mt-1">
                  Your current location will be saved with this attendance record.
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
            disabled={isLoadingLocation || !currentLocation}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManualCheckInForm;
