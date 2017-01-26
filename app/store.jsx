import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import {whoami} from './reducers/auth';

/* ------------       SOCKETS     ------------------ */
const socket = window.io(window.location.origin);
window.socket = socket;

socket.on('connect', () => {
  console.log('Client connected', socket.id);
});

// Sockets Middleware
const socketsEmit = (socket, channelName = 'action') => store => {
  socket.on(channelName, store.dispatch); // When action is received, disptach to store

  return next => action => {
    if (action.meta && action.meta.remote) {
      socket.emit(channelName, action); // If action has meta.remote = true, this emit to server;
    }
    return next(action);
  };
};

// Create store
const store = createStore(rootReducer, applyMiddleware(createLogger(), thunkMiddleware, socketsEmit(socket)));
export default store;

// Set the auth info at start
store.dispatch(whoami());
