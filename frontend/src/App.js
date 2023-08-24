import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import MoviesDisplay from './components/MoviesDisplay';
import { MoviesContext } from './store/MoviesContext';
import { useContext, useEffect } from 'react';
import MoviePage from './components/MoviePage';
import TopBar from './components/TopBar';

const App = () => {
  const { loadInitialMovies } = useContext(MoviesContext);

  useEffect(() => {
    loadInitialMovies();
  }, []); // Empty dependency array ensures this runs once on mount


  return (
    <Router>
      <TopBar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/movies" />} />
          <Route path="/movies" element={<MoviesDisplay mediaType="movie" />} />
          <Route path="/tvs" element={<MoviesDisplay mediaType="tv" />} />
          <Route path="/movies/:movieId" element={<MoviePage mediaType="movie" />} />
          <Route path="/tvs/:movieId" element={<MoviePage mediaType="tv" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
