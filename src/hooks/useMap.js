// src/hooks/useMap.js (Updated with Geolocate Control)
import { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { MAP_CONFIG, getDefaultBasemap } from '../config/mapConfig';

export const useMap = (containerRef, onMapLoad, enableGeolocation = true) => {
  const map = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(null);

  useEffect(() => {
    if (!containerRef.current || map.current) return;

    try {
      const basemap = getDefaultBasemap();
      const initialCenter = [71.86, 30.86];
      //30.868062201038164, 71.86708073426148

      map.current = new maplibregl.Map({
        container: containerRef.current,
        style: basemap.url,
        center: initialCenter,
        zoom: 8.5,
        minZoom: MAP_CONFIG.minZoom,
        maxZoom: MAP_CONFIG.maxZoom,
        ...MAP_CONFIG.interaction
      });

      // Add controls
      addMapControls(map.current, enableGeolocation);

      // Event handlers
      map.current.on('load', () => {
        console.log('Map loaded successfully');
        setMapLoaded(true);
        if (onMapLoad) {
          onMapLoad(map.current);
        }
      });

      map.current.on('error', (e) => {
        console.error('Map error:', e);
        if (e.error && !e.error.message?.includes('tiles')) {
          setMapError(e.error.message || 'An error occurred loading the map');
        }
      });

    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError(error.message);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [onMapLoad, enableGeolocation]);

  return {
    map: map.current,
    mapLoaded,
    mapError,
    setMapError
  };
};

// Helper function to add controls
const addMapControls = (mapInstance, enableGeolocation) => {
  const { controls } = MAP_CONFIG;

  // Navigation control
  if (controls.navigation) {
    mapInstance.addControl(
      new maplibregl.NavigationControl({
        showCompass: controls.navigation.showCompass,
        showZoom: controls.navigation.showZoom,
        visualizePitch: controls.navigation.visualizePitch
      }),
      controls.navigation.position
    );
  }

  // Scale control
  if (controls.scale) {
    mapInstance.addControl(
      new maplibregl.ScaleControl({
        maxWidth: controls.scale.maxWidth,
        unit: controls.scale.unit
      }),
      controls.scale.position
    );
  }

  // Fullscreen control
  if (controls.fullscreen) {
    mapInstance.addControl(
      new maplibregl.FullscreenControl(),
      controls.fullscreen.position
    );
  }

  // ADD GEOLOCATE CONTROL HERE
  if (enableGeolocation) {
    const geolocateControl = new maplibregl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,       // Enable continuous tracking
      showUserLocation: true,        // Show user location marker
      showAccuracyCircle: true,      // Show accuracy circle
      showUserHeading: true,         // Show direction user is facing (if available)
      fitBoundsOptions: {
        maxZoom: 16                  // Don't zoom in too close
      }
    });

    mapInstance.addControl(geolocateControl, 'top-right');

    // Optional: Auto-trigger geolocation on load
    mapInstance.on('load', () => {
      // Uncomment to auto-locate user on map load
      // geolocateControl.trigger();
    });

    // Listen to geolocation events
    geolocateControl.on('geolocate', (e) => {
      console.log('User location:', e.coords);
      // You can emit this to parent component if needed
    });

    geolocateControl.on('error', (error) => {
      console.error('Geolocation error:', error);
    });

    geolocateControl.on('trackuserlocationstart', () => {
      console.log('Started tracking user location');
    });

    geolocateControl.on('trackuserlocationend', () => {
      console.log('Stopped tracking user location');
    });
  }
};