//SAMPLE endpoints
const router = require('express').Router();
let GPD = require('../models/GPD.model');

router.route('/').get((req, res) => {
  GPD.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const sbuID = req.body.sbuID;
  const department = req.body.department;
  const pageSetting = req.body.pageSetting;

  const newUser = new GPD({firstName, lastName, sbuID, department, pageSetting});

  newUser.save()
    .then(() => res.json('GPD added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/get").get((req, res) => {

})

module.exports = router;