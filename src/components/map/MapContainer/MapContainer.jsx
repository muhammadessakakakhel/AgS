// src/components/map/MapContainer/MapContainer.jsx
import React, { useRef } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useMap } from '../../../hooks/useMap';
import { useWMSLayers } from '../../../hooks/useWMSLayers';
import { useWFSBoundaries } from '../../../hooks/useWFSBoundaries';
import { useBasemap } from '../../../hooks/useBasemap';
import { useMapClick } from '../../../hooks/useMapClick';
import MapError from '../MapError/MapError';
import MapLoading from '../MapLoading/MapLoading';
import './MapContainer.css';

const MapContainer = ({ 
  selectedLayers = [], 
  onMapLoad, 
  basemapId, 
  onFeatureClick,
  showBoundaries = true
}) => {
  const mapContainer = useRef(null);
  
  // Initialize map
  const { map, mapLoaded, mapError, setMapError } = useMap(mapContainer, onMapLoad);
  
  // Manage WMS layers
  const { zoomToLayer, updateOpacity } = useWMSLayers(map, mapLoaded, selectedLayers);
  
  // Manage WFS boundaries (vector)
  const { 
    loadedLayers, 
    boundariesVisible, 
    toggleBoundaries 
  } = useWFSBoundaries(map, mapLoaded);
  
  // Handle basemap changes
  useBasemap(map, mapLoaded, basemapId, selectedLayers);
  
  // Handle map clicks
  useMapClick(map, mapLoaded, selectedLayers, onFeatureClick);

  return (
    <div className="map-container-wrapper">
      {mapError && (
        <MapError 
          error={mapError} 
          onClose={() => setMapError(null)} 
        />
      )}
      
      <div ref={mapContainer} className="map-container" />
      
      {/* Toggle button: hides/shows ALL boundaries */}
      {showBoundaries && loadedLayers.length > 0 && (
        <div className="boundary-control">
          <button 
            onClick={toggleBoundaries}
            className={`boundary-toggle ${boundariesVisible ? 'active' : ''}`}
            title={boundariesVisible ? 'Hide boundaries' : 'Show boundaries'}
          >
            {boundariesVisible ? '🗺️ Hide Boundaries' : '🗺️ Show Boundaries'}
          </button>
        </div>
      )}
      
      {!mapLoaded && !mapError && <MapLoading />}
    </div>
  );
};

export default MapContainer;
