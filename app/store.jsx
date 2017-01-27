import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import canvas from 'redux-canvas';

import {whoami} from './reducers/auth';

/* ------------       SOCKETS     ------------------ */
const socket = window && window.io(window.location.origin);
window.socket = socket; // Place socket reference on window

socket.on('connect', () => {
  console.log('Client connected', socket.id);

  socket.emit('wantToJoinRoom', 'spongebob');
});

// Sockets Middleware
const socketsEmit = (socket, channelName = 'action') => store => {
  socket.on(channelName, store.dispatch); // When action is received, disptach to store

  return next => action => {
    if (action.meta && action.meta.remote) {
      console.log('THIS IS THE MIDDLEWARE', action);
      socket.emit(channelName, action); // If action has meta.remote = true, this emit to server;
    }
    return next(action);
  };
};

// Create store
const store = createStore(rootReducer, applyMiddleware(createLogger(), thunkMiddleware, socketsEmit(socket), canvas));
export default store;

// Set the auth info at start
store.dispatch(whoami());
