const request = require('supertest');
const {expect} = require('chai');
const User = require('APP/db/models/user');
const Problem = require('APP/db/models/problem');
const app = require('./start');

describe('users router', () => {
  let userWithProblems;
  before(() => {
    let problems = [
      {name: 'Subset Sum', difficulty: 'hard'},
      {name: 'Intersection of Array', difficulty: 'medium'}
    ];
    return User.create({
      name: 'Dan',
      email: 'dan@test.com',
      password: '1234',
      company_name: 'Facebook',
      problems: problems
    }, {
      include: [Problem]
    })
    .then(user => {
      userWithProblems = user;
    });
  });

  const alice = {name: 'Alice', email: 'alice@test.org', password: '12345', company_name: 'Google'};

  let createdUser;

  describe('POST /api/users', () => {
    it('creates a new user', () =>
      request(app)
      .post('/api/users')
      .send(alice)
      .expect(201)
      .then(res => {
        createdUser = res.body
      })
    );
  });

  describe('GET /api/users/:userId', () => {
    it('returns user by ID', () =>
      request(app)
      .get(`/api/users/${userWithProblems.id}`)
      .expect(200)
      .then(res => {
        expect(res.body.name).to.equal(userWithProblems.name)
      })
    );
  });

  describe('PUT /api/users/:userId', () => {
    it('updates user', () => 
      request(app)
      .put(`/api/users/${createdUser.id}`)
      .send({name: 'Jane'})
      .expect(200)
      .then(res => expect(res.body.name).to.equal('Jane'))
    );
  });

  describe('DELETE /api/users/:userId', () => {
    it('deletes user', () => 
      request(app)
      .delete(`/api/users/${createdUser.id}`)
      .expect(204)
    );
  });

  describe('GET /api/users/:userId/problems', () => {
    it('get all problems for given user', () => 
      request(app)
      .get(`/api/users/${userWithProblems.id}/problems`)
      .expect(200)
      .then(res => {
        expect(res.body).to.have.lengthOf(2);
      })
    );
  });
});
