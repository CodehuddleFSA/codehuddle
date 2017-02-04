// Required libraries
import React from 'react';
import Rating from 'react-rating';

// Required files
import RateProblem from './RateProblem';

const handleRate = rating => {
  console.log(rating);
};

/* -----------------    COMPONENT     ------------------ */

export const FeedbackCandidate = ({ problems }) => {
  return (
    <div>
      <h1>In candidate feedback</h1>
      {
        problems.map((problem, idx) => {
          const { problem_id, interview_id } = problem.interviewProblems;
          return (
              <RateProblem
                problemID={ +problem_id }
                interviewID={ +interview_id }
                key={ idx }
                />
          );
        })
      }
    </div>
  );
};

/* -----------------    CONTAINER     ------------------ */

// Required libraries
import { connect } from 'react-redux';

// Required files

const mapState = (state) => {
  return {
    problems: state.interview.problems.toJS()
  };
};

const mapDispatch = (dispatch) => {
  return {
  };
};

export default connect(mapState, mapDispatch)(FeedbackCandidate);
