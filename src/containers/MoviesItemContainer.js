import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {addMovieToFavorite, removeMovieFromFavorite} from '../actions/movieActions';

import MoviesItem from '../components/MoviesItem';


class MoviesItemContainer extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object,
    movie: PropTypes.object.isRequired,
    genres: PropTypes.array.isRequired
  };

  isFavoriteMovie = () => {
    const { user, movie } = this.props;
    if (user.isLoggedIn) {
      return !!user.favoriteMovies.find(favoriteMovie => favoriteMovie.id === movie.id);
    }
  };

  addToFavorite = () => {
    const {movie, user} = this.props;
    this.props.dispatch(addMovieToFavorite(movie.id, user.userId));
  };

  removeFromFavorite = () => {
    const {movie, user} = this.props;
    this.props.dispatch(removeMovieFromFavorite(movie.id, user.userId));
  };

  render() {
    const {movie, genres, user} = this.props;
    return (
        <MoviesItem
            movie={movie}
            genres={genres}
            logged={user.isLoggedIn}
            isFavorite={this.isFavoriteMovie()}
            addToFavorite={this.addToFavorite}
            removeFromFavorite={this.removeFromFavorite}
        />
    );
  }
}

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps)(MoviesItemContainer);