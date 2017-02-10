// Required libraries
import React from 'react';

// Required files
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
// import Refresh from 'material-ui/svg-icons/navigation/refresh';
import Close from 'material-ui/svg-icons/navigation/close';
import AlertError from 'material-ui/svg-icons/alert/error';
import Gesture from 'material-ui/svg-icons/content/gesture';

import WhiteboardContainer from '../WhiteboardContainer';
import Editor from '../Editor';
import InterviewRoomOptions from '../InterviewRoomOptions';
import ProblemContainer from '../ShowProblemSet';


/* -----------------    COMPONENT     ------------------ */

export class InterviewRoom extends React.Component {
  constructor (props) {
    super(props);
    this.iconStyles = {
      marginRight: 24,
      marginTop: 10
    };
    this.WBStyles = {
      width: '50%'
    };
    this.state = {
      open: false,
      WBOpen: false
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleWBOpen = this.handleWBOpen.bind(this);
    this.handleWBClose = this.handleWBClose.bind(this);
    this.onRowSelection = this.onRowSelection.bind(this);
  }

  handleOpen () {
    this.setState({ open: !this.state.open, WBOpen: false });
  }
  handleClose () {
    this.setState({ open: false });
  }
  handleWBOpen () {
    this.setState({ open: false, WBOpen: !this.state.WBOpen });
  }
  handleWBClose () {
    this.setState({ open: false, WBOpen: false });
  }

  onRowSelection (key) {
    console.log(key, this.props.problems[key]);
    this.currentProblem = key;
  }

  render () {
    let plannedInterview = !!(this.props.auth && this.props.interviewId);
    console.log('in InterviewRoom, plannedInterview is ', plannedInterview);
    console.log('in InterviewRoom, auth is  ', this.props.auth);
    console.log('in InterviewRoom, id is  ', this.props.interviewId);
    return (
      <div id="ir-root" className="animated fadeIn">
        <AppBar
          title={ <a href="/">CodeHuddle</a> }
          iconElementLeft={ <IconButton><Menu onTouchTap={ this.handleOpen }/></IconButton> }
          iconElementRight={ <IconButton><Gesture onTouchTap={ this.handleWBOpen } style={ this.iconStyles }/></IconButton> }/>
      {/* Left Side Drawer */}
        <Drawer
          open={ this.state.open }
          width={ 250 }
          docked={ false }
          onRequestChange={(open) => this.setState({open})}>
          <IconButton><Close onTouchTap={ this.handleClose }/></IconButton>
          <InterviewRoomOptions />
        </Drawer>
      {/* Right Side Drawer */}
        <Drawer
          open={ this.state.WBOpen }
          openSecondary={ true }
          docked={ true }
          width={ 650 }>
          <WhiteboardContainer handleClose={this.handleWBClose}/>
        </Drawer>
      {/* Page Content */}
        <div id="ir-content">
          <div className="row">
            <div className="col-xs-12 col-md-7 no-gutter">
              <Editor/>
            </div>
            <div className="col-xs-12 col-md-5 no-gutter">
              <ProblemContainer problems={this.problems}/>
            </div>
          </div>

        </div>

    </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

// Required libraries
import { connect } from 'react-redux';

const mapState = (state, ownProps) => {
  return {
    auth: state.auth,
    interviewId: (ownProps.location.query && +ownProps.location.query.id) || null,
    problems: state.interview.interviewProblems
  };
};

const mapDispatch = (dispatch) => {
  return {
  };
};

export default connect(mapState, mapDispatch)(InterviewRoom);
