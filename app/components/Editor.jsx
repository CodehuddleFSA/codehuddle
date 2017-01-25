// Required libraries
import React from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/github';
import 'brace/theme/solarized_dark';

/* -----------------    COMPONENT     ------------------ */

export const Editor = ({ AceEditor, onChange }) => {
  return (
    <AceEditor
      mode="javascript"
      theme="solarized_dark"
      name="myEditor"
      onChange={ onChange }
      />
  );
};

/* -----------------    CONTAINER     ------------------ */

// Required libraries
import {connect} from 'react-redux';

// Required filed
import { setText } from '../reducers/editor';

const mapState = (state) => {
  return {
    AceEditor
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
