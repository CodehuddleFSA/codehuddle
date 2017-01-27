
// Required libraries
const { createStore, applyMiddleware, combineReducers } = require('redux');
const createLogger = require('redux-logger');

// Required files
const interview = require('./reducers/interview').reducer;

// Create the root reducer
const rootReducer = combineReducers({ interview });

// Create the store with middleware
const store = createStore(rootReducer, applyMiddleware(
  createLogger()
));

module.exports = {
  store
};
