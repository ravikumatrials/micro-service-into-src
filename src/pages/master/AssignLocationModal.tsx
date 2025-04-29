
import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface AssignLocationProps {
  project: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (projectId: string, latitude: string, longitude: string) => void;
}

export default function AssignLocationModal({
  project,
  open,
  onOpenChange,
  onSave
}: AssignLocationProps) {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const { toast } = useToast();

  // Pre-fill values when editing
  useEffect(() => {
    if (project && project.location) {
      setLatitude(project.coordinates?.latitude || "");
      setLongitude(project.coordinates?.longitude || "");
    } else {
      // Reset form when opening for a new project
      setLatitude("");
      setLongitude("");
    }
  }, [project]);

  const handleSave = () => {
    // Basic validation
    if (!latitude.trim() || !longitude.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter both latitude and longitude",
        variant: "destructive"
      });
      return;
    }

    // Check if latitude and longitude are valid numbers
    if (isNaN(Number(latitude)) || isNaN(Number(longitude))) {
      toast({
        title: "Validation Error",
        description: "Latitude and longitude must be valid numbers",
        variant: "destructive"
      });
      return;
    }

    // Save the location
    onSave(project.id, latitude, longitude);
    
    // Show success toast
    toast({
      title: "Success",
      description: "Location assigned successfully",
      variant: "default"
    });
    
    // Close the dialog
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-proscape" />
            Assign Location
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-3">
          <div className="text-sm font-medium mb-2">
            Project: <span className="text-gray-700">{project?.name}</span>
          </div>

          <div className="space-y-3">
            <div className="grid gap-2">
              <label htmlFor="latitude" className="text-sm font-medium text-gray-700">
                Latitude
              </label>
              <Input
                id="latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="Enter latitude (e.g. 25.276987)"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="longitude" className="text-sm font-medium text-gray-700">
                Longitude
              </label>
              <Input
                id="longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="Enter longitude (e.g. 55.296249)"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2 sm:justify-end">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            className="bg-proscape hover:bg-proscape-dark text-white"
            onClick={handleSave}
          >
            Save Location
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
