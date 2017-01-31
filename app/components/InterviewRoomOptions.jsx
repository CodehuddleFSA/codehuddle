// Required libraries
import React from 'react';

/* -----------------    COMPONENT     ------------------ */

export const InterviewRoomOptions = ({ options, setOptions }) => {
  return (
    <form>
      <fieldset>
        <div className="switch">
          <label>
            <input type="checkbox" id="linting"
              checked={ options.linting }
              onChange={ setOptions }
            />
            <span className="lever"></span>
            Auto: Linting / Coloring / Indentation
          </label>
        </div>
        <div className="switch">
          <label>
            <input type="checkbox" id="showGutter"
              checked={ options.showGutter }
              onChange={ setOptions }
            />
            <span className="lever"></span>
            Gutter
          </label>
        </div>
        <div className="switch">
          <label>
            <input type="checkbox" id="textSize"
              checked={ options.textSize }
              onChange={ setOptions }
            />
            <span className="lever"></span>
            Text Size: Small / Large
          </label>
        </div>
        <div className="switch">
          <label>
            <input type="checkbox" id="theme"
              checked={ options.theme }
              onChange={ setOptions }
            />
            <span className="lever"></span>
            Theme: Light / Dark
          </label>
        </div>
      </fieldset>
    </form>
  );
};

/* -----------------    CONTAINER     ------------------ */

// Required libraries
import { connect } from 'react-redux';

// Required files
import { setOptions, parseEvt } from '../reducers/editor';

const mapState = (state) => {
  return {
    options: state.interview.editor.options
    // linting: state.interview.editor.options.linting
  };
};

const mapDispatch = (dispatch) => {
  return {
    setOptions: (evt) => {
      dispatch(setOptions(parseEvt(evt)));
    }
  };
};

export default connect(mapState, mapDispatch)(InterviewRoomOptions);
