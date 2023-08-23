import "./MoviePage.css";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MoviesContext } from "../store/MoviesContext";
import SimilarMoviesList from "./SimilarMovies";
import TmdbImage from "./TmdbImage";
import Vote from "./Vote";

const MoviePage = () => {
  const { movieId } = useParams();
  const { movies } = useContext(MoviesContext);

  const movie = movies ? movies[movieId] : null;

  return movie ? (
    <div>
      <div className="movie-page">
        <div className="movie-left">
          <TmdbImage path={movie.poster_path} alt={movie.title} className="movie-image"/>
          <div className="movie-votes">
            <p>Vote Average: {movie.vote_average}</p>
            <p>Vote Count: {movie.vote_count}</p>
          </div>
          <div className="movie-popularity">
            <p>Popularity: {movie.popularity}</p>
          </div>
        </div>
        <div className="movie-right">
          <h1>{movie.title}</h1>
          <p className="movie-tagline">{movie.tagline}</p>
          <p className="movie-overview">{movie.overview_he}</p>
          <div className="movie-genres">
            {movie.genres.join(', ')}
          </div>
          <div className="movie-cast">
            <h3>Cast:</h3>
            {movie.cast.map((castMember) => (
              <p key={castMember.name}>
                {castMember.name} as {castMember.character}
              </p>
            ))}
          </div>
          <p className="movie-director">Director: {movie.director}</p>
        </div>
      </div>
      <SimilarMoviesList movieId={movieId} />
    </div>
  ) : (
    <h1>Loading...</h1>
  );

  // <div className="movie-page">
  //   <TmdbImage className="movie-image" path={movie.poster} alt={movie.title} />
  //   <h1 className="movie-title">{movie.title}</h1>
  //   <p className="movie-tagline">{movie.tagline}</p>
  //   <p className="movie-overview">{movie.overview}</p>
  //   <p className="movie-genres">Genres: {movie.genres.join(', ')}</p>
  //   <p className="movie-date">Release Date: {movie.date}</p>
  //   <p className="movie-lang">Language: {movie.lang}</p>
  //   <p className="movie-director">Director: {movie.director}</p>
  //   <p className="movie-popularity">Popularity: {movie.popularity}</p>
  //   <p className="movie-vote">Vote Average: {movie.vote_average} / 10</p>
  //   <p className="movie-votes-count">Votes Count: {movie.vote_count}</p>
  //   <Vote movieId={movie.id}/>
  //   <div className="movie-cast">
  //     <h3>Cast:</h3>
  //     {movie.cast.map((actor) => (
  //       <p key={actor.name}>{actor.name} as {actor.character}</p>
  //     ))}
  //   </div>
};

export default MoviePage;
