export const moviesReducer = (state, action) => {
    switch (action.type) {
      case "SET_MOVIES":
        return { ...state, movies: action.payload, hasMoviesLoaded: true };
      case "SET_TVS":
        return { ...state, tvs: action.payload };
      case "SET_VOTES":
        return { ...state, userVotes: action.payload };
      case "ADD_VOTE":
        return { ...state, userVotes: {...state.userVotes, [action.payload.movieId]: action.payload.vote} };
      default:
        return state;
    }
  };
  