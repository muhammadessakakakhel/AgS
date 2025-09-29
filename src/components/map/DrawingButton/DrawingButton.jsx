// src/components/map/DrawingButton/DrawingButton.jsx
import React from 'react';
import './DrawingButton.css';

const DrawingButton = ({ 
  isDrawing = false,
  pointCount = 0,
  onToggle,
  onClearAll,
  compact = true  // ✨ NEW: Use compact style by default
}) => {
  
  // ═══════════════════════════════════════════════════════
  // COMPACT VERSION (MapLibre style)
  // ═══════════════════════════════════════════════════════
  if (compact) {
    return (
      <div className="drawing-controls-compact">
        {/* Main toggle button */}
        <button
          onClick={onToggle}
          className={`drawing-toggle-compact ${isDrawing ? 'active' : ''}`}
          title={isDrawing ? 'Stop drawing' : 'Start drawing'}
        >
          <span className="button-icon">
            {isDrawing ? '⏸️' : '✏️'}
          </span>
          
          {/* Point counter badge */}
          {pointCount > 0 && (
            <span className="point-counter-compact">{pointCount}</span>
          )}
        </button>

        {/* Clear button (only show when there are points) */}
        {pointCount > 0 && onClearAll && (
          <button
            onClick={onClearAll}
            className="clear-button-compact"
            title="Clear all points"
          >
            🗑️
          </button>
        )}
      </div>
    );
  }
  
  // ═══════════════════════════════════════════════════════
  // FULL VERSION (Original large buttons)
  // ═══════════════════════════════════════════════════════
  return (
    <div className="drawing-controls">
      <button
        onClick={onToggle}
        className={`drawing-toggle ${isDrawing ? 'active' : ''}`}
        title={isDrawing ? 'Stop drawing points' : 'Start drawing points'}
      >
        <span className="button-icon">
          {isDrawing ? '⏸️' : '✏️'}
        </span>
        <span className="button-text">
          {isDrawing ? 'Stop Drawing' : 'Start Drawing'}
        </span>
      </button>

      {pointCount > 0 && (
        <div className="point-counter">
          <span className="counter-icon">📍</span>
          <span className="counter-text">{pointCount} point{pointCount !== 1 ? 's' : ''}</span>
        </div>
      )}

      {pointCount > 0 && onClearAll && (
        <button
          onClick={onClearAll}
          className="clear-button"
          title="Clear all points"
        >
          <span className="button-icon">🗑️</span>
          <span className="button-text">Clear All</span>
        </button>
      )}

      {isDrawing && (
        <div className="drawing-hint">
          <span className="pulse-dot"></span>
          <span>Click on map to add points</span>
        </div>
      )}
    </div>
  );
};

export default DrawingButton;