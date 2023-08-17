import React, { useReducer } from 'react';
import { moviesReducer } from './MoviesReducer';
import { MoviesContext } from './MoviesContext';
import moviesJson from '../assets/movies-map.json'; // Assuming you have imported the JSON file


export const MoviesProvider = ({ children }) => {
  const initialState = { movies: [] };

  const [state, dispatch] = useReducer(moviesReducer, initialState);

   // Function to load initial movies
   const loadInitialMovies = async () => {
    // TODO
    const fetchedMovies =  moviesJson
    dispatch({ type: 'SET_MOVIES', payload: fetchedMovies });
  };

  return (
    <MoviesContext.Provider value={{ movies: state.movies, dispatch, loadInitialMovies }}>
      {children}
    </MoviesContext.Provider>
  );
};
