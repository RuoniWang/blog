import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { signoutUser } from '../actions';


const renderSignState = (props) => {
  if (props.authenticated) {
    return (
      <div>
        <span><button type="button" onClick={() => { props.signoutUser(props.history); }}>Sign Out</button></span>
        <span><NavLink to="/posts/new" ><button type="button">add</button></NavLink></span>
        <span><NavLink to="/user"><i className="fa fa-user-circle fa-2x" /></NavLink></span>
      </div>
    );
  } else {
    return (
      <div>
        <span><NavLink to="/posts/new" ><button type="button">add</button></NavLink></span>
        <span><NavLink to="/signin"><button type="button">sign in</button></NavLink></span>
        <span><NavLink to="/signup"><button type="button">sign up</button></NavLink></span>
      </div>);
  }
};

const NavBar = (props) => {
  console.log(props.authenticated);
  return (
    <div id="add-bar">
      <span><NavLink exact to="/"><i className="fa fa-home fa-2x" /></NavLink></span>
      {renderSignState(props)}
    </div>
  );
};
const mapStateToProps = state => (
  {
    authenticated: state.auth.authenticated,
  }
);
export default withRouter(connect(mapStateToProps, { signoutUser })(NavBar));
