// src/components/layers/LayerPanelHeader/LayerPanelHeader.jsx
import React from 'react';
import { FiEye } from 'react-icons/fi';
import './LayerPanelHeader.css';

const LayerPanelHeader = ({ visibleCount, totalCount }) => {
  return (
    <div className="layer-panel-header">
      <h2 className="panel-title">Sugarcane Layers</h2>
      <div className="layer-stats">
        <span className="stat-item">
          <FiEye className="stat-icon" />
          {visibleCount} / {totalCount}
        </span>
      </div>
    </div>
  );
};

export default LayerPanelHeader;