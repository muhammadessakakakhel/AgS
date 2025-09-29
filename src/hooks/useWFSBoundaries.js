import { useEffect, useRef, useState } from 'react';
import { WFSService } from '../services/map/wfsService';

export const useWFSBoundaries = (
  map,
  mapLoaded,
  polygonLayers = [
    'ahmedpursial_01_shp',
    'garhmaharaja',
    'gate1',
    'gate2',
    'jabbona',
    'kotbahadar',
    'kotmapal',
    'mahmoodkot',
    'rangpur',
    'rodusultan'
  ]
) => {
  const wfsService = useRef(null);
  const [loadedLayers, setLoadedLayers] = useState([]);
  const [boundariesVisible, setBoundariesVisible] = useState(true);

  useEffect(() => {
    if (map && mapLoaded) {
      if (!wfsService.current) {
        wfsService.current = new WFSService(map);
      }
      // Initial load
      loadAllBoundaries();
    }
  }, [map, mapLoaded]);

  // Load all boundaries
  const loadAllBoundaries = async () => {
    console.log("Realoading all wfs boundaries");
    if (!wfsService.current) return;

    // 🔑 Remove existing boundaries first
    loadedLayers.forEach(layerName => {
      wfsService.current.removePolygonBoundaries(`boundary-${layerName}`);
    });
    setLoadedLayers([]);

    for (const layerName of polygonLayers) {
      try {
        await wfsService.current.addPolygonBoundaries(
          layerName,
          `boundary-${layerName}`
        );
        setLoadedLayers(prev => [...prev, layerName]);
      } catch (err) {
        console.error(`Failed to load ${layerName}:`, err);
      }
    }
  };

  // Toggle visibility of all boundaries
  const toggleBoundaries = () => {
    if (!wfsService.current || loadedLayers.length === 0) return;

    const newVisibility = !boundariesVisible;
    loadedLayers.forEach(layerName => {
      wfsService.current.togglePolygonVisibility(
        newVisibility,
        `boundary-${layerName}`
      );
    });
    setBoundariesVisible(newVisibility);
  };

  // Remove all boundaries
  const removeBoundaries = () => {
    if (!wfsService.current) return;
    loadedLayers.forEach(layerName => {
      wfsService.current.removePolygonBoundaries(`boundary-${layerName}`);
    });
    setLoadedLayers([]);
  };

  return {
    loadedLayers,
    boundariesVisible,
    toggleBoundaries,
    removeBoundaries,
    loadAllBoundaries
  };
};
