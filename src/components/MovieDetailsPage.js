import React from 'react';
import IconButton from "material-ui/IconButton";
import FavoriteBorder from "material-ui/svg-icons/action/favorite-border";
import Favorite from 'material-ui/svg-icons/action/favorite';
import Paper from 'material-ui/Paper';

import {renderGenres, renderCountries, formatMoney, formatDate} from '../helpers';

import RecommendedMovies from '../components/RecommendedMovies';
import './MovieDetailsPage.css';

const MovieDetailsPage = ({movie, isLoggedIn, isFavorite, addMovieToFavorite, removeMovieFromFavorite, genres}) => (
    <div className="MovieDetailsPage">
      <div className="MovieDetails">
        <div className="MovieDetails__image-container">
          {
            movie.backdrop_path ?
                <Paper zDepth={3} className="MovieDetails__image-Paper" rounded={false}>
                  <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.backdrop_path}`}
                       alt={movie.original_title}
                       className="MovieDetails__image"/><
                  /Paper>
                  :
                  <Paper zDepth={3} className="MovieDetails__image-Paper--none" rounded={false} />
                  }
        </div>
        <div className="MovieDetails__info-container">
          <div className="info__title-container">
            <h1 className="MovieDetails__title">{movie.original_title} <small>({
              new Date(movie.release_date).getFullYear()
            })</small></h1>
            <div className="MovieDetails__genres">{renderGenres(movie.genres, genres)}</div>
            { movie.tagline && <p className="MovieDetails__tagline"><b>Tagline:</b> {movie.tagline}</p> }
            { movie.production_countries.length && <p className="MovieDetails__countries">{
              renderCountries(movie.production_countries)
            }</p> }
            {
              isLoggedIn &&
              <div className="Favorites-container">
                {
                  isFavorite ?
                      <IconButton tooltip="Remove from favorites" onClick={ removeMovieFromFavorite }>
                        <Favorite color="red"/>
                      </IconButton>
                      :
                      <IconButton tooltip="Add to favorites" onClick={ addMovieToFavorite }>
                        <FavoriteBorder color="red"/>
                      </IconButton>
                }
              </div>
            }
          </div>
          <div className="MovieDetails__short-info">
            <div className="info__item info__rating"><b>Rating:</b> {movie.vote_average}</div>
            <div className="info__item info__status"><b>Status:</b> {movie.status}</div>
            <div className="info__item info__budget"><b>Budget:</b> {formatMoney(movie.budget)}</div>
            <div className="info__item info__release_date"><b>Release date:</b> {formatDate(movie.release_date)}</div>
            <div className="info__item info__revenue"><b>Revenue:</b> {formatMoney(movie.revenue)}</div>
            <div className="info__item info__runtime"><b>Duration:</b> {movie.runtime} min.</div>
          </div>
          <div className="MovieDetails__overview">
            <h4 className="overview__title">Overview:</h4>
            <div className="overview__content">{movie.overview}</div>
          </div>
        </div>

      </div>
      <RecommendedMovies movies={movie.recommendedMovies} />
    </div>
);

export default MovieDetailsPage;
