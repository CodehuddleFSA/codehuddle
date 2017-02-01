// Required libraries
import React from 'react';

// Required files
import Canvas from '../Canvas';
import Editor from '../Editor';

/* -----------------    COMPONENT     ------------------ */

export const InterviewRoom = ({ AceEditor, onChange, text }) => {
  return (
    <div id="ir-root" className="animated fadeIn">
      <div className="row">
        <div id="ir-editor-col" className="col s12 m6 l6">
          <Editor />
        </div>
        <div id="ir-canvas-col" className="col s12 m6 l6">
          <Canvas />
        </div>
      </div>
    </div>
  );
};

/* -----------------    CONTAINER     ------------------ */

// Required libraries
import { connect } from 'react-redux';

const mapState = (state) => {
  return {
  };
};

const mapDispatch = (dispatch) => {
  return {
  };
};

export default connect(mapState, mapDispatch)(InterviewRoom);
