
// Required libraries
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

// Required files
import rootReducer from './reducers';
import { whoami } from './reducers/auth';
import { socket, socketsEmit } from 'APP/app/sockets';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(
    thunkMiddleware,
    socketsEmit(socket, 'clientStoreAction')
  ))
);

export default store;

// Set the auth info at start
store.dispatch(whoami());
