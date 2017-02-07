'use strict';

const Sequelize = require('sequelize');
const db = require('APP/db');
const slug = require('slug');

const Organization = db.define('organizations', {
  name: {
    type: Sequelize.STRING,
    primaryKey: true
  }, 
  slug: Sequelize.STRING
}, {
  hooks: {
    beforeCreate: generateSlug
  }
});

function generateSlug(org) {
  const name = org.name.toLowerCase();
  org.slug = slug(name, '_');
} 

module.exports = Organization;
