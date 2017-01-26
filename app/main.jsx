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
      <Route path="/" component={Splash}>
        {/*<IndexRedirect to="/jokes" /> */}
        <Route path="/jokes" component={Jokes} />
        <Route path="/editor" component={Editor} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
