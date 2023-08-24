import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TmdbImage from './TmdbImage';
import Vote from './Vote';

const MovieCard = ({ movie, onVote }) => {
  const mediaLink = movie.title ? "movies" : "tvs"

  return (
    <div className="movie-card">
      <Link to={`/${mediaLink}/${movie.id}`}>
        <TmdbImage path={movie.poster_path} alt={movie.title} className="movie-image" />
      </Link>
        <h3 className="movie-title">{movie.title || movie.name} ({movie.year})</h3>
        <p className="movie-score">Score: {movie.vote_average}</p>
        <Vote movieId={movie.id}/>
    </div>
  );
};

export default MovieCard;
