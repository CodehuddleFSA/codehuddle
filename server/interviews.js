const router = require('express').Router();
const db = require('APP/db');
const Interview = db.model('interviews');
const InterviewProblems = db.model('interviewProblems');

// router.get('/:organization', (req, res, next) => {

// });

router.param('interviewId', (req, res, next, id) => {
  Interview.findById(id)
  .then(interview => {
    if (!interview) res.send(404);
    else {
      req.interview = interview;
      next();
    }
  })
  .catch(next);
});

router.get('/:interviewId', (req, res, next) => {
  res.send(req.interview);
});

router.post('/', (req, res, next) => {
  Interview.create(req.body)
  .then(createdInterview => res.status(201).send(createdInterview))
  .catch(next);
});

router.put('/:interviewId', (req, res, next) => {

});

router.post('/:interviewId/problems', (req, res, next) => {

});

router.delete('/:interviewId', (req, res, next) => {

});

module.exports = router;
