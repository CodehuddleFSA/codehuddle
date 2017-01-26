
/* -----------------    ACTIONS     ------------------ */
const SET_TEXT = 'SET_TEXT';

/* ------------   ACTION CREATORS     ------------------ */
export const setText = text => ({
  type: SET_TEXT,
  meta: {
    remote: true
  },
  text });

/* ------------       REDUCER     ------------------ */
const initialEditorData = {
  text: 'default text'
};

export default function reducer (editorData = initialEditorData, action) {
  const newEditorData = Object.assign({}, editorData);

  switch (action.type) {
    case SET_TEXT:
      newEditorData.text = action.text;
      break;

    default: return editorData;

  }

  return newEditorData;
}

/* ------------       DISPATCHERS     ------------------ */
