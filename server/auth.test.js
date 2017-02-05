const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('APP/db')
const User = require('APP/db/models/user')
const app = require('./start')

const ben = {
  username: 'ben@test.com',
  password: '12345'
}

describe('/api/auth', () => {
  before('create a user', () =>
    db.didSync
      .then(() =>
        User.create({
          email: ben.username,
          password: ben.password
        })
      )
  );

  describe('POST /local/login (username, password)', () => {
    it('succeeds with a valid username and password', () =>
      request(app)
        .post('/api/auth/login')
        .send(ben)
        .expect(302)
        .expect('Set-Cookie', /session=.*/)
        .expect('Location', '/')
      )

    it('fails with an invalid username and password', () =>
      request(app)
        .post('/api/auth/login')
        .send({username: ben.username, password: 'wrong'})
        .expect(401)
      )      
  })

  describe('GET /whoami', () => {
    describe('when logged in,', () => {
      const agent = request.agent(app)
      before('log in', () => agent
        .post('/api/auth/login') 
        .send(ben))

      it('responds with the currently logged in user', () =>
        agent.get('/api/auth/whoami')
          .set('Accept', 'application/json')        
          .expect(200)          
          .then(res => expect(res.body).to.contain({
            email: ben.username
          }))
      )      
    })

    it('when not logged in, responds with an empty object', () =>
      request(app).get('/api/auth/whoami')
        .expect(200)
        .then(res => expect(res.body).to.eql({}))
    )
  })

  describe('POST /logout when logged in', () => {
    const agent = request.agent(app);

    before('log in', () => agent
      .post('/api/auth/login')
      .send(ben));

    it('logs you out and redirects to whoami', () => agent
      .post('/api/auth/logout')
      .expect(302)
      .expect('Location', '/api/auth/whoami')
      .then(() =>
        agent.get('/api/auth/whoami')
          .expect(200)
          .then(rsp => expect(rsp.body).eql({}))
      )
    );
  });
});
