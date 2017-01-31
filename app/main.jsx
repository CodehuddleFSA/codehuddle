'use strict';
import React from 'react';
import {Router, Route, IndexRedirect, browserHistory} from 'react-router';
import {render} from 'react-dom';
import {connect, Provider} from 'react-redux';

import store from './store';
import Jokes from './components/Jokes';
import Login from './components/Login';
import WhoAmI from './components/WhoAmI';
import Editor from './components/Editor';
import Canvas from './components/Canvas';
import InterviewRoom from './components/InterviewRoom';

import { socketsJoinRoom } from 'APP/app/sockets';

function interviewOnEnter (nextState) {
  socketsJoinRoom(nextState.location.query.room);
}

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/">
        {/*<IndexRedirect to="/jokes" /> */}
        <Route path="/jokes" component={Jokes} />
        <Route path="/interviewRoom" component={InterviewRoom} onEnter={ interviewOnEnter }/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
