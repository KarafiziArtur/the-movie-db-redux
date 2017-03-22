const initialState = {
  isLoaded: false,
  recommendedMovies: []
};

const movie = (movie = initialState, action) => {
  switch (action.type) {
    case 'GET_MOVIE_SUCCESS':
      return { ...movie, ...action.payload.data, isLoaded: true };
    case 'GET_MOVIE_FAIL':
      return {
        error: action.payload.response.data.status_message
      };
    case 'CLEAR_MOVIE':
      return {...initialState};
    case 'GET_RECOMMENDED_MOVIE_SUCCESS':
      return {
          ...movie,
          recommendedMovies: [
            ...action.payload.data.results
          ]
        };
    case 'GET_RECOMMENDED_MOVIE_FAIL':
      return {
          ...movie,
          recommendedMovies: {
            error: action.payload
        }
      };
    default:
      return movie;
  }
};

export default movie;