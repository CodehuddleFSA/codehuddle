// Required libraries
import React from 'react';
import AceEditor from './AceEditor';

import 'brace/mode/javascript';
import 'brace/theme/github';
import 'brace/theme/solarized_dark';
import 'brace/theme/tomorrow';
import 'brace/theme/clouds';
import 'brace/mode/plain_text';

/* -----------------    COMPONENT     ------------------ */

const editorProps = {
  autoScrollEditorIntoView: false,
  $blockScrolling: Infinity
}

export const Editor = ({ onChange, text, options, ranges, setRange, onChangeSelection }) => {
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
      editorProps={ editorProps }
      onChangeSelection={ onChangeSelection }
      markers={Object.values(ranges)}
    />
  );
};

/* -----------------    CONTAINER     ------------------ */

// Required libraries 
import {connect} from 'react-redux';

// Required files
import { setText } from '../reducers/editor';
import { setRange } from 'APP/app/reducers/editor';

const mapState = (state) => {
  return {
    text: state.interview.editor.get('text'),
    options: state.interview.editor.get('options').toJS(),
    ranges: state.interview.editor.get('ranges').toJS()
  };
};

const mapDispatch = (dispatch) => {
  return {
    onChange: text => {
      dispatch(setText(text));
    },
    setRange: range => {
      dispatch(setRange(range));
    },
    onChangeSelection: editor => {
      if (editor.$mouseHandler.isMousePressed) {
        const currentRange = editor.selection.getRange();

        const parsedRange = {
          start: currentRange.start,
          end: currentRange.end
        };

        dispatch(setRange(parsedRange));
      }
    }
  };
};

export default connect(mapState, mapDispatch)(Editor);
