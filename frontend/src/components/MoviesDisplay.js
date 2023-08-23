import React, { useState, useEffect, useMemo, useContext } from 'react';
import SearchBar from './SearchBar';
import MoviesList from './MoviesList';
import { MoviesContext } from '../store/MoviesContext';

const PAGE_SIZE = 20; // Number of movies per page

const MoviesDisplay = () => {
  const [displayMovies, setDisplayMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [firstGenre, setFirstGenre] = useState("");
  const [secondGenre, setSecondGenre] = useState("");
  const {movies} =  useContext(MoviesContext);
  const filteredMovies = useMemo(() => {
    const moviesList = Object.values(movies)
    let filteredMovies = moviesList;
    if (searchTerm) {
      filteredMovies = filteredMovies.filter((movie) => { 
        const term = searchTerm.toLowerCase()
        return movie.title.toLowerCase().includes(term) ||
          (movie.director && movie.director.toLowerCase().includes(term)) ||
          movie.cast.map( p => p.name ).join(', ').toLowerCase().includes(term);
      });
    }

    if (firstGenre) {
      filteredMovies = filteredMovies.filter( (movie) => 
        movie.genres.includes(firstGenre)
      )
    }

    if (secondGenre) {
      filteredMovies = filteredMovies.filter((movie) => 
        movie.genres.includes(secondGenre)
      );
    }

    return filteredMovies;
  }, [searchTerm, firstGenre, secondGenre, movies]); // Recalculate filteredMovies whenever searchTerm changes


  const fetchMovies = () => {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    const newMovies = filteredMovies.slice(start, end);
    setDisplayMovies((prevMovies) => [...prevMovies, ...newMovies]);
  };

  const handleSearch = (term, firstGenre, secondGenre) => {
    setSearchTerm(term);
    setFirstGenre(firstGenre);
    setSecondGenre(secondGenre);
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
