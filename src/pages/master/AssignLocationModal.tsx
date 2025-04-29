
import { useState, useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "@googlemaps/js-api-loader";

// Import Google Maps types
/// <reference types="google.maps" />

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
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<{lat: number, lng: number} | null>(null);
  const { toast } = useToast();

  // Initialize map when modal opens
  useEffect(() => {
    if (!open || !mapRef.current || mapLoaded) return;

    // In a real app, you would use your Google Maps API key
    const loader = new Loader({
      apiKey: "DEMO_API_KEY_REPLACE_IN_PRODUCTION",
      version: "weekly",
    });

    loader
      .load()
      .then((google: any) => {
        const defaultPosition = { lat: 25.276987, lng: 55.296249 }; // Default to Dubai
        
        // If project already has coordinates, use them
        let initialPosition = defaultPosition;
        if (project?.coordinates?.latitude && project?.coordinates?.longitude) {
          initialPosition = {
            lat: parseFloat(project.coordinates.latitude),
            lng: parseFloat(project.coordinates.longitude)
          };
          setSelectedPosition(initialPosition);
        }

        // Create map
        const map = new google.maps.Map(mapRef.current!, {
          center: initialPosition,
          zoom: 14,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          streetViewControl: false,
          mapTypeControl: false,
        });

        // Create marker
        const marker = new google.maps.Marker({
          position: initialPosition,
          map: map,
          draggable: true,
          title: project?.name || "Project Location",
        });

        // Update position when marker is dragged
        google.maps.event.addListener(marker, 'dragend', function() {
          const position = marker.getPosition();
          if (position) {
            setSelectedPosition({
              lat: position.lat(),
              lng: position.lng()
            });
          }
        });

        // Allow clicking on map to set marker
        google.maps.event.addListener(map, 'click', function(event) {
          marker.setPosition(event.latLng);
          setSelectedPosition({
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
          });
        });

        // Store references
        googleMapRef.current = map;
        markerRef.current = marker;
        setMapLoaded(true);
      })
      .catch(error => {
        console.error("Error loading Google Maps", error);
        toast({
          title: "Error",
          description: "Failed to load Google Maps. Please try again.",
          variant: "destructive"
        });
      });

    return () => {
      // Cleanup
      googleMapRef.current = null;
      markerRef.current = null;
    };
  }, [open, project, mapLoaded, toast]);

  // Resize map when modal content is visible
  useEffect(() => {
    if (open && googleMapRef.current && mapLoaded) {
      setTimeout(() => {
        const google = window.google;
        if (google && googleMapRef.current) {
          google.maps.event.trigger(googleMapRef.current, 'resize');
        }
      }, 100);
    }
  }, [open, mapLoaded]);

  const handleSave = () => {
    if (!selectedPosition) {
      toast({
        title: "Error",
        description: "Please select a location on the map",
        variant: "destructive"
      });
      return;
    }

    // Save the location
    onSave(
      project.id, 
      selectedPosition.lat.toString(), 
      selectedPosition.lng.toString()
    );
    
    // Show success toast
    toast({
      title: "Success",
      description: "Location assigned successfully",
    });
    
    // Close the dialog
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden">
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

          <div className="relative h-[400px] w-full rounded-md border">
            <div 
              ref={mapRef} 
              className="absolute inset-0 rounded-md"
              style={{ height: '100%', width: '100%' }}
            />

            {!mapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-md">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-proscape mx-auto"></div>
                  <p className="mt-2 text-sm text-gray-600">Loading map...</p>
                </div>
              </div>
            )}
          </div>

          {selectedPosition && (
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Latitude: </span>
                <span>{selectedPosition.lat.toFixed(6)}</span>
              </div>
              <div>
                <span className="font-medium">Longitude: </span>
                <span>{selectedPosition.lng.toFixed(6)}</span>
              </div>
            </div>
          )}
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
