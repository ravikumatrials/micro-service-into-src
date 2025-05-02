
declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: Element, opts?: MapOptions);
      setCenter(latLng: LatLng | LatLngLiteral): void;
      getCenter(): LatLng;
      setZoom(zoom: number): void;
      getZoom(): number;
      addListener(eventName: string, handler: Function): MapsEventListener;
      fitBounds(bounds: LatLngBounds | LatLngBoundsLiteral): void;
    }
    
    class Marker {
      constructor(opts?: MarkerOptions);
      setPosition(latLng: LatLng | LatLngLiteral): void;
      getPosition(): LatLng | null;
      setMap(map: Map | null): void;
    }

    class Polygon {
      constructor(opts?: PolygonOptions);
      getPath(): MVCArray<LatLng>;
      setMap(map: Map | null): void;
    }
    
    interface MapOptions {
      center?: LatLng | LatLngLiteral;
      zoom?: number;
      mapTypeId?: string;
      streetViewControl?: boolean;
      mapTypeControl?: boolean;
    }
    
    interface MarkerOptions {
      position?: LatLng | LatLngLiteral;
      map?: Map | null;
      draggable?: boolean;
      title?: string;
    }

    interface PolygonOptions {
      paths?: LatLng[] | LatLngLiteral[] | Array<LatLng[] | LatLngLiteral[]>;
      strokeColor?: string;
      strokeOpacity?: number;
      strokeWeight?: number;
      fillColor?: string;
      fillOpacity?: number;
      map?: Map | null;
      editable?: boolean;
      clickable?: boolean;
      zIndex?: number;
    }
    
    interface LatLng {
      lat(): number;
      lng(): number;
    }
    
    interface LatLngLiteral {
      lat: number;
      lng: number;
    }
    
    interface LatLngBounds {
      extend(latLng: LatLng | LatLngLiteral): LatLngBounds;
    }
    
    interface LatLngBoundsLiteral {
      east: number;
      north: number;
      south: number;
      west: number;
    }
    
    class LatLngBounds {
      constructor(sw?: LatLng, ne?: LatLng);
      extend(latLng: LatLng | LatLngLiteral): LatLngBounds;
    }
    
    interface MapsEventListener {
      remove(): void;
    }
    
    namespace event {
      function addListener(instance: Object, eventName: string, handler: Function): MapsEventListener;
      function trigger(instance: Object, eventName: string, ...args: any[]): void;
    }
    
    class MVCArray<T> {
      constructor(array?: Array<T>);
      clear(): void;
      getArray(): Array<T>;
      getAt(i: number): T;
      getLength(): number;
      insertAt(i: number, elem: T): void;
      removeAt(i: number): T;
      setAt(i: number, elem: T): void;
      forEach(callback: (elem: T, i: number) => void): void;
    }
    
    namespace MapTypeId {
      const ROADMAP: string;
    }
    
    namespace drawing {
      class DrawingManager {
        constructor(options?: DrawingManagerOptions);
        setMap(map: Map | null): void;
        setDrawingMode(drawingMode: OverlayType | null): void;
        getDrawingMode(): OverlayType | null;
      }
      
      interface DrawingManagerOptions {
        drawingMode?: OverlayType | null;
        drawingControl?: boolean;
        drawingControlOptions?: DrawingControlOptions;
        markerOptions?: MarkerOptions;
        polygonOptions?: PolygonOptions;
      }
      
      interface DrawingControlOptions {
        position?: number;
        drawingModes?: OverlayType[];
      }
      
      enum OverlayType {
        MARKER,
        POLYGON,
        POLYLINE,
        RECTANGLE,
        CIRCLE,
      }
    }
  }
}

interface Window {
  google: typeof google;
  initMap: () => void;
}
