// src/hooks/usePolygonAreas.js
import { useState, useEffect } from "react";
import * as turf from "@turf/turf";
import { GEOSERVER_CONFIG } from "../config/geoserverConfig";

const fetchWFS = async (layerName) => {
  const url = `${GEOSERVER_CONFIG.baseUrl}/${GEOSERVER_CONFIG.workspace}/ows?` +
    `service=WFS&version=2.0.0&request=GetFeature&typeName=${GEOSERVER_CONFIG.workspace}:${layerName}&` +
    `outputFormat=application/json&srsName=EPSG:4326`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch WFS for " + layerName);
  return res.json();
};

export const usePolygonAreas = () => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAreas = async () => {
      try {
        const results = [];

        for (const layer of GEOSERVER_CONFIG.vectorLayers) {
          if (layer.type === "polygon") {
            const data = await fetchWFS(layer.name);

            if (data.features) {
              data.features.forEach((feature, i) => {
                const areaSqMeters = turf.area(feature);
                const areaHectares = areaSqMeters / 10000.0;

                results.push({
                  id: `${layer.name}-${i}`,
                  layer: layer.title,
                  areaSqMeters,
                  areaHectares,
                  properties: feature.properties || {},
                  geometry: feature.geometry,
                });
              });
            }
          }
        }

        setAreas(results);
      } catch (err) {
        console.error("Error calculating polygon areas:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAreas();
  }, []);

  return { areas, loading };
};
