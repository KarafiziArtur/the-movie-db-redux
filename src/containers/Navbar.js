import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import logo from '../images/logo_408x161.png';
import './Navbar.css';

import {logoutFromFirebase} from '../actions/userActions';
import {CodepenIcon, GithubIcon} from '../helpers';

import SignupModal from '../containers/SignupModal';
import LoginModal from '../containers/LoginModal';

class Navbar extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  state = {
    isLoginModalOpen: false,
    isSignupModalOpen: false
  };

  openLoginModal = () => {
    this.setState({ isLoginModalOpen: true });
  };

  openSignupModal = () => {
    this.setState({ isSignupModalOpen: true });
  };

  closeLoginModal = () => {
    this.setState({ isLoginModalOpen: false });
  };

  closeSignupModal = () => {
    this.setState({ isSignupModalOpen: false });
  };

  logout = () => {
    this.props.dispatch(logoutFromFirebase());
  };

  renderLoggedMenu = (props) => (
      <div>
        <span style={{ position: 'relative', top: '-6px' }}>Hi, { this.props.user.email }</span>
        <IconMenu
            {...props}
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <MenuItem onTouchTap={() => this.context.router.push('/favorites')} primaryText="Favorite Movies" />
          <MenuItem primaryText="Log out" onTouchTap={this.logout} />
        </IconMenu>
      </div>
  );

  renderLoginSignupBtns = () => {
    return (
        <div style={{ marginTop: '6px' }}>
          <RaisedButton label="Login" onClick={ this.openLoginModal } style={{ marginRight: '10px' }} />
          <RaisedButton label="Signup" secondary={true} onClick={ this.openSignupModal } />
          <SignupModal isOpen={this.state.isSignupModalOpen} closeModal={this.closeSignupModal} />
          <LoginModal isOpen={this.state.isLoginModalOpen} closeModal={this.closeLoginModal} />
        </div>
    )
  };

  render() {
    return (
        <div className="Navbar">
          <AppBar
              className="Navbar__appbar"
              iconElementLeft={
                <Link to="/">
                  <img src={logo} className="App-logo" alt="logo" style={{ width: '100px', marginTop: '6px' }} />
                </Link>
              }
              title={
                <div>
                  <FlatButton label="Github"
                              href="https://github.com/KarafiziArtur/the-movie-db-redux"
                              target="_blank"
                              icon={<GithubIcon viewBox="0 0 20 20" />}
                              labelStyle={{ top: '-2px', paddingLeft: '2px' }}
                  />
                  <FlatButton label="Portfolio"
                              href="https://codepen.io/KarafiziArtur/full/gPxMqX"
                              target="_blank"
                              icon={<CodepenIcon viewBox="0 0 130 130" />}
                              labelStyle={{ top: '-2px', paddingLeft: '5px' }}
                  />
                </div>

              }
              iconElementRight={ this.props.user.isLoggedIn ? this.renderLoggedMenu() : this.renderLoginSignupBtns() }
          />

        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Navbar);
