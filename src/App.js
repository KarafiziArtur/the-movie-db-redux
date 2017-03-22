import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { MuiThemeProvider } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { getGenres } from './actions/genresActions';
import { firebaseStateObserver } from './actions/userActions';
import './App.css';

import Navbar from './containers/Navbar';
import SearchInput from './containers/SearchInput';
import Footer from './components/Footer';

injectTapEventPlugin();

class App extends Component {

  static propTypes = {
    ownProps: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.dispatch(firebaseStateObserver());
    this.props.dispatch(getGenres());
  }

  handleSearchSubmit = (query) => {
    event.preventDefault();
    if (query) {
      this.props.ownProps.router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="App__header">
            <Navbar />
          </div>
          <div className="App__content">
            <SearchInput onSubmit={this.handleSearchSubmit} defaultValue={this.props.ownProps.location.query.query} />
            { this.props.children }
          </div>
          <div className="App__footer">
            <Footer />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({ ownProps });

export default connect(mapStateToProps)(App);
