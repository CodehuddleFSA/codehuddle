'use strict';
import React from 'react';
import {Router, Route, IndexRedirect, browserHistory} from 'react-router';
import {render} from 'react-dom';
import {connect, Provider} from 'react-redux';

import store from './store';
import Jokes from './components/Jokes';
import Login from './components/Login';
import Canvas3 from './components/Canvas3';
import WhoAmI from './components/WhoAmI';
import Editor from './components/Editor';
import Splash from './components/Splash/Splash';

const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
    <div>
      <nav>
        {user ? <WhoAmI/> : <Login/>}
      </nav>
      {children}
    </div>
)

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route>
        <IndexRedirect to="/canvas3" /> 
      
        <Route path="/canvas3" component={Canvas3} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
