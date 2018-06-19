import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { signupUser, resetError } from '../actions';


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
    };
    this.renderError = this.renderError.bind(this);
  }
  componentDidMount() {
    this.props.resetError();
  }
  onUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }
  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  onSubmit() {
    this.props.signupUser({ email: this.state.email, password: this.state.password, username: this.state.username }, this.props.history);
    this.setState({ email: '', password: '' });
  }
  renderError() {
    if (this.props.err_msg) {
      return <p> {this.props.err_msg} </p>;
    }
    return <p />;
  }

  render() {
    return (
      <div className="sign-up">
        <h1>Sign Up !</h1>
        <ul id="input-field">
          <li id="username">
            <div>Username:</div>
            <input onChange={event => this.onUsernameChange(event)} value={this.state.username} />
          </li>

          <li id="email" >
            <div>Email:</div>
            <input onChange={event => this.onEmailChange(event)} value={this.state.email} />
          </li>
          <li id="password">
            <div>Password:</div>
            <input onChange={event => this.onPasswordChange(event)} value={this.state.password} />
          </li>
        </ul>
        <ul id="buttons">
          <li><button type="button" onClick={() => this.onSubmit()}>Sign Up</button></li>
          <li><NavLink to="/"><button type="button">cancel</button></NavLink></li>
        </ul>
        {this.renderError()}
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    err_msg: state.auth.err_msg,
  }
);


export default withRouter(connect(mapStateToProps, { signupUser, resetError })(SignUp));
