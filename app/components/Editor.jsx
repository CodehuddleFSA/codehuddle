// Required libraries
import React from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/github';
import 'brace/theme/solarized_dark';
import 'brace/theme/tomorrow';
import 'brace/mode/plain_text';

/* -----------------    COMPONENT     ------------------ */

export const Editor = ({ AceEditor, onChange, text, options }) => {

  return (
    <AceEditor
      mode={ options.linting ? 'javascript' : 'plain_text' }
      theme="solarized_dark"
      name="myEditor"
      onChange={ onChange }
      value={ text }
      width="100%"
      height="500px"
      setOptions={{
        showGutter: options.showGutter,
        fontSize: options.textSize ? 24 : 18
      }}
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
    text: state.interview.editor.text,
    options: state.interview.editor.options
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
