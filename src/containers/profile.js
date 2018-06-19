import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { fetchUser, fetchMyPosts } from '../actions';

const postBox = (id, post) => {
  return (
    <div className="post-box">
      <NavLink to={`/posts/${id}`} id={id}>
        <img src={post.cover_url} alt="cover_url" />
        <div className="post-title">Title: {post.title}</div>
        <div className="post-tag">Tags: {post.tags.map((tag) => { if (tag) { return `#${tag} `; } else { return ''; } })}</div>
        <div className="author">Author: {post.authorname}</div>
        <div className="cover_url">cover_url: {post.cover_url}</div>
      </NavLink>
    </div>
  );
};
class Profile extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchMyPosts();
  }
  render() {
    return (
      <div className="user-page">
        <div>
          <div className="feature">My username: {this.props.me.username}</div>
          <div className="feature">My email: {this.props.me.email}</div>
        </div>
        <div className="posts">
          <div className="myPost">Your posts</div>
          <div className="post-area">
            {console.log(this.props.myPosts)}
            {this.props.myPosts.map((post) => {
          // console.log(post.tags);
              return postBox(post.id, post);
            })}
          </div>
        </div>
      </div>

    );
  }
}
const mapStateToProps = state => (
  {
    me: state.user.me,
    myPosts: state.user.posts,
  }
);


export default withRouter(connect(mapStateToProps, { fetchUser, fetchMyPosts })(Profile));
