
/* -----------------    ACTIONS     ------------------ */
const SET_COORDINATES = 'SET_COORDINATES';
const INIT_CANVAS = 'INIT_CANVAS';

/* ------------   ACTION CREATORS     ------------------ */
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
  }
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
      
    default: return newWhiteboardData;

  }

  return newWhiteboardData;
}

/* ------------       DISPATCHERS     ------------------ */
