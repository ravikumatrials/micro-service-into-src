
import { useState, useEffect, useRef } from "react";
import { MapPin, Hexagon, Square } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "@googlemaps/js-api-loader";

// Mock API key - in a real app, this would be stored securely
const GOOGLE_MAPS_API_KEY = "AIzaSyDLZ-LGtMxJBBCuqQaI8ZyUPQi9hkoJyu4";

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
  const [isMapLoading, setIsMapLoading] = useState(true);
  const { toast } = useToast();
  
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const polygonRef = useRef<google.maps.Polygon | null>(null);
  const mapLoaderRef = useRef<Loader | null>(null);
  
  // Initialize Google Maps loader
  useEffect(() => {
    if (!mapLoaderRef.current) {
      mapLoaderRef.current = new Loader({
        apiKey: GOOGLE_MAPS_API_KEY,
        version: "weekly",
        libraries: ["drawing"]
      });
    }
  }, []);

  // Load and initialize the map when the modal opens
  useEffect(() => {
    if (!open || !mapRef.current) return;
    
    setIsMapLoading(true);
    
    let coordinates: Array<{lat: number, lng: number}> = [];
    
    // Check if project already has coordinates
    if (project?.coordinates?.geofenceData) {
      try {
        coordinates = JSON.parse(project.coordinates.geofenceData);
        setPolygonCoordinates(coordinates);
      } catch (e) {
        console.error("Error parsing geofence data", e);
        // Generate default coordinates on error
        coordinates = generateDefaultCoordinates();
        setPolygonCoordinates(coordinates);
      }
    } else {
      // Generate default coordinates if none exist
      coordinates = generateDefaultCoordinates();
      setPolygonCoordinates(coordinates);
    }

    // Load the map
    if (mapLoaderRef.current) {
      mapLoaderRef.current.load()
        .then((google) => {
          // Create a map instance
          const mapCenter = calculateCenter(coordinates);
          const mapOptions: google.maps.MapOptions = {
            center: mapCenter,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            streetViewControl: false,
          };
          
          // Initialize the map
          const map = new google.maps.Map(mapRef.current!, mapOptions);
          googleMapRef.current = map;
          
          // Add polygon to the map
          drawPolygon(map, coordinates, google);
          
          // Map is now loaded
          setIsMapLoading(false);
        })
        .catch(err => {
          console.error("Error loading Google Maps:", err);
          setIsMapLoading(false);
          toast({
            title: "Error",
            description: "Failed to load Google Maps. Please try again later.",
          });
        });
    }
    
    return () => {
      // Clean up polygon when modal closes
      if (polygonRef.current) {
        polygonRef.current.setMap(null);
        polygonRef.current = null;
      }
    };
  }, [open, project, toast]);
  
  // Function to generate default polygon coordinates
  const generateDefaultCoordinates = () => {
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
    
    return coordinates;
  };
  
  // Calculate center of polygon for map focus
  const calculateCenter = (coordinates: Array<{lat: number, lng: number}>) => {
    if (coordinates.length === 0) {
      return { lat: 25.276987, lng: 55.296249 }; // Default to Dubai
    }
    
    const sumLat = coordinates.reduce((sum, coord) => sum + coord.lat, 0);
    const sumLng = coordinates.reduce((sum, coord) => sum + coord.lng, 0);
    
    return {
      lat: sumLat / coordinates.length,
      lng: sumLng / coordinates.length
    };
  };
  
  // Draw polygon on the map
  const drawPolygon = (
    map: google.maps.Map, 
    coordinates: Array<{lat: number, lng: number}>,
    googleMaps: typeof google
  ) => {
    // Clean up existing polygon
    if (polygonRef.current) {
      polygonRef.current.setMap(null);
    }
    
    // Create polygon
    const polygon = new googleMaps.maps.Polygon({
      paths: coordinates,
      strokeColor: "#1976d2",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#42a5f5",
      fillOpacity: 0.35,
      editable: true,
      map: map
    });
    
    polygonRef.current = polygon;
    
    // Listen for polygon changes
    googleMaps.maps.event.addListener(polygon.getPath(), "set_at", () => {
      const path = polygon.getPath();
      const newCoordinates: Array<{lat: number, lng: number}> = [];
      
      for (let i = 0; i < path.getLength(); i++) {
        const point = path.getAt(i);
        newCoordinates.push({ lat: point.lat(), lng: point.lng() });
      }
      
      setPolygonCoordinates(newCoordinates);
    });
    
    googleMaps.maps.event.addListener(polygon.getPath(), "insert_at", () => {
      const path = polygon.getPath();
      const newCoordinates: Array<{lat: number, lng: number}> = [];
      
      for (let i = 0; i < path.getLength(); i++) {
        const point = path.getAt(i);
        newCoordinates.push({ lat: point.lat(), lng: point.lng() });
      }
      
      setPolygonCoordinates(newCoordinates);
    });
    
    // Create bounds for the polygon and fit map to those bounds
    const bounds = new googleMaps.maps.LatLngBounds();
    coordinates.forEach(coord => {
      bounds.extend(new googleMaps.maps.LatLng(coord.lat, coord.lng));
    });
    map.fitBounds(bounds);
  };

  const handleSave = () => {
    // Prepare polygon data
    const geofenceData = JSON.stringify(polygonCoordinates);
    onSave(project.id, geofenceData);
    
    // Show success toast
    toast({
      title: "Success",
      description: "Location perimeter saved successfully.",
    });
    
    // Close the dialog
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-auto">
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
          
          {/* Map Container */}
          <div 
            className="relative h-[400px] w-full rounded-md border border-gray-200 overflow-hidden"
            style={{ minHeight: "400px" }}
          >
            {isMapLoading && (
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-proscape mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600">Loading map...</p>
                </div>
              </div>
            )}
            
            <div 
              ref={mapRef} 
              className="absolute inset-0 z-10"
              style={{ width: "100%", height: "100%" }}
            ></div>
          </div>

          {/* Helper text */}
          <div className="text-sm">
            <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
              <div className="flex items-center font-medium text-blue-800 mb-1">
                <Square className="h-4 w-4 mr-1" /> 
                Location Instructions
              </div>
              <p className="text-xs text-blue-600">
                Drag the edges of the polygon to adjust the project perimeter. 
                The geographic boundary defined here will be used for location-based check-ins.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2 sm:justify-between">
          <div>
            {/* Additional options could be added here */}
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
