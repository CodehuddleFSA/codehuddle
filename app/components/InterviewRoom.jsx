// Required libraries
import React from 'react';

// Required files
import Canvas from './Canvas';
import Editor from './Editor';

/* -----------------    COMPONENT     ------------------ */

export const InterviewRoom = ({ AceEditor, onChange, text }) => {
  return (
    <div>
      <Editor />
      <Canvas />
    </div>

  );
};

/* -----------------    CONTAINER     ------------------ */

// Required libraries
import {connect} from 'react-redux';

const mapState = (state) => {
  return {
  };
};

const mapDispatch = (dispatch) => {
  return {
  };
};

export default connect(mapState, mapDispatch)(InterviewRoom);
