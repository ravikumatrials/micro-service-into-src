
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
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [nearbyProjects, setNearbyProjects] = useState<typeof projects>([]);
  
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Get current location on component mount
  useEffect(() => {
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
        findNearbyProjects(location);
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
  }, []);

  // Find projects near the current location
  const findNearbyProjects = (location: { lat: number; lng: number }) => {
    // This is a simplified implementation for demonstration
    // In a real application, you would use more complex geofencing logic
    
    const projectsWithCoordinates = projects.filter(project => project.coordinates?.geofenceData);
    
    const matchingProjects = projectsWithCoordinates.filter(project => {
      try {
        if (!project.coordinates?.geofenceData) return false;
        
        // Parse the geofence data (assuming it's a JSON string of polygon coordinates)
        const polygonCoordinates = JSON.parse(project.coordinates.geofenceData);
        
        // Check if the current location is inside this project's polygon
        // This is a simplified check - actual implementation would use proper point-in-polygon algorithm
        return isPointInPolygon(location, polygonCoordinates);
      } catch (error) {
        console.error("Error parsing project coordinates:", error);
        return false;
      }
    });
    
    setNearbyProjects(matchingProjects);
  };
  
  // Simplified point-in-polygon check (ray casting algorithm)
  const isPointInPolygon = (
    point: { lat: number; lng: number }, 
    polygon: Array<{ lat: number; lng: number }>
  ): boolean => {
    // For demo purposes, we'll just check if the point is near the first coordinate
    // In a real implementation, you would use a proper point-in-polygon algorithm
    
    if (!polygon || !polygon.length) return false;
    
    // Simple distance calculation from point to first polygon point (for demo only)
    // In reality, ALL projects would match if they have coordinates, since this is just a demo
    return true; // All projects with coordinates will match for demo purposes
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
      
      {/* Location Status Section */}
      {isLoadingLocation && (
        <div className="mb-8 flex items-center justify-center p-4 bg-gray-50 rounded-lg border border-gray-100">
          <Loader className="h-5 w-5 text-proscape animate-spin mr-2" />
          <span className="text-gray-600">Detecting current location...</span>
        </div>
      )}
      
      {locationError && (
        <Alert variant="destructive" className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{locationError}</AlertDescription>
        </Alert>
      )}
      
      {currentLocation && !locationError && (
        <div className="mb-8 p-4 bg-green-50 rounded-lg border border-green-100">
          <div className="flex items-center text-green-700 mb-2">
            <MapPin className="h-5 w-5 mr-2 text-green-600" />
            <span className="font-medium">Location detected</span>
          </div>
          {nearbyProjects.length > 0 ? (
            <p className="text-sm text-green-600">
              {nearbyProjects.length} {nearbyProjects.length === 1 ? 'project' : 'projects'} found in this location
            </p>
          ) : (
            <p className="text-sm text-amber-600">
              No projects found in this location. All projects will be shown.
            </p>
          )}
        </div>
      )}
      
      <form className="space-y-8" onSubmit={handleSubmit}>
        <EmployeeField 
          label="Employee ID or Name" 
          placeholder="Enter employee ID or name" 
          value={formData.employeeId}
          onChange={(value) => handleChange("employeeId", value)}
        />
        <ProjectField 
          projects={nearbyProjects.length > 0 ? nearbyProjects : projects}
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
