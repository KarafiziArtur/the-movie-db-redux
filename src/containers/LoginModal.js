import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from "material-ui/TextField";

import { logIn } from '../actions/userActions';

class LoginModal extends Component {

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
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
    this.props.dispatch(logIn(user));

  };

  render() {

    return (
        <Dialog
            title="Login form"
            contentStyle={{width: '350px'}}
            modal={false}
            open={this.props.isOpen}
            onRequestClose={this.handleClose}
        >
          <form onSubmit={this.login}>
            <TextField floatingLabelText="Enter your email"
                       errorText={this.state.errorEmail}
                       fullWidth={true}
                       onChange={this.onChangeHandler}
                       name="email"
                       type="email"
                       value={this.state.email}
                       required
            />
            <TextField floatingLabelText="Enter your password"
                       errorText={this.state.errorPassword}
                       fullWidth={true}
                       onChange={this.onChangeHandler}
                       name="password"
                       type="password"
                       value={this.state.password}
                       required
            />
            <RaisedButton
                style={{ marginTop: '25px', float: 'right' }}
                label="Log in"
                secondary={true}
                type="submit"
            />
          </form>
        </Dialog>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(LoginModal);
