const router = require('express').Router();
const db = require('APP/db');
const Problem = db.model('problems');

router.get('/:userId', (req, res, next) => {
  Problem.findAll({
    where: {
      author_id: req.params.userId
    }
  })
  .then(problems => res.send(problems))
  .catch(next);
});

router.post('/', (req, res, next) => {
  Problem.create(req.body)
  .then(createdProblem => res.status(201).send(createdProblem))
  .catch(next);
});

router.param('problemId', (req, res, next, id) => {
  Problem.findById(id)
  .then(problem => {
    if (!problem) res.send(404);
    else {
      req.problem = problem;
      next();
    }
  })
  .catch(next);
});

router.put('/:problemId', (req, res, next) => {
  req.problem.update(req.body)
  .then(problem => res.send(problem))
  .catch(next);
});

router.delete('/:problemId', (req, res, next) => {
  req.problem.destroy()
  .then(() => res.sendStatus(204))
  .catch(next);
});

module.exports = router;
