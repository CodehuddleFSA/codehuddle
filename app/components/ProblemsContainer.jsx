import React from 'react';
import {connect} from 'react-redux';
import ProblemsList from './ProblemsList';
import {fetchOrganizationProblems, fetchUserProblems} from '../reducers/problems';

export default connect(
  state => ({
    problems: state.problems,
    user: state.auth
  }),
  {fetchOrganization: fetchOrganizationProblems, fetchUserProblems}
)(ProblemsList);
