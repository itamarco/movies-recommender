export const moviesReducer = (state, action) => {
    switch (action.type) {
      case "SET_MOVIES":
        return { ...state, movies: action.payload };
      case "SET_TVS":
        return { ...state, tvs: action.payload };
      default:
        return state;
    }
  };
  