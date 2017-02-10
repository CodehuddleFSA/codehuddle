
// Required
const Immutable = require('immutable');

/* -----------------    ACTIONS     ------------------ */
const ADD_ROOM = 'ADD_ROOM';

// Editor
const SET_TEXT = 'SET_TEXT';
const SET_OPTIONS = 'SET_OPTIONS';
const SET_RANGE = 'SET_RANGE'
const SET_RANGE_HISTORY = 'SET_RANGE_HISTORY';
const REMOVE_USER = 'REMOVE_USER';

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

const setRangeHistory = ranges => ({
  type: SET_RANGE_HISTORY,
  ranges
});

const removeUser = userID => ({
  type: REMOVE_USER,
  userID
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

const defaultRange = Immutable.fromJS(
  {
    default: {
      start: {
        column: 0,
        row: 0
      },
      end: {
        column: 0,
        row: 0
      }
    }
  }
);

const defaultRoom = Immutable.fromJS(
  {
    editor: {
      text: `const CodeHuddle = 'built with <3';`,
      options: {
        linting: true,
        showGutter: true,
        textSize: false,
        theme: false
      },
      ranges: defaultRange
    },
    whiteboard: {
      drawingHistory: []
    }
  }
);

const initialInterviewData = Immutable.fromJS({
  squidward: defaultRoom
});

function reducer (interviewData = initialInterviewData, action) {
  let newInterviewData = interviewData;

  switch (action.type) {

    case ADD_ROOM:
    newInterviewData = newInterviewData.setIn([action.room], defaultRoom);
    break;

    case SET_TEXT:
    newInterviewData = newInterviewData.setIn([action.room, 'editor', 'text'], action.text);
    break;

    case SET_COORDINATES:
    newInterviewData = newInterviewData.updateIn(
      [action.room, 'whiteboard', 'drawingHistory'],
      drawingHistory => drawingHistory.push(action.lastDraw)
    );
    break;

    case SET_OPTIONS:
    newInterviewData = newInterviewData.mergeIn([action.room, 'editor', 'options'], action.options);
    break;

    case SET_RANGE:
    const newRange = {};
    newRange[action.id] = action.range;
    newInterviewData = newInterviewData.mergeIn([action.room, 'editor', 'ranges'], newRange);
    break;

    case REMOVE_USER:
    newInterviewData = newInterviewData.deleteIn([action.room, 'editor', 'ranges', action.userID])
    break;

    default: return interviewData;

  }

  return newInterviewData;
}

/* ------------       DISPATCHERS     ------------------ */

module.exports = {
  addRoom,
  setText,
  setOptions,
  setRangeHistory,
  removeUser,
  setCoordinates,
  requestHistory,
  reducer
};
