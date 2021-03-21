//SAMPLE endpoints
const router = require("express").Router();
let Student = require("../models/student.model");

router.route("/").get((req, res) => {
  Student.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const firstName = req.body.first_name;
  const lastName = req.body.lastName;
  const sbuID = req.body.sbuID;
  const email = req.body.email;
  const gpa = req.body.gpa;
  const department = req.body.department;
  const track = req.body.track;
  const reqVersion = req.body.reqVersion;
  const entrySem = req.body.entrySem;
  const entryYear = req.body.entryYear;
  const gradSem = req.body.gradSem;
  const coursePlan = req.body.coursePlan;
  const projectOption = req.body.projectOption;
  const facultyAdvisor = req.body.facultyAdvisor;
  const proficiencyReq = req.body.proficiencyReq;
  const degreeRequirements = req.body.degreeRequirements;
  const password = req.body.password;
  const graduated = req.body.graduated;
  const settings = req.body.settings;
  const comments = req.body.comments;

  const newStudent = new Student({
    firstName,
    lastName,
    sbuID,
    email,
    gpa,
    department,
    track,
    reqVersion,
    entrySem,
    entryYear,
    gradSem,
    coursePlan,
    projectOption,
    facultyAdvisor,
    proficiencyReq,
    degreeRequirements,
    password,
    graduated,
    settings,
    comments,
  });

  newStudent
    .save()
    .then(() => res.json("Student added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
