const request = require('supertest-as-promised');
// const {expect} = require('chai');
const _ = require('APP');
const db = require('APP/db');
const app = require('./start');

console.log(_.isTesting);

describe('GET /api/problems/:userId', () => {
  it('responds with users problems', () => 
    request(app)
    .get('/api/problems/45')
    .expect(200)
  );
});
