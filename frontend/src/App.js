import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MoviesDisplay from './components/MoviesDisplay';
import { MoviesContext } from './store/MoviesContext';
import { useContext, useEffect } from 'react';
import MoviePage from './components/MoviePage';

const App = () => {
  const { loadInitialMovies } = useContext(MoviesContext);

  useEffect(() => {
    loadInitialMovies();
  }, []); // Empty dependency array ensures this runs once on mount


  return (
    <Router>
      <Routes>
        <Route path="/"  element={<MoviesDisplay/>} />
        <Route path="/movie/:movieId" element={<MoviePage/>} />
      </Routes>
    </Router>
  );
};

export default App;
