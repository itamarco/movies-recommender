import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TmdbImage from './TmdbImage';

const MovieCard = ({ movie, onVote }) => {
  const [rating, setRating] = useState(0);

  const handleVote = (star) => {
    setRating(star);
    onVote(movie.id, star);
  };

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <TmdbImage path={movie.poster} alt={movie.title} className="movie-image" />
      </Link>
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-score">Score: {movie.vote_average}</p>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= rating ? 'selected' : ''}`}
              onClick={() => handleVote(star)}
            >
              ★
            </span>
          ))}
        </div>
    </div>
  );
};

export default MovieCard;
