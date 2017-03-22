import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from '../App';
import PopularMoviesPageContainer from '../containers/PopularMoviesPageContainer';
import SearchMoviesPageContainer from '../containers/SearchMoviesPageContainer';
import FavoriteMoviesPageContainer from '../containers/FavoriteMoviesPageContainer';
import MovieDetailsPageContainer from '../containers/MovieDetailsPageContainer';
import Page404 from '../components/Page404';

const routes = (
    <Route path="/" component={App}>
      <IndexRoute component={PopularMoviesPageContainer}/>
      <Route path="search" component={SearchMoviesPageContainer} />
      <Route path="favorites" component={FavoriteMoviesPageContainer} />
      <Route path="movie/:id" component={MovieDetailsPageContainer} />
      <Route path="*" component={Page404} />
    </Route>
);

export default routes;
