// Required libraries
import Immutable from 'immutable';
import {DEFAULT_COLOR, DEFAULT_STROKE_SIZE} from '../components/WhiteboardConstants';

/* -----------------    ACTIONS     ------------------ */
const REQUEST_HISTORY = 'REQUEST_HISTORY';
const CLEAR_HISTORY = 'CLEAR_HISTORY';
const INIT_CANVAS = 'INIT_CANVAS';
const SET_COORDINATES = 'SET_COORDINATES';

/* ------------   ACTION CREATORS     ------------------ */

export const requestHistory = () => {
  return {
    type: REQUEST_HISTORY
  };
};

export const clearHistory = () => {
  return {
    type: CLEAR_HISTORY,
    meta: {
      remote: true
    }
  };
};

export const initCanvas = (ctx) => {
  return {
    type: INIT_CANVAS,
    ctx
  };
};

export const setCoordinates = (lastPx, currentPx, color, strokeWidth) => {
  return {
    type: SET_COORDINATES,
    lastDraw: {lastPx, currentPx, color, strokeWidth},
    meta: {
      remote: true
    }
  };
};

/* ------------       REDUCER     ------------------ */
const initialWhiteboardData = Immutable.fromJS({
  lastDraw: {
    lastPx: { x: null, y: null },
    currentPx: { x: null, y: null },
    color: DEFAULT_COLOR,
    strokeWidth: DEFAULT_STROKE_SIZE
  },
  drawingHistory: []
});

export default function reducer (whiteboardData = initialWhiteboardData, action) {
  switch (action.type) {
    case SET_COORDINATES:
      const lastDrawImm = Immutable.fromJS(action.lastDraw);
      const newWhiteboardData = whiteboardData.setIn(['lastDraw'], lastDrawImm);
      const history = newWhiteboardData.getIn(['drawingHistory']);
      const newHistory = history.push(lastDrawImm);
      return newWhiteboardData.setIn(['drawingHistory'], newHistory);

    case REQUEST_HISTORY:
      return whiteboardData.setIn(['drawingHistory'], Immutable.fromJS(action.drawingHistory));

    case CLEAR_HISTORY:
      return whiteboardData.setIn(['drawingHistory'], Immutable.fromJS([]));

    default: return whiteboardData;
  }
}

/* ------------       DISPATCHERS     ------------------ */
