'use strict';
import React from 'react';
import {Route, Router, IndexRedirect, browserHistory} from 'react-router';
import {render} from 'react-dom';
import {connect, Provider} from 'react-redux';

import store from './store';
import Login from './components/Login';
import WhoAmI from './components/WhoAmI';
import Editor from './components/Editor';
import Whiteboard from './components/Whiteboard';
// import Canvas from './components/Canvas';
// import KonvaLine from './components/Line';
// import Splash from './components/Splash/Splash';

const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) =>
    <div>
      <nav>
        {user ? <WhoAmI/> : <Login/>}
      </nav>
      <Editor />
      <Whiteboard />
    </div>
);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp}>
        <Route path="/editor" component={Editor} />
        <Route path="/whiteboard" component={Whiteboard} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
);
