'use strict';

const Sequelize = require('sequelize');
const db = require('APP/db');

const Organization = db.define('organizations', {
  name: {
    type: Sequelize.STRING,
    primaryKey: true
  } 
});

module.exports = Organization;
