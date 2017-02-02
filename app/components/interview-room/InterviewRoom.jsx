// Required libraries
import React from 'react';

// Required files
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
// import Refresh from 'material-ui/svg-icons/navigation/refresh';
import Close from 'material-ui/svg-icons/navigation/close';

import Whiteboard from '../Whiteboard';
import Editor from '../Editor';
import InterviewRoomOptions from '../InterviewRoomOptions';
import AlertError from 'material-ui/svg-icons/alert/error';
import Gesture from 'material-ui/svg-icons/content/gesture';


/* -----------------    COMPONENT     ------------------ */

export class InterviewRoom extends React.Component {
  constructor(props) {
    super(props);
    this.iconStyles = {
      marginRight: 24,
      marginTop: 10
    };
    this.state = {
      open: false
    };
    this.handleTouch = this.handleTouch.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleTouch() {
    this.setState({ open: !this.state.open });
  }
  handleClose() {
    this.setState({ open: false });
  }
  
  render() {
    return (
      <div id="ir-root" className="animated fadeIn">
        <AppBar
          title={ <a href="/">CodeHuddle</a> }
          iconElementLeft={ <IconButton><Menu onTouchTap={ this.handleTouch }/></IconButton> }
          iconElementRight={ <IconButton><Gesture onTouchTap={ this.handleTouch } style={ this.iconStyles }/></IconButton> }
          />
        <Drawer open={ this.state.open }
                width={ 200 }
                docked={ false }
                onRequestChange={(open) => this.setState({open})}
                >
          <IconButton><Close onTouchTap={ this.handleClose }/></IconButton>
          <InterviewRoomOptions/>
        </Drawer>
        <Drawer
          width={ 400 }
          openSecondary={ true }
        >
          <Whiteboard/>
        </Drawer>

        <div id="ir-content">
          <Editor/>
        </div>
    </div>
    );
  }
}

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
