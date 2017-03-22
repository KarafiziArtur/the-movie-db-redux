import {apiKey} from '../config/theMovieDBConfig';
import axios from 'axios';
import firebase from 'firebase';

export const getRecommendedMovies = movieId => dispatch => {
  axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey}&language=en-US&page=1`)
      .then(data => {
        dispatch({
          type: 'GET_RECOMMENDED_MOVIE_SUCCESS',
          payload: data
        })
      })
      .catch(error => {
        console.error('getRecommendedMovies error', error);
        dispatch({
          type: 'GET_RECOMMENDED_MOVIE_FAIL',
          payload: error
        });
      })
};

export const getMovie = (movieId) => dispatch => {
  axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`)
      .then(data => {
        dispatch({
          type: 'GET_MOVIE_SUCCESS',
          payload: data
        });
      })
      .catch(error => {
        console.error('getMovie error', error);
        dispatch({
          type: 'GET_MOVIE_FAIL',
          payload: error
        });
      });
};

export const clearMovie = () => dispatch => {
  dispatch({ type: 'CLEAR_MOVIE' });
};

export const addMovieToFavorite = (movieId, userId) => dispatch => {
  axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`)
      .then(data => {
        firebase.database().ref(`users/${userId}/favoriteMovies/${movieId}`).set({ ...data.data });
      });
};

export const removeMovieFromFavorite = (movieId, userId) => dispatch => {
  firebase.database().ref(`users/${userId}/favoriteMovies/${movieId}`).remove();
};