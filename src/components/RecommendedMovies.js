import React from 'react';
import {Link} from 'react-router';
import './RecommendedMovies.css';

const RecommendedMovie = ({ movie }) => (
    <div className="RecommendedMovie">
      <img src={`https://image.tmdb.org/t/p/w250_and_h141_bestv2${movie.backdrop_path}`} alt={movie.original_title} className="RecommendedMovie__image"/>
      <h4 className="RecommendedMovie__title">{movie.original_title}</h4>
    </div>
);

const renderMovies = (movies) => {
  if (movies.length) {
    // eslint-disable-next-line
    return movies.slice(0, 6).map(movie => (
            <Link to={`/movie/${movie.id}`} key={movie.id}><RecommendedMovie movie={movie} /></Link>
        )
    );
  }
  return <p>There are no recommended movies for this movie.</p>;
};

const RecommendedMovies = ({ movies }) => (
    <div className="RecommendedMovies">
      <h3 className="RecommendedMovies__title">Recommended Movies</h3>
      <div className="RecommendedMovies__list">
        { renderMovies(movies) }
      </div>
    </div>
);

export default RecommendedMovies;
