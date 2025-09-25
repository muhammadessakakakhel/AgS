import React from 'react';
import './MapLoading.css';

const MapLoading = () => {
  return (
    <div className="map-loading">
      <div className="loading-content">
        <div className="loading-spinner"></div>
        <span className="loading-text">Loading map...</span>
      </div>
    </div>
  );
};

export default MapLoading;