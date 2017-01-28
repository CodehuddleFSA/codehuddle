
/* -----------------    ACTIONS     ------------------ */
const ADD_ROOM = 'ADD_ROOM';

// Editor
const SET_TEXT = 'SET_TEXT';

// Whiteboard
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

// Whiteboard
const setCoordinates = (lastPx, currentPx, color) => {
  return {
    type: SET_COORDINATES,
    lastDraw: { lastPx, currentPx, color }
  };
};

/* ------------       REDUCER     ------------------ */
const defaultRoom = {
  editor: {
    text: 'default text'
  },
  whiteboard: {
    drawingHistory: []
  }
};

const initialInterviewData = {
  squidward: defaultRoom
};

function reducer (interviewData = initialInterviewData, action) {
  const newInterviewData = Object.assign({}, interviewData);

  switch (action.type) {

    case ADD_ROOM:
      newInterviewData[action.room] = defaultRoom;
      break;

    case SET_TEXT:
      newInterviewData[action.room].editor.text = action.text;
      break;

    case SET_COORDINATES:
      newInterviewData[action.room].whiteboard.drawingHistory.push(action.lastDraw);
      break;

    default: return interviewData;

  }

  return newInterviewData;
}

/* ------------       DISPATCHERS     ------------------ */

module.exports = {
  addRoom,
  setText,
  setCoordinates,
  reducer
};
