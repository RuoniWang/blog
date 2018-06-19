import Textarea from 'react-textarea-autosize';
import React, { Component } from 'react';
import marked from 'marked';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deletePost, fetchPost, updatePost } from '../actions';


class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentEditing: false,
      titleEditing: false,
      tagsEditing: false,
      cover_urlEditing: false,
      commentEditing: false,
      title: '',
      content: '',
      tags: '',
      cover_url: '',
      comments: [],
      comment: '',
    };
    this.renderContent = this.renderContent.bind(this);
    this.toggleContent = this.toggleContent.bind(this);
    this.editContent = this.editContent.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
    this.toggleTitle = this.toggleTitle.bind(this);
    this.editTitle = this.editTitle.bind(this);
    this.renderTags = this.renderTags.bind(this);
    this.toggleTags = this.toggleTags.bind(this);
    this.editTags = this.editTags.bind(this);
    this.renderCoverurl = this.renderCoverurl.bind(this);
    this.toggleCoverurl = this.toggleCoverurl.bind(this);
    this.editCoverurl = this.editCoverurl.bind(this);
    this.toggleComment = this.toggleComment.bind(this);
    this.addComment = this.addComment.bind(this);
    this.editComment = this.editComment.bind(this);
  }
  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postID);
  }

  onDelete() {
    this.props.deletePost(this.props.match.params.postID, this.props.history);
  }

  toggleContent() {
    if (this.state.contentEditing) {
      this.props.updatePost(this.props.match.params.postID, { content: this.state.content, author: this.props.post.author });
    } else {
      this.setState({ content: this.props.post.content });
    }
    if (this.props.authenticated) {
      this.setState({ contentEditing: !this.state.contentEditing });
    }
  }
  toggleTitle() {
    if (this.state.titleEditing) {
      this.props.updatePost(this.props.match.params.postID, { title: this.state.title, author: this.props.post.author });
    } else {
      this.setState({ title: this.props.post.title });
    }
    if (this.props.authenticated) {
      this.setState({ titleEditing: !this.state.titleEditing });
    }
  }
  toggleTags() {
    if (this.state.tagsEditing) {
      this.props.updatePost(this.props.match.params.postID, { tags: this.state.tags.split(' '), author: this.props.post.author });
    } else {
      this.setState({ tags: this.props.post.tags.join(' ') });
    }
    if (this.props.authenticated) {
      this.setState({ tagsEditing: !this.state.tagsEditing });
    }
  }
  toggleCoverurl() {
    if (this.state.cover_urlEditing) {
      this.props.updatePost(this.props.match.params.postID, { cover_url: this.state.cover_url, author: this.props.post.author });
    } else {
      this.setState({ cover_url: this.props.post.cover_url });
    }
    if (this.props.authenticated) {
      this.setState({ cover_urlEditing: !this.state.cover_urlEditing });
    }
  }

  toggleComment() {
    if (this.state.commentEditing) {
      this.props.updatePost(this.props.match.params.postID, { comments: this.state.comments.concat(this.state.comment) });
    } else {
      this.setState({ comment: '' });
      this.setState({ comments: this.props.post.comments });
    }
    if (this.props.authenticated) {
      this.setState({ commentEditing: !this.state.commentEditing });
    }
  }

  editContent(event) {
    this.setState({ content: event.target.value });
  }
  editTitle(event) {
    this.setState({ title: event.target.value });
  }
  editTags(event) {
    this.setState({ tags: event.target.value });
  }
  editCoverurl(event) {
    this.setState({ cover_url: event.target.value });
  }
  editComment(event) {
    this.setState({ comment: event.target.value });
  }

  addComment() {
    if (!this.state.commentEditing) {
      return <div className="new-comment" onClick={this.toggleComment}>Click here to add a comment!</div>;
    } else {
      return <input className="new-comment" onChange={this.editComment} onBlur={this.toggleComment} value={this.state.comment} />;
    }
  }
  renderContent() {
    if (!this.state.contentEditing) {
      return <div className="content" onClick={this.toggleContent} dangerouslySetInnerHTML={{ __html: marked(this.props.post.content || '') }} />;
    } else {
      return <div className="content"><Textarea onChange={this.editContent} onBlur={this.toggleContent} value={this.state.content} /></div>;
    }
  }

  renderTitle() {
    if (!this.state.titleEditing) {
      return <div className="title" onClick={this.toggleTitle}>{this.props.post.title}</div>;
    } else {
      return <input className="title" onChange={this.editTitle} onBlur={this.toggleTitle} value={this.state.title} />;
    }
  }

  renderTags() {
    if (!this.state.tagsEditing) {
      if (this.props.post.tags === undefined) { return <div className="tags" onClick={this.toggleTags}>{this.props.post.tags}</div>; } else {
        return <div className="tags" onClick={this.toggleTags}>{this.props.post.tags.map((tag) => { if (tag) { return `#${tag} `; } else { return ''; } })}</div>;
      }
    } else {
      return <input className="tags" onChange={this.editTags} onBlur={this.toggleTags} value={this.state.tags} />;
    }
  }
  renderCoverurl() {
    if (!this.state.cover_urlEditing) {
      return <div className="coverurl" onClick={this.toggleCoverurl}>Click here to change cover_url!</div>;
    } else {
      return <input className="coverurl" onChange={this.editCoverurl} onBlur={this.toggleCoverurl} value={this.state.cover_url} />;
    }
  }
  renderComments() {
    if (this.props.post.comments !== undefined) {
      return <ul className="comments">{this.props.post.comments.map((comment) => { return <li>{comment}</li>; })}</ul>;
    } else {
      return <div className="comments">No Comments!</div>;
    }
  }


  render() {
    return (
      <div className="post-page">
        <div id="delete"><button type="button" onClick={() => { this.onDelete(); }}>delete</button></div>
        <div className="post-edit">
          <img src={this.props.post.cover_url} alt="cover_url" />
          {this.renderTitle()}
          <div className="author">Writen by: {this.props.post.authorname}</div>
          {this.renderTags()}
          {this.renderContent()}
          {this.renderCoverurl()}
          <div className="comment-section">
          Comments:
            {this.renderComments()}
            {this.addComment()}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => (
  {
    post: state.posts.post,
    authenticated: state.auth.authenticated,
  }
);

// onClick={this.props.deletePost(this.props.match.params.postID, this.props.history)}
// react-redux glue -- outputs Container that know state in props
// new way to connect with react router 4
export default withRouter(connect(mapStateToProps, { deletePost, fetchPost, updatePost })(Post));
