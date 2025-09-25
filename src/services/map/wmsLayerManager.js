// src/services/map/wmsLayerManager.js
import { GEOSERVER_CONFIG, getLayerBounds } from '../../config/geoserverConfig';

export class WMSLayerManager {
  constructor(map) {
    this.map = map;
  }

  // Build WMS URL for a layer
  buildWMSUrl(layer) {
    return `${GEOSERVER_CONFIG.baseUrl}/${GEOSERVER_CONFIG.workspace}/wms?` +
      `service=WMS&` +
      `version=1.1.0&` +
      `request=GetMap&` +
      `layers=${GEOSERVER_CONFIG.workspace}:${layer.name}&` +
      `bbox={bbox-epsg-3857}&` +
      `width=256&` +
      `height=256&` +
      `srs=EPSG:3857&` +
      `styles=&` +
      `format=image/png&` +
      `transparent=true`;
  }

  // Add a single WMS layer
  addLayer(layer) {
    if (!this.map) return false;

    const layerId = `wms-layer-${layer.id}`;
    const sourceId = `wms-source-${layer.id}`;

    try {
      // Check if source already exists
      if (this.map.getSource(sourceId)) {
        if (this.map.getLayer(layerId)) {
          this.map.setPaintProperty(layerId, 'raster-opacity', layer.opacity || 0.8);
        }
        return true;
      }

      const wmsUrl = this.buildWMSUrl(layer);

      // Add source
      this.map.addSource(sourceId, {
        type: 'raster',
        tiles: [wmsUrl],
        tileSize: 256,
        scheme: 'xyz'
      });

      // Add layer
      this.map.addLayer({
        id: layerId,
        type: 'raster',
        source: sourceId,
        paint: {
          'raster-opacity': layer.opacity || 0.8,
          'raster-fade-duration': 300
        }
      });

      console.log(`Successfully added layer: ${layer.title}`);
      return true;
    } catch (error) {
      console.error(`Error adding layer ${layer.title}:`, error);
      return false;
    }
  }

  // Remove a WMS layer
  removeLayer(layer) {
    if (!this.map) return;

    const layerId = `wms-layer-${layer.id}`;
    const sourceId = `wms-source-${layer.id}`;

    if (this.map.getLayer(layerId)) {
      this.map.removeLayer(layerId);
    }
    if (this.map.getSource(sourceId)) {
      this.map.removeSource(sourceId);
    }
  }

  // Update all layers
  updateLayers(layers) {
    if (!this.map) return;

    // Remove all existing WMS layers
    GEOSERVER_CONFIG.layers.forEach(layer => {
      this.removeLayer(layer);
    });

    // Add visible layers
    layers.forEach(layer => {
      if (layer.visible) {
        this.addLayer(layer);
      }
    });

    // Fit bounds to visible layers
    // this.fitBoundsToLayers(layers.filter(l => l.visible));
  }

  // Zoom to layer bounds
  zoomToLayer(layer) {
    if (!this.map) return;

    const bounds = getLayerBounds(layer.name);
    if (bounds) {
      this.map.fitBounds([
        [bounds[0], bounds[1]], // Southwest
        [bounds[2], bounds[3]]  // Northeast
      ], {
        padding: 50,
        duration: 1000
      });
    }
  }

  // Fit bounds to multiple layers
  fitBoundsToLayers(layers) {
    if (!this.map || layers.length === 0) return;

    let minX = 180, minY = 90, maxX = -180, maxY = -90;

    layers.forEach(layer => {
      const bounds = getLayerBounds(layer.name);
      if (bounds) {
        minX = Math.min(minX, bounds[0]);
        minY = Math.min(minY, bounds[1]);
        maxX = Math.max(maxX, bounds[2]);
        maxY = Math.max(maxY, bounds[3]);
      }
    });

    if (minX < maxX && minY < maxY) {
      this.map.fitBounds([
        [minX, minY],
        [maxX, maxY]
      ], {
        padding: 50,
        duration: 1000
      });
    }
  }

  // Update layer opacity
  updateOpacity(layerId, opacity) {
    const mapLayerId = `wms-layer-${layerId}`;
    if (this.map && this.map.getLayer(mapLayerId)) {
      this.map.setPaintProperty(mapLayerId, 'raster-opacity', opacity);
    }
  }
}