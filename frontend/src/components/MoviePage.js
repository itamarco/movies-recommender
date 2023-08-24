import "./MoviePage.css";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MoviesContext } from "../store/MoviesContext";
import SimilarMoviesList from "./SimilarMovies";
import TmdbImage from "./TmdbImage";
import Vote from "./Vote";

const MoviePage = ({mediaType}) => {
  const { movieId } = useParams();
  const { movies, tvs } = useContext(MoviesContext);
  
  const [movie, setMovie] = useState(null)

  useEffect( () => {
    const movieList = mediaType == "movie" ? movies : tvs;
    if (movieId) {
      setMovie(movieList[movieId])
    }
  }, [movieId, mediaType, movies, tvs])

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
          <h1>{movie.title || movie.name}</h1>
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
          <p className="movie-director">By: {movie.director || movie.creators.join(", ")}</p>
          <Vote movieId={movie.id}/>
        </div>
      </div>
      <SimilarMoviesList movieId={movieId} mediaType={mediaType} />
    </div>
  ) : (
    <h1>Loading...</h1>
  );

};

export default MoviePage;
