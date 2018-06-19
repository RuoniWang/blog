import { connect } from 'react-redux';
import React, { Component } from 'react';

export default function (ComposedComponent) {
  class RequireAuth extends Component {
    // your various component lifecycle methods
    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.history.push('/signin');
      }
    }
    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.history.push('/signin');
      }
    }
    render() {
      return (
        <div>
          <ComposedComponent {...this.props} />
        </div>
      );
    }
  }


  // mapStateToProps

  const mapStateToProps = state => (
    {
      authenticated: state.auth.authenticated,
    }
  );

  return connect(mapStateToProps, null)(RequireAuth);
}
