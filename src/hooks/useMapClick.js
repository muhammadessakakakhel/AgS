// src/hooks/useMapClick.js
import { useEffect, useCallback } from 'react';

export const useMapClick = (map, mapLoaded, selectedLayers, onFeatureClick) => {
  
  const handleMapClick = useCallback((e) => {
    const visibleLayers = selectedLayers.filter(l => l.visible);
    if (visibleLayers.length === 0) return;

    const { lng, lat } = e.lngLat;
    const point = e.point;
    
    // Prepare data for GetFeatureInfo or other click handling
    const clickData = {
      coordinates: { lng, lat },
      point: { x: point.x, y: point.y },
      visibleLayers,
      originalEvent: e
    };
    
    // Call the provided handler if it exists
    if (onFeatureClick) {
      onFeatureClick(clickData);
    } else {
      console.log(`Clicked at: ${lng}, ${lat}`);
    }
  }, [selectedLayers, onFeatureClick]);

  useEffect(() => {
    if (!map || !mapLoaded) return;

    map.on('click', handleMapClick);

    return () => {
      map.off('click', handleMapClick);
    };
  }, [map, mapLoaded, handleMapClick]);
};