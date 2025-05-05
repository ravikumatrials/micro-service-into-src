
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit, Clock, MapPin, Loader, AlertCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Employee {
  id: number;
  name: string;
  imageUrl: string;
}

interface ManualCheckInDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: Employee | null;
  projects: { id: number; name: string; coordinates?: { geofenceData: string } }[];
  locations: { id: number; name: string }[];
  onComplete: (projectId: string, locationId: string, time: string, reason: string) => void;
}

const ManualCheckInDialog = ({
  open,
  onOpenChange,
  employee,
  projects,
  locations,
  onComplete
}: ManualCheckInDialogProps) => {
  const [selectedProject, setSelectedProject] = useState("select-project");
  const [checkInTime, setCheckInTime] = useState("");
  const [reason, setReason] = useState("");
  
  // Location states
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  
  // Nearest location based on coordinates
  const [autoSelectedLocation, setAutoSelectedLocation] = useState("select-location");
  
  const [errors, setErrors] = useState({
    project: false,
    time: false,
    reason: false
  });
  
  // Reset form and initialize when dialog opens
  useEffect(() => {
    if (open) {
      // Set current time as default
      setCheckInTime(format(new Date(), "HH:mm"));
      setSelectedProject("select-project");
      setAutoSelectedLocation("select-location");
      setReason("");
      setCurrentLocation(null);
      setLocationError(null);
      setErrors({
        project: false,
        time: false,
        reason: false
      });
    }
  }, [open]);
  
  // When project changes, fetch location
  useEffect(() => {
    if (selectedProject !== "select-project") {
      detectCurrentLocation();
    }
  }, [selectedProject]);
  
  const detectCurrentLocation = () => {
    setIsLoadingLocation(true);
    setLocationError(null);
    setCurrentLocation(null);
    
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
        
        // Auto-select the nearest location (simplified for demo)
        // In a real implementation, you would calculate the closest location
        // based on the coordinates
        if (locations.length > 0) {
          setAutoSelectedLocation(locations[0].id.toString());
        }
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
  
  const handleSubmit = () => {
    // Validation
    const newErrors = {
      project: selectedProject === "select-project",
      time: !checkInTime,
      reason: !reason
    };
    
    setErrors(newErrors);
    
    if (Object.values(newErrors).some(Boolean) || !currentLocation) {
      if (!currentLocation && selectedProject !== "select-project") {
        setLocationError("Location required. Please allow location access to continue.");
      }
      return;
    }
    
    onComplete(selectedProject, autoSelectedLocation, checkInTime, reason);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center">
            <Edit className="mr-2 h-6 w-6" />
            Manual Check-In
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-5">
          {/* Employee info */}
          {employee && (
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-proscape">
                <img 
                  src={employee.imageUrl} 
                  alt={employee.name}
                  className="h-full w-full object-cover" 
                />
              </div>
              <div>
                <h3 className="text-lg font-medium">{employee.name}</h3>
                <p className="text-gray-500">ID: {employee.id}</p>
              </div>
            </div>
          )}
          
          {/* Project - First step */}
          <div className="space-y-2">
            <Label htmlFor="project">Project <span className="text-red-500">*</span></Label>
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger id="project" className={errors.project ? "border-red-500" : ""}>
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="select-project">Select project</SelectItem>
                {projects.map(project => (
                  <SelectItem key={project.id} value={project.id.toString()}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.project && (
              <p className="text-red-500 text-sm">Project is required</p>
            )}
          </div>
          
          {/* Location Status Section - only shown after project selection */}
          {selectedProject !== "select-project" && (
            <>
              {isLoadingLocation && (
                <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <Loader className="h-4 w-4 text-proscape animate-spin mr-2" />
                  <span className="text-sm text-gray-600">Detecting current location...</span>
                </div>
              )}
              
              {locationError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs">{locationError}</AlertDescription>
                </Alert>
              )}
              
              {currentLocation && !locationError && (
                <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                  <div className="flex items-center text-green-700 mb-1">
                    <MapPin className="h-4 w-4 mr-1 text-green-600" />
                    <span className="font-medium text-sm">Location detected</span>
                  </div>
                  <p className="text-xs text-green-600">
                    Your current location will be saved with this attendance record.
                  </p>
                </div>
              )}
            </>
          )}
          
          {/* Check-in Time */}
          <div className="space-y-2">
            <Label htmlFor="time" className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Check-in Time <span className="text-red-500">*</span>
            </Label>
            <Input
              id="time"
              type="time"
              value={checkInTime}
              onChange={(e) => setCheckInTime(e.target.value)}
              className={errors.time ? "border-red-500" : ""}
            />
            {errors.time && (
              <p className="text-red-500 text-sm">Check-in time is required</p>
            )}
          </div>
          
          {/* Reason */}
          <div className="space-y-2">
            <Label htmlFor="reason">
              Reason for Manual Check-In <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="reason"
              placeholder="Please provide a reason for manual check-in"
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className={errors.reason ? "border-red-500" : ""}
            />
            {errors.reason && (
              <p className="text-red-500 text-sm">Reason is required</p>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            className="bg-proscape hover:bg-proscape-dark"
            disabled={isLoadingLocation || (selectedProject !== "select-project" && !currentLocation)}
          >
            Submit Check-In
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManualCheckInDialog;
