import { apiKey } from '../config/theMovieDBConfig';
import axios from 'axios';

export const getGenres = () => dispatch => {
  axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`)
      .then(data => {
        dispatch({
          type: 'GET_GENRES_SUCCESS',
          payload: data
        });
      })
      .catch(e => {
        dispatch({
          type: 'GET_GENRES_FAIL',
          payload: e
        })
      });
};
