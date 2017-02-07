'use strict';
import React from 'react';

import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// For Material-UI: Provides `onTouchTap()` event; Much like an `onClick()` for touch devices.
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Material Theme Provider. Wraps everything in `render()` method below
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import store from './store';
import Login from './components/Login';
import WhoAmI from './components/WhoAmI';
import Splash from './components/splash/Splash';
import Home from './components/splash/Home';
import ProblemsContainer from './components/ProblemsContainer';
import InterviewRoom from './components/interview-room/InterviewRoom';
import { socketsJoinRoom } from 'APP/app/sockets';

import {fetchOrganizationProblems} from './reducers/problems';

function interviewOnEnter (nextState) {
  const requestedRoom = nextState.params.room;
  socketsJoinRoom(requestedRoom);
}

function problemsOnEnter(nextState) {
  store.dispatch(fetchOrganizationProblems(nextState.params.organization));
}

render(
  <MuiThemeProvider>
    <Provider store={ store }>
      <Router history={ browserHistory }>
        <Route path="/" component={ Home } />
        <Route path="/interviewRoom/:room" component={InterviewRoom} onEnter={ interviewOnEnter }/>
        <Route path="/login" component={Login}/>
        <Route path="/problems/:organization" component={ProblemsContainer} onEnter={problemsOnEnter}/>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('main')
);
