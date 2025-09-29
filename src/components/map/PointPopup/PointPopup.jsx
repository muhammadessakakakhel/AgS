// src/components/map/PointPopup/PointPopup.jsx
import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import './PointPopup.css';

/**
 * 🎯 WHAT THIS COMPONENT DOES:
 * - Shows popup when user clicks a point
 * - Displays lat/long coordinates
 * - Provides "View in Google Maps" button
 * - Provides "Delete Point" button
 * 
 * 📚 HOW TO USE:
 * usePointPopup(map, mapLoaded, points, deletePoint);
 */
export const usePointPopup = (map, mapLoaded, points, deletePoint) => {
  // Store popup instance (keeps same popup, doesn't create new ones)
  const popupRef = useRef(null);

  useEffect(() => {
    // Wait for map to be ready
    if (!map || !mapLoaded) return;

    // Create popup once (reuse for all points)
    if (!popupRef.current) {
      popupRef.current = new maplibregl.Popup({
        closeButton: true,      // Show X button
        closeOnClick: false,    // Don't close when clicking map
        maxWidth: '300px'       // Maximum width
      });
    }

    /**
     * 🎯 This runs when user clicks a point circle
     */
const handlePointClick = (e) => {
  const feature = e.features[0];
  if (!feature) return;

  const coordinates = feature.geometry.coordinates.slice();
  const pointId = feature.id;
  const { lat, lng } = feature.properties;

  console.log('Point clicked:', pointId);

  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }

  const popupHTML = createPopupContent(lat, lng, pointId);

  // Remove existing popup if any
  if (popupRef.current.isOpen()) {
    popupRef.current.remove();
  }

  popupRef.current
    .setLngLat(coordinates)
    .setHTML(popupHTML)
    .addTo(map);

  // Use the 'open' event to ensure popup is ready
  popupRef.current.once('open', () => {
    console.log('Popup opened, attaching handlers...');
    attachButtonHandlers(lat, lng, pointId, deletePoint, popupRef.current);
  });
};

    // LISTEN: For clicks on point circles
    map.on('click', 'point-circles', handlePointClick);

    // CLEANUP: Stop listening when component unmounts
    return () => {
      map.off('click', 'point-circles', handlePointClick);
      if (popupRef.current) {
        popupRef.current.remove();
      }
    };
  }, [map, mapLoaded, points, deletePoint]);

  return popupRef.current;
};

/**
 * 🎨 CREATE POPUP HTML
 * Generates the popup content with coordinates and buttons
 */
function createPopupContent(lat, lng, pointId) {
  return `
    <div class="point-popup">
      <!-- HEADER -->
      <div class="popup-header">
        <span class="popup-icon">📍</span>
        <h3 class="popup-title">Point Information</h3>
      </div>

      <!-- COORDINATES -->
      <div class="popup-body">
        <div class="info-row">
          <span class="info-label">Latitude:</span>
          <span class="info-value">${lat.toFixed(6)}°</span>
        </div>
        
        <div class="info-row">
          <span class="info-label">Longitude:</span>
          <span class="info-value">${lng.toFixed(6)}°</span>
        </div>
      </div>

      <!-- BUTTONS -->
      <div class="popup-actions">
        <!-- Google Maps Button -->
        <button 
          id="google-maps-btn" 
          class="popup-btn primary"
          type="button"
          title="Open in Google Maps"
        >
          🗺️ View in Google Maps
        </button>

        <!-- Delete Button - FIXED -->
        <button 
          id="delete-point-btn"
          class="popup-btn danger"
          type="button"
          data-point-id="${pointId}"
          title="Delete this point"
        >
          🗑️ Delete Point
        </button>
      </div>
    </div>
  `;
}
/**
 * 🔘 ATTACH BUTTON HANDLERS
 * Makes the buttons actually work
 */
function attachButtonHandlers(lat, lng, pointId, deletePoint, popup) {
  
  console.log('🔧 attachButtonHandlers called');
  console.log('  - pointId:', pointId, 'type:', typeof pointId);
  console.log('  - deletePoint:', typeof deletePoint);
  console.log('  - popup:', typeof popup);
  
  // GOOGLE MAPS BUTTON
  const googleMapsBtn = document.getElementById('google-maps-btn');
  console.log('🗺️ Google Maps button found?', googleMapsBtn !== null);
  
  if (googleMapsBtn) {
    googleMapsBtn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
      window.open(googleMapsUrl, '_blank');
      
      console.log(`🗺️ Opened Google Maps for: ${lat}, ${lng}`);
    };
    console.log('✅ Google Maps button handler attached');
  }

  // DELETE BUTTON
  const deleteBtn = document.getElementById('delete-point-btn');
  console.log('🗑️ Delete button found?', deleteBtn !== null);
  console.log('🗑️ Delete button element:', deleteBtn);
  
  if (deleteBtn) {
    console.log('✅ Attaching delete handler...');
    
    deleteBtn.onclick = (e) => {
      console.log('🔥 DELETE BUTTON CLICKED!');
      e.preventDefault();
      e.stopPropagation();
      
      console.log(`🗑️ Delete button clicked for point: ${pointId}`);
      
      const confirmed = window.confirm('Delete this point?');
      console.log('Confirmed?', confirmed);
      
      if (confirmed) {
        console.log(`✅ User confirmed deletion of point: ${pointId}`);
        
        if (typeof deletePoint === 'function') {
          console.log('✅ Calling deletePoint function...');
          deletePoint(pointId);
          
          if (popup && typeof popup.remove === 'function') {
            console.log('✅ Removing popup...');
            popup.remove();
          }
          
          console.log(`✅ Point ${pointId} deleted successfully`);
        } else {
          console.error('❌ deletePoint is not a function:', deletePoint);
        }
      } else {
        console.log('❌ User cancelled deletion');
      }
    };
    
    console.log('✅ Delete button handler attached successfully');
  } else {
    console.error('❌ Delete button NOT FOUND in DOM!');
    console.log('Available buttons:', document.querySelectorAll('button'));
  }
}
// ═══════════════════════════════════════════════════════
// 📝 USAGE EXAMPLE:
// ═══════════════════════════════════════════════════════
//
// import { usePointPopup } from './PointPopup';
// import { useDrawingPoints } from '../hooks/useDrawingPoints';
//
// function MapComponent() {
//   const { map, mapLoaded } = useMap(...);
//   const drawing = useDrawingPoints(map, mapLoaded);
//   
//   // Setup popups
//   usePointPopup(
//     map, 
//     mapLoaded, 
//     drawing.points, 
//     drawing.deletePoint
//   );
//   
//   return <div>Map here</div>;
// }
// ═══════════════════════════════════════════════