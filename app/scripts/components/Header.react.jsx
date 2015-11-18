var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ReactPropTypes = React.PropTypes;
var SessionActionCreators = require('../actions/SessionActionCreators.react.jsx');
var RouteActionCreators = require('../actions/RouteActionCreators.react.jsx');

var Header = React.createClass({

  propTypes: {
    isLoggedIn: ReactPropTypes.bool,
    email: ReactPropTypes.string,
    userRole: ReactPropTypes.string
  },

  logout: function(e) {
    e.preventDefault();
    SessionActionCreators.logout();
    RouteActionCreators.redirect('welcome');
  },

  render: function() {
    var rightNav = this.props.isLoggedIn ? (
      <ul className="right">
        <li className="has-dropdown">
          <a href="#">{this.props.email}</a>
          <ul className="dropdown">
            <li><a href='#' onClick={this.logout}>Logout</a></li>
          </ul>
        </li>
      </ul>
    ) : (
      <ul className="right">
        <li><Link to="login">Login</Link></li>
        <li><Link to="signup">Sign up</Link></li>
      </ul>
    );

    // must be logged in to see 'new question' button
    /*var newQuestion = this.props.isLoggedIn ? (
        <li><Link to="new-question">New Question</Link></li>
      ) : (null);*/

    // must be admin to see 'new lesson' button
    var newLesson = this.props.isAdmin ? (
        <li><Link to="new-lesson">New Lesson</Link></li>
      ) : (null);

    var feedback = this.props.isLoggedIn ? (
        <li><Link to="feedback">Leave Feedback</Link></li>
      ) : (null);

    // left side of header navbar
    // 
    var leftNav = (
      <ul className="left">
        {newLesson}
        <li><Link to="lessons">Lessons</Link></li>
        <li><Link to="questions">Questions</Link></li>
        {feedback}
      </ul>);

    return (
      <nav className="top-bar" data-topbar role="navigation">
        <ul className="title-area">
          <li className="name">
            <h1><a href="#"><strong>Super Class</strong>, by JDD, MH & BS</a></h1>
          </li>
          <li className="toggle-topbar menu-icon"><a href="#"><span>Menu</span></a></li>
        </ul>

        <section className="top-bar-section">
          {rightNav}
          {leftNav}
        </section>
      </nav>
    );
  }
});

module.exports = Header;