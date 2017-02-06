import React from 'react';
import {connect} from 'react-redux';
import Immutable from 'immutable';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';
const style = {
  margin: 12,
};


// ----------------Whiteboard Container-------------- //

export class InterviewPlanning extends React.Component {
  constructor (props) {
    
    super(props);
    this.state = {
      interviewDate: null,
      interviewTime: null,
      position: ''
    };
    console.log("the user is: ", this.props.user);
  }

  handleChange = (event, date) => {
    this.setState({
      interviewDate: date,
    });
  };

  handleChangeTimePicker24 = (event, time) => {
    this.setState({interviewTime: time});
  };

  handlePositionChange = (event, position) => {
    this.setState({position: position});
  };

  handleSubmit (evt) {
    evt.preventDefault();
  }
  render () {
    return (
      <div>
      <AppBar title="Codehuddle"/> 
      <form>
      <label>Candidate Name: </label> 
      <TextField hintText="First Name"/>
      <TextField hintText="Last Name"/>
      <br />
      <label>Date: </label>
      <DatePicker hintText="Controlled Date Input" value={this.state.interviewDate} onChange={this.handleChange} />
      <label>Time: </label>
      <TimePicker format="24hr" hintText="24hr Format" value={this.state.interviewTime} onChange={this.handleChangeTimePicker24} />
      <label>Position: </label>
      <TextField hintText="Position" value={this.state.position} onChange={this.handlePositionChange}/>
      <RaisedButton label="Submit" primary={true} style={style} />
        
      </form>
    </div>
    );
  }
}

/* -----------------    CONNECT CONTAINER     ------------------ */

import { addInterview } from '../reducers/InterviewPlanning';

const mapStateToProps = state => {
  return {
    user: state.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
    }
  };


export default connect(mapStateToProps, mapDispatchToProps)(InterviewPlanning);
