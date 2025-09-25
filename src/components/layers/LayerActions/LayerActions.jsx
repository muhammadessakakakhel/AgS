import React from 'react';
import { FiEye, FiEyeOff, FiRefreshCw } from 'react-icons/fi';
import './LayerActions.css';

const LayerActions = ({ onShowAll, onHideAll, onReset }) => {
  return (
    <div className="layer-actions">
      <button 
        className="action-btn show-all"
        onClick={onShowAll}
        title="Show all layers"
      >
        <FiEye /> Show All
      </button>
      <button 
        className="action-btn hide-all"
        onClick={onHideAll}
        title="Hide all layers"
      >
        <FiEyeOff /> Hide All
      </button>
      <button 
        className="action-btn reset"
        onClick={onReset}
        title="Reset to defaults"
      >
        <FiRefreshCw /> Reset
      </button>
    </div>
  );
};

export default LayerActions;