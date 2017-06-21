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

const localStyles = {
  greetingsUser: { position: 'relative', top: '-6px' },
  authButtons: { marginTop: '6px' },
  loginButton: { marginRight: '10px' },
  logoImage: { width: '100px', marginTop: '6px' },
  githubButtonLabel: { top: '-2px', paddingLeft: '2px' },
  portfolioButtonLabel: { top: '-2px', paddingLeft: '5px' }
};

class Navbar extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    logoutFromFirebase: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  state = {
    isLoginModalOpen: false,
    isSignupModalOpen: false
  };

  openLoginModal = () => this.setState({ isLoginModalOpen: true });

  openSignupModal = () => this.setState({ isSignupModalOpen: true });

  closeLoginModal = () => this.setState({ isLoginModalOpen: false });

  closeSignupModal = () => this.setState({ isSignupModalOpen: false });

  logout = () => this.props.logoutFromFirebase();

  goToFavorites = () => this.context.router.push('/favorites');

  renderLoggedMenu = (props) => (
      <div>
        <span style={localStyles.greetingsUser}>Hi, { this.props.user.email }</span>
        <IconMenu
            {...props}
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <MenuItem onTouchTap={this.goToFavorites} primaryText="Favorite Movies" />
          <MenuItem primaryText="Log out" onTouchTap={this.logout} />
        </IconMenu>
      </div>
  );

  renderAuthButtons = () => (
        <div style={localStyles.authButtons}>
          <RaisedButton label="Login" onClick={ this.openLoginModal } style={localStyles.loginButton} />
          <RaisedButton label="Signup" secondary={true} onClick={ this.openSignupModal } />
          <SignupModal isOpen={this.state.isSignupModalOpen} closeModal={this.closeSignupModal} />
          <LoginModal isOpen={this.state.isLoginModalOpen} closeModal={this.closeLoginModal} />
        </div>
    );

  renderCreditButtons = () => (
      <div>
        <FlatButton
            label="Github"
            href="https://github.com/KarafiziArtur/the-movie-db-redux"
            target="_blank"
            icon={<GithubIcon viewBox="0 0 20 20" />}
            labelStyle={localStyles.githubButtonLabel}
        />
        <FlatButton
            label="Portfolio"
            href="https://codepen.io/KarafiziArtur/full/gPxMqX"
            target="_blank"
            icon={<CodepenIcon viewBox="0 0 130 130" />}
            labelStyle={localStyles.portfolioButtonLabel}
        />
      </div>
  );

  renderLogo = () => (
      <Link to="/">
        <img src={logo} className="App-logo" alt="logo" style={localStyles.logoImage} />
      </Link>
  );

  render() {
    return (
        <div className="Navbar">
          <AppBar
              className="Navbar__appbar"
              iconElementLeft={this.renderLogo()}
              title={this.renderCreditButtons()}
              iconElementRight={ this.props.user.isLoggedIn ? this.renderLoggedMenu() : this.renderAuthButtons() }
          />
        </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = dispatch => ({ logoutFromFirebase: () => dispatch(logoutFromFirebase()) });

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
