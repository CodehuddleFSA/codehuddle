
// Required
const Immutable = require('Immutable');

/* -----------------    ACTIONS     ------------------ */
const ADD_ROOM = 'ADD_ROOM';

// Editor
const SET_TEXT = 'SET_TEXT';
const SET_OPTIONS = 'SET_OPTIONS';

// Whiteboard
const REQUEST_HISTORY = 'REQUEST_HISTORY';
const SET_COORDINATES = 'SET_COORDINATES';

/* ------------   ACTION CREATORS     ------------------ */
const addRoom = room => ({
  type: ADD_ROOM,
  room
});

//  Editor
const setText = text => (
  {
    type: SET_TEXT,
    text
  }
);

const setOptions = options => ({
  type: SET_OPTIONS,
  options
});

// Whiteboard
const requestHistory = drawingHistory => {
  return {
    type: REQUEST_HISTORY,
    drawingHistory
  };
};

const setCoordinates = (lastPx, currentPx, color) => {
  return {
    type: SET_COORDINATES,
    lastDraw: { lastPx, currentPx, color }
  };
};

/* ------------       REDUCER     ------------------ */
// const defaultRoom = {
//   editor: {
//     text: 'default text',
//     options: {
//       linting: true,
//       showGutter: true,
//       textSize: false,
//       theme: false
//     }
//   },
//   whiteboard: {
//     drawingHistory: []
//   }
// };

const defaultRoom = Immutable.fromJS(
  {
    editor: {
      text: 'default text',
      options: {
        linting: true,
        showGutter: true,
        textSize: false,
        theme: false
      }
    },
    whiteboard: {
      drawingHistory: []
    }
  }
);

// const initialInterviewData = {
//   squidward: defaultRoom
// };

const initialInterviewData = Immutable.fromJS({
  squidward: defaultRoom
});

function reducer (interviewData = initialInterviewData, action) {
  // const newInterviewData = interviewData;
  let newInterviewData = interviewData;

  switch (action.type) {

    case ADD_ROOM:
      // newInterviewData[action.room] = defaultRoom;
      newInterviewData = newInterviewData.setIn([action.room], defaultRoom);
      console.log('+++ Adding a new room', action.room);
      break;

    case SET_TEXT:
      // newInterviewData[action.room].editor.text = action.text;
      newInterviewData = newInterviewData.setIn([action.room, 'editor', 'text'], action.text);
      console.log('+++ This is the text for room', action.room, newInterviewData.getIn([action.room, 'editor', 'text']));
      break;

    case SET_COORDINATES:
      // newInterviewData[action.room].whiteboard.drawingHistory.push(action.lastDraw); // TODO: look into immutable / concat
      newInterviewData = newInterviewData.updateIn(
        [action.room, 'whiteboard', 'drawingHistory'],
        drawingHistory => drawingHistory.push(action.lastDraw)
      );
      break;

    case SET_OPTIONS:
      // newInterviewData[action.room].editor.options = Object.assign({}, interviewData[action.room].editor.options, action.options);
      newInterviewData = newInterviewData.mergeIn([action.room, 'editor', 'options'], action.options);
      break;

    default: return interviewData;

  }
  console.log('+++ This is the text for room', action.room, newInterviewData.getIn([action.room, 'editor', 'text']));
  return newInterviewData;
}

/* ------------       DISPATCHERS     ------------------ */

module.exports = {
  addRoom,
  setText,
  setOptions,
  setCoordinates,
  requestHistory,
  reducer
};
