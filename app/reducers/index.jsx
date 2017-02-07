// Required libraries
import { combineReducers } from 'redux';

// Requried files
import editor from './editor';
import whiteboard from './whiteboard';
import interviewProblems from './interviewProblems';

const rootReducer = combineReducers({
  auth: require('./auth').default,
  interview: combineReducers({
    editor,
    whiteboard,
    interviewProblems
  })
});

export default rootReducer;
