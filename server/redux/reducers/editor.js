
/* -----------------    ACTIONS     ------------------ */
const SET_TEXT = 'SET_TEXT';

/* ------------   ACTION CREATORS     ------------------ */
const setText = text => ({
  type: SET_TEXT,
  text
}
);

/* ------------       REDUCER     ------------------ */
const initialEditorData = {
  spongebob: {
    text: 'default text'
  }
};

function reducer (editorData = initialEditorData, action) {
  const newEditorData = Object.assign({}, editorData);

  switch (action.type) {
    case SET_TEXT:
      newEditorData[action.room].text = action.text;
      break;

    default: return editorData;

  }

  return newEditorData;
}

/* ------------       DISPATCHERS     ------------------ */

module.exports = {
  setText,
  reducer
};
