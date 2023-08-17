import React from 'react';
import MovieCard from './MovieCard';

const MoviesList = ({ movies }) => {
  return (
    <div className='movies-list'>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MoviesList;
