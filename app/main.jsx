'use strict';

// Required libraries
import React from 'react';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// Required files
import store from './store';
import Routes from './Routes';

// For Material-UI: Provides `onTouchTap()` event; Much like an `onClick()` for touch devices.
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Material Theme Provider. Wraps everything in `render()` method below
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

render(
  <MuiThemeProvider>
    <Provider store={ store }>
      <Routes />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('main')
);
