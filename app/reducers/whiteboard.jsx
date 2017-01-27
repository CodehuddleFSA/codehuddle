
/* -----------------    ACTIONS     ------------------ */
const DRAW = 'DRAW';
const DRAG = 'DRAG';
const DRAG_START = 'DRAG_START';
const DRAG_STOP = 'DRAG_STOP';

/* ------------   ACTION CREATORS     ------------------ */
export const draw = (start, end) => ({
  type: DRAW,
  meta: {
    remote: true
  },
  payload: {start, end} });



/* ------------       REDUCER     ------------------ */
const initialWhiteboardState = {
  color: 'green',
  canvas: '',
  context: '',
  dragging: false,
  dragStartLocation: '',
  drawing: false,
  currentMousePosition: {
    x: 0,
    y: 0
  },
  lastMousePosition: {
    x: 0,
    y: 0
  }
};

export default function reducer (whiteboardData = initialWhiteboardState, action) {
  const newWhiteboardState = Object.assign({}, whiteboardData);

  switch (action.type) {
    case DRAW:
      //newWhiteboardState.text = action.payload;
      break;

    default: return editorData;

  }

  return newEditorData;
}

/* ------------       DISPATCHERS     ------------------ */
