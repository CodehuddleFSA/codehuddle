
// Required libraries
const { createStore, combineReducers } = require('redux');

// Required files
const interview = require('./reducers/interview').reducer;

// Create the root reducer
const rootReducer = combineReducers({ interview });

// Create the store with middleware
const store = createStore(rootReducer);

module.exports = {
  store
};
