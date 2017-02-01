'use strict';
import React from 'react';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import Login from './components/Login';
import WhoAmI from './components/WhoAmI';
<<<<<<< HEAD
import Splash from './components/splash/Splash';
import InterviewRoom from './components/InterviewRoom';

=======
import Splash from './components/Splash/Splash';
import InterviewRoom from './components/interview-room/InterviewRoom';
>>>>>>> b469c51db8d692b754e6d73d4fbc40fe838bfed1
import { socketsJoinRoom } from 'APP/app/sockets';

function interviewOnEnter (nextState) {
  socketsJoinRoom(nextState.location.query.room);
}

render (
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/" component={ Splash } />
      <Route path="/interviewRoom" component={InterviewRoom} onEnter={ interviewOnEnter }/>
    </Router>
  </Provider>,
  document.getElementById('main')
);
