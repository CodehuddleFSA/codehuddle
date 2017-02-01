const router = require('express').Router();
const db = require('APP/db');
const Organization = db.model('organizations');

router.get('/', (req, res, next) => {

});

router.delete('/', (req, res, next) => {

});

router.get('/:organizationName/problems', (req, res, next) => {
  
});

router.get('/:organizationName/interviews', (req, res, next) => {
  
});

module.exports = router;
