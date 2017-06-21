import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

import {clearMovie, getMovie, addMovieToFavorite, removeMovieFromFavorite, getRecommendedMovies} from '../actions/movieActions';

import MovieDetailsPage from '../components/MovieDetailsPage';

const localStyles = {
  errorText: { textAlign: 'center' },
  progressBar: { display: 'block', margin: '30px auto' }
};

class MovieDetailsPageContainer extends Component {

  static propTypes = {
    genres: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    movie: PropTypes.object.isRequired,
    ownProps: PropTypes.object.isRequired,
    clearMovie: PropTypes.func.isRequired,
    getMovie: PropTypes.func.isRequired,
    addMovieToFavorite: PropTypes.func.isRequired,
    removeMovieFromFavorite: PropTypes.func.isRequired,
    getRecommendedMovies: PropTypes.func.isRequired
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
    this.props.clearMovie();
  }

  loadMovie = (movieId) => {
    this.props.getMovie(movieId);
    this.props.getRecommendedMovies(movieId);
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
    this.props.addMovieToFavorite(movieId, userId);
  };

  removeFromFavorite = () => {
    const movieId = this.props.ownProps.params.id;
    const userId = this.props.user.userId;
    this.props.removeMovieFromFavorite(movieId, userId);
  };

  render() {

    if (this.props.movie.error) {
      return <h2 style={localStyles.errorText}>{this.props.movie.error}</h2>;
    }

    if (!this.props.movie.isLoaded) {
      return <CircularProgress style={localStyles.progressBar}/>
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

const mapStateToProps = (state, ownProps) => ({
  user: state.user,
  genres: state.genres,
  movie: state.movie,
  ownProps
});

const mapDispatchToProps = dispatch => ({
  getMovie: movieId => dispatch(getMovie(movieId)),
  addMovieToFavorite: (movieId, userId) => dispatch(addMovieToFavorite(movieId, userId)),
  removeMovieFromFavorite: (movieId, userId) => dispatch(removeMovieFromFavorite(movieId, userId)),
  getRecommendedMovies: movieId => dispatch(getRecommendedMovies(movieId)),
  clearMovie: () => dispatch(clearMovie())
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetailsPageContainer);
