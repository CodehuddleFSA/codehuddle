const router = require('express').Router();
const db = require('APP/db');
const Organization = db.model('organizations');
const User = db.model('users');
const Problems = db.model('problems');

router.get('/', (req, res, next) => {
  Organization.findAll()
  .then(organizations => res.send(organizations))
  .catch(next);
});

router.post('/', (req, res, next) => {
  Organization.create(req.body)
  .then(() => res.sendStatus(201))
  .catch(next);
});

router.param('organizationSlug', (req, res, next, slug) => {
  Organization.findById(slug)
  .then(organization => {
    if (!organization) res.sendStatus(404);
    else {
      req.organization = organization;
      next()
    }
  })
  .catch(next);
});

router.delete('/:organizationSlug', (req, res, next) => {
  req.organization.destroy()
  .then(response => {
    if (response === 0) res.sendStatus(404);
    else res.sendStatus(204);
  })
  .catch(next);
});

router.get('/:organizationSlug/problems', (req, res, next) => {
  req.organization.getProblems()
  .then(problems => res.send(problems))
  .catch(next);
});

router.get('/:organizationSlug/users', (req, res, next) => {
  req.organization.getUsers()
  .then(users => res.send(users))
  .catch(next);
});

// Is this route necessary?
// router.get('/:organizationSlug/interviews', (req, res, next) => {

// });

module.exports = router;
