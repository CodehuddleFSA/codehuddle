const request = require('supertest');
const {expect} = require('chai');
const User = require('APP/db/models/user');
const Organization = require('APP/db/models/organization');
const app = require('./start');

describe('organizations router', () => {
  before(() => {
    const organizations = [
      {name: 'Google'},
      {name: 'Facebook'},
      {name: 'Amazon'},
      {name: 'Dropbox'}
    ];

    const users = [
      {name: 'Mark', email: 'mark@test.com', password: '1234', organization_name: 'Google'},
      {name: 'Evan', email: 'evan@test.com', password: '1234', organization_name: 'Google'}
    ];

    Organization.bulkCreate(organizations)
    .then(() => {
      User.bulkCreate(users);
    });

    User.create({
      name: 'Mike',
      email: 'mike@test.com',
      password: '3456',
      organization: {
        name: 'American Express'
      }
    }, {
      include: [Organization]
    });
  });

  describe('POST /api/organizations', () => {
    it('creates a new organization', () => 
      request(app)
      .post('/api/organizations')
      .send({name: 'Etsy'})
      .expect(201)
    );
  });

  describe('GET /api/organizations', () => {
    it('responds with all organizations', () => 
      request(app)
      .get('/api/organizations')
      .expect(200)
      .then(res => {
        expect(res.body).to.have.lengthOf(6);
      })
    );
  });

  describe('GET /api/:organizationName/organizations/users', () => {
    it('responds with all users of an organization', () => 
      request(app)
      .get('/api/organizations/Google/users')
      .expect(200)
      .then(res => {
        expect(res.body).to.have.lengthOf(2);
      })
    );
  })

  describe('DELETE /api/organizations/:organizationName', () => {
    it('it deletes the organization if it exists', () => 
      request(app)
      .delete('/api/organizations/Google')
      .expect(204)
    );

    it('responds with 404 if organization does not exist', () => 
      request(app)
      .delete('/api/organizations/Priceline')
      .expect(404)
    );
  });
});
