
// Required libraries
import Immutable from 'immutable';

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

export const setOptions = options => ({
  type: SET_OPTIONS,
  meta: {
    remote: true
  },
  options
});

/* ------------       REDUCER     ------------------ */
const initialEditorData = Immutable.fromJS(
  {
    text: 'default text frontend',
    options: {
      linting: true,
      showGutter: true,
      textSize: false,
      theme: false
    }
  }
);

export default function reducer (editorData = initialEditorData, action) {
  let newEditorData = editorData;

  switch (action.type) {
    case SET_TEXT:
      newEditorData = newEditorData.setIn(['text'], action.text);
      break;

    case SET_OPTIONS:
      newEditorData = newEditorData.mergeIn(['options'], action.options);
      break;

    default: return editorData;

  }

  return newEditorData;
}

/* ------------       DISPATCHERS     ------------------ */

export const parseEvt = evt => {
  const status = {};
  status[evt.target.id] = evt.target.checked;
  return status;
};
