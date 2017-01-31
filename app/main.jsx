'use strict';
import React from 'react';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import {render} from 'react-dom';
import { connect, Provider } from 'react-redux';

import store from './store';
import Login from './components/Login';
import WhoAmI from './components/WhoAmI';
import InterviewRoom from './components/interview-room/InterviewRoom';

render (
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/" />
      <Route path="/interviewRoom" component={ InterviewRoom } />
    </Router>
  </Provider>,
  document.getElementById('main')
);
