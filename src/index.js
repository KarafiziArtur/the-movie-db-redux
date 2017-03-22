import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';
import { syncHistoryWithStore } from 'react-router-redux';

import routes from './routes';
import store from './store';

import './index.css';

import firebaseConfig from './config/firebaseConfig';
firebase.initializeApp(firebaseConfig);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
      <Router routes={routes} history={history} />
    </Provider>,
  document.getElementById('root')
);
