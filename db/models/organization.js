'use strict';

const Sequelize = require('sequelize');
const db = require('APP/db');
const slugify = require('APP/utils').slugify;

const Organization = db.define('organizations', {
  name: {
    type: Sequelize.STRING,
    primaryKey: true
  }, 
  slug: Sequelize.STRING
}, {
  hooks: {
    beforeCreate: slugify
  }
});

module.exports = Organization;
