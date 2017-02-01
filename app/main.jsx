'use strict';
import React from 'react';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import Login from './components/Login';
import WhoAmI from './components/WhoAmI';
import Splash from './components/Splash/Splash';
import InterviewRoom from './components/interview-room/InterviewRoom';

render (
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/" component={ Splash } />
      <Route path="/interviewRoom" component={ InterviewRoom } />
    </Router>
  </Provider>,
  document.getElementById('main')
);
