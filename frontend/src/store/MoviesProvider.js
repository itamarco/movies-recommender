import React, { useReducer } from 'react';
import { moviesReducer } from './MoviesReducer';
import { MoviesContext } from './MoviesContext';
import axios from 'axios';

export const MoviesProvider = ({ children }) => {
  const initialState = { movies: [], tvs: [] };

  const [state, dispatch] = useReducer(moviesReducer, initialState);

   // Function to load initial movies
   const loadInitialMovies = async () => {
      axios.get('/movies-map')
        .then((response) => {
          dispatch({ type: 'SET_MOVIES', payload: response.data });
        })
        .catch((error) => {
          console.error("An error occurred while fetching the data:", error);
        });
 
      axios .get("/tvs-map")
        .then((response) => {
          dispatch({ type: "SET_TVS", payload: response.data });
        })
        .catch((error) => {
          console.error( "An error occurred while fetching the data:", error);
        });
  };

  return (
    <MoviesContext.Provider value={{ movies: state.movies, tvs: state.tvs, dispatch, loadInitialMovies }}>
      {children}
    </MoviesContext.Provider>
  );
};
