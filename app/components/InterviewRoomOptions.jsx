// Required libraries
import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';

/* -----------------    COMPONENT     ------------------ */

const styles = {
  block: {
    padding: 20,
    maxWidth: 250
  },
  checkbox: {
    marginBottom: 16
  }
};

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
            Linting / Coloring / Indentation
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
    // options: state.interview.editor.options
    options: state.interview.editor.get('options').toJS()
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
