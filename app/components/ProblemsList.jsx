import React from 'react';

const Problem = props => {
  return (
    <div>
      <p>{props.name}</p>
    </div>
  );
}

export default props => {
  return (
    <div>
      {props.problems.map(problem => <Problem key={problem.id} name={problem.name}/>)}
    </div>
  );   
}
