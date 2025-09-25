import React from 'react';
import './MapError.css';

const MapError = ({ error, onClose }) => {
  return (
    <div className="map-error">
      <span className="error-icon">⚠️</span>
      <span className="error-message">{error}</span>
      {onClose && (
        <button 
          className="error-close" 
          onClick={onClose}
          aria-label="Close error"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default MapError;