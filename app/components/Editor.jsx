import React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/github';

const onChange = (text) => console.log('changing', text);

export const Editor = ({ AceEditor }) => {
  return (
    <AceEditor
      mode="javascript"
      theme="github"
      name="myEditor"
      onChange={ onChange }
    />
  );
};

import {connect} from 'react-redux';

export default connect(
  state => ({
    AceEditor
  }),
  {},
)(Editor);
