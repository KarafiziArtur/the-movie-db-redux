import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import {createNewUser} from "../actions/userActions";

const localStyles = {
  dialog: { width: '350px' },
  submitButton: { marginTop: '25px', float: 'right' }
};

class SignupModal extends Component {

  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    createNewUser: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
  };

  state = {
    email: '',
    password: '',
    confirmPassword: '',
    errorPassword: '',
    errorEmail: ''
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.error) {
      const {code, message} = nextProps.user.error;

      if (code === 'auth/weak-password') {
        this.setState({
          errorEmail: '',
          errorPassword: message
        });
      }

      if (code === 'auth/email-already-in-use') {
        this.setState({
          errorEmail: message,
          errorPassword: ''
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

  firebaseCreateUser = (event) => {
    event.preventDefault();

    const {email, password, confirmPassword} = this.state;

    if (password === confirmPassword) {
      const newUser = {email, password};
      this.props.createNewUser(newUser);
    } else {
      this.setState({ errorPassword: 'Passwords must match' });
    }
  };

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { email, errorEmail, password, errorPassword, confirmPassword } = this.state;

    return (
        <Dialog
            title="Signup form"
            contentStyle={localStyles.dialog}
            modal={false}
            open={this.props.isOpen}
            onRequestClose={this.handleClose}
        >
          <form onSubmit={this.firebaseCreateUser}>
            <TextField 
                floatingLabelText="Enter your email"                       
                errorText={errorEmail}                       
                fullWidth={true}                       
                onChange={this.onChangeHandler}                       
                name="email"                       
                type="email"                       
                value={email}                       
                required
            />
            <TextField 
                floatingLabelText="Enter your password"                       
                errorText={errorPassword}                       
                fullWidth={true}                       
                onChange={this.onChangeHandler}                       
                name="password"                       
                type="password"                       
                value={password}                       
                required
            />
            <TextField 
                floatingLabelText="Confirm your password"                       
                errorText={errorPassword}                       
                fullWidth={true}                       
                onChange={this.onChangeHandler}                       
                name="confirmPassword"                       
                type="password"                       
                value={confirmPassword}                       
                required
            />
            <RaisedButton
                style={localStyles.submitButton}
                label="Create"
                secondary={true}
                type="submit"
            />
          </form>
        </Dialog>
    );
  }
}

const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = dispatch => ({ createNewUser: newUser => dispatch(createNewUser(newUser)) });

export default connect(mapStateToProps, mapDispatchToProps)(SignupModal);
