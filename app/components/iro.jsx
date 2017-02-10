// Required libraries
import React from 'react';
import Toggle from 'material-ui/Toggle';
import Checkbox from 'material-ui/Checkbox';

/* -----------------    COMPONENT     ------------------ */

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};

export const Iro = ({ options, setOptions }) => {
  return (
    <div style={styles.block}>
      <Checkbox
        label="Linting / Coloring"
        style={styles.toggle}
        checked={ options.linting }
        onCheck={ setOptions }
      />
      <Checkbox
        label="Show Gutter"
        style={styles.toggle}
        checked={ options.showGutter }
        onCheck={ setOptions }
      />
      <Checkbox
        label="Text Size: Small / Large"
        style={styles.toggle}
        checked={ options.textSize }
        onCheck={ setOptions }
      />
      <Checkbox
        label="Theme: Light / Dark"
        style={styles.toggle}
        checked={ options.theme }
        onCheck={ setOptions }
      />
    </div>
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
      console.log('Event:', evt);
      console.log('Event.Target:', evt.target);
      dispatch(setOptions(parseEvt(evt)));
    }
  };
};

export default connect(mapState, mapDispatch)(Iro);
