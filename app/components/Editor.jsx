// Required libraries
import React from 'react';
import AceEditor from './AceEditor';

import 'brace/mode/javascript';
import 'brace/theme/github';
import 'brace/theme/solarized_dark';
import 'brace/theme/tomorrow';
import 'brace/theme/clouds';
import 'brace/mode/plain_text';

function objToArray (obj) {
  const output = [];
  Object.keys(obj).forEach(key => {
    output.push(obj[key]);
  })
  return output;
}

/* -----------------    COMPONENT     ------------------ */

export const Editor = ({ AceEditor, onChange, text, options, ranges }) => {
  return (
    <AceEditor
      mode={ options.linting ? 'javascript' : 'plain_text' }
      theme={ options.theme ? 'solarized_dark' : 'clouds' }
      name="myEditor"
      onChange={ onChange }
      value={ text }
      width="100%"
      height="100vh"
      setOptions={{
        showGutter: options.showGutter,
        fontSize: options.textSize ? 24 : 18
      }}
      editorProps={{
        autoScrollEditorIntoView: false,
        $blockScrolling: Infinity
      }}
      markers={objToArray(ranges)}
    />
  );
};

/* -----------------    CONTAINER     ------------------ */

// Required libraries
import {connect} from 'react-redux';

// Required files
import { setText } from '../reducers/editor';

const mapState = (state) => {
  return {
    AceEditor,
    text: state.interview.editor.get('text'),
    options: state.interview.editor.get('options').toJS(),
    ranges: state.interview.editor.get('ranges').toJS()
  };
};

const mapDispatch = (dispatch) => {
  return {
    onChange: (text) => {
      dispatch(setText(text));
    }
  };
};

export default connect(mapState, mapDispatch)(Editor);
