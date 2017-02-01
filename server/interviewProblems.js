const router = require('express').Router();
const db = require('APP/db');
const InterviewProblem = db.model('interviewProblems');

// adding problem to interview is defined in in interview router

router.delete('/:interviewProblemId', (req, res, next) => {

});

router.put('/:interviewProblemId', (req, res, next) => {

});

module.exports = router;
