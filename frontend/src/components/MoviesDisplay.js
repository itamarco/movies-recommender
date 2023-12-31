import React, { useState, useEffect, useMemo, useContext } from 'react';
import SearchBar from './SearchBar';
import MoviesList from './MoviesList';
import { MoviesContext } from '../store/MoviesContext';

const PAGE_SIZE = 20; // Number of movies per page

const MoviesDisplay = ({mediaType}) => {
  const [displayMovies, setDisplayMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [firstGenre, setFirstGenre] = useState("");
  const [secondGenre, setSecondGenre] = useState("");
  const [avoidGenre, setAvoidGenre] = useState("");

  const {movies, tvs, hasMoviesLoaded} =  useContext(MoviesContext);

  const filteredMovies = useMemo(() => {
   
    let filteredMovies = mediaType == 'movie' ? Object.values(movies) : Object.values(tvs);
    if (searchTerm) {
      filteredMovies = filteredMovies.filter((movie) => { 
        const term = searchTerm.toLowerCase()
        return movie.title?.toLowerCase().includes(term) ||
           movie.name?.toLowerCase().includes(term) ||
           movie.director?.toLowerCase().includes(term) ||
           movie.creators?.map( c => c.name).join(', ').toLowerCase().includes(term) ||
           movie.production_companies?.join(', ').toLowerCase().includes(term) ||
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

    if (avoidGenre) {
      filteredMovies = filteredMovies.filter((movie) =>
        !movie.genres.includes(avoidGenre)
      );
    }

    return filteredMovies.sort((a, b) => b.vote_average - a.vote_average);
  }, [searchTerm, firstGenre, secondGenre, avoidGenre, mediaType, movies, tvs]);


  const fetchMovies = () => {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    const newMovies = filteredMovies.slice(start, end);
    setDisplayMovies((prevMovies) => [...prevMovies, ...newMovies]);
  };

  const handleSearch = (term, firstGenre, secondGenre, avoidGenre) => {
    setSearchTerm(term);
    setFirstGenre(firstGenre);
    setSecondGenre(secondGenre);
    setAvoidGenre(avoidGenre)
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
  }, [searchTerm, mediaType]);

  useEffect(() => {
    fetchMovies();
  }, [page, filteredMovies]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [displayMovies, filteredMovies]);

  return (
    <div>
      <SearchBar onSearch={handleSearch} mediaType={mediaType} />
      {hasMoviesLoaded ? (
        <MoviesList movies={displayMovies} />
      ) : (
        <img
          src="/static/loading.gif"
          alt="Loading..."
          className="loading-gif"
        />
      )}
    </div>
  );
};

export default MoviesDisplay;
