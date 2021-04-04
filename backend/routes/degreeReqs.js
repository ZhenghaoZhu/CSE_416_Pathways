//SAMPLE endpoints

const router = require("express").Router();
let Degree = require("../models/degreeReqs.model");

router.route("/").get((req, res) => {
    Degree.find()
        .then((allReqs) => res.json(allReqs))
        .catch((err) => res.status(400).json("Error: " + err));
});

// router.route("/add").post(req, res) => {
// 	const department = req.body.department
// 	const gpaReq =
// 	const track =
// 	const reqVersionSem =
// 	const reqVersionYear =
// 	const courseReqs =
// 	const timeLimit =
// 	const creditEq =
// 	const thesisOption =
// 	const noThesisOption =
// 	const projectOption =
// }

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
