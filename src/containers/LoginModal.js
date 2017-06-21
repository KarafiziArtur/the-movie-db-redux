import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from "material-ui/TextField";

import { logIn } from '../actions/userActions';

const localStyles = {
  dialog: { width: '350px' },
  submitButton: { marginTop: '25px', float: 'right' }
};

class LoginModal extends Component {

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    logIn: PropTypes.func.isRequired
  };

  state = {
    email: '',
    password: '',
    errorEmail: '',
    errorPassword: '',
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.error) {
      const { code, message } = nextProps.user.error;

      if (code === 'auth/user-not-found') {
        this.setState({
          errorEmail: message,
          errorPassword: ''
        });
      }

      if (code === 'auth/wrong-password') {
        this.setState({
          errorEmail: '',
          errorPassword: message
        });
      }
    }
  }

  componentWillUnmount() {
    this.handleClose();
  }

  handleClose = () => {
    this.props.closeModal();
  };

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  login = (event) => {
    event.preventDefault();

    const { email, password } = this.state;
    const user = { email, password };
    this.props.logIn(user);
  };

  render() {
    const { email, errorEmail, password, errorPassword } = this.state;

    return (
        <Dialog
            title="Login form"
            contentStyle={localStyles.dialog}
            modal={false}
            open={this.props.isOpen}
            onRequestClose={this.handleClose}
        >
          <form onSubmit={this.login}>
            <TextField floatingLabelText="Enter your email"
                       errorText={errorEmail}
                       fullWidth={true}
                       onChange={this.onChangeHandler}
                       name="email"
                       type="email"
                       value={email}
                       required
            />
            <TextField floatingLabelText="Enter your password"
                       errorText={errorPassword}
                       fullWidth={true}
                       onChange={this.onChangeHandler}
                       name="password"
                       type="password"
                       value={password}
                       required
            />
            <RaisedButton
                style={localStyles.submitButton}
                label="Log in"
                secondary={true}
                type="submit"
            />
          </form>
        </Dialog>
    );
  }
}

const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = dispatch => ({ logIn: user => dispatch(logIn(user)) });

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
