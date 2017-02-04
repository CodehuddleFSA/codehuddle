// Required libraries
import React from 'react';
import AceEditor from 'react-ace';
import Rating from 'react-rating';

// Required files

const handleRate = rating => {
  console.log(rating);
};

/* -----------------    COMPONENT     ------------------ */

export const FeedbackCandidate = () => {
  return (
    <div>
      <h1>In candidate feedback</h1>
      <Rating onChange={ handleRate } />
    </div>
  );
};

/* -----------------    CONTAINER     ------------------ */

// Required libraries
import { connect } from 'react-redux';

// Required files

const mapState = (state) => {
  return {
  };
};

const mapDispatch = (dispatch) => {
  return {
  };
};

export default connect(mapState, mapDispatch)(FeedbackCandidate);
