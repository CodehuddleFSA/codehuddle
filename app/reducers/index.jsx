// Required libraries
import { combineReducers } from 'redux';

// Requried files
import editor from './editor';
import whiteboard from './whiteboard';

const rootReducer = combineReducers({
  auth: require('./auth').default,
  interview: combineReducers({
    editor,
    whiteboard
  }),
  problems: require('./problems').default
});

export default rootReducer;
