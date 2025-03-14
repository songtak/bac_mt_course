// naver.maps.d.ts
declare namespace naver.maps {
  class MarkerClusterer {
    constructor(options: any);
    setMap(map: any): void;
    getMarkers(): any[];
    addMarker(marker: any): void;
    addMarkers(markers: any[]): void;
    removeMarker(marker: any): void;
    removeMarkers(markers: any[]): void;
    clear(): void;
  }
}
