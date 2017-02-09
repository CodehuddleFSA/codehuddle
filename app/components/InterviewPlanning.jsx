import React from 'react';
import {connect} from 'react-redux';
import Immutable from 'immutable';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
const style = {
  margin: 12
};

// ----------------InterviewPlanning Container-------------- //

export class InterviewPlanning extends React.Component {
  constructor (props) {
    super(props);
    const {candidateName, candidateEmail, date, time, position} = props.selectedInterviewInfo;
    this.state = {
      candidateName,
      candidateEmail,
      interviewDate: date,
      interviewTime: time,
      position: position,
      selectedProblems: props.selectedInterviewProblems,
      showProblemSet: false
    };

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleChangeTimePicker24 = this.handleChangeTimePicker24.bind(this);
    this.handlePositionChange = this.handlePositionChange.bind(this);
    this.handleAddProblems = this.handleAddProblems.bind(this);
    this.handleOnLoad = this.handleOnLoad.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        candidateName: nextProps.selectedInterviewInfo.candidateName,
        candidateEmail: nextProps.selectedInterviewInfo.candidateEmail,
        interviewDate: new Date(nextProps.selectedInterviewInfo.date),
        interviewTime: new Date(nextProps.selectedInterviewInfo.date),
        position: nextProps.selectedInterviewInfo.position,
        selectedProblems: nextProps.selectedInterviewProblems,
        showProblemSet: false
      });
    }
  }

  handleOnLoad(data) {
    var interviewDateTimeArray = '';
    var interviewTimeArray = '';
    // if(this.props){
    // interviewDateTimeArray = this.props.selectedInterviewInfo.Date.split('T');
    // interviewTimeArray = interviewDateTimeArray[1].split('.');
    // interviewDate = interviewDateTimeArray[0];
    // interviewTime = interviewTimeArray[0];
    // }
  }

  handleDateChange(event, date) {
    this.setState({
      interviewDate: date
    });
  }

  handleChangeTimePicker24 (event, time) {
    this.setState({interviewTime: time});
  }

  handlePositionChange (event, position) {
    this.setState({position: position});
  }

  handleAddProblems (evt) {
    evt.preventDefault();
    this.setState({
      showProblemSet: true
    });
    this.props.receiveProblems(this.props.user.organization_name);
  }

  handleSaveInterview (evt) {
    evt.preventDefault();
    this.props.addInterview(this.state);
  }

  render () {
    this.handleOnLoad(this.props);
    return (
      <div>
        <AppBar title="Codehuddle"/> 
        <form>
          <label>Candidate Name: </label> 
          <TextField name="candidate_name" value={this.state.candidateName}/>
          <br />
          <label>Date: </label>
          <DatePicker hintText="Controlled Date Input" value={this.state.interviewDate} onChange={this.handleDateChange} />
          <label>Time: </label>
          <TimePicker format="24hr" hintText="24hr Format" value={this.state.interviewTime} onChange={this.handleChangeTimePicker24} />
          <label>Position: </label>
          <TextField name="position" hintText="Position" value={this.state.position} onChange={this.handlePositionChange}/>
          <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHeaderColumn>Name</TableHeaderColumn>
                      <TableHeaderColumn>Description</TableHeaderColumn>
                      <TableHeaderColumn>Difficulty</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                     {this.props.selectedInterviewProblems.map((p, i) =>
                    <TableRow>
                      <TableRowColumn>{p.name}</TableRowColumn>
                      <TableRowColumn>{p.description}</TableRowColumn>
                      <TableRowColumn>{p.difficulty}</TableRowColumn>
                    </TableRow>
                    )}
                  </TableBody>
                </Table> 
          <RaisedButton label="Add Problems" primary={true} style={style} onClick={this.handleAddProblems}/> 
          <RaisedButton label="Save Interview" primary={true} style={style} onClick={this.handleSaveInterview}/>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHeaderColumn>Name</TableHeaderColumn>
                      <TableHeaderColumn>Description</TableHeaderColumn>
                      <TableHeaderColumn>Difficulty</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                     {this.props.problems.map((p, i) =>
                    <TableRow>
                      <TableRowColumn>{p.name}</TableRowColumn>
                      <TableRowColumn>{p.description}</TableRowColumn>
                      <TableRowColumn>{p.difficulty}</TableRowColumn>
                    </TableRow>
                    )}
                  </TableBody>
                </Table>
        </form>
      </div>
    );
  }
}

/* -----------------    CONNECT CONTAINER     ------------------ */

import { receiveProblems, addInterview } from '../reducers/InterviewPlanning';

const mapStateToProps = state => {
  return {
    user: state.auth,
    selectedInterviewInfo: state.interview.interviewInfo.toJS(),
    selectedInterviewProblems: state.interview.interviewProblems.toJS(),
    problems: state.interviewPlanning.problems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    receiveProblems: organization => {
      dispatch(receiveProblems(organization));
    },
    addInterview: () => {
      dispatch(addInterview());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InterviewPlanning);
