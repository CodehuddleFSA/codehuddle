const db = require('APP/db');

const organization = {
  name: 'ACME Corp'
};

const user = {
  name: 'Hobbes Johnston',
  email: 'hobbes@ACMECorp.com',
  password: '1234',
  organization_name: 'ACME Corp'
};

const problems = [{
  name: 'Breadth-first',
  description: 'Today you will write a series of iterator functions for trees. Each of these function will take a node of the tree and iterate through all other nodes. The difference between them is the order in which they iterate. Implement a breadth-first search for a binary tree.',
  difficulty: 'medium',
  organization_name: 'ACME Corp'
}, {
  name: 'Priority Queue',
  description: 'A priority queue is a data structure that takes with each piece of data a priority value and returns the data in order of priority. Implement a priority queue with 3 methods',
  difficulty: 'medium',
  organization_name: 'ACME Corp'
}];

const interviews = [
  {
    candidateName: 'Calvin',
    candidateEmail: 'calvin@gmail.com',
    interviewer_id: 1,
    date: '03/12/2017',
    position: 'Junior Developer',
    status: 'planned',
    candidateOverallRating: null,
    comments: ''
  }
];

const interviewProblems = [
  {
    problem_id: 1,
    interview_id: 1
  },
  {
    problem_id: 2,
    interview_id: 1
  }
]

const seedOrganization = () => db.model('organizations').create(organization);

const seedUser = () => db.model('users').create(user);

const seedProblems = () => db.Promise.map(problems, problem => db.model('problems').create(problem));

const seedInterviews = () => db.Promise.map(interviews, interview => db.model('interviews').create(interview));

const seedInterviewProblems = () => db.Promise.map(interviewProblems, interviewProblem => db.model('interviewProblems').create(interviewProblem));

db.didSync
  .then(() => db.sync({force: true}))
  .then(seedOrganization)
  .then(organization => console.log(`Seeded organizations OK`))
  .then(seedUser)
  .then(user => console.log(`Seeded users OK`))
  .then(seedProblems)
  .then(problems => console.log(`Seeded ${problems.length} problems OK`))
  .then(seedInterviews)
  .then(interviews => console.log(`Seeded ${interviews.length} interviews OK`))
  .then(seedInterviewProblems)
  .then(interviewProblems => console.log(`Seeded ${interviewProblems.length} interviewProblems OK`))
  .catch(error => console.error(error))
  .finally(() => db.close());
