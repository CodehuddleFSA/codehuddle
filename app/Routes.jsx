'use strict';

// Required libraries
import React from 'react';
import { browserHistory, Router, Route } from 'react-router';
import { connect } from 'react-redux';

// Required files
import store from './store';
import Login from './components/Login';
import WhoAmI from './components/WhoAmI';
import Home from './components/splash/Home';
import InterviewRoom from './components/interview-room/InterviewRoom';
import FeedbackCandidate from './components/FeedbackCandidate';
import InterviewerDashboard from './components/InterviewerDashboard';

// Helper functions
import { socketsJoinRoom } from 'APP/app/sockets';
import { fetchProblems } from 'APP/app/reducers/interviewProblems';
import { fetchAllInterviews } from 'APP/app/reducers/allInterviews';

/* -----------------    COMPONENT     ------------------ */
const Routes = ({ interviewOnEnter, feedbackCandidateOnEnter, interviewDashboardOnEnter }) => (
  <Router history={ browserHistory }>
    <Route path="/" component={ Home } />
    <Route path="/interviewRoom/:room" component={ InterviewRoom } onEnter={ interviewOnEnter }/>
    <Route path="/interviewerDashboard/:userID" component={ InterviewerDashboard } onEnter={ interviewDashboardOnEnter }/>
    <Route path="/feedbackCandidate/:interviewID" component={ FeedbackCandidate } onEnter={ feedbackCandidateOnEnter } />
    <Route path="/login" component={ Login }/>
  </Router>
);

/* -----------------    CONTAINER     ------------------ */

const mapProps = (state) => ({
  user: state.auth
});

const mapDispatch = (dispatch, ownProps) => ({
  feedbackCandidateOnEnter: (nextState) => {
    dispatch(fetchProblems(nextState.params.interviewID));
  },
  interviewOnEnter: (nextState) => {
    socketsJoinRoom(nextState.params.room);
  },
  interviewDashboardOnEnter: (nextState) => {
    dispatch(fetchAllInterviews(nextState.params.userID));
  }
});

export default connect(mapProps, mapDispatch)(Routes);
