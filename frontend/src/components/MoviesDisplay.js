import React, { useState, useEffect, useMemo, useContext } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import MoviesList from './MoviesList';
import { MoviesContext } from '../store/MoviesContext';

const PAGE_SIZE = 20; // Number of movies per page

const MoviesDisplay = () => {
  const [displayMovies, setDisplayMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const {movies} =  useContext(MoviesContext);
  const filteredMovies = useMemo(() => {
    const moviesList = Object.values(movies)
    return searchTerm
      ? moviesList.filter((movie) =>
          movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : moviesList;
  }, [searchTerm, movies]); // Recalculate filteredMovies whenever searchTerm changes


  const fetchMovies = () => {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    const newMovies = filteredMovies.slice(start, end);
    setDisplayMovies((prevMovies) => [...prevMovies, ...newMovies]);
  };



  const handleVote = (movieId, userId) => {
    axios.post('/vote', { movieId, userId });
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setDisplayMovies([]); // Clear the current movies
    setPage(1); // Reset to the first page
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      displayMovies.length < filteredMovies.length
    ) {
      setPage((prevPage) => prevPage + 1); // Increment the page number
    }
  };

  useEffect(() => {
    // Reset movies and page when searchTerm changes
    setDisplayMovies([]);
    setPage(1);
  }, [searchTerm]);

  useEffect(() => {
    fetchMovies();
  }, [page, filteredMovies]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [displayMovies, filteredMovies]);
  
  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <MoviesList movies={displayMovies} />
    </div>
  );
};

export default MoviesDisplay;
