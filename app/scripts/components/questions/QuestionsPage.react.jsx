var React = require('react');
var QuestionStore = require('../../stores/QuestionStore.react.jsx');
var QuestionActionCreators = require('../../actions/QuestionActionCreators.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var RouteActionCreators = require('../../actions/RouteActionCreators.react.jsx');
var SessionStore = require('../../stores/SessionStore.react.jsx');
var Router = require('react-router');
var Link = Router.Link;
var timeago = require('timeago');

var QuestionsPage = React.createClass({

  getInitialState: function(){
    return {
      questions: QuestionStore.getAllQuestions(),
      errors: []
    };
  },
  
  componentDidMount: function() {
    QuestionStore.addChangeListener(this._onChange);
    QuestionActionCreators.loadQuestions();
  },
  
  componentWillUnmount: function() {
    QuestionStore.removeChangeListener(this._onChange);
  },
  
  _onChange: function() {
    this.setState({
      questions: QuestionStore.getAllQuestions(),
      errors: QuestionStore.getErrors()
    });
  },

  render: function() {
    var newQuestionButton = SessionStore.isLoggedIn() ? (
      <div className="large-3 medium-10 small-12 small-centered column">
        <Link to="new-question">New Questions</Link>
      </div>
    ) : (
      <div className="large-3 medium-10 small-12 small-centered column">
        <strong>Please sign in to ask a question</strong>
      </div>
    );
    var errors = (this.state.errors.length > 0) ? 
      <ErrorNotice errors={this.state.errors}/> : <div></div>;
    return (
      <div>
        { errors }
        <br/>
        {newQuestionButton}
        <br/>
        <div className="row">
          <QuestionsList questions={this.state.questions} />
        </div>
      </div>
    );
  }
});

var QuestionItem = React.createClass({
  render: function() {
  return(
    <li className="question">
      <div className="question__title">
        <Link to="question" params={ {questionId: this.props.question.id} }>
          {this.props.question.title}
        </Link>
      </div>
      <div className="question__info">
        Author: {this.props.question.user}, Created: {timeago(this.props.question.created_at)}, Reputation: {this.props.question.repcount} 
      </div>
      <div className="question__summary">
        {this.props.question.summary}
      </div>
    </li>
    );
  }
});

var QuestionsList = React.createClass({
  render: function() {
    return(
        <ul className="large-8 medium-10 small-12 small-centered column">
        {this.props.questions.map(function(question, index){
          return <QuestionItem question={question} key={"question-" + index}/>
        })}
        </ul>
    );
  }
});

module.exports = QuestionsPage;