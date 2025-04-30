
import { useState, useEffect, useRef } from "react";
import { MapPin, Hexagon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "@googlemaps/js-api-loader";

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
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const drawingManagerRef = useRef<google.maps.drawing.DrawingManager | null>(null);
  const polygonRef = useRef<google.maps.Polygon | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [polygonComplete, setPolygonComplete] = useState(false);
  const [polygonCoordinates, setPolygonCoordinates] = useState<Array<{lat: number, lng: number}>>([]);
  const { toast } = useToast();

  // Initialize map when modal opens
  useEffect(() => {
    if (!open || !mapRef.current || mapLoaded) return;

    // In a real app, you would use your Google Maps API key
    const loader = new Loader({
      apiKey: "DEMO_API_KEY_REPLACE_IN_PRODUCTION",
      version: "weekly",
      libraries: ["drawing"]
    });

    loader
      .load()
      .then((google: any) => {
        const defaultPosition = { lat: 25.276987, lng: 55.296249 }; // Default to Dubai
        
        // Create map
        const map = new google.maps.Map(mapRef.current!, {
          center: defaultPosition,
          zoom: 14,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          streetViewControl: false,
          mapTypeControl: false,
        });

        // Initialize drawing manager for polygon creation
        const drawingManager = new google.maps.drawing.DrawingManager({
          drawingMode: google.maps.drawing.OverlayType.POLYGON,
          drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [google.maps.drawing.OverlayType.POLYGON]
          },
          polygonOptions: {
            fillColor: "#42a5f5",
            fillOpacity: 0.3,
            strokeWeight: 2,
            strokeColor: "#1976d2",
            clickable: true,
            editable: true,
            zIndex: 1
          }
        });

        drawingManager.setMap(map);
        
        // If project already has geofence data, display it
        if (project?.coordinates?.geofenceData) {
          try {
            const geofenceData = JSON.parse(project.coordinates.geofenceData);
            
            // Create a polygon with the saved coordinates
            const polygon = new google.maps.Polygon({
              paths: geofenceData,
              fillColor: "#42a5f5",
              fillOpacity: 0.3,
              strokeWeight: 2,
              strokeColor: "#1976d2",
              editable: true
            });
            
            polygon.setMap(map);
            polygonRef.current = polygon;
            setPolygonCoordinates(geofenceData);
            setPolygonComplete(true);
            
            // Fit the map to the polygon bounds
            const bounds = new google.maps.LatLngBounds();
            geofenceData.forEach((point: {lat: number, lng: number}) => {
              bounds.extend(new google.maps.LatLng(point.lat, point.lng));
            });
            map.fitBounds(bounds);
            
            // Switch drawing manager to edit mode since we already have a polygon
            drawingManager.setDrawingMode(null);
          } catch (e) {
            console.error("Error parsing geofence data", e);
            toast({
              title: "Error",
              description: "Could not load existing location perimeter data.",
              variant: "destructive"
            });
          }
        }
        
        // Handle polygon complete event
        google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
          // Store reference to the polygon
          polygonRef.current = polygon;
          
          // Get polygon coordinates
          const coordinates = polygon.getPath().getArray().map(coord => ({
            lat: coord.lat(),
            lng: coord.lng()
          }));
          
          setPolygonCoordinates(coordinates);
          setPolygonComplete(true);
          
          // Switch to selection mode after drawing is complete
          drawingManager.setDrawingMode(null);
          
          // Add listener for path changes (when user edits the polygon)
          google.maps.event.addListener(polygon.getPath(), 'set_at', function() {
            updatePolygonCoordinates(polygon);
          });
          
          google.maps.event.addListener(polygon.getPath(), 'insert_at', function() {
            updatePolygonCoordinates(polygon);
          });
        });
        
        // Store references
        googleMapRef.current = map;
        drawingManagerRef.current = drawingManager;
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
      drawingManagerRef.current = null;
      polygonRef.current = null;
    };
  }, [open, project, mapLoaded, toast]);

  // Function to update coordinates when polygon is edited
  const updatePolygonCoordinates = (polygon: google.maps.Polygon) => {
    const path = polygon.getPath();
    const coordinates = [];
    
    for (let i = 0; i < path.getLength(); i++) {
      const point = path.getAt(i);
      coordinates.push({
        lat: point.lat(),
        lng: point.lng()
      });
    }
    
    setPolygonCoordinates(coordinates);
  };

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
    if (!polygonComplete || polygonCoordinates.length < 3) {
      toast({
        title: "Error",
        description: "Please draw a complete perimeter on the map",
        variant: "destructive"
      });
      return;
    }

    // Save the geofence data
    const geofenceData = JSON.stringify(polygonCoordinates);
    onSave(project.id, geofenceData);
    
    // Show success toast
    toast({
      title: "Success",
      description: "Location perimeter assigned successfully",
    });
    
    // Close the dialog
    onOpenChange(false);
  };

  const handleClearPolygon = () => {
    if (polygonRef.current) {
      polygonRef.current.setMap(null);
      polygonRef.current = null;
    }
    
    setPolygonCoordinates([]);
    setPolygonComplete(false);
    
    // Set drawing mode back to polygon
    if (drawingManagerRef.current) {
      drawingManagerRef.current.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Hexagon className="h-5 w-5 text-proscape" />
            Assign Location Perimeter
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-3">
          <div className="text-sm font-medium mb-2">
            Project: <span className="text-gray-700">{project?.name}</span>
          </div>
          
          <div className="text-xs text-gray-500 mb-2">
            Draw a polygon to define the perimeter of the project area. Employees within this area will be recognized as present at this location.
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

          {polygonComplete && (
            <div className="text-sm">
              <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                <div className="flex items-center font-medium text-blue-800 mb-1">
                  <Hexagon className="h-4 w-4 mr-1" /> 
                  Location Perimeter Configured
                </div>
                <p className="text-xs text-blue-600">
                  A perimeter with {polygonCoordinates.length} points has been defined for this project.
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex gap-2 sm:justify-between">
          <div>
            {polygonComplete && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearPolygon}
              >
                Clear & Redraw
              </Button>
            )}
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
              disabled={!polygonComplete}
            >
              Save Location
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
