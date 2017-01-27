
/* -----------------    ACTIONS     ------------------ */
const SET_COORDINATES = 'SET_COORDINATES';
const INIT_CANVAS = 'INIT_CANVAS';

/* ------------   ACTION CREATORS     ------------------ */
export const initCanvas = (ctx, name) => {
  return {
    type: INIT_CANVAS,
    meta: {
      registerContext: {
        name,
        ctx
      }
    }
  };
};

function paintLine (t, contexts, getState, dispatch) {
  const ctx = contexts.get('spongebob');
  const state = getState();
  const { lastPx, currentPx } = state.interview.whiteboard.lastDraw;
  console.log('this is the state', state);
  ctx.beginPath();
  ctx.strokeStyle = '#000000';
  ctx.moveTo(lastPx.x, lastPx.y);
  ctx.lineTo(currentPx.x, currentPx.y);
  ctx.closePath();
  ctx.stroke();
}

export const setCoordinates = (lastPx, currentPx, color) => {
  return {
    type: SET_COORDINATES,
    lastDraw: { lastPx, currentPx, color, relay: true },
    meta: {
      remote: true,
      paintOnce: paintLine
    }
  };
};

export const setCoordinatesLocal = (lastPx, currentPx, color) => {
  return {
    type: SET_COORDINATES,
    lastDraw: { lastPx, currentPx, color, relay: false },
    meta: {
      paintOnce: paintLine
    }
  };
};

/* ------------       REDUCER     ------------------ */
const initialWhiteboardData = {
  lastDraw: {
    lastPx: { x: null, y: null },
    currentPx: { x: null, y: null },
    color: '#000000',
    relay: false
  }
};

export default function reducer (whiteboardData = initialWhiteboardData, action) {
  const newWhiteboardData = Object.assign({}, whiteboardData);
  switch (action.type) {
    case SET_COORDINATES:
      newWhiteboardData.lastDraw = action.lastDraw;
      break;

    default: return whiteboardData;

  }

  return newWhiteboardData;
}

/* ------------       DISPATCHERS     ------------------ */
