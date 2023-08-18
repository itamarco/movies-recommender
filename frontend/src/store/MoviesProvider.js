import React, { useReducer } from 'react';
import { moviesReducer } from './MoviesReducer';
import { MoviesContext } from './MoviesContext';
import axios from 'axios';

export const MoviesProvider = ({ children }) => {
  const initialState = { movies: [] };

  const [state, dispatch] = useReducer(moviesReducer, initialState);

   // Function to load initial movies
   const loadInitialMovies = async () => {
    // TODO
    axios.get('/movies-map')
      .then((response) => {
        // Use the data from movies-map.json here
        dispatch({ type: 'SET_MOVIES', payload: response.data });
      })
      .catch((error) => {
        console.error("An error occurred while fetching the data:", error);
      });
    
  };

  return (
    <MoviesContext.Provider value={{ movies: state.movies, dispatch, loadInitialMovies }}>
      {children}
    </MoviesContext.Provider>
  );
};
