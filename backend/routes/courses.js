//SAMPLE endpoints
const router = require("express").Router();
let Courses = require("../models/courses.model");

router.route("/").get((req, res) => {
  Courses.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const courseName = req.body.courseName;
  const courseIden = req.body.courseIden;
  const department = req.body.department;
  const credits = req.body.credits;
  const preReqs = req.body.preReqs;
  const courseDescription = req.body.courseDescription;
  const yearTrends = req.body.yearTrends;
  const timeSlots = req.body.timeSlots;
  const professorNames = req.body.professorNames;

  const newCourse = new Courses({
    courseName,
    courseIden,
    department,
    credits,
    preReqs,
    courseDescription,
    yearTrends,
    timeSlots,
    professorNames,
  });

  newCourse
    .save()
    .then(() => res.json("Course added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
