import React, {useContext, useEffect, useState} from 'react';
import MoviesList from './MoviesList';
import axios from 'axios';
import { MoviesContext } from '../store/MoviesContext';

const SimilarMoviesList = ({ movieId, mediaType }) => {
  const [similarMovies, setSimilarMovies] = useState([]);
  const {movies, tvs} = useContext(MoviesContext);
  
  useEffect(() => {
    getSimilarMovies(movieId)
  }, []);
  
  const getSimilarMovies = async (movieId) => {
    try {
      const pathSuffix = mediaType == "movie" ? "byMovie" : "byTv";
      const response = await axios.get(`/recommendation/${pathSuffix}/${movieId}`)
      const movieIds = response.data;
      const similarMovies =
        mediaType == "movie"
          ? movieIds.map((id) => movies[id])
          : movieIds.map((id) => tvs[id]);
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
