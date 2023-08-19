import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MoviesContext } from '../store/MoviesContext';
import SimilarMoviesList from './SimilarMovies';
import TmdbImage from './TmdbImage';

const MoviePage = () => {
    const { movieId } = useParams();
    const {movies} =  useContext(MoviesContext);

    const movie = movies ? movies[movieId] : null;
    
  return (
    movie ? <div className="movie-page">
      <TmdbImage className="movie-image" path={movie.poster} alt={movie.title} />
      <h1 className="movie-title">{movie.title}</h1>
      <p className="movie-tagline">{movie.tagline}</p>
      <p className="movie-overview">{movie.overview}</p>
      <p className="movie-genres">Genres: {movie.genres.join(', ')}</p>
      <p className="movie-date">Release Date: {movie.date}</p>
      <p className="movie-lang">Language: {movie.lang}</p>
      <p className="movie-director">Director: {movie.director}</p>
      <p className="movie-popularity">Popularity: {movie.popularity}</p>
      <p className="movie-vote">Vote Average: {movie.vote_average} / 10</p>
      <p className="movie-votes-count">Votes Count: {movie.vote_count}</p>
      <div className="movie-cast">
        <h3>Cast:</h3>
        {movie.cast.map((actor) => (
          <p key={actor.name}>{actor.name} as {actor.character}</p>
        ))}
      </div>

      <SimilarMoviesList movieId={movieId} />
    </div> : 
    <h1>Loading...</h1>
  );
};

export default MoviePage;
