import firebase from 'firebase';
import {formatUserData} from '../helpers';

export const createNewUser = ({email, password}) => dispatch => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(error => {
        dispatch({type: 'CLEAR_USER', error: {code: error.code, message: error.message}});
      });
};

export const logIn = ({email, password}) => dispatch => {
  firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(error => {
        dispatch({type: 'CLEAR_USER', error: {code: error.code, message: error.message}});
      });
};

export const firebaseStateObserver = () => (dispatch, ) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      firebase.database().ref(`users/${user.uid}/favoriteMovies`).on('value', res => {
        const resMovies = res.val();
        const favoriteMovies = [];

        // eslint-disable-next-line
        for (let objKey in resMovies) {
          resMovies[objKey].key = objKey;
          favoriteMovies.push(resMovies[objKey]);
        }

        const userData = formatUserData(user, favoriteMovies);
        dispatch({type: 'FILL_USER', payload: userData});
      });
    } else {
      dispatch({type: 'CLEAR_USER'});
    }
  });
};

export const logoutFromFirebase = () => dispatch => {
  firebase.auth().signOut();
};

