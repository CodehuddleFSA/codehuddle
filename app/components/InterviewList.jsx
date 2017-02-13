// Required libraries
import React from 'react';

// Required files
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';


/* -----------------    COMPONENT     ------------------ */

export const InterviewList = ({ allInterviews }) => {
  return (
    <div>
      <Table selectable={ false }>
        <TableHeader
          displaySelectAll={ false }
          adjustForCheckbox={ false }
          >
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Date</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Position</TableHeaderColumn>
            <TableHeaderColumn>Status</TableHeaderColumn>
            <TableHeaderColumn></TableHeaderColumn>
            <TableHeaderColumn></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={ false }
          stripedRows={ false }
          >
          { allInterviews.map(interview => {
            return (
              <TableRow key={ interview.id }>
                <TableRowColumn>{ interview.id }</TableRowColumn>
                <TableRowColumn>{ interview.date && new Date(interview.date).toLocaleDateString() }</TableRowColumn>
                <TableRowColumn>{ interview.candidateName }</TableRowColumn> // TODO: change this to candidate name
                  <TableRowColumn>{ interview.position }</TableRowColumn>
                  <TableRowColumn>{ interview.status }</TableRowColumn>
                  <TableRowColumn>
                    <RaisedButton
                      href={`/interviewPlanning/${interview.id}`}
                      label="Details"
                      backgroundColor="#2196F3"
                      labelColor="white"
                      />
                  </TableRowColumn>
                  <TableRowColumn>
                    <RaisedButton
                      href={`/interviewRoom/${interview.authToken}?id=${interview.id}`}
                      label="Start"
                      backgroundColor="#66BB6A"
                      labelColor="white"
                      />
                  </TableRowColumn>
                </TableRow>
              )
            }) }
          </TableBody>
        </Table>
      </div>
    );
  };

  /* -----------------    CONTAINER     ------------------ */

  // Required libraries
  import { connect } from 'react-redux';

  // Required files

  // TODO: look for Immutable method instead of handing down a normal method
  const mapState = (state) => {
    return {
      allInterviews: state.allInterviews.toJS()
    };
  };

  const mapDispatch = (dispatch) => {
    return {
    };
  };

  export default connect(mapState, mapDispatch)(InterviewList);
