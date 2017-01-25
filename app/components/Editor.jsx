import React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/github';
import 'brace/theme/solarized_dark';

const onChange = (text) => console.log('changing', text);
const theme = 'solarized_dark';

export const Editor = ({ AceEditor, theme }) => {
  return (
    <AceEditor
      mode="javascript"
      theme={ theme }
      name="myEditor"
      onChange={ onChange }
    />
  );
};

import {connect} from 'react-redux';

export default connect(
  state => ({
    AceEditor,
    theme
  }),
  {},
)(Editor);
