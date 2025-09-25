// src/App.js
import React, { useState, useCallback } from 'react';
import MapContainer from './components/map/MapContainer/MapContainer';
import LayerPanel from './components/layers/LayerPanel/LayerPanel';
import { FiMenu, FiX, FiMap, FiLayers } from 'react-icons/fi';
import './App.css';
import './styles/globals.css';

function App() {
  const [selectedLayers, setSelectedLayers] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentBasemap, setCurrentBasemap] = useState('satellite');

  // Memoize callbacks to prevent unnecessary re-renders
  const handleLayersChange = useCallback((layers) => {
    setSelectedLayers(layers);
  }, []);

  const handleMapLoad = useCallback((map) => {
    console.log('Map instance loaded');
    // You can store the map instance if needed for future use
    // but don't set it in state if not using it to prevent re-renders
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  const handleBasemapChange = useCallback((e) => {
    const newBasemap = e.target.value;
    if (newBasemap !== currentBasemap) {
      setCurrentBasemap(newBasemap);
    }
  }, [currentBasemap]);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <button className="menu-toggle" onClick={toggleSidebar}>
            {sidebarOpen ? <FiX /> : <FiMenu />}
          </button>
          <div className="app-title">
            <FiMap className="title-icon" />
            <h1>Sugarcane Crop Monitoring Dashboard</h1>
          </div>
        </div>
        <div className="header-right">
          <div className="basemap-selector">
            <label>Basemap:</label>
            <select 
              value={currentBasemap} 
              onChange={handleBasemapChange}
            >
              <option value="satellite">Satellite</option>
              <option value="streets">Streets</option>
              <option value="basic">Basic</option>
              <option value="openstreetmap">OpenStreetMap</option>
            </select>
          </div>
        </div>
      </header>

      <div className="app-body">
        <aside className={`app-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <LayerPanel onLayersChange={handleLayersChange} />
        </aside>

        <main className="app-main">
          <MapContainer
            selectedLayers={selectedLayers}
            onMapLoad={handleMapLoad}
            basemapId={currentBasemap}
          />
          
          <div className="status-bar">
            <div className="status-item">
              <FiLayers className="status-icon" />
              <span>Active Layers: {selectedLayers.filter(l => l.visible).length}</span>
            </div>
            <div className="status-item">
              <span>GeoServer: Connected</span>
              <div className="status-indicator online"></div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;