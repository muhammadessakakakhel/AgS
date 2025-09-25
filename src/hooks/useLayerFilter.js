// src/hooks/useLayerFilter.js
import { useState, useMemo, useCallback } from 'react';
import { GEOSERVER_CONFIG } from '../config/geoserverConfig';

export const useLayerFilter = (layers) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState('all');
  const [filterDate, setFilterDate] = useState('all');

  // Extract unique regions and dates
  const regions = useMemo(() => 
    [...new Set(GEOSERVER_CONFIG.layers.map(l => l.region).filter(Boolean))],
    []
  );
  
  const dates = useMemo(() => 
    [...new Set(GEOSERVER_CONFIG.layers.map(l => l.date).filter(Boolean))].sort(),
    []
  );

  // Filter layers based on criteria
  const filteredLayers = useMemo(() => {
    return layers.filter(layer => {
      const matchesSearch = layer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            layer.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = filterRegion === 'all' || layer.region === filterRegion;
      const matchesDate = filterDate === 'all' || layer.date === filterDate;
      
      return matchesSearch && matchesRegion && matchesDate;
    });
  }, [layers, searchTerm, filterRegion, filterDate]);

  // Count visible layers
  const visibleCount = useMemo(() => 
    layers.filter(l => l.visible).length,
    [layers]
  );

  const resetFilters = useCallback(() => {
    setSearchTerm('');
    setFilterRegion('all');
    setFilterDate('all');
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    filterRegion,
    setFilterRegion,
    filterDate,
    setFilterDate,
    regions,
    dates,
    filteredLayers,
    visibleCount,
    resetFilters
  };
};