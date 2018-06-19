import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { fetchPosts } from '../actions';


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

class Posts extends Component {
  componentDidMount() {
    // console.log('here comes the fetching!');
    this.props.fetchPosts();
  }

  render() {
    return (
      <div className="posts">
        <h1>Posts</h1>
        <div className="post-area">
          {this.props.all.map((post) => {
            // console.log(post.tags);
            return postBox(post.id, post);
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    all: state.posts.all,
  }
);
export default withRouter(connect(mapStateToProps, { fetchPosts })(Posts));
