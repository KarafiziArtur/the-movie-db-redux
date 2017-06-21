import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import { clearMovies, searchMovies } from '../actions/moviesActions';

import MoviesList from '../components/MoviesList';

const localStyles = {
  noMoviesText: { textAlign: 'center', marginTop: '20px' }
};

class SearchMoviesPageContainer extends Component {

  static propsTypes = {
    ownProps: PropTypes.object.isRequired,
    movies: PropTypes.object.isRequired,
    genres: PropTypes.array.isRequired,
    clearMovies: PropTypes.func.isRequired,
    searchMovies: PropTypes.func.isRequired
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
    this.props.clearMovies();
  }

  loadMovies = (newSearchText) => {
    this.props.clearMovies();

    const searchText = newSearchText || this.props.ownProps.location.query.query;

    if (searchText) {
      this.props.searchMovies(searchText);
    }
  };

  loadMore = () => {
    const { page, total_pages } = this.props.movies;
    const searchText = this.props.ownProps.location.query.query;

    if (page < total_pages) {
      const nextPage = page + 1;
      this.props.searchMovies(searchText, nextPage);
    }
  };

  render() {

    if (!this.props.movies.moviesList.length) {
      return <div style={localStyles.noMoviesText}>There are no movies for this search query.</div>
    }

    return (
        <MoviesList
            loadMore={this.loadMore}
            movies={this.props.movies}
            genres={this.props.genres}
            title="Found Movies"
        />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  movies: state.movies,
  genres: state.genres,
  ownProps
});

const mapDispatchToProps = dispatch => ({
  searchMovies: (searchText, nextPage) => dispatch(searchMovies(searchText, nextPage)),
  clearMovies: () => dispatch(clearMovies())
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchMoviesPageContainer);
