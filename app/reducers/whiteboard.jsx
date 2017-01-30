
/* -----------------    ACTIONS     ------------------ */
const SET_COORDINATES = 'SET_COORDINATES';
const INIT_CANVAS = 'INIT_CANVAS';

/* ------------   ACTION CREATORS     ------------------ */
export const initCanvas = (ctx) => {

export const setCoordinates = (lastPx, currentPx, color) => {
  return {
    type: SET_COORDINATES,
    lastDraw: { lastPx, currentPx, color},
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
  coordinateHistory: []
  
  
};

export default function reducer (whiteboardData = initialWhiteboardData, action) {
  const newWhiteboardData = Object.assign({}, whiteboardData);
  switch (action.type) {

    case SET_COORDINATES:
      newWhiteboardData.lastDraw.lastPx = action.lastDraw.lastPx;
      newWhiteboardData.lastDraw.currentPx = action.lastDraw.currentPx;
      newWhiteboardData.lastDraw.color = action.lastDraw.color;
      newWhiteboardData.coordinateHistory = newWhiteboardData.coordinateHistory.concat([action.lastDraw.currentPx.x, action.lastDraw.currentPx.y]);
      break;

    
      
    default: return newWhiteboardData;

  }

  return newWhiteboardData;
}

/* ------------       DISPATCHERS     ------------------ */
