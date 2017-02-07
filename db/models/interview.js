'use strict';

const Sequelize = require('sequelize');
const db = require('APP/db');

const Interview = db.define('interviews', {
  date: {
    type: Sequelize.DATE
  },
  // add default token - random string - before create class method
  // shortId, crypto secure random sequence 
  authToken: Sequelize.STRING,
  // add validator
  candidateName: Sequelize.STRING,
  candidateEmail: Sequelize.STRING,
  // add duration
  position: Sequelize.STRING,
  // add default
  status: Sequelize.ENUM('planned', 'done'),
  candidateOverallRating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 5
    }
  },
  comments: Sequelize.TEXT
});

module.exports = Interview;
