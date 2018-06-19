import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { signinUser, resetError } from '../actions';


class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.renderError = this.renderError.bind(this);
  }
  componentDidMount() {
    this.props.resetError();
  }


  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }
  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  onSubmit() {
    this.props.signinUser({ email: this.state.email, password: this.state.password }, this.props.history);
    this.setState({ email: '', password: '', username: '' });
  }
  renderError() {
    if (this.props.err_msg) {
      return <p> {this.props.err_msg} </p>;
    }
    return <p />;
  }

  render() {
    return (
      <div className="sign-in">
        <h1>Sign In !</h1>
        <ul id="input-field">
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
          <li><button type="button" onClick={() => this.onSubmit()}>Sign in</button></li>
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

export default withRouter(connect(mapStateToProps, { signinUser, resetError })(SignIn));
