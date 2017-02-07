import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */
const RECEIVE_PROBLEMS = 'RECEIVE_PROBLEMS';
const ADD_PROBLEM_SUCCESS = 'ADD_PROBLEM_SUCCESS';
const DELETE_PROBLEM = 'DELETE_PROBLEM';

/* ------------   ACTION CREATORS     ------------------ */
const receiveProblems = problems => ({type: RECEIVE_PROBLEMS, problems: problems});

const deleteProblemSuccess = problemId => ({type: DELETE_PROBLEM, problemId});

/* ------------       REDUCER     ------------------ */

export default function(state = [], action) {
  switch(action.type) {
    case RECEIVE_PROBLEMS:
      return action.problems; 
    case ADD_PROBLEM_SUCCESS:
      return [...state, action.problem]; 
    case DELETE_PROBLEM: 
      return state.filter(problem => problem.id !== action.problemId);
    default: 
      return state;
  }
};

/* ------------       DISPATCHERS     ------------------ */

// use growl for error handling

export const fetchOrganizationProblems = orgName => 
  dispatch => 
    axios.get(`/api/organizations/${orgName}/problems`)
    .then(response => response.data)
    .then(problems => dispatch(receiveProblems(problems)))
    .catch(console.error);

export const fetchUserProblems = userId => 
  dispatch => 
    axios.get(`/api/users/${userId}/problems`)
    .then(problems => dispatch(receiveProblems(problems)))
    .catch(console.error);

export const addProblem = problem => 
  dispatch => 
    axios.post(`/api/problems`, problem)
    .then(problem => dispatch({type: ADD_PROBLEM_SUCCESS, problem}))
    .catch(console.error);

export const deleteProblem = problemId => 
  dispatch => 
    axios.delete(`/api/problems/${problemId}`)
    .then(() => dispatch(deleteProblemSuccess(problemId)))
    .catch(console.error);
