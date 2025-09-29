// src/hooks/useDrawingPoints.js
import { useState, useEffect, useCallback } from 'react';

/**
 * 🎯 WHAT THIS HOOK DOES:
 * - Lets users click on the map to add points
 * - Shows points as blue circles
 * - Manages all point data and actions
 * 
 * 📚 HOW TO USE:
 * const drawing = useDrawingPoints(map, mapLoaded);
 * drawing.toggleDrawing();  // Start/stop drawing
 * drawing.points;           // Get all points
 */
export const useDrawingPoints = (map, mapLoaded) => {
  
  // ═══════════════════════════════════════════════════════
  // 📦 STATE: Our "memory" for the hook
  // ═══════════════════════════════════════════════════════
  
  // Is drawing mode active? (true/false)
  const [isDrawing, setIsDrawing] = useState(false);
  
  // Array of all points user clicked
  // Example: [{ id: '123', coordinates: [74.35, 31.52] }]
  const [points, setPoints] = useState([]);
  
  // Are points visible on map? (true/false)
  const [pointsVisible, setPointsVisible] = useState(true);

  
  // ═══════════════════════════════════════════════════════
  // 🗺️ STEP 1: Setup map layers when map loads
  // ═══════════════════════════════════════════════════════
  
  useEffect(() => {
    // Wait for map to be ready
    if (!map || !mapLoaded) return;
    
    // Check if layer already exists (prevent duplicates)
    if (map.getSource('drawn-points')) {
      console.log('Drawing layer already exists');
      return;
    }

    try {
      console.log('✅ Setting up drawing layers...');

      // CREATE SOURCE: Container for our point data
      map.addSource('drawn-points', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [] // Empty at start, will fill when user clicks
        }
      });

      // CREATE LAYER: How points look on the map
      map.addLayer({
        id: 'point-circles',
        type: 'circle',           // Draw as circles
        source: 'drawn-points',   // Get data from our source
        paint: {
          'circle-radius': 8,                // Size: 8 pixels
          'circle-color': '#3B82F6',         // Color: Blue
          'circle-stroke-width': 2,          // Border: 2px white
          'circle-stroke-color': '#FFFFFF',
          'circle-opacity': 0.9              // Slightly transparent
        }
      });

      // HOVER EFFECT: Change cursor when hovering over points
      map.on('mouseenter', 'point-circles', () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      map.on('mouseleave', 'point-circles', () => {
        map.getCanvas().style.cursor = isDrawing ? 'crosshair' : '';
      });

      console.log('✅ Drawing layers ready!');

    } catch (error) {
      console.error('❌ Error setting up drawing layers:', error);
    }

    // CLEANUP: Remove layers when component unmounts
    return () => {
      if (map.getLayer('point-circles')) {
        map.removeLayer('point-circles');
      }
      if (map.getSource('drawn-points')) {
        map.removeSource('drawn-points');
      }
    };
  }, [map, mapLoaded]);

  
  // ═══════════════════════════════════════════════════════
  // 👆 STEP 2: Listen for map clicks (when drawing is ON)
  // ═══════════════════════════════════════════════════════
  
  useEffect(() => {
    // Only listen if map exists AND drawing mode is ON
    if (!map || !isDrawing) return;

    /**
     * 🎯 This function runs every time user clicks the map
     */
 const handleMapClick = (e) => {
  const { lng, lat } = e.lngLat;

  console.log(`📍 Point clicked at: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);

  // Use timestamp as stable unique ID
  const uniqueId = Date.now();
  
  const newPoint = {
    id: uniqueId,              // Stable unique ID
    coordinates: [lng, lat],
    timestamp: uniqueId,
    lat: lat,
    lng: lng
  };

  setPoints(currentPoints => [...currentPoints, newPoint]);
  
  console.log(`✅ Point added with ID: ${uniqueId}`);
};

    // ATTACH: Listen for clicks
    map.on('click', handleMapClick);

    // CLEANUP: Stop listening when drawing mode turns OFF
    return () => {
      map.off('click', handleMapClick);
    };
  }, [map, isDrawing, points.length]);

  
  // ═══════════════════════════════════════════════════════
  // 🔄 STEP 3: Update map when points array changes
  // ═══════════════════════════════════════════════════════
  
useEffect(() => {
  if (!map) return;

  const source = map.getSource('drawn-points');
  if (!source) return;

  const geojsonData = {
    type: 'FeatureCollection',
    features: points.map(point => ({
      type: 'Feature',
      id: point.id,              // Use the stable ID
      geometry: {
        type: 'Point',
        coordinates: point.coordinates
      },
      properties: {
        timestamp: point.timestamp,
        lat: point.lat,
        lng: point.lng
      }
    }))
  };

  source.setData(geojsonData);
  
  console.log(`🗺️ Map updated with ${points.length} points`);
}, [map, points]);

  
  // ═══════════════════════════════════════════════════════
  // 🎨 STEP 4: Change cursor style based on drawing mode
  // ═══════════════════════════════════════════════════════
  
  useEffect(() => {
    if (!map) return;

    // Crosshair when drawing, normal arrow otherwise
    map.getCanvas().style.cursor = isDrawing ? 'crosshair' : '';
  }, [map, isDrawing]);

  
  // ═══════════════════════════════════════════════════════
  // 🎬 ACTIONS: Functions to control drawing
  // ═══════════════════════════════════════════════════════

  /**
   * 🔄 Toggle drawing mode ON/OFF
   */
  const toggleDrawing = useCallback(() => {
    setIsDrawing(prev => {
      const newState = !prev;
      console.log(`✏️ Drawing mode: ${newState ? 'ON' : 'OFF'}`);
      return newState;
    });
  }, []);

  /**
   * 👁️ Show/hide all points on map
   */
  const toggleVisibility = useCallback(() => {
    if (!map) return;

    const newVisibility = !pointsVisible;
    
    // Change layer visibility
    if (map.getLayer('point-circles')) {
      map.setLayoutProperty(
        'point-circles',
        'visibility',
        newVisibility ? 'visible' : 'none'
      );
    }
    
    setPointsVisible(newVisibility);
    console.log(`👁️ Points ${newVisibility ? 'shown' : 'hidden'}`);
  }, [map, pointsVisible]);

  /**
   * 🗑️ Delete a specific point by ID
   */
const deletePoint = useCallback((pointId) => {
  console.log(`🗑️ Attempting to delete point with ID: ${pointId}`);
  
  setPoints(currentPoints => {
    const filtered = currentPoints.filter(p => p.id !== pointId);
    console.log(`🗑️ Point deleted. Before: ${currentPoints.length}, After: ${filtered.length}`);
    return filtered;
  });
}, []);

  /**
   * 🧹 Clear all points
   */
  const clearAllPoints = useCallback(() => {
    if (points.length === 0) return;
    
    const confirmed = window.confirm(
      `Delete all ${points.length} points? This cannot be undone.`
    );
    
    if (confirmed) {
      setPoints([]);
      console.log('🧹 All points cleared');
    }
  }, [points.length]);

  /**
   * 📍 Get a specific point by ID
   */
  const getPoint = useCallback((pointId) => {
    return points.find(p => p.id === pointId);
  }, [points]);

  
  // ═══════════════════════════════════════════════════════
  // 📤 RETURN: Everything components need
  // ═══════════════════════════════════════════════════════
  
  return {
    // STATE (data)
    isDrawing,        // true/false - is drawing mode active?
    points,           // Array of all points
    pointsVisible,    // true/false - are points visible?
    pointCount: points.length,  // Number of points
    
    // ACTIONS (functions)
    toggleDrawing,    // Turn drawing ON/OFF
    toggleVisibility, // Show/hide points
    deletePoint,      // Delete one point
    clearAllPoints,   // Delete all points
    getPoint          // Get point by ID
  };
};

// ═══════════════════════════════════════════════════════
// 📝 USAGE EXAMPLE:
// ═══════════════════════════════════════════════════════
//
// import { useDrawingPoints } from './hooks/useDrawingPoints';
// 
// function MyMapComponent() {
//   const { map, mapLoaded } = useMap(...);
//   const drawing = useDrawingPoints(map, mapLoaded);
//   
//   return (
//     <div>
//       <button onClick={drawing.toggleDrawing}>
//         {drawing.isDrawing ? 'Stop' : 'Start'} Drawing
//       </button>
//       <p>Points: {drawing.pointCount}</p>
//     </div>
//   );
// }
// ═══════════════════════════════════════════════════════