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
import ProblemsContainer from './components/ProblemsContainer';

// Helper functions
import { socketsJoinRoom } from 'APP/app/sockets';
import { fetchProblems } from 'APP/app/reducers/interviewProblems';
import { fetchOrganizationProblems } from 'APP/app/reducers/problems';

/* -----------------    COMPONENT     ------------------ */
const Routes = ({ interviewOnEnter, feedbackCandidateOnEnter, problemsOnEnter }) => (
  <Router history={ browserHistory }>
    <Route path="/" component={ Home } />
    <Route path="/interviewRoom/:room" component={ InterviewRoom } onEnter={ interviewOnEnter }/>
    <Route path="/feedbackCandidate/:interviewID" component={ FeedbackCandidate } onEnter={ feedbackCandidateOnEnter } />
    <Route path="/login" component={ Login }/>
    <Route path="/problems/:organization" component={ProblemsContainer} onEnter={problemsOnEnter}/>
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
  },
  problemsOnEnter: (nextState) => {
    dispatch(fetchOrganizationProblems(nextState.params.organization));
  }
});

export default connect(mapProps, mapDispatch)(Routes);
