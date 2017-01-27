
/* -----------------    ACTIONS     ------------------ */
const SET_TEXT = 'SET_TEXT';
const ADD_ROOM = 'ADD_ROOM';

/* ------------   ACTION CREATORS     ------------------ */
const setText = text => (
  {
    type: SET_TEXT,
    text
  }
);

const addRoom = room => ({
  type: ADD_ROOM,
  room
});

/* ------------       REDUCER     ------------------ */
const defaultRoom = {
  editor: {
    text: 'default text'
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
    // case SET_TEXT:
    //   newInterviewData[action.room].text = action.text;
    //   break;

    default: return interviewData;

  }

  return newInterviewData;
}

/* ------------       DISPATCHERS     ------------------ */

module.exports = {
  setText,
  addRoom,
  reducer
};
