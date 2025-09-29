import { useEffect, useRef } from 'react';
import { MAP_CONFIG } from '../config/mapConfig';

export const useBasemap = (map, mapLoaded, basemapId, selectedLayers, onStyleLoad) => {
  const previousBasemap = useRef(basemapId);

  useEffect(() => {
    if (!map || !mapLoaded || !basemapId) return;

    // Skip if basemap hasn't changed
    if (previousBasemap.current === basemapId) return;

    const basemap = MAP_CONFIG.basemaps.find(b => b.id === basemapId);
    if (!basemap) return;

    // Change style
    map.setStyle(basemap.url);

    console.log("Changing basemap to:", basemapId);

    // Re-add layers after style loads
   // 🔑 Instead of waiting for style.load, force reload WFS
    setTimeout(() => {
      console.log("🔄 Forcing WFS reload after basemap change:", basemapId);
      if (typeof onStyleLoad === "function") {
        onStyleLoad();
      }
    }, 500); // give map a bit of time to apply style


    previousBasemap.current = basemapId;
  }, [map, mapLoaded, basemapId, selectedLayers, onStyleLoad]);
};
