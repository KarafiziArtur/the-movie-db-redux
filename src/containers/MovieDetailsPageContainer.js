import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

import {clearMovie, getMovie, addMovieToFavorite, removeMovieFromFavorite, getRecommendedMovies} from '../actions/movieActions';

import MovieDetailsPage from '../components/MovieDetailsPage';

class MovieDetailsPageContainer extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    genres: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    movie: PropTypes.object.isRequired,
    ownProps: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const movieId = this.props.ownProps.params.id;
    this.loadMovie(movieId);
  }

  componentWillReceiveProps(nextProps) {
    const currentMovieId = this.props.ownProps.params.id;
    const nextMovieId = nextProps.ownProps.params.id;
    if (currentMovieId !== nextMovieId) {
      this.loadMovie(nextMovieId);
    }
  }

  componentWillUnmount() {
    this.props.dispatch(clearMovie());
  }

  loadMovie = (movieId) => {
    this.props.dispatch(getMovie(movieId));
    this.props.dispatch(getRecommendedMovies(movieId));
  };

  isFavoriteMovie = () => {
    const { user, movie } = this.props;
    if (user.isLoggedIn) {
      return !!user.favoriteMovies.find(favoriteMovie => favoriteMovie.id === movie.id);
    }
  };

  addToFavorite = () => {
    const movieId = this.props.ownProps.params.id;
    const userId = this.props.user.userId;
    this.props.dispatch(addMovieToFavorite(movieId, userId))
  };

  removeFromFavorite = () => {
    const movieId = this.props.ownProps.params.id;
    const userId = this.props.user.userId;
    this.props.dispatch(removeMovieFromFavorite(movieId, userId))
  };

  render() {

    if (this.props.movie.error) {
      return <h2 style={{ textAlign: 'center' }}>{this.props.movie.error}</h2>;
    }

    if (!this.props.movie.isLoaded) {
      return <CircularProgress style={{ display: 'block', margin: '30px auto' }}/>
    }

    return (
        <MovieDetailsPage
            movie={this.props.movie}
            isLoggedIn={this.props.user.isLoggedIn}
            isFavorite={this.isFavoriteMovie()}
            addMovieToFavorite={this.addToFavorite}
            removeMovieFromFavorite={this.removeFromFavorite}
            genres={this.props.genres}
        />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({user: state.user, genres: state.genres, movie: state.movie, ownProps});

export default connect(mapStateToProps)(MovieDetailsPageContainer);
