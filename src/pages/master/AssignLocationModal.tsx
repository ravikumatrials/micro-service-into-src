
import { useState, useEffect } from "react";
import { MapPin, Hexagon, Square } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface AssignLocationProps {
  project: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (projectId: string, geofenceData: string) => void;
}

export default function AssignLocationModal({
  project,
  open,
  onOpenChange,
  onSave
}: AssignLocationProps) {
  const [polygonCoordinates, setPolygonCoordinates] = useState<Array<{lat: number, lng: number}>>([]);
  const { toast } = useToast();
  
  // Generate random polygon coordinates for simulation
  useEffect(() => {
    if (!open) return;
    
    // Check if project already has coordinates
    if (project?.coordinates?.geofenceData) {
      try {
        const parsedCoordinates = JSON.parse(project.coordinates.geofenceData);
        setPolygonCoordinates(parsedCoordinates);
        return;
      } catch (e) {
        console.error("Error parsing geofence data", e);
      }
    }
    
    // Generate random coordinates for simulated polygon
    const center = { lat: 25.276987, lng: 55.296249 }; // Default point (Dubai)
    const points = 6; // Hexagon
    const radius = 0.01; // Small radius for the polygon
    
    const coordinates = [];
    for (let i = 0; i < points; i++) {
      const angle = (i / points) * Math.PI * 2;
      coordinates.push({
        lat: center.lat + Math.sin(angle) * radius,
        lng: center.lng + Math.cos(angle) * radius
      });
    }
    
    setPolygonCoordinates(coordinates);
  }, [open, project]);

  const handleSave = () => {
    // Prepare simulated polygon data
    const geofenceData = JSON.stringify(polygonCoordinates);
    onSave(project.id, geofenceData);
    
    // Show success toast
    toast({
      title: "Success",
      description: "Dummy location perimeter saved successfully.",
    });
    
    // Close the dialog
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Hexagon className="h-5 w-5 text-proscape" />
            Assign Location Perimeter
          </DialogTitle>
          <DialogDescription>
            Define the geographical boundary for this project
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-3">
          <div className="text-sm font-medium mb-2">
            Project: <span className="text-gray-700">{project?.name}</span>
          </div>
          
          <div className="text-xs text-gray-500 mb-2">
            The polygon below represents the simulated perimeter of the project area.
          </div>

          <div className="relative h-[400px] w-full rounded-md border border-gray-200 bg-gray-100 overflow-hidden">
            {/* Static Map Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute inset-0 bg-[#F1F1F1] z-0"></div>
              
              {/* Map Label */}
              <div className="absolute top-4 left-4 bg-white/80 px-3 py-1 rounded-md text-sm font-medium text-gray-500 shadow-sm z-10">
                Map Preview (Simulated)
              </div>
              
              {/* Grid lines to simulate map */}
              <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 z-0">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div key={i} className="border border-gray-200/40"></div>
                ))}
              </div>
              
              {/* Simulated Polygon */}
              <div className="relative w-3/4 h-3/4 max-w-md max-h-md z-10">
                <svg width="100%" height="100%" viewBox="0 0 200 200" className="drop-shadow-sm">
                  <polygon 
                    points="100,20 160,50 160,150 100,180 40,150 40,50" 
                    fill="#42a5f5" 
                    fillOpacity="0.3" 
                    stroke="#1976d2" 
                    strokeWidth="2" 
                  />
                </svg>
                
                {/* Polygon Label */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 px-2 py-1 rounded text-xs font-medium text-gray-700 shadow-sm whitespace-nowrap">
                  Simulated Project Perimeter
                </div>
              </div>
              
              {/* Compass rose */}
              <div className="absolute right-4 bottom-4 w-12 h-12 bg-white/80 rounded-full flex items-center justify-center shadow-sm z-10">
                <div className="relative w-8 h-8">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-600">N</div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-600">S</div>
                  <div className="absolute top-1/2 left-0 transform -translate-y-1/2 text-xs font-bold text-gray-600">W</div>
                  <div className="absolute top-1/2 right-0 transform -translate-y-1/2 text-xs font-bold text-gray-600">E</div>
                </div>
              </div>
            </div>
          </div>

          {/* Helper text */}
          <div className="text-sm">
            <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
              <div className="flex items-center font-medium text-blue-800 mb-1">
                <Square className="h-4 w-4 mr-1" /> 
                Simulation Notice
              </div>
              <p className="text-xs text-blue-600">
                This is a simulated project perimeter. Actual geofence will apply once integrated with Google Maps.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2 sm:justify-between">
          <div>
            {/* You could add an option here to adjust the simulated polygon if needed */}
          </div>
          <div className="flex gap-2">
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
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
