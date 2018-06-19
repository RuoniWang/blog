import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './style.scss';
import posts from './containers/posts';
import NewPost from './containers/new-post';
import Post from './containers/post';
import NavBar from './containers/nav-bar';
import Profile from './containers/profile';
import SignUp from './containers/signUp';
import SignIn from './containers/signIn';
import requireAuth from './containers/requireAuth';


const App = (props) => {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={posts} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signIn" component={SignIn} />
          <Route path="/posts/new" component={requireAuth(NewPost)} />
          <Route path="/posts/:postID" component={Post} />
          <Route path="/:user" component={requireAuth(Profile)} />
          <Route render={() => (<div>post not found </div>)} />
        </Switch>
      </div>
    </Router>
  );
};
export default App;
