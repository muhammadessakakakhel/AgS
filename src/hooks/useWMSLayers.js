// src/hooks/useWMSLayers.js
import { useEffect, useRef, useCallback } from 'react';
import { WMSLayerManager } from '../services/map/wmsLayerManager';

export const useWMSLayers = (map, mapLoaded, selectedLayers) => {
  const layerManager = useRef(null);

  // Initialize layer manager when map is ready
  useEffect(() => {
    if (map && mapLoaded && !layerManager.current) {
      layerManager.current = new WMSLayerManager(map);
    }
  }, [map, mapLoaded]);

  // Update layers when selection changes
  useEffect(() => {
    if (layerManager.current && mapLoaded) {
      layerManager.current.updateLayers(selectedLayers);
    }
  }, [selectedLayers, mapLoaded]);

  // Expose methods for external use
  const zoomToLayer = useCallback((layer) => {
    if (layerManager.current) {
      layerManager.current.zoomToLayer(layer);
    }
  }, []);

  const updateOpacity = useCallback((layerId, opacity) => {
    if (layerManager.current) {
      layerManager.current.updateOpacity(layerId, opacity);
    }
  }, []);

  return {
    zoomToLayer,
    updateOpacity
  };
};