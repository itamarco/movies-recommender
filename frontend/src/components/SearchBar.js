import "./SearchBar.css"
import React, { useEffect, useState } from "react";
const SearchBar = ({ onSearch }) => {
  const [firstGenre, setFirstGenre] = useState("");
  const [secondGenre, setSecondGenre] = useState("");
  const [searchText, setSearchText] = useState("");

  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Mystery",
    "Romance",
    "Science Fiction",
    "TV Movie",
    "Thriller",
    "War",
    "Western",
  ];

  const handleSearch = () => {
    onSearch(searchText, firstGenre, secondGenre);
  };

  const onReset = () => {
    setSearchText("")
    setFirstGenre("")
    setSecondGenre("")
  }

  useEffect(handleSearch, [searchText, firstGenre, secondGenre]);

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchText}
        className="search-input"
        onChange={(e) => setSearchText(e.target.value)}
      />
      <select value={firstGenre} onChange={(e) => setFirstGenre(e.target.value)}>
        <option value="">Select Genre</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      {firstGenre && (
        <select onChange={(e) => setSecondGenre(e.target.value)}>
          <option value="">Select Second Genre</option>
          {genres
            .filter((genre) => genre !== firstGenre)
            .map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
        </select>
      )}
      <button onClick={onReset} className="reset-button">
        Reset
      </button>
    </div>
  );
};

export default SearchBar;
