var React = require('react');
var QuestionStore = require('../../stores/QuestionStore.react.jsx');
var QuestionActionCreators = require('../../actions/QuestionActionCreators.react.jsx');
var State = require('react-router').State;
var SessionStore = require('../../stores/SessionStore.react.jsx');

//var optimisticComments = [];
var question_id;

var QuestionPage = React.createClass({

	mixins: [ State ],

	getInitialState: function() {
		return {
			question: QuestionStore.getQuestion(),
			comments: QuestionStore.getComments(),
			errors: []
		}
	},

	componentDidMount: function() {
		QuestionStore.addChangeListener(this._onChange);
		QuestionActionCreators.loadQuestion(this.getParams().questionId);
	},

	componentWillUnmount: function() {
		QuestionStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState({
			question: QuestionStore.getQuestion(),
			comments: QuestionStore.getComments(),
			errors: QuestionStore.getErrors()
		});
	},

	_onSubmit: function(e) {
		e.preventDefault();
		var commentBody = this.refs.body.getDOMNode().value;
		if (commentBody.length) {
			QuestionActionCreators.addComment(commentBody, this.getParams().questionId);
			//var optimisticComment = {q_id: this.getParams().questionId, body: commentBody};
			//optimisticComments.push(optimisticComment);
			this.refs.body.getDOMNode().value = "";
			this.forceUpdate();
		}
	},

	render: function() {
		question_id = this.getParams().questionId;
		var writeNewComment = SessionStore.isLoggedIn() ? (
			<div className="row">
				<form onSubmit={this._onSubmit} className="new-comment">
					<div className="new-comment__body">
						<textarea rows="5" input type="text" placeholder="Write a new comment" name="body" ref="body"/>
					</div>
					<div className="new-comment__submit">
						<button type="submit">Post Comment</button>
					</div>
				</form>
			</div>
		) : (
			<div className="comment__denial">
				<strong>Please sign in to post a comment</strong>
			</div>
		)
		return (
			<div className="row">
				<div className="question__title"><strong>{this.state.question.title}</strong></div>
				<div className="question__author">{this.state.question.user}</div>
				<br/>
				<div className="question__body">{this.state.question.body}</div>
				<br/>
				<div className="question__comments">
					<div className="comments__head"><u>Comments</u></div>
					<CommentsList comments={this.state.question.comments}/>
					<OptCommentsList opt_comments={this.state.comments}/>
				</div>
				{writeNewComment}
			</div>
		);
	}
});

// renders new comments optimistically before they've been fully processed
var OptCommentsList = React.createClass({
	render: function() {
		var ReturnItem = this.props.opt_comments.length ? (
			<ul className="opt__comments__list">
				{this.props.opt_comments.map(function(opt_comment, index){
					return <OptCommentItem opt_comment={opt_comment} key={"opt_comment-" + index}/>
				})}
			</ul>
			) : (null);
		return(ReturnItem);
	}
});

var OptCommentItem = React.createClass({
	render: function() {
		var ReturnItem = question_id == this.props.opt_comment.q_id ? (
			<li className="opt__comment">
				<div className="opt__comment__body">
					{this.props.opt_comment.body}
				</div>
				<div className="comment__user">
					&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;
					{SessionStore.getUser()}
				</div>
			</li>
		) : (null);
		return(ReturnItem);
	}
});

var CommentsList = React.createClass({
	render: function() {
		var ReturnItem = this.props.comments.length ? (
			<ul className="comments__list">
			{this.props.comments.map(function(comment, index){
				return <CommentItem comment={comment} key={"comment-" + index}/>
				})}
			</ul>
			) : (null);
		return(ReturnItem);
	}
});

var CommentItem = React.createClass({
	render: function() {
	return(
		<li className="comment">
			<div className="comment__body">
				{this.props.comment.body}
			</div>
			<div className="comment__user">
				&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;
				{this.props.comment.user.username}
			</div>
		</li>
		);
	}
});


module.exports = QuestionPage;