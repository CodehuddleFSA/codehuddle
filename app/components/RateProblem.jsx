// Required libraries
import React from 'react';
import Rating from 'react-rating';

// Required files

const handleRate = rating => {
  console.log(rating);
};

/* -----------------    COMPONENT     ------------------ */

export const RateProblem = ({ problemID, interviewID, handleRate }) => {
  return (
    <div>
      <h4>{ problemID }, { interviewID}</h4>
      <Rating onChange={ handleRate } />
    </div>
  );
};

/* -----------------    CONTAINER     ------------------ */

// Required libraries
import { connect } from 'react-redux';

// Required files
import { setCandidateRating } from 'APP/app/reducers/problems';

const mapState = (state, ownProps) => {
  return {
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleRate: rating => {
      setCandidateRating(ownProps.interviewID, ownProps.problemID, rating);
    }
  };
};

export default connect(mapState, mapDispatch)(RateProblem);
