// src/hooks/useBasemap.js
import { useEffect, useRef } from 'react';
import { MAP_CONFIG } from '../config/mapConfig';

export const useBasemap = (map, mapLoaded, basemapId, selectedLayers) => {
  const previousBasemap = useRef(basemapId);

  useEffect(() => {
    if (!map || !mapLoaded || !basemapId) return;
    
    // Skip if basemap hasn't changed
    if (previousBasemap.current === basemapId) return;
    
    const basemap = MAP_CONFIG.basemaps.find(b => b.id === basemapId);
    if (!basemap) return;

    // Get current style
    const currentStyle = map.getStyle();
    
    // Check if style is already the same
    if (currentStyle && typeof basemap.url === 'string' && 
        currentStyle.sprite && currentStyle.sprite.includes(basemapId)) {
      return;
    }

    // Store current visible layers
    const currentLayers = selectedLayers.filter(l => l.visible);
    
    // Change style
    map.setStyle(basemap.url);
    
    // Re-add layers after style loads
    map.once('style.load', () => {
      // Small delay to ensure style is fully loaded
      setTimeout(() => {
        // Trigger layer update through parent component
        if (currentLayers.length > 0) {
          // The parent will handle re-adding layers through WMSLayerManager
          console.log('Basemap changed, layers will be re-added');
        }
      }, 100);
    });
    
    previousBasemap.current = basemapId;
  }, [map, mapLoaded, basemapId]);
};