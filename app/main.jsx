'use strict';
import React from 'react';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import Login from './components/Login';
import WhoAmI from './components/WhoAmI';
import Editor from './components/Editor';
import Splash from './components/Splash/Splash';
import Canvas from './components/Canvas';
import InterviewRoom from './components/InterviewRoom';

render (
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/" component={ Splash }>
        <Route path="/editor" component={ Editor } />
        <Route path="/interviewRoom" component={ InterviewRoom } />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
);
