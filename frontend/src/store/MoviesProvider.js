import React, { useReducer } from 'react';
import { moviesReducer } from './MoviesReducer';
import { MoviesContext } from './MoviesContext';
import axios from 'axios';

export const MoviesProvider = ({ children }) => {
  const initialState = { movies: [], tvs: [], hasMoviesLoaded: false, userVotes: {} };

  const [state, dispatch] = useReducer(moviesReducer, initialState);

   const loadInitialMovies = async () => {
      axios.get('/movies-map')
        .then((response) => {
          dispatch({ type: 'SET_MOVIES', payload: response.data });
        })
        .catch((error) => {
          console.error("An error occurred while fetching movies:", error);
        });
 
      axios .get("/tvs-map")
        .then((response) => {
          dispatch({ type: "SET_TVS", payload: response.data });
        })
        .catch((error) => {
          console.error( "An error occurred while fetching tv series:", error);
        });
      axios
        .get("/votes/200000")
        .then((response) => {
          const votesMap = response.data.reduce(
            (acc, userVote) => ({ ...acc, [userVote.movie_id]: userVote.vote }),
            {}
          );
          dispatch({ type: "SET_VOTES", payload: votesMap });
        })
        .catch((error) => {
          console.error("An error occurred while fetching votes:", error);
        });
  };

  return (
    <MoviesContext.Provider value={{ 
          movies: state.movies, 
          tvs: state.tvs,
          hasMoviesLoaded: state.hasMoviesLoaded,
          userVotes: state.userVotes,
          dispatch, 
          loadInitialMovies 
       }}>
      {children}
    </MoviesContext.Provider>
  );
};
