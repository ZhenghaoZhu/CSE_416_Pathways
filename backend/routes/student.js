//Student routes look set, may need small changes
const router = require("express").Router();
let Student = require("../models/student.model");

router.route("/").get((req, res) => {
    Student.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/get/:id").get((req, res) => {
    Student.findOne({ id: req.params.id })
        .then((cur) => res.json(cur))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/get/:department/:track").get((req, res) => {
    Student.find(
        { department: req.params.department, track: req.params.track },
        (err, docs) => {}
    )
        .then((ret) => res.json(ret))
        .catch((err) =>
            res.status(400).json("Invalid department or track: ", err)
        );
});

router.route("/get/sbuID/:id").put((req, res) => {
    Student.findOneAndReplace({ id: req.params.id }, req.body, {
        upsert: true,
        returnNewDocument: true,
    })
        .then((ret) => res.json(ret))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/remove/:id").delete(function (req, res) {
    Student.findOneAndDelete({ id: req.params.id })
        .then((result) => res.json(result))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/remove/dep/:department").delete(function (req, res) {
    Student.deleteMany({ department: req.params.department })
        .then((body) => res.json(body))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
    Student.findOneAndUpdate(
        { id: req.params.id },
        req.body,
        { new: true },
        (err, docs) => {
            if (err) {
                return res.status(400).send(err);
            }
        }
    )
        .then((student) => res.json(student))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const id = req.body.id;
    const email = req.body.email;
    const gpa = req.body.gpa;
    const department = req.body.department;
    const track = req.body.track;
    const reqVersionSem = req.body.reqVersionSem;
    const reqVersionYear = req.body.reqVersionYear;
    const entrySem = req.body.entrySem;
    const entryYear = req.body.entryYear;
    const gradSem = req.body.gradSem;
    const gradYear = req.body.gradYear;
    const coursePlan = req.body.coursePlan;
    const projectOption = req.body.projectOption;
    const facultyAdvisor = req.body.facultyAdvisor;
    const proficiencyReq = req.body.proficiencyReq;
    const degreeRequirements = req.body.degreeRequirements;
    const curSem = req.body.curSem;
    const curYear = req.body.curYear;
    const password = req.body.password;
    const graduated = req.body.graduated;
    const settings = req.body.settings;
    const comments = req.body.comments;

    const newStudent = new Student({
        firstName,
        lastName,
        id,
        email,
        gpa,
        department,
        track,
        reqVersionSem,
        reqVersionYear,
        entrySem,
        entryYear,
        gradSem,
        gradYear,
        coursePlan,
        projectOption,
        facultyAdvisor,
        proficiencyReq,
        degreeRequirements,
        curSem,
        curYear,
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
