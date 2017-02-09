// Required libraries
import React from 'react';
import Toggle from 'material-ui/Toggle';

/* -----------------    COMPONENT     ------------------ */

const styles = {
  block: {
    maxWidth: 250
  },
  toggle: {
    marginBottom: 16
  },
  thumbOff: {
    backgroundColor: '#ffcccc'
  },
  trackOff: {
    backgroundColor: '#ff9d9d'
  },
  thumbSwitched: {
    backgroundColor: 'red'
  },
  trackSwitched: {
    backgroundColor: '#ff9d9d'
  },
  labelStyle: {
    color: 'red'
  }
};

export const iro2 = ({ options, setOptions }) => {
  return (
    <div style={styles.block}>
      <Toggle
        label="Linting / Coloring / Indentation"
        style={styles.toggle}
        toggled={ options.linting }
        onToggle={ setOptions }
      />
      <Toggle
        label="Gutter"
        style={styles.toggle}
        toggled={ options.showGutter }
        onToggle={ setOptions }
      />
      <Toggle
        label="Text Size: Small / Large"
        style={styles.toggle}
        toggled={ options.textSize }
        onToggle={ setOptions }
      />
      <Toggle
        label="Theme: Light / Dark"
        style={styles.toggle}
        toggled={ options.theme }
        onToggle={ setOptions }
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
      dispatch(setOptions(parseEvt(evt)));
    }
  };
};

export default connect(mapState, mapDispatch)(iro2);
