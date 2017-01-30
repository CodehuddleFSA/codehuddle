
/* -----------------    ACTIONS     ------------------ */
const SET_TEXT = 'SET_TEXT';
const SET_OPTIONS = 'SET_OPTIONS';

/* ------------   ACTION CREATORS     ------------------ */
export const setText = text => ({
  type: SET_TEXT,
  meta: {
    remote: true
  },
  text });

export const setOptions = evt => ({
  type: SET_OPTIONS,
  meta: {
    remote: true
  }
  setting: {
    id: evt.target.id,
    value: evt.target.checked
  }
});

/* ------------       REDUCER     ------------------ */
const initialEditorData = {
  text: 'default text',
  options: { // TODO: immutable map
    linting: true,
    showGutter: true,
    textSize: false
  }
};

export default function reducer (editorData = initialEditorData, action) {
  const newEditorData = Object.assign({}, editorData);

  switch (action.type) {
    case SET_TEXT:
      newEditorData.text = action.text;
      break;

    case SET_OPTIONS: // TODO: use immutable here.
      newEditorData.options = Object.assign({}, editorData.options);
      newEditorData.options[action.setting.id] = action.setting.value;
      break;

    default: return editorData;

  }

  return newEditorData;
}

/* ------------       DISPATCHERS     ------------------ */
