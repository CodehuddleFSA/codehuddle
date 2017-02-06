'use strict';

// Required libraries
import React from 'react';
import { browserHistory, Router, Route } from 'react-router';
import { connect } from 'react-redux';

// Required files
import store from './store';
import Login from './components/Login';
import WhoAmI from './components/WhoAmI';
import Splash from './components/splash/Splash';
import InterviewRoom from './components/interview-room/InterviewRoom';
import FeedbackCandidate from './components/FeedbackCandidate';

// Helper functions
import { socketsJoinRoom } from 'APP/app/sockets';
import { fetchProblems } from 'APP/app/reducers/problems';

/* -----------------    COMPONENT     ------------------ */
const Routes = ({ interviewOnEnter, feedbackCandidateOnEnter }) => (
  <Router history={ browserHistory }>
    <Route path="/" component={ Splash } />
    <Route path="/interviewRoom/:room" component={ InterviewRoom } onEnter={ interviewOnEnter }/>
    <Route path="/feedbackCandidate/:interviewID" component={ FeedbackCandidate } onEnter={ feedbackCandidateOnEnter } />
  </Router>
);

/* -----------------    CONTAINER     ------------------ */

const mapProps = (state) => ({
});

const mapDispatch = dispatch => ({
  feedbackCandidateOnEnter: (nextState) => {
    dispatch(fetchProblems(nextState.params.interviewID));
  },
  interviewOnEnter: (nextState) => {
    socketsJoinRoom(nextState.params.room);
  }
});

export default connect(mapProps, mapDispatch)(Routes);
