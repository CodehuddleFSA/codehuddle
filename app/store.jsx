
// Required libraries
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

// Required files
import rootReducer from './reducers';
import { whoami } from './reducers/auth';
import { socket, socketsEmit } from 'APP/app/sockets';

const store = createStore(rootReducer,
  applyMiddleware(
    createLogger(),
    thunkMiddleware,
    socketsEmit(socket, 'clientStoreAction')
  )
);

export default store;

// Set the auth info at start
store.dispatch(whoami());
