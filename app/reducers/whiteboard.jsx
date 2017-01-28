
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
    type: CLEAR_HISTORY
  };
};

export const initCanvas = (ctx) => {
  return {
    type: INIT_CANVAS,
    ctx
  };
};

export const setCoordinates = (lastPx, currentPx, color) => {
  return {
    type: SET_COORDINATES,
    lastDraw: { lastPx, currentPx, color },
    meta: {
      remote: true
    }
  };
};

/* ------------       REDUCER     ------------------ */
const initialWhiteboardData = {
  lastDraw: {
    lastPx: { x: null, y: null },
    currentPx: { x: null, y: null },
    color: '#000000'
  },
  ctx: {
    notReady: true
  },
  drawingHistory: []
};

export default function reducer (whiteboardData = initialWhiteboardData, action) {
  const newWhiteboardData = Object.assign({}, whiteboardData);

  switch (action.type) {

    case SET_COORDINATES:
      newWhiteboardData.lastDraw = action.lastDraw;
      break;

    case INIT_CANVAS:
      newWhiteboardData.ctx = action.ctx;
      break;

    case REQUEST_HISTORY:
      newWhiteboardData.drawingHistory = action.drawingHistory;
      break;

    case CLEAR_HISTORY:
      newWhiteboardData.drawingHistory = [];
      break;

    default: return newWhiteboardData;
  }

  return newWhiteboardData;
}

/* ------------       DISPATCHERS     ------------------ */
