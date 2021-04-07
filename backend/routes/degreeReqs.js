//SAMPLE endpoints

const router = require("express").Router();
let Degree = require("../models/degreeReqs.model");
let ams = require("../models/amsDegree.model");
let bmi = require("../models/BMI_degreeReqs.model");
let ece = require("../models/CE_degreeReqs.model")

router.route("/").get((req, res) => {
    Degree.find()
        .then((allReqs) => res.json(allReqs))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/get/AMS/:year/:sem").get((req, res) => {
    ams.findOne({department: "AMS", reqVersionSem: req.params.sem, reqVersionYear: req.params.year})
    .then((cur) => res.json(cur))
    .catch((err) => res.status(400).json("Error: " + err));
})

// router.route("/get/CSE/:year/:sem").get((req, res) => {
//     cse.findOne({department: "CSE",reqVersionSem: req.params.sem, reqVersionYear: req.params.year})
//     .then((cur) => res.json(cur))
//     .catch((err) => res.status(400).json("Error: " + err));
// })

router.route("/get/BMI/:year/:sem").get((req, res) => {
    bmi.findOne({department: "BMI", reqVersionSem: req.params.sem, reqVersionYear: req.params.year})
    .then((cur) => res.json(cur))
    .catch((err) => res.status(400).json("Error: " + err));
})

router.route("/get/ECE/:year/:sem").get((req, res) => {
    ece.findOne({department: "ECE", reqVersionSem: req.params.sem, reqVersionYear: req.params.year})
    .then((cur) => res.json(cur))
    .catch((err) => res.status(400).json("Error: " + err));
})

router.route("/get/:id").get((req, res) => {
    Degree.findById(req.params.id)
        .then((curReqs) => res.json(curReqs))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/remove/:id").delete(function (req, res) {
    Degree.findByIdAndDelete(req.params.id, function (err, docs) {
        if (err) {
            res.send("Remove ID not work");
        } else {
            res.json(docs);
        }
    });
});

router.route("/add/AMS").post((req, res) => {
    const department = req.body.department;
    const gpaReq = req.body.gpaReq;
    const tracks = req.body.track;
    const reqVersionSem = req.body.reqVersionSem;
    const reqVersionYear = req.body.reqVersionYear;
    const timeLimit = req.body.timeLimit;

    const newReqs = new ams({
        department,
        gpaReq,
        reqVersionSem,
        reqVersionYear,
        timeLimit,
        tracks,
    });

    newReqs.save()
    .then(() => res.json("AMS Degree Req Added!"))
    .catch((err) => res.status(400).json("Error: " + err))
})

router.route("/add/ECE").post((req, res) => {
    const department = req.body.department;
    const gpaReq = req.body.gpaReq;
    const reqVersionSem = req.body.reqVersionSem;
    const reqVersionYear = req.body.reqVersionYear;
    const requiredCourseReqs = req.body.requiredCourseReqs;
    const electiveCourseReqs = req.body.electiveCourseReqs;
    const timeLimit = req.body.timeLimit;
    const thesisOption = req.body.thesisOption;

    const newReqs = new ece({
        department,
        gpaReq,
        reqVersionSem,
        reqVersionYear,
        requiredCourseReqs,
        electiveCourseReqs,
        timeLimit,
        thesisOption,
    });

    newReqs.save()
        .then(() => res.json("ECE degree req added"))
        .catch((err) => res.status(400).json("Error: " + err));
})

router.route("/add/BMI").post((req, res) => {
    const department = req.body.department;
    const gpaReq = req.body.gpaReq;
    const specialization = req.body.specialization;
    const track = req.body.track;
    const reqVersionSem = req.body.reqVersionSem;
    const reqVersionYear = req.body.reqVersionYear;
    const requiredCourseReqs = req.body.requiredCourseReqs;
    const electiveCourseReqs = req.body.electiveCourseReqs;
    const timeLimit = req.body.timeLimit;
    const creditEq = req.body.creditEq;
    const thesisOption = req.body.thesisOption;
    const projectOption = req.body.projectOption;

    const newReqs = new bmi({
        department,
        gpaReq,
        specialization,
        track,
        reqVersionSem,
        reqVersionYear,
        requiredCourseReqs,
        electiveCourseReqs,
        timeLimit,
        creditEq,
        thesisOption,
        projectOption,
    });

    newReqs.save()
        .then(() => res.json("BMI degree req added"))
        .catch((err) => res.status(400).json("Error: " + err));
})

router.route("/add/CSE").post((req, res) => {
    
})

router.route("/add").post((req, res) => {
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

    const newReqs = new User({
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

    newReqs
        .save()
        .then(() => res.json("Degree Reqs added!"))
        .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
