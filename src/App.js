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
    firebaseStateObserver: PropTypes.func.isRequired,
    getGenres: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.firebaseStateObserver();
    this.props.getGenres();
  }

  handleSearchSubmit = (query) => {
    event.preventDefault();
    // if query does exist then go to appropriate route
    query && this.props.ownProps.router.push(`/search?query=${encodeURIComponent(query)}`);
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

const mapDispatchToProps = dispatch => ({
  getGenres: () => dispatch(getGenres()),
  firebaseStateObserver: () => dispatch(firebaseStateObserver())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
