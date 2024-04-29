import React from 'react';
import './GnomeList.css';

function SearchBar({ onSearch }) {
  return (
    <div className="search-bar">
      <input className="search-input" type="text" onChange={(e) => onSearch(e.target.value)} placeholder="Search..." />
    </div>
  );
}

export default SearchBar;