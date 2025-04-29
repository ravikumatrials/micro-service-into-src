
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
    
    namespace MapTypeId {
      const ROADMAP: string;
    }
  }
}

interface Window {
  google: typeof google;
}
