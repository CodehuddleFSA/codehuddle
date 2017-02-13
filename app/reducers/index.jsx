// Required libraries
import { combineReducers } from 'redux';

// Requried files
import editor from './editor';
import whiteboard from './whiteboard';
import interviewPlanning from './interviewPlanningInfo';
import interviewProblems from './interviewProblems';
import allInterviews from './allInterviews';
import interviewInfo from './interviewInfo';

const rootReducer = combineReducers({
  auth: require('./auth').default,
  interviewPlanning,
  interview: combineReducers({
    editor,
    whiteboard,
    interviewProblems,
    interviewInfo
  }),
  allInterviews
});

export default rootReducer;
