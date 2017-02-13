// Required libraries
import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AppBar from 'material-ui/AppBar';
import { blueGrey500 } from 'material-ui/styles/colors';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';



// Required files
import InterviewList from './InterviewList';

/* -----------------    COMPONENT     ------------------ */

export const InterviewerDashboard = ({ interviewProblems, user, createInterviewAndRedirect }) => {
  return (
    <div>
      <AppBar
        title={ <a href="/">CodeHuddle</a> }
        titleStyle={{ fontFamily: 'Aldrich', textAlign: 'center' }}
        style={{ backgroundColor: blueGrey500 }}/>
      <div className="row">
        <div className="container">
          <div className="col-xs-12">


            <h2>Welcome, { user && user.name }!</h2>
            <Card>
              <CardTitle title="Your interviews:" />
              <CardText>
                <InterviewList />
              </CardText>
              <CardActions>
                <FloatingActionButton onClick={ createInterviewAndRedirect }>
                  <ContentAdd />
                </FloatingActionButton>
              </CardActions>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -----------------    CONTAINER     ------------------ */

// Required libraries
import { connect } from 'react-redux';

// Required files
import { createInterviewAndRedirect } from 'APP/app/reducers/interviewInfo';

const mapState = (state) => {
  return {
    user: state.auth,
    createInterviewAndRedirect: () => {
      createInterviewAndRedirect(state.auth.id);
    }
  };
};

const mapDispatch = (dispatch) => {
  return {
  };
};

export default connect(mapState, mapDispatch)(InterviewerDashboard);
