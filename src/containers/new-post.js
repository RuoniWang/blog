import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { createPost } from '../actions';

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      tags: '', // temperarily stored as string but parsed before send to db
      content: '',
      cover_url: '',
    };
  }

  onTitleChange(event) {
    this.setState({ title: event.target.value });
  }
  onTagsChange(event) {
    this.setState({ tags: event.target.value });
  }
  onContentChange(event) {
    this.setState({ content: event.target.value });
  }
  onUrlChange(event) {
    this.setState({ cover_url: event.target.value });
  }

  onSubmit() {
    const state = Object.assign({}, this.state);
    state.tags = state.tags.split(' '); // convert tags to an array
    this.props.createPost(state, this.props.history);
    // console.log(state);
  }


  render() {
    return (
      <div className="create-post">
        <h1>Create a New Post !</h1>
        <ul id="input-field">
          <li id="title" >
            <div>Title:</div>
            <input onChange={event => this.onTitleChange(event)} value={this.state.title} />
          </li>
          <li id="tags">
            <div>Tags:</div>
            <input onChange={event => this.onTagsChange(event)} value={this.state.tags} />
          </li>
          <li id="content">
            <div>Content:</div>
            <input onChange={event => this.onContentChange(event)} value={this.state.content} />
          </li>
          <li id="cover_url">
            <div>cover_url:</div>
            <input onChange={event => this.onUrlChange(event)} value={this.state.cover_url} />
          </li>
        </ul>
        <ul id="buttons">
          <li><button type="button" onClick={() => this.onSubmit()}>create</button></li>
          <li><NavLink to="/"><button type="button">cancel</button></NavLink></li>
        </ul>
      </div>
    );
  }
}
const mapStateToProps = state => (
  {
    authenticated: state.auth.authenticated,
  }
);
export default withRouter(connect(mapStateToProps, { createPost })(NewPost));
