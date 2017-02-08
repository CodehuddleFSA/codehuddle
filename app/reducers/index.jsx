// Required libraries
import { combineReducers } from 'redux';

// Requried files
import editor from './editor';
import whiteboard from './whiteboard';
import interviewPlanning from './interviewPlanning';

const rootReducer = combineReducers({
  auth: require('./auth').default,
  interviewPlanning,
  interview: combineReducers({
    editor,
    whiteboard
  })
});

export default rootReducer;
