import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import { clearMovies, searchMovies } from '../actions/moviesActions';

import MoviesList from '../components/MoviesList';

class SearchMoviesPageContainer extends Component {

  static propsTypes = {
    ownProps: PropTypes.object.isRequired,
    movies: PropTypes.object.isRequired,
    genres: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.loadMovies();
  }

  componentWillReceiveProps(nextProps) {
    const searchText = this.props.ownProps.location.query.query;
    const newSearchText = nextProps.ownProps.location.query.query;
    if (searchText !== newSearchText) {
      this.loadMovies(newSearchText);
    }
  }

  componentWillUnmount() {
    this.props.dispatch(clearMovies());
  }

  loadMovies = (newSearchText) => {
    this.props.dispatch(clearMovies());

    const searchText = newSearchText || this.props.ownProps.location.query.query;

    if (searchText) {
      this.props.dispatch(searchMovies(searchText));
    }
  };

  loadMore = (callback) => {
    const { page, total_pages } = this.props.movies;
    const searchText = this.props.ownProps.location.query.query;

    if (page < total_pages) {
      const nextPage = page + 1;
      this.props.dispatch(callback(searchText, nextPage));
    }
  };

  render() {

    if (!this.props.movies.moviesList.length) {
      return <div style={{ textAlign: 'center', marginTop: '20px' }}>There is no movies for this search query.</div>
    }

    return (
        <MoviesList callback={searchMovies}
                    loadMore={this.loadMore}
                    movies={this.props.movies}
                    genres={this.props.genres}
                    title="Found Movies"
        />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    movies: state.movies,
    genres: state.genres,
    ownProps
  }
};

export default connect(mapStateToProps)(SearchMoviesPageContainer);
