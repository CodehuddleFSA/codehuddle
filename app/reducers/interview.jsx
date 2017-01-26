import editor from './editor';

/* -----------------    ACTIONS     ------------------ */

/* ------------   ACTION CREATORS     ------------------ */

/* ------------       REDUCER     ------------------ */
const initialEditorData = {
  editor: editor(),
  
};

export default function reducer (intervewData = initialEditorData, action) {
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
