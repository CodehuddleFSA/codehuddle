// Required libraries
import { combineReducers } from 'redux'

// Requried files
import editor from './editor';

const rootReducer = combineReducers({
  auth: require('./auth').default,
  editor
})

export default rootReducer
