import React, {PropTypes} from 'react';
import Subheader from 'material-ui/Subheader';

import { assembleGenres } from '../helpers';

import LoadMoreButton from './LoadMoreButton';
import MoviesItemContainer from '../containers/MoviesItemContainer';
import './MoviesList.css';

const MoviesList = ({ movies, loadMore, genres, title }) => {
  
  if (movies.error) {
    return <h2>{movies.error} <br/>{movies.errorStatus}</h2>;
  }

  return (
      <div className="MoviesList">
        <Subheader className="PageHeader">{title}</Subheader>
        <div className="MoviesGrid">
          {
            movies.moviesList.map(movie =>
                <MoviesItemContainer
                    key={movie.id}
                    movie={movie}
                    genres={assembleGenres(movie, genres)}
                />
            )
          }
        </div>
        {
          loadMore &&
          <LoadMoreButton
              page={movies.page}
              total_pages={movies.total_pages}
              loadMore={loadMore}
          />
        }
      </div>
  )
};

MoviesList.propTypes = {
  movies: PropTypes.object.isRequired,
  genres: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  loadMore: PropTypes.func
};

export default MoviesList;
