// src/hooks/useWFSBoundaries.js
import { useEffect, useRef, useState } from 'react';
import { WFSService } from '../services/map/wfsService';

export const useWFSBoundaries = (
  map, 
  mapLoaded, 
  polygonLayers = ['ahmedpursial_01_shp', 'garhmaharaja','gate1', 'gate2','jabbona', 'kotbahadar', 'kotmapal', 'mahmoodkot','rangpur','rodusultan'] // Default polygon layers
) => {
  const wfsService = useRef(null);
  const [loadedLayers, setLoadedLayers] = useState([]);
  const [boundariesVisible, setBoundariesVisible] = useState(true);

  useEffect(() => {
    if (map && mapLoaded && !wfsService.current) {
      wfsService.current = new WFSService(map);
      loadAllBoundaries();
    }
  }, [map, mapLoaded]);

  // Load all boundaries
  const loadAllBoundaries = async () => {
    if (!wfsService.current) return;

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
      wfsService.current.togglePolygonVisibility(newVisibility, `boundary-${layerName}`);
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
    removeBoundaries 
  };
};


//issue is coming when i change the base map the shp files is not showing then?????


// import { useEffect, useRef, useState } from 'react';
// import { WFSService } from '../services/map/wfsService';

// export const useWFSBoundaries = (
//   map, 
//   mapLoaded, 
//   polygonLayers = ['ahmedpursial_01_shp', 'garhmaharaja']
// ) => {
//   const wfsService = useRef(null);
//   const [loadedLayers, setLoadedLayers] = useState([]);
//   const [boundariesVisible, setBoundariesVisible] = useState(true);

//   // Initial load
//   useEffect(() => {
//     if (map && mapLoaded && !wfsService.current) {
//       wfsService.current = new WFSService(map);
//       loadAllBoundaries();
//     }
//   }, [map, mapLoaded]);

//   // 🔹 Reload boundaries when basemap (style) changes
//   useEffect(() => {
//     if (!map || !mapLoaded) return;

//     const reloadBoundaries = () => {
//       if (wfsService.current) {
//         polygonLayers.forEach(layerName => {
//           wfsService.current.addPolygonBoundaries(layerName, `boundary-${layerName}`);
//         });
//       }
//     };

//     map.on("styledata", reloadBoundaries);

//     return () => {
//       map.off("styledata", reloadBoundaries);
//     };
//   }, [map, mapLoaded, polygonLayers]);

//   // Load all boundaries
//   const loadAllBoundaries = async () => {
//     if (!wfsService.current) return;

//     for (const layerName of polygonLayers) {
//       try {
//         await wfsService.current.addPolygonBoundaries(
//           layerName, 
//           `boundary-${layerName}`
//         );
//         setLoadedLayers(prev => [...prev, layerName]);
//       } catch (err) {
//         console.error(`Failed to load ${layerName}:`, err);
//       }
//     }
//   };

//   // Toggle visibility of all boundaries
//   const toggleBoundaries = () => {
//     if (!wfsService.current || loadedLayers.length === 0) return;
    
//     const newVisibility = !boundariesVisible;
//     loadedLayers.forEach(layerName => {
//       wfsService.current.togglePolygonVisibility(newVisibility, `boundary-${layerName}`);
//     });
//     setBoundariesVisible(newVisibility);
//   };

//   // Remove all boundaries
//   const removeBoundaries = () => {
//     if (!wfsService.current) return;
//     loadedLayers.forEach(layerName => {
//       wfsService.current.removePolygonBoundaries(`boundary-${layerName}`);
//     });
//     setLoadedLayers([]);
//   };

//   return { 
//     loadedLayers, 
//     boundariesVisible, 
//     toggleBoundaries, 
//     removeBoundaries 
//   };
// };
