import React from 'react';
import {connect} from 'react-redux';
import {Card, CardHeader, CardText, Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn, DropDownMenu, MenuItem, Divider, GridTile, GridList, Subheader} from 'material-ui';

// fetchProblems(interviewID)
const PROBLEM_SET_HEIGHT = '75px';

// ------------------- DUMB COMPONENTS ------------------------ //
const Problem = (props) => {
  console.log('in Problem, props are ', props);
  const prob = props.problems[props.currentProblem];
  return (
    <Card>
      <CardHeader
        style={{textAlign: 'center'}}
        title={prob.name}
      />
      <CardText >
        <p><b>Description</b></p>
        <p>{prob.description}</p>
        <p><b>Solution(s)</b></p>
        {prob.solutions.map((s, i) =>
          <div key={i}div style ={{display: 'flex', flexWrap: 'wrap'}}>
            <p>Solution {i + 1 }</p>
            <pre>{s.code}</pre>
            <p>BigO: {s.bigO}</p>
          </div>
        )}
      </CardText>
    </Card>
  );
};

// style={{padding: '5%', borderStyle: 'solid', borderWidth: 'medium', borderColor: '#EEEEEE'}}
export const ProblemSet = (props) => {
  console.log('props are: ', props);
  return (
    <Card>
        <CardHeader
          style={{textAlign: 'center'}}
          title="Interview Problem Set"
        />
        <CardText >
          <Table className='problem-list'
            height={props.height}
            fixedHeader={true}
            selectable={true}
            multiSelectable={false}
            onRowSelection={props._onRowSelection}
          >
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn className="row-order">Order</TableHeaderColumn>
                <TableHeaderColumn className="row-name">Name</TableHeaderColumn>
                <TableHeaderColumn className="row-difficulty">Difficulty</TableHeaderColumn>
                <TableHeaderColumn className="row-status">Status</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox = {false} showRowHover={true}
            >
              {props.problems.map((p, i) =>
                <TableRow key={i} value={p} selected={i === props.currentProblem}>
                  <TableRowColumn className="row-order">{i + 1}</TableRowColumn>
                  <TableRowColumn className="row-name">{p.name}</TableRowColumn>
                  <TableRowColumn className="row-difficulty">{p.difficulty}</TableRowColumn>
                  <TableRowColumn className="row-status">
                    <DropDownMenu value={p.interviewProblems.status} onChange={props.onStatusChange}>
                      <MenuItem value={'planned'} primaryText="Planned" />
                      <MenuItem value={'completed'} primaryText="Completed" />
                    </DropDownMenu>
                  </TableRowColumn>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardText>
      </Card>
  );
};

// --------------- Display/Edit Problem CONTAINER COMPONENT -------------- //

export class ProblemContainer extends React.Component {
  constructor (props) {
    super(props);
    this.currentProblem = 0;
    this.onRowSelection = this.onRowSelection.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
  }
  // componentDidMount () {
  //   // or onEnter ?? load problems for organization
  // }

  onRowSelection (keys) {
    console.log('in select row, got ', keys);
    // console.log(key, this.props.problems[key]);
    // this.setState({currentProblem: key});
  }

  onStatusChange (event, index, status) {
    console.log('In onStatus change, status: ', status);
  }

  render () {
    let problems = this.props.interviewProblems;
    console.log('in Container render props are ', this.props);
    console.log('problems are  ', problems);
    let show = (problems.length !== 0);
    return (
    <section className="row row-padding">
      <div className="container">
        <div className="col-xs-12 col-lg-6">
          <ProblemSet problems={problems}
          onRowSelection={this.onRowSelection}
          onCellClick={this.onRowSelection}
          onStatusChange={this.onStatusChange}
          currentProblem={this.currentProblem}
          />
        </div>
        <div className="col-xs-12 col-lg-6">
          {show && <Problem problems={problems} currentProblem={this.currentProblem} />}
        </div>
      </div>
    </section>
    );
  }
}

// -----------------    CONNECT CONTAINER     ------------------ //

const mapStateToProps = (state) => {
  const foo = {
    interviewProblems: state.interview.interviewProblems.toJS()
  };
  console.log('in stateToProps, props ', foo);
  return foo;
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProblemContainer);
