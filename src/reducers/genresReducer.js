const initialState = [];

const movies = (genres = initialState, action) => {
  switch (action.type) {
    case 'GET_GENRES_SUCCESS':
      return [...action.payload.data.genres];
    case 'GET_GENRES_FAIL':
      return {
        error: action.payload.error
      };
    default:
      return genres;
  }
};

export default movies;