// src/config/geoserverConfig.js
export const GEOSERVER_CONFIG = {
  baseUrl: 'http://localhost:8080/geoserver', // where geoserver lives
  workspace: 'Crop_Scan', // Your workspace name
  
  // List all your layers here
  layers: [
    {
      id: 1,
      name: 'Thresholded_NBSL_Aug2025_Gate2', // Your exact layer name
      title: 'Gate2 2025 Results',
      type: 'raster',
      visible: false,
      opacity: 0.8,
      date: '2025-08',
      region: 'Upper Main AOI',
      category: 'sugarcane',
      description: 'Total Sugarcane Acreages: 2965 ',
      // Add bounding box if known (in EPSG:4326)
      bbox: [72.0217, 31.1578, 72.1428, 31.3310] // [minX, minY, maxX, maxY]
    },
    
    {
      id: 2,
      name: 'Thresholded_NBSL_Aug2025_Gate1', // Replace with your actual layer name
      title: 'Gate1 2025 Results',
      type: 'raster',
      visible: false,
      opacity: 0.8,
      date: '2025-08',
      region: 'Upper Main AOI',
      category: 'sugarcane',
      description: 'Total Sugarcane Acreages: 3659 '
    },

    {
      id: 3,
      name: 'Thresholded_NBSL_Aug2025_Jabbona', // Replace with your actual layer name
      title: 'Jabbona 2025 Results',
      type: 'raster',
      visible: false,
      opacity: 0.8,
      date: '2025-08',
      region: 'Upper Main AOI',
      category: 'sugarcane',
      description: 'Total Sugarcane Acreages: 5417'
    },
    {
      id: 4,
      name: 'Thresholded_NBSL_Aug2025_Kot_Mapal',
      title: 'KotMapal 2025 - Results',
      type: 'raster',
      visible: false,
      opacity: 0.8,
      date: '2025-08',
      region: 'Upper Main AOI',
      category: 'sugarcane',
      description: 'Total Sugarcane Acreages:2471'
    },
    {
      id: 5,
      name: 'Thresholded_NBSL_Aug2025_Rodu_Sultan',
      title: 'RoduSultan 2025 - Results',
      type: 'raster',
      visible: false,
      opacity: 0.8,
      date: '2025-08',
      region: 'Upper Main AOI',
      category: 'sugarcane',
      description: 'Total Sugarcane Acreages: 1373'
    },
     {
      id: 6,
      name: 'Thresholded_NBSL_Aug2025_Mahmood_Kot (2)', // Your exact layer name
      title: 'MahmoodKot 2025 Results',
      type: 'raster',
      visible: false,
      opacity: 0.8,
      date: '2025-08',
      region: 'Lower Main AOI',
      category: 'sugarcane',
      description: 'Total Sugarcane Acreages: 2223 ',
      // Add bounding box if known (in EPSG:4326)
      bbox: [72.0217, 31.1578, 72.1428, 31.3310] // [minX, minY, maxX, maxY]
    },
      {
    id: 7,
      name: 'Thresholded_NBSL_Aug2025_Kot_Bahadur', // Your exact layer name
      title: 'KotBahadur 2025 Results',
      type: 'raster',
      visible: false,
      opacity: 0.8,
      date: '2025-08',
      region: 'Lower Main AOI',
      category: 'sugarcane',
      description: 'Total Sugarcane Acreages: 647 ',
      // Add bounding box if known (in EPSG:4326)
      bbox: [72.0217, 31.1578, 72.1428, 31.3310] // [minX, minY, maxX, maxY]
    },

      {
    id: 8,
      name: 'Thresholded_NBSL_Aug2025_Garh_Maharaja', // Your exact layer name
      title: 'Garh_Maharaja 2025 Results',
      type: 'raster',
      visible: false,
      opacity: 0.8,
      date: '2025-08',
      region: 'Lower Main AOI',
      category: 'sugarcane',
      description: 'Total Sugarcane Acreages: 2021 ',
      // Add bounding box if known (in EPSG:4326)
      bbox: [72.0217, 31.1578, 72.1428, 31.3310] // [minX, minY, maxX, maxY]
    },

      {
    id: 9,
      name: 'Thresholded_NBSL_Aug2025_AhmadpurSial', // Your exact layer name
      title: 'AhmadpurSial 2025 Results',
      type: 'raster',
      visible: false,
      opacity: 0.8,
      date: '2025-08',
      region: 'Lower Main AOI',
      category: 'sugarcane',
      description: 'Total Sugarcane Acreages: 1433 ',
      // Add bounding box if known (in EPSG:4326)
      bbox: [72.0217, 31.1578, 72.1428, 31.3310] // [minX, minY, maxX, maxY]
    },

      {
    id: 10,
      name: 'Thresholded_NBSL_Aug2025_Rangpur', // Your exact layer name
      title: 'Rangpur 2025 Results',
      type: 'raster',
      visible: false,
      opacity: 0.8,
      date: '2025-08',
      region: 'Lower Main AOI',
      category: 'sugarcane',
      description: 'Total Sugarcane Acreages: 847 ',
      // Add bounding box if known (in EPSG:4326)
      bbox: [72.0217, 31.1578, 72.1428, 31.3310] // [minX, minY, maxX, maxY]
    },


    // Add all 20 layers following this pattern
  ],



   // ADD THIS NEW SECTION for polygon boundaries
  vectorLayers: [
    {
      name: 'ahmedpursial_01_shp',
      title: 'Ahmed Pursial Boundaries',
      type: 'polygon',
      visible: true,
      autoLoad: true, // Load automatically on startup
     
    },
    // Add more polygon layers if you have them
    {
      name: 'garhmaharaja',
      title: 'garhmaharaja Boundary',
      type: 'polygon',
      visible: true,
      autoLoad: true,
    
    },

    {
      name: 'gate1',
      title: 'gate1 Boundary',
      type: 'polygon',
      visible: true,
      autoLoad: true,
    
    },

    {
      name: 'gate2',
      title: 'gate2 Boundary',
      type: 'polygon',
      visible: true,
      autoLoad: true,
    
    },
    {
      name: 'jabbona',
      title: 'jabbona Boundary',
      type: 'polygon',
      visible: true,
      autoLoad: true,
    
    },

    {
      name: 'kotmapal',
      title: 'kotmapal Boundary',
      type: 'polygon',
      visible: true,
      autoLoad: true,
    },
    {
      name: 'rodusultan',
      title: 'rodusultan Boundary',
      type: 'polygon',
      visible: true,
      autoLoad: true,
    },
    {
      name: 'mahmoodkot',
      title: 'mahmoodkot Boundary',
      type: 'polygon',
      visible: true,
      autoLoad: true,   
    },
    {
      name: 'kotbahadar',
      title: 'kotbahadar Boundary',
      type: 'polygon',
      visible: true,
      autoLoad: true,     
    },
    {
      name: 'rangpur',
      title: 'rangpur Boundary',
      type: 'polygon',
      visible: true,
      autoLoad: true,     
    },
  ],
  
  // WMS service parameters - Updated for correct CRS handling
  wms: {
    service: 'WMS',
    version: '1.3.0', // Changed to 1.3.0 for better CRS handling
    request: 'GetMap',
    format: 'image/png',
    transparent: true,
    tiled: true,
    // Support both coordinate systems
    srs_3857: 'EPSG:3857', // For MapLibre tiles
    srs_4326: 'EPSG:4326', // For your data
    crs: 'CRS:84', // For WMS 1.3.0
    width: 256,
    height: 256
  },
  
  // WFS service parameters (for future use)
  wfs: {
    service: 'WFS',
    version: '2.0.0',
    request: 'GetFeature',
    outputFormat: 'application/json'
  }
};

// ADD THIS NEW HELPER FUNCTION
export const getVectorLayers = () => {
  return GEOSERVER_CONFIG.vectorLayers || [];
};

// ADD THIS NEW HELPER FUNCTION
export const getAutoLoadVectorLayers = () => {
  return GEOSERVER_CONFIG.vectorLayers?.filter(layer => layer.autoLoad) || [];
};

// Helper function to build WMS URL for EPSG:3857 (Web Mercator)
export const buildWMSUrl_3857 = (layerName) => {
  return `${GEOSERVER_CONFIG.baseUrl}/${GEOSERVER_CONFIG.workspace}/wms?` +
    `service=WMS&` +
    `version=1.1.0&` +
    `request=GetMap&` +
    `layers=${GEOSERVER_CONFIG.workspace}:${layerName}&` +
    `bbox={bbox-epsg-3857}&` +
    `width=256&` +
    `height=256&` +
    `srs=EPSG:3857&` +
    `format=${GEOSERVER_CONFIG.wms.format}&` +
    `transparent=${GEOSERVER_CONFIG.wms.transparent}`;
};

// Helper function to build WMS URL for EPSG:4326 (Geographic)
export const buildWMSUrl_4326 = (layerName) => {
  return `${GEOSERVER_CONFIG.baseUrl}/${GEOSERVER_CONFIG.workspace}/wms?` +
    `service=WMS&` +
    `version=1.3.0&` +
    `request=GetMap&` +
    `layers=${GEOSERVER_CONFIG.workspace}:${layerName}&` +
    `bbox={bbox-epsg-4326}&` +
    `width=256&` +
    `height=256&` +
    `crs=EPSG:4326&` +
    `format=${GEOSERVER_CONFIG.wms.format}&` +
    `transparent=${GEOSERVER_CONFIG.wms.transparent}`;
};

// Get layer by name
export const getLayerByName = (name) => {
  return GEOSERVER_CONFIG.layers.find(layer => layer.name === name);
};

// Get layer bounding box in EPSG:4326
export const getLayerBounds = (layerName) => {
  const layer = getLayerByName(layerName);
  if (layer && layer.bbox) {
    return layer.bbox; // [minX, minY, maxX, maxY]
  }
  // Default bounds for your area (adjust as needed)
  return [72.0, 31.0, 72.2, 31.4]; // Approximate bounds for your region
};