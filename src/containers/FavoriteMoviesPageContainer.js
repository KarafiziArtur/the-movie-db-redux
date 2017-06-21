import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import MoviesList from '../components/MoviesList';

const localStyles = {
  noPermissionText: { textAlign: 'center', marginTop: '20px' },
  noMoviesText: { textAlign: 'center', marginTop: '20px' }
};

class FavoriteMoviesPageContainer extends Component {

  static propsTypes = {
    user: PropTypes.object.isRequired,
    genres: PropTypes.array.isRequired
  };

  render() {
    const movies = {
      moviesList: this.props.user.favoriteMovies || []
    };

    if (!this.props.user.isLoggedIn) {
      return <div style={localStyles.noPermissionText}>You have no permission for access to this page.</div>;
    }

    if (!this.props.user.favoriteMovies.length) {
      return <div style={localStyles.noMoviesText}>There are no favorite movies.</div>;
    }

    return (
        <MoviesList
            movies={movies}
            genres={this.props.genres}
            title="Favorite Movies"
        />
    );
  }
}

const mapStateToProps = state => ({ user: state.user, genres: state.genres });

export default connect(mapStateToProps)(FavoriteMoviesPageContainer);
