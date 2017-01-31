const db = require('APP/db')

const seedUsers = () => db.Promise.map([
  {name: 'so many', email: 'god@example.com', password: '1234'},
  {name: 'Barack Obama', email: 'barack@example.gov', password: '1234'}
], user => db.model('users').create(user));

const seedInterviews = () => db.Promise.map([
  {candidate: 'Amrom', interviewer: 'Andrew', date: '12-11-17 23:20'}
], interview => db.model('interviews').create(interview));

db.didSync
  .then(() => db.sync({force: true}))
  .then(seedUsers)
  .then(seedInterviews)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .catch(error => console.error(error))    
  .finally(() => db.close())
