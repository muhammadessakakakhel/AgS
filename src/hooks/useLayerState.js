// src/hooks/useLayerState.js
import { useState, useCallback, useEffect } from 'react';
import { GEOSERVER_CONFIG } from '../config/geoserverConfig';

export const useLayerState = (onLayersChange) => {
  const [layers, setLayers] = useState(() => {
    return GEOSERVER_CONFIG.layers.map(layer => ({
      ...layer,
      visible: false,
      opacity: 0.8
    }));
  });

  // Notify parent of changes
  useEffect(() => {
    if (onLayersChange) {
      onLayersChange(layers);
    }
  }, [layers]);

  const handleLayerToggle = useCallback((layerId) => {
    setLayers(prevLayers => 
      prevLayers.map(layer => 
        layer.id === layerId 
          ? { ...layer, visible: !layer.visible }
          : layer
      )
    );
  }, []);

  const handleOpacityChange = useCallback((layerId, opacity) => {
    setLayers(prevLayers =>
      prevLayers.map(layer =>
        layer.id === layerId
          ? { ...layer, opacity }
          : layer
      )
    );
  }, []);

  const handleShowAll = useCallback(() => {
    setLayers(prevLayers =>
      prevLayers.map(layer => ({ ...layer, visible: true }))
    );
  }, []);

  const handleHideAll = useCallback(() => {
    setLayers(prevLayers =>
      prevLayers.map(layer => ({ ...layer, visible: false }))
    );
  }, []);

  const resetLayers = useCallback(() => {
    setLayers(GEOSERVER_CONFIG.layers.map(layer => ({
      ...layer,
      visible: false,
      opacity: 0.8
    })));
  }, []);

  return {
    layers,
    handleLayerToggle,
    handleOpacityChange,
    handleShowAll,
    handleHideAll,
    resetLayers
  };
};