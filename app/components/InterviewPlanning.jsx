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
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ActionDelete from 'material-ui/svg-icons/action/delete';
const style = {
  margin: 12,
};
const removeButtonStyle = {
  marginRight: 20
};


// ----------------InterviewPlanning Container-------------- //

export class InterviewPlanning extends React.Component {
  constructor (props) {
    super(props);
    const {candidateName, candidateEmail, date, time, position} = props.selectedInterviewInfo;
    let changeableProblemSet = props.selectedInterviewProblems;
    this.today = new Date();
    this.state = {
      candidateName,
      candidateEmail,
      interviewDate: date,
      interviewTime: time,
      position: position,
      selectedProblems: props.selectedInterviewProblems,
      user: props.user,
      showOrganizationProblemSet: false,
      saveInterview: null

    };

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleChangeTimePicker24 = this.handleChangeTimePicker24.bind(this);
    this.handlePositionChange = this.handlePositionChange.bind(this);
    this.handleAddProblems = this.handleAddProblems.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleRemoveProblem = this.handleRemoveProblem.bind(this);
    this.handleAddProblemToInterview = this.handleAddProblemToInterview.bind(this);
    this.handleOrganizationProblemSetClose = this.handleOrganizationProblemSetClose.bind(this);
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
        user: nextProps.user,
        saveInterview: nextProps.saveInterview,
        height: '200px',
        fixedHeader: true,
        fixedFooter: true,
        stripedRows: false,
        showRowHover: false,
        selectable: true,
        multiSelectable: false,
        enableSelectAll: false,
        deselectOnClickaway: true,
        showCheckboxes: true,
      });
    }
  }

  handleNameChange(event, name) {
    this.setState({
      candidateName: name
    });
    this.props.addCandidateNameToInterview({candidateName: name}, this.props.selectedInterviewInfo.id);
  }

  handleDateChange(event, date) {
    const updatedDate = new Date(date.toDateString() + " " + this.state.interviewTime.toTimeString());
    this.setState({
      interviewDate: updatedDate
    });
    this.props.addDateToInterview({date: updatedDate}, this.props.selectedInterviewInfo.id);
  }

  handleChangeTimePicker24 (event, time) {
    const date = new Date(this.state.interviewDate.toDateString() + " " + time.toTimeString());  
    this.setState({
      interviewTime: date
    });
    this.props.addTimeToInterview({date: date}, this.props.selectedInterviewInfo.id);
  }

  handlePositionChange (event, position) {
    this.setState({
      position: position
    });
    this.props.addPositionToInterview({position: position}, this.props.selectedInterviewInfo.id);
  }

  handleRemoveProblem (i){
    this.props.removeProblemFromInterview(this.state.selectedProblems[i].id, this.props.selectedInterviewInfo.id);
    let tempProblem = this.state.selectedProblems.splice(i, 1);
    this.setState({
      selectedProblems: this.state.selectedProblems
    });
  }

  handleAddProblemToInterview (j){
    this.state.selectedProblems.push(this.props.problems[j]);
    this.setState({
      selectedProblems: this.state.selectedProblems
    });
    this.props.addProblemToInterview({problemId: this.props.problems[j].id}, this.props.selectedInterviewInfo.id);
  }

  handleOrganizationProblemSetClose() {
    this.setState({
      showOrganizationProblemSet: false
    });
  }

  handleAddProblems (evt) {
    evt.preventDefault();
    this.setState({
      showOrganizationProblemSet: true
    });
    this.props.receiveProblems(this.props.user.organization_name);
  }

  handleSaveInterview (evt) {
    this.props.saveInterview(data, this.props.selectedInterviewInfo.id, this.props.user.id);
  }

  render () {
    return (
      <div>
        <AppBar title={`Codehuddle`}/> 
        <form>
        <div style={{marginLeft: "350px"}}>
        <label>Candidate Name </label>
        <span style={{marginLeft: "80px"}}> </span>
        <TextField id="name" value={this.state.candidateName || null} onChange={this.handleNameChange}/>
        <br />
        <label>Interview Date</label>
        <DatePicker style={{display: "inline", marginLeft: "100px"}} id="date" hintText="Controlled Date Input" value={this.state.interviewDate || this.today} onChange={this.handleDateChange}/>
        <br />
        <label>Interview Time</label>
        <TimePicker style={{display: "inline", marginLeft: "100px"}} id="time" format="24hr" hintText="24hr Format" value={this.state.interviewTime || null} onChange={this.handleChangeTimePicker24}/>
        <br />
        <label>Position</label>
        <span style={{marginLeft: "140px"}}> </span>
        <TextField id="position" hintText="Position" value={this.state.position || null} onChange={this.handlePositionChange }/>
        </div>
          <hr />
          <Table height={this.state.height} fixedHeader={this.state.fixedHeader} fixedFooter={this.state.fixedFooter} selectable={this.state.selectable} multiSelectable={this.state.multiSelectable}>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Description</TableHeaderColumn>
                <TableHeaderColumn>Difficulty</TableHeaderColumn>
                <TableHeaderColumn>Remove</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox = {false}>
              {this.state.selectedProblems.map((p, i) =>
              <TableRow key={i}>
                <TableRowColumn>{p.name}</TableRowColumn>
                <TableRowColumn>{p.description}</TableRowColumn>
                <TableRowColumn>{p.difficulty}</TableRowColumn>
                <TableRowColumn><FloatingActionButton mini={true} secondary={true} style={removeButtonStyle} onClick={() => this.handleRemoveProblem(i)}><ActionDelete/></FloatingActionButton></TableRowColumn>
              </TableRow>
              )}
            </TableBody>
          </Table> 
          <div style={{marginLeft: "400px"}}>
            <RaisedButton label="Add Problems" primary={true} style={style} onClick={this.handleAddProblems}/>
            <RaisedButton label="Save Interview" primary={true} style={style} onClick={this.handleSaveInterview}/>
          </div>
        <Dialog title="Organization Problems" actions={[<FlatButton label="Done" primary={true} onTouchTap={this.handleOrganizationProblemSetClose}/>]} 
          modal={false} open={this.state.showOrganizationProblemSet} onRequestClose={this.handleOrganizationProblemSetClose} autoScrollBodyContent={true}>
          <Table>
            <TableBody displayRowCheckbox = {false}>
              {this.props.problems.map((q, j) =>
              <TableRow key={q.id}>
                <TableRowColumn>{q.name}</TableRowColumn>
                <TableRowColumn>{q.description}</TableRowColumn>
                <TableRowColumn>{q.difficulty}</TableRowColumn>
                <TableRowColumn><FloatingActionButton mini={true} style={style} onClick={() => this.handleAddProblemToInterview(j)}><ContentAdd /></FloatingActionButton></TableRowColumn>
              </TableRow>
              )}
            </TableBody>
          </Table>
        </Dialog>
      </form>
    </div>
    );
  }
}

/* -----------------    CONNECT CONTAINER     ------------------ */

import { receiveProblems, addInterview, addProblemToInterview, removeProblemFromInterview, saveInterview, addCandidateNameToInterview, addPositionToInterview, addDateToInterview, addTimeToInterview} from '../reducers/interviewPlanningInfo';

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
    saveInterview: (data, interviewId, userId) => {
      dispatch(saveInterview(data, interviewId, userId));
    },
    addProblemToInterview: (data, interviewId) => {
      dispatch(addProblemToInterview(data, interviewId));
    },
    removeProblemFromInterview: (problemId, interviewId) => {
      dispatch(removeProblemFromInterview(problemId, interviewId));
    },
    addCandidateNameToInterview: (data, interviewId) => {
      dispatch(addCandidateNameToInterview(data, interviewId));
    },
    addPositionToInterview: (data, interviewId) => {
      dispatch(addPositionToInterview(data, interviewId));
    },
    addDateToInterview: (data, interviewId) => {
      dispatch(addDateToInterview(data, interviewId));
    },
    addTimeToInterview: (data, interviewId) => {
      dispatch(addTimeToInterview(data, interviewId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InterviewPlanning);
