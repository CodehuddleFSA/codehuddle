// Required libraries
import { combineReducers } from 'redux';

// Requried files
import editor from './editor';
import whiteboard from './whiteboard';
import interviewProblems from './interviewProblems';
import allInterviews from './allInterviews';

const rootReducer = combineReducers({
  auth: require('./auth').default,
  interview: combineReducers({
    editor,
    whiteboard,
    interviewProblems
  }),
  allInterviews
});

export default rootReducer;
