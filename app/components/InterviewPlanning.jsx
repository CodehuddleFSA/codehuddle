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
import { blueGrey500 } from 'material-ui/styles/colors';

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
    this.state = {
      candidateName,
      candidateEmail,
      interviewDate: date,
      interviewTime: time,
      position: position,
      selectedProblems: props.selectedInterviewProblems,
      user: props.user,
      showOrganizationProblemSet: false

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
  }

  handleDateChange(event, date) {
    this.setState({
      interviewDate: date
    });
  }

  handleChangeTimePicker24 (event, time) {
    this.setState({
      interviewTime: time});
    }

    handlePositionChange (event, position) {
      this.setState({
        position: position});
      }

      handleRemoveProblem (i){
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
        evt.preventDefault();
        this.props.addInterview(this.state);
      }

      render () {
        return (
          <div>
            <AppBar
              title={ <a href="/">CodeHuddle</a> }
              titleStyle={{ fontFamily: 'Aldrich', textAlign: 'center' }}
              style={{ backgroundColor: blueGrey500 }}/>
            <div className="row">
              <div className="container">
                <div className="col-xs-12">
                  <h2>Interview Planning</h2>
                  <form>
                    <Card>
                      <CardTitle title="Interview details:" />
                      <CardText>

                        <Table>
                          <TableBody displayRowCheckbox = {false} >
                            <TableRow>
                              <TableRowColumn style = {{width: "250px"}}></TableRowColumn>
                              <TableRowColumn>
                                <Table>
                                  <TableBody displayRowCheckbox = {false} >
                                    <TableRow>
                                      <TableRowColumn style= {{margin: "10px"}}><label>Candidate Name: </label></TableRowColumn>
                                      <TableRowColumn><TextField hintText="Controlled Text Input" value={this.state.candidateName} onChange={this.handleNameChange}/></TableRowColumn>
                                    </TableRow>
                                    <TableRow>
                                      <TableRowColumn><label>Date: </label></TableRowColumn>
                                      <TableRowColumn><DatePicker hintText="Controlled Date Input" value={this.state.interviewDate} onChange={this.handleDateChange} /></TableRowColumn>
                                    </TableRow>
                                    <TableRow>
                                      <TableRowColumn><label>Time: </label></TableRowColumn>
                                      <TableRowColumn><TimePicker format="24hr" hintText="24hr Format" value={this.state.interviewTime} onChange={this.handleChangeTimePicker24} /></TableRowColumn>
                                    </TableRow>
                                    <TableRow>
                                      <TableRowColumn><label>Position: </label></TableRowColumn>
                                      <TableRowColumn><TextField hintText="Position" value={this.state.position} onChange={this.handlePositionChange}/></TableRowColumn>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </TableRowColumn>
                              <TableRowColumn style = {{width: "250px"}}></TableRowColumn>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardText>
                    </Card>

                    <Card style={{marginTop: "2rem"}}>
                      <CardTitle title="Problem set:" />
                      <CardText>
                        <Table height={this.state.height} fixedHeader={this.state.fixedHeader} fixedFooter={this.state.fixedFooter} selectable={this.state.selectable} multiSelectable={this.state.multiSelectable}>
                          <TableHeader
                            displaySelectAll={ false }
                            adjustForCheckbox={ false }>
                            <TableRow>
                              <TableHeaderColumn>Name</TableHeaderColumn>
                              <TableHeaderColumn>Description</TableHeaderColumn>
                              <TableHeaderColumn>Difficulty</TableHeaderColumn>
                              <TableHeaderColumn></TableHeaderColumn>
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
                      </CardText>
                      <CardActions>
                        <RaisedButton label="Add Problems" style={style} onClick={this.handleAddProblems} backgroundColor="#66BB6A" labelColor="white" />
                      </CardActions>
                    </Card>
                    <div className="center-content">
                      <RaisedButton label="Save Interview" style={style} onClick={this.handleSaveInterview} backgroundColor="#2196F3" labelColor="white" />
                      <RaisedButton label="Back to dashboard" style={style} href="/interviewerDashboard" backgroundColor="#2196F3" labelColor="white" />
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
              </div>
            </div>

          </div>
        );
      }
    }

    /* -----------------    CONNECT CONTAINER     ------------------ */

    import { receiveProblems, addInterview } from '../reducers/interviewPlanningInfo';

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
