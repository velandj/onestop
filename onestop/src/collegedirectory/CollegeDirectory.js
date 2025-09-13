import React, { useState } from "react";
import collegesData from "../data/colleges.json";
import "./CollegeDirectory.css"; // CSS file

const CollegeDirectory = ({ onBack }) => {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");

  // filter colleges based on search + type
  const filteredColleges = collegesData.filter((college) => {
    const matchesSearch = college.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesType =
      filterType === "All" || college.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="directory-container">
        
      <h1 className="title">Nearby College Directory</h1>

      {/* Search + Dropdown Filter */}
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search college..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="dropdown"
        >
          <option value="All">All</option>
          <option value="Engineering">Engineering</option>
          <option value="Medical">Medical</option>
          <option value="Arts & Science">Arts & Science</option>
          <option value="Law">Law</option>
        </select>
      </div>

      {/* Display Colleges */}
      <div className="college-grid">
        {filteredColleges.length > 0 ? (
          filteredColleges.map((college) => (
            <div key={college.id} className="college-card">
              <h2 className="college-name">{college.name}</h2>
              <p className="college-type">{college.type}</p>
              <p className="college-location">{college.location}</p>

              <h3 className="facilities-title">Facilities:</h3>
              <ul className="facilities-list">
                {college.facilities.map((facility, index) => (
                  <li key={index}>{facility}</li>
                ))}
              </ul>

              {/* Website Link */}
              {college.website && (
                <a
                  href={college.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="website-link"
                >
                  🌐 Official Website
                </a>
              )}

              {/* Google Maps link */}
              <a
                href={`https://www.google.com/maps?q=${college.latitude},${college.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="map-link"
              >
                📍 View on Map
              </a>
            </div>
          ))
        ) : (
          <p className="no-result">No colleges found</p>
        )}
      </div>
    </div>
  );
};

export default CollegeDirectory;
