//SAMPLE endpoints


const router = require('express').Router();
let User = require('../models/degreeReqs.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const department = req.body.department;
  const gpaReq = req.body.gpaReq;
  const track = req.body.track;
  const reqVersionSem = req.body.reqVersionSem;
  const reqVersionYear = req.body.reqVersionYear;
  const courseReqs = req.body.courseReqs;
  const timeLimit = req.body.timeLimit;
  const creditEq = req.body.creditEq;
  const thesisOption = req.body.thesisOption;
  const noThesisOption = req.body.noThesisOption;
  const projectOption = req.body.projectOption;

  const newUser = new User({
    department,
    gpaReq,
    track,
    reqVersionSem,
    reqVersionYear,
    courseReqs,
    timeLimit,
    creditEq,
    thesisOption,
    noThesisOption,
    projectOption,
  });

  newUser.save()
    .then(() => res.json('Degree Reqs added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;