// src/services/map/wfsService.js
import { GEOSERVER_CONFIG } from '../../config/geoserverConfig';

export class WFSService {
  constructor(map) {
    this.map = map;
  }

  // Fetch GeoJSON data from WFS
  async fetchWFSLayer(typeName) {
    const url = `${GEOSERVER_CONFIG.baseUrl}/wfs?` +
      `service=WFS&` +
      `version=1.1.0&` +
      `request=GetFeature&` +
      `typeName=${GEOSERVER_CONFIG.workspace}:${typeName}&` +
      `outputFormat=application/json`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch WFS layer: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching WFS data:', error);
      throw error;
    }
  }

  // Add polygon boundaries to map
  async addPolygonBoundaries(typeName, layerId = 'polygon-boundaries') {
    if (!this.map) return;

    try {
      // Check if layer already exists
      if (this.map.getLayer(`${layerId}-fill`)) {
        console.log('Polygon boundaries already added');
        return;
      }

      // Fetch GeoJSON data
      const geojsonData = await this.fetchWFSLayer(typeName);
      
      // Add source
      this.map.addSource(layerId, {
        type: 'geojson',
        data: geojsonData
      });


      // Add outline layer (polygon borders)
      this.map.addLayer({
        id: `${layerId}-outline`,
        type: 'line',
        source: layerId,
        paint: {
          'line-color': '#FF0000',   // Red outline
          'line-width': 2,
          'line-opacity': 0.8
        }
      });

      // Add labels if properties contain name field
      if (geojsonData.features.length > 0 && geojsonData.features[0].properties.name) {
        this.map.addLayer({
          id: `${layerId}-labels`,
          type: 'symbol',
          source: layerId,
          layout: {
            'text-field': ['get', 'name'],
            'text-size': 12,
            'text-anchor': 'center'
          },
          paint: {
            'text-color': '#000000',
            'text-halo-color': '#FFFFFF',
            'text-halo-width': 1
          }
        });
      }

      console.log(`Polygon boundaries added: ${typeName}`);
      return geojsonData;
    } catch (error) {
      console.error('Error adding polygon boundaries:', error);
      throw error;
    }
  }

  // Remove polygon boundaries
  removePolygonBoundaries(layerId = 'polygon-boundaries') {
    if (!this.map) return;

    // Remove layers
    const layerIds = [`${layerId}-fill`, `${layerId}-outline`, `${layerId}-labels`];
    layerIds.forEach(id => {
      if (this.map.getLayer(id)) {
        this.map.removeLayer(id);
      }
    });

    // Remove source
    if (this.map.getSource(layerId)) {
      this.map.removeSource(layerId);
    }
  }

  // Toggle visibility
  togglePolygonVisibility(visible, layerId = 'polygon-boundaries') {
    if (!this.map) return;

    const visibility = visible ? 'visible' : 'none';
    const layerIds = [`${layerId}-fill`, `${layerId}-outline`, `${layerId}-labels`];
    
    layerIds.forEach(id => {
      if (this.map.getLayer(id)) {
        this.map.setLayoutProperty(id, 'visibility', visibility);
      }
    });
  }
}