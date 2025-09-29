// src/utils/drawingHelpers.js

/**
 * 🎯 UTILITY FUNCTIONS FOR DRAWING POINTS
 * Small helper functions to make life easier
 */

// ═══════════════════════════════════════════════════════
// 📍 COORDINATE FORMATTING
// ═══════════════════════════════════════════════════════

/**
 * Format coordinates nicely for display
 * Example: 31.520456 → "31.5205°"
 */
export const formatCoordinate = (coord, decimals = 4) => {
  return `${coord.toFixed(decimals)}°`;
};

/**
 * Format a pair of coordinates
 * Example: (74.35, 31.52) → "31.5200° N, 74.3500° E"
 */
export const formatCoordinatePair = (lat, lng) => {
  const latDir = lat >= 0 ? 'N' : 'S';
  const lngDir = lng >= 0 ? 'E' : 'W';
  
  return `${Math.abs(lat).toFixed(4)}° ${latDir}, ${Math.abs(lng).toFixed(4)}° ${lngDir}`;
};

// ═══════════════════════════════════════════════════════
// 🗺️ GOOGLE MAPS
// ═══════════════════════════════════════════════════════

/**
 * Create Google Maps URL for a location
 * Opens Google Maps at specific coordinates
 */
export const getGoogleMapsUrl = (lat, lng, zoom = 15) => {
  return `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}`;
};

/**
 * Create Google Maps directions URL
 * Opens directions to a location
 */
export const getGoogleMapsDirectionsUrl = (lat, lng) => {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
};

// ═══════════════════════════════════════════════════════
// 🆔 ID GENERATION
// ═══════════════════════════════════════════════════════

/**
 * Generate a unique ID for a point
 * Example: "point_1640000000123"
 */
export const generatePointId = () => {
  return `point_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// ═══════════════════════════════════════════════════════
// 📏 DISTANCE CALCULATIONS
// ═══════════════════════════════════════════════════════

/**
 * Calculate distance between two points (Haversine formula)
 * Returns distance in meters
 * 
 * Example: distance between Lahore and Islamabad
 */
export const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
};

/**
 * Format distance for display
 * Example: 1500 → "1.50 km"
 *          500  → "500 m"
 */
export const formatDistance = (meters) => {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${(meters / 1000).toFixed(2)} km`;
};

// ═══════════════════════════════════════════════════════
// ✅ VALIDATION
// ═══════════════════════════════════════════════════════

/**
 * Check if coordinates are valid
 * Latitude: -90 to 90
 * Longitude: -180 to 180
 */
export const isValidCoordinate = (lat, lng) => {
  return (
    typeof lat === 'number' &&
    typeof lng === 'number' &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180 &&
    !isNaN(lat) &&
    !isNaN(lng)
  );
};

// ═══════════════════════════════════════════════════════
// 💾 STORAGE (localStorage)
// ═══════════════════════════════════════════════════════

/**
 * Save points to browser storage
 * Points persist even after page refresh
 */
export const savePointsToStorage = (points) => {
  try {
    localStorage.setItem('drawn_points', JSON.stringify(points));
    console.log(`💾 Saved ${points.length} points to storage`);
    return true;
  } catch (error) {
    console.error('Error saving points:', error);
    return false;
  }
};

/**
 * Load points from browser storage
 * Returns array of points or empty array
 */
export const loadPointsFromStorage = () => {
  try {
    const stored = localStorage.getItem('drawn_points');
    if (!stored) return [];
    
    const points = JSON.parse(stored);
    console.log(`📂 Loaded ${points.length} points from storage`);
    return points;
  } catch (error) {
    console.error('Error loading points:', error);
    return [];
  }
};

/**
 * Clear points from storage
 */
export const clearPointsFromStorage = () => {
  try {
    localStorage.removeItem('drawn_points');
    console.log('🗑️ Cleared points from storage');
    return true;
  } catch (error) {
    console.error('Error clearing points:', error);
    return false;
  }
};

// ═══════════════════════════════════════════════════════
// 📤 EXPORT
// ═══════════════════════════════════════════════════════

/**
 * Export points as GeoJSON file
 * User can download and import later
 */
export const exportPointsAsGeoJSON = (points) => {
  const geojson = {
    type: 'FeatureCollection',
    features: points.map(point => ({
      type: 'Feature',
      id: point.id,
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

  // Create download
  const dataStr = JSON.stringify(geojson, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
  
  const fileName = `points-${new Date().toISOString().slice(0, 10)}.geojson`;
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', fileName);
  linkElement.click();
  
  console.log(`📤 Exported ${points.length} points as ${fileName}`);
};

// ═══════════════════════════════════════════════════════
// 🎨 COLOR UTILITIES
// ═══════════════════════════════════════════════════════

/**
 * Get a color for a point based on index
 * Useful if you want different colored points
 */
export const getPointColor = (index) => {
  const colors = [
    '#3B82F6', // Blue
    '#EF4444', // Red
    '#10B981', // Green
    '#F59E0B', // Orange
    '#8B5CF6', // Purple
    '#EC4899', // Pink
  ];
  
  return colors[index % colors.length];
};

// ═══════════════════════════════════════════════════════
// 📝 USAGE EXAMPLES
// ═══════════════════════════════════════════════════════

/*

// Format coordinates
const formatted = formatCoordinate(31.520456); 
// → "31.5205°"

// Check if valid
if (isValidCoordinate(lat, lng)) {
  // Add point
}

// Calculate distance
const dist = calculateDistance(31.52, 74.35, 31.53, 74.36);
const formatted = formatDistance(dist);
// → "1.23 km"

// Save to storage
savePointsToStorage(points);

// Load from storage
const saved = loadPointsFromStorage();

// Export as file
exportPointsAsGeoJSON(points);

// Google Maps
const url = getGoogleMapsUrl(31.52, 74.35);
window.open(url, '_blank');

*/