var React = require('react');
var LessonStore = require('../../stores/LessonStore.react.jsx');
var LessonActionCreators = require('../../actions/LessonActionCreators.react.jsx');
var State = require('react-router').State;

var LessonPage = React.createClass({

  mixins: [ State ],

  getInitialState: function() {
    return {
      lesson: LessonStore.getLesson(),
      errors: []
    };
  },

  componentDidMount: function() {
    LessonStore.addChangeListener(this._onChange);
    LessonActionCreators.loadLesson(this.getParams().lessonId);
  },

  componentWillUnmount: function() {
    LessonStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      lesson: LessonStore.getLesson(),
      errors: LessonStore.getErrors()
    });
  },

  render: function() {
    return (
      <div className="row">
        <div className="lesson__title">{this.state.lesson.title}</div>
        <div className="lesson__creator">{this.state.lesson.creator}</div>
        <a href={this.state.lesson.link} target="_blank">Learn Here!</a>
        <div className="lesson__summary">{this.state.lesson.summary}</div>
      </div>
    );
  }

});

module.exports = LessonPage;
