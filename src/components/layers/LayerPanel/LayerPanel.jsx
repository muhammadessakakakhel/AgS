import React, { useCallback } from 'react';
import LayerPanelHeader from '../LayerPanelHeader/LayerPanelHeader';
import LayerFilters from '../LayerFilters/LayerFilters';
import LayerActions from '../LayerActions/LayerActions';
import LayerItem from '../LayerItem/LayerItem';
import { useLayerState } from '../../../hooks/useLayerState';
import { useLayerFilter } from '../../../hooks/useLayerFilter';
import './LayerPanel.css';

const LayerPanel = ({ onLayersChange }) => {
  // Manage layer state
  const {
    layers,
    handleLayerToggle,
    handleOpacityChange,
    handleShowAll,
    handleHideAll,
    resetLayers
  } = useLayerState(onLayersChange);

  // Manage filtering
  const {
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
  } = useLayerFilter(layers);

  // Combined reset function
  const handleReset = useCallback(() => {
    resetLayers();
    resetFilters();
  }, [resetLayers, resetFilters]);

  return (
    <div className="layer-panel">
      <LayerPanelHeader 
        visibleCount={visibleCount} 
        totalCount={layers.length} 
      />
      
      <LayerFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterRegion={filterRegion}
        setFilterRegion={setFilterRegion}
        filterDate={filterDate}
        setFilterDate={setFilterDate}
        regions={regions}
        dates={dates}
      />
      
      <LayerActions
        onShowAll={handleShowAll}
        onHideAll={handleHideAll}
        onReset={handleReset}
      />
      
      <div className="layer-list">
        {filteredLayers.length === 0 ? (
          <div className="no-layers">
            <p>No layers found matching your filters.</p>
          </div>
        ) : (
          filteredLayers.map(layer => (
            <LayerItem
              key={layer.id}
              layer={layer}
              onToggle={handleLayerToggle}
              onOpacityChange={handleOpacityChange}
            />
          ))
        )}
      </div>

      <div className="layer-panel-footer">
        <p className="footer-text">
          Powered by Comsoft
        </p>
      </div>
    </div>
  );
};

export default LayerPanel;