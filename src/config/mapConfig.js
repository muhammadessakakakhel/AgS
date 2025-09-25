// src/config/mapConfig.js
export const MAP_CONFIG = {
  // Default map center (Lahore, Pakistan - adjust to your sugarcane fields location)
  defaultCenter: [74.3587, 31.5204], // [longitude, latitude]
  defaultZoom: 10,
  minZoom: 5,
  maxZoom: 18,
  
  // Map container settings
  container: {
    style: {
      width: '100%',
      height: '100vh'
    }
  },
  
  // Available basemap styles
  basemaps: [
    {
      id: 'satellite',
      name: 'Satellite',
      url: 'https://api.maptiler.com/maps/hybrid/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
      default: true
    },
    {
      id: 'streets',
      name: 'Streets', 
      url: 'https://api.maptiler.com/maps/streets-v2/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
    },
    {
      id: 'basic',
      name: 'Basic',
      url: 'https://api.maptiler.com/maps/basic-v2/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
    },
    {
      id: 'openstreetmap',
      name: 'OpenStreetMap',
      url: {
        version: 8,
        sources: {
          'osm-tiles': {
            type: 'raster',
            tiles: [
              'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
              'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png'
            ],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors'
          }
        },
        layers: [
          {
            id: 'osm-tiles',
            type: 'raster',
            source: 'osm-tiles',
            minzoom: 0,
            maxzoom: 19
          }
        ]
      }
    }
  ],
  
  // Map controls configuration
  controls: {
    navigation: {
      position: 'top-right',
      showCompass: true,
      showZoom: true,
      visualizePitch: true
    },
    scale: {
      position: 'bottom-left',
      maxWidth: 200,
      unit: 'metric'
    },
    fullscreen: {
      position: 'top-right'
    },
    geolocate: {
      position: 'top-right',
      trackUserLocation: false,
      showUserLocation: true
    }
  },
  
  // Map interaction settings
  interaction: {
    dragRotate: false,
    touchZoomRotate: false,
    keyboard: true,
    doubleClickZoom: true,
    scrollZoom: true
  }
};

// Get basemap by ID
export const getBasemapById = (id) => {
  return MAP_CONFIG.basemaps.find(basemap => basemap.id === id);
};

// Get default basemap
export const getDefaultBasemap = () => {
  return MAP_CONFIG.basemaps.find(basemap => basemap.default) || MAP_CONFIG.basemaps[0];
};