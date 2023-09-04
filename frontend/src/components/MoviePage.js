import "./MoviePage.css";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MoviesContext } from "../store/MoviesContext";
import SimilarMoviesList from "./SimilarMovies";
import TmdbImage from "./TmdbImage";
import Vote from "./Vote";
import TrailerModal from "./TrailerModal";

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
          <TmdbImage
            path={movie.poster_path}
            alt={movie.title}
            className="movie-image"
          />
          <div className="movie-votes">
            <p>Vote Average: {movie.vote_average}</p>
            <p>Vote Count: {movie.vote_count}</p>
          </div>
          <div className="movie-popularity">
            <p>Popularity: {movie.popularity}</p>
          </div>
          <TrailerModal movieId={movieId} mediaType={mediaType}/>
        </div>
        <div className="movie-right">
          <h1>{movie.title || movie.name}</h1>
          <p>{movie.year}</p>
          <p className="movie-tagline">{movie.tagline}</p>
          <p className="movie-overview">{movie.overview_he || movie.overview}</p>
          <div className="movie-genres">{movie.genres.join(", ")}</div>
          <div className="movie-cast">
            <div className="cast-gallery">
              {movie.cast.map((castMember) => (
                <div className="cast-member" key={castMember.name}>
                  <TmdbImage
                    path={castMember.profile_path}
                    alt={castMember.name}
                    className="cast-profile-image"
                  />
                  <p>{castMember.name}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="movie-director">
            By: {movie.director || movie.creators.join(", ")}
          </p>
          <Vote movieId={movie.id} />
        </div>
      </div>
      <SimilarMoviesList movieId={movieId} mediaType={mediaType} />
    </div>
  ) : (
    <h1>Loading...</h1>
  );

};

export default MoviePage;
