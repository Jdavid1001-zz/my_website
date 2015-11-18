var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Header = require('../components/Header.react.jsx');
var SessionStore = require('../stores/SessionStore.react.jsx');
var RouteStore = require('../stores/RouteStore.react.jsx');

function getSessionStateFromStores() {
  return {
    isLoggedIn: SessionStore.isLoggedIn(),
    email: SessionStore.getEmail(),
    userRole: SessionStore.getRole(),
    isAdmin: SessionStore.isAdmin()
  };
}

var SuperclassApp = React.createClass({

  getInitialState: function() {
    return getSessionStateFromStores();
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getSessionStateFromStores());
  },

  render: function() {
    return (
      <div className="app">
        <Header
          isLoggedIn={this.state.isLoggedIn}
          email={this.state.email}
          userRole={this.state.userRole}
          isAdmin = {this.state.isAdmin}/>
        <RouteHandler/>
      </div>
    );
  }

});

module.exports = SuperclassApp;
