var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var SuperclassApp = require('./components/SuperclassApp.react.jsx');
var SignupPage = require('./components/session/SignupPage.react.jsx');
var LoginPage = require('./components/session/LoginPage.react.jsx');
var LessonsPage = require('./components/lessons/LessonsPage.react.jsx');
var LessonPage = require('./components/lessons/LessonPage.react.jsx');
var LessonNew = require('./components/lessons/LessonNew.react.jsx');
var QuestionsPage = require('./components/questions/QuestionsPage.react.jsx');
var QuestionPage = require('./components/questions/QuestionPage.react.jsx');
var QuestionNew = require('./components/questions/QuestionNew.react.jsx');
var FeedbackPage = require('./components/feedback/FeedbackPage.react.jsx');
var FeedbackThanks = require('./components/feedback/FeedbackThanks.react.jsx');
var WelcomePage = require('./components/session/WelcomePage.react.jsx');
var ProjectsPage = require('./components/projects/ProjectsPage.react.jsx');
var ProjectPage = require('./components/projects/ProjectPage.react.jsx');
var ProjectNew = require('./components/projects/ProjectNew.react.jsx');

module.exports = (
  <Route name="app" path="/" handler={SuperclassApp}>
    <DefaultRoute handler={WelcomePage} />
    <Route name="login"           path="/login"                 handler={LoginPage}/>
    <Route name="signup"          path="/signup"                handler={SignupPage}/>
    <Route name="lessons"         path="/lessons"               handler={LessonsPage}/>
    <Route name="lesson"          path="/lessons/:lessonId"     handler={LessonPage}/>
    <Route name="new-lesson"      path="/lesson/new"            handler={LessonNew}/>
    <Route name="questions"       path="/questions"             handler={QuestionsPage}/>
    <Route name="question"        path="/questions/:questionId" handler={QuestionPage}/>
    <Route name="new-question"    path="/question/new"          handler={QuestionNew}/>
    <Route name="feedback"        path="/feedback"              handler={FeedbackPage}/>
    <Route name="feedback-thanks" path="/feedback/thanks"       handler={FeedbackThanks}/>
    <Route name="welcome"         path="/home"                  handler={WelcomePage}/>
    <Route name="projects"        path="/projects"              handler={ProjectsPage}/>
    <Route name="project"         path="/project/:projectId"    handler={ProjectPage}/>
    <Route name="new-project"     path="/project/new"           handler={ProjectNew}/>
  </Route>
);
