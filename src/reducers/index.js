import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import movies from './moviesReducer';
import movie from './movieReducer';
import genres from './genresReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  movies,
  movie,
  genres,
  user,
  routing: routerReducer
});

export default rootReducer;
