import React from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import './LayerFilters.css';

const LayerFilters = ({ 
  searchTerm, 
  setSearchTerm,
  filterRegion,
  setFilterRegion,
  filterDate,
  setFilterDate,
  regions,
  dates
}) => {
  return (
    <>
      <div className="layer-search">
        <div className="search-input-wrapper">
          <FiSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search layers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="layer-filters">
        <div className="filter-group">
          <label className="filter-label">
            <FiFilter className="filter-icon" />
            Region
          </label>
          <select
            className="filter-select"
            value={filterRegion}
            onChange={(e) => setFilterRegion(e.target.value)}
          >
            <option value="all">All Regions</option>
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">
            <FiFilter className="filter-icon" />
            Date
          </label>
          <select
            className="filter-select"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          >
            <option value="all">All Dates</option>
            {dates.map(date => (
              <option key={date} value={date}>{date}</option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default LayerFilters;