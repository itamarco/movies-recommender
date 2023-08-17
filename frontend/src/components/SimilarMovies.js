import React, {useEffect, useState} from 'react';
import MoviesList from './MoviesList';

const SimilarMoviesList = ({ movieId }) => {
  const [similarMovies, setSimilarMovies] = useState([])

  useEffect(() => {
    // Fetch similar movies based on movieId
    fetch(`/recommend-by-movie/${movieId}`)
      .then((response) => response.json())
      .then((data) => setSimilarMovies(data));
  }, [movieId]);

  return (
    <div>
      <h1>Similar Movies:</h1>
      <MoviesList movies={similarMovies} />
    </div>
  );
};

export default SimilarMoviesList;
