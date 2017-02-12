'use strict';

const Sequelize = require('sequelize');
const db = require('APP/db');

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

function slugify(organization) {
  const name = organization.name.toLowerCase();
  const slugified = name.replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
  organization.slug = slugified;
}

module.exports = Organization;
