// src/components/layers/LayerItem/LayerItem.jsx
import React, { useState } from 'react';
import { FiEye, FiEyeOff, FiInfo, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import './LayerItem.css';

const LayerItem = ({ layer, onToggle, onOpacityChange }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    onToggle(layer.id);
  };

  const handleOpacityChange = (e) => {
    const opacity = parseFloat(e.target.value);
    onOpacityChange(layer.id, opacity);
  };

  return (
    <div className={`layer-item ${layer.visible ? 'active' : ''}`}>
      <div className="layer-item-header">
        <button 
          className={`layer-toggle ${layer.visible ? 'visible' : ''}`}
          onClick={handleToggle}
          title={layer.visible ? 'Hide layer' : 'Show layer'}
        >
          {layer.visible ? <FiEye /> : <FiEyeOff />}
        </button>
        
        <div className="layer-info" onClick={() => setExpanded(!expanded)}>
          <h4 className="layer-title">{layer.title}</h4>
          <span className="layer-meta">
            {layer.date && <span className="layer-date">{layer.date}</span>}
            {layer.region && <span className="layer-region">{layer.region}</span>}
          </span>
        </div>
        
        <button 
          className="layer-expand"
          onClick={() => setExpanded(!expanded)}
          title={expanded ? 'Collapse' : 'Expand'}
        >
          {expanded ? <FiChevronUp /> : <FiChevronDown />}
        </button>
      </div>
      
      {expanded && (
        <div className="layer-item-body">
          {layer.description && (
            <p className="layer-description">
              <FiInfo className="info-icon" />
              {layer.description}
            </p>
          )}
          
          <div className="layer-controls">
            <div className="opacity-control">
              <label>Opacity: {Math.round(layer.opacity * 100)}%</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={layer.opacity}
                onChange={handleOpacityChange}
                disabled={!layer.visible}
                className="opacity-slider"
              />
            </div>
          </div>
          
          <div className="layer-details">
            <span className="detail-item">Type: {layer.type}</span>
            <span className="detail-item">Layer: {layer.name}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LayerItem;