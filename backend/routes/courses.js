//SAMPLE endpoints
const router = require("express").Router();
let Courses = require("../models/courses.model");

router.route("/").get((req, res) => {
    Courses.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/get/:id").get((req, res) => {
    Courses.findById(req.params.id)
        .then((curCourse) => res.json(curCourse))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").put((req, res) => {
    Courses.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, docs) => {
            // Handle any possible database errors
            if (err) {
                return res.status(404).send(err);
            }
        }
    )
        .then((student) => res.json(student))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/get/classID/:id").get((req, res) => {
    Courses.find({ id: req.params.id })
        .then((course) => res.json(course))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/get/dep/:department").get((req, res) => {
    Courses.find({ department: req.params.department })
        .then((curCourse) => res.json(curCourse))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/remove").delete(function (req, res) {
    Courses.deleteMany()
        .then((body) => res.json(body))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/classID/:id").put((req, res) => {
    Courses.findOneAndUpdate(
        { id: req.params.id },
        req.body,
        { new: true },
        (err, docs) => {
            if (err) {
                return res.status(400).send(err);
            }
        }
    )
        .then((course) => res.json(course))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/classID/:id").put((req, res) => {
    Courses.findOneAndUpdate(
        { id: req.params.id },
        req.body,
        { new: true },
        (err, docs) => {
            if (err) {
                return res.status(400).send(err);
            }
        }
    )
        .then((course) => res.json(course))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/course/:id/:semester/:year").put((req, res) => {
    Courses.findOneAndUpdate(
        {
            id: req.params.id,
            semester: req.params.semester,
            year: req.params.year,
        },
        req.body,
        { new: true },
        (err, docs) => {
            if (err) {
                return res.status(400).send(err);
            }
        }
    )
        .then((course) => res.json(course))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/get/course/:id/:semester/:year").get((req, res) => {
    Courses.find({
        id: req.params.id,
        semester: req.params.semester,
        year: req.params.year,
    })
        .then((response) => res.json(response))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
    const id = req.body.department + req.body.courseNum;
    const department = req.body.department || "None";
    const courseNum = req.body.courseNum || "None";
    const courseName = req.body.courseName || "None";
    const semester = req.body.semester || "None";
    const year = req.body.year || "None";
    const credits = req.body.credits || 0;
    const preReqs = req.body.preReqs || [];
    const courseDescription = req.body.courseDescription || "None";
    const yearTrends = req.body.yearTrends || [];
    const courseInfo = req.body.courseInfo || [];
    const professorNames = req.body.professorNames || [];

    const newCourse = new Courses({
        id,
        department,
        courseNum,
        semester,
        year,
        courseName,
        credits,
        preReqs,
        courseDescription,
        yearTrends,
        courseInfo,
        professorNames,
    });

    newCourse
        .save()
        .then(() => res.json("Course added!"))
        .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
