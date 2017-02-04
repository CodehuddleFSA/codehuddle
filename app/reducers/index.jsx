// Required libraries
import { combineReducers } from 'redux';

// Requried files
import editor from './editor';
import whiteboard from './whiteboard';
import problems from './problems';

const rootReducer = combineReducers({
  auth: require('./auth').default,
  interview: combineReducers({
    editor,
    whiteboard,
    problems
  })
});

export default rootReducer;
