// Required libraries
import React from 'react';

// Required files
import Canvas from '../Canvas';
import Editor from '../Editor';

/* -----------------    COMPONENT     ------------------ */

export const InterviewRoom = ({ AceEditor, onChange, text }) => {
  return (
    <div id="ir-root" className="container">
      <div className="row">
        <Editor />
        <Canvas />
      </div>
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
