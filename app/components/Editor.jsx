// Required libraries
import React from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/github';
import 'brace/theme/solarized_dark';

/* -----------------    COMPONENT     ------------------ */

const onChange = (text) => console.log('changing', text);

export const Editor = ({ AceEditor }) => {
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

const mapState = (state) => {
  return {
    AceEditor
  };
};

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Editor);
