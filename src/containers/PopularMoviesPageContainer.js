import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import { clearMovies, getPopularMovies } from '../actions/moviesActions';

import MoviesList from '../components/MoviesList';

class PopularMoviesPageContainer extends Component {

  static propTypes = {
    movies: PropTypes.object.isRequired,
    genres: PropTypes.array.isRequired,
    clearMovies: PropTypes.func.isRequired,
    getPopularMovies: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getPopularMovies();
  }

  componentWillUnmount() {
    this.props.clearMovies();
  }

  loadMore = () => {
    const { page, total_pages } = this.props.movies;

    if (page < total_pages) {
      const nextPage = page + 1;
      this.props.getPopularMovies(nextPage);
    }
  };

  render() {
    return (
        <MoviesList
            loadMore={this.loadMore}
            movies={this.props.movies}
            genres={this.props.genres}
            title="Popular Movies"
        />
    );
  }
}

const mapStateToProps = state => ({
    movies: state.movies,
    genres: state.genres
});

const mapDispatchToProps = dispatch => ({
  getPopularMovies: nextPage => dispatch(getPopularMovies(nextPage)),
  clearMovies: () => dispatch(clearMovies())
});

export default connect(mapStateToProps, mapDispatchToProps)(PopularMoviesPageContainer);
