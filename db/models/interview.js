'use strict';

const Sequelize = require('sequelize');
const db = require('APP/db');
const shortid = require('shortid');

const Interview = db.define('interviews', {
  date: {
    type: Sequelize.DATE
  },
  // add default token - random string - before create class method
  // shortId, crypto secure random sequence 
  authToken: Sequelize.STRING,
  candidateName: Sequelize.STRING,
  candidateEmail: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  duration: Sequelize.INTEGER,
  position: Sequelize.STRING,
  status: {
    type: Sequelize.ENUM('planned', 'done'),
    defaultValue: 'planned'
  },
  candidateOverallRating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 5
    }
  },
  comments: Sequelize.TEXT
}, {
  hooks: {
    beforeCreate: generateToken
  }
});

function generateToken(interview) {
  interview.authToken = shortid.generate();
}

module.exports = Interview;
