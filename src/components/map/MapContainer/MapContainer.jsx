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

import { useDrawingPoints } from '../../../hooks/useDrawingPoints';
import { usePointPopup } from '../PointPopup/PointPopup';
import DrawingButton from '../DrawingButton/DrawingButton';

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

      // ══════════════════════════════════════════════════════════════
  // 🆕 NEW FEATURE - Drawing Points
  // ══════════════════════════════════════════════════════════════
  const drawing = useDrawingPoints(map, mapLoaded);
  
  // Setup point popups (info windows)
  usePointPopup(map, mapLoaded, drawing.points, drawing.deletePoint);
  // ══════════════════════════════════════════════════════════════


  // Manage WMS layers
  const { zoomToLayer, updateOpacity } = useWMSLayers(map, mapLoaded, selectedLayers);

  // Manage WFS boundaries (vector)
  const {
    loadedLayers,
    boundariesVisible,
    toggleBoundaries,
    loadAllBoundaries // 🔑 pass this to useBasemap
  } = useWFSBoundaries(map, mapLoaded);

  // Handle basemap changes (also reloads WFS)
  useBasemap(map, mapLoaded, basemapId, selectedLayers, loadAllBoundaries);

  // Handle map clicks
  useMapClick(map, mapLoaded, selectedLayers, onFeatureClick);





  return (
    <div className="map-container-wrapper">
      {mapError && (
        <MapError error={mapError} onClose={() => setMapError(null)} />
      )}

      <div ref={mapContainer} className="map-container" />

           {/* ═══════════════════════════════════════════════════════ */}
      {/* 🆕 DRAWING CONTROLS - Add this new section              */}
      {/* ═══════════════════════════════════════════════════════ */}
      {mapLoaded && (
        <DrawingButton
          isDrawing={drawing.isDrawing}
          pointCount={drawing.pointCount}
          onToggle={drawing.toggleDrawing}
          onClearAll={drawing.clearAllPoints}
          compact={true}  // ✨ Compact MapLibre style (or remove, it's default)

        />
      )}
      {/* ═══════════════════════════════════════════════════════ */}


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
