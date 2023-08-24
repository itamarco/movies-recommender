import "./TopBar.css"

import React from "react"
import { Link } from "react-router-dom"

const TopBar = () => {
  return (
    <div className="top-bar">
      <nav>
        <Link to="/movies">Movies</Link>
        <Link to="/tvs">TV-Series</Link>
      </nav>
    </div>
  );
};

export default TopBar;
