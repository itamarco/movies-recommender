import React, {useContext, useEffect, useState} from 'react';
import MoviesList from './MoviesList';
import axios from 'axios';
import { MoviesContext } from '../store/MoviesContext';

const SimilarMoviesList = ({ movieId }) => {
  const [similarMovies, setSimilarMovies] = useState([]);
  const {movies} = useContext(MoviesContext);

  useEffect(() => {
    getSimilarMovies(movieId)
  }, [movieId]);

  const getSimilarMovies = async (movieId) => {
    try {
      const response = await axios.get(`/recommendation/byMovie/${movieId}`)
      const movieIds = response.data;
      const similarMovies = movieIds.map(id => movies[id])
      setSimilarMovies(similarMovies)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div>
      <h1>Similar Movies:</h1>
      <MoviesList movies={similarMovies} />
    </div>
  );
};

export default SimilarMoviesList;
