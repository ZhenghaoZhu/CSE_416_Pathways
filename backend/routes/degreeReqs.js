//SAMPLE endpoints

const router = require("express").Router();
let ams = require("../models/amsDegree.model");
let bmi = require("../models/BMI_degreeReqs.model");
let ece = require("../models/CE_degreeReqs.model")
const fs = require("fs")


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

router.route("/add/AMS").post((req, res) => {
    const department = req.body.department;
    const gpaReq = req.body.gpaReq;
    const tracks = req.body.tracks;
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
    const timeLimit = req.body.timeLimit;
    const thesisOption = req.body.thesisOption;
    const tracks = req.body.tracks;

    const newReqs = new ece({
        department,
        gpaReq,
        reqVersionSem,
        reqVersionYear,
        timeLimit,
        thesisOption,
        tracks,
    });

    newReqs.save()
        .then(() => res.json("ECE degree req added"))
        .catch((err) => res.status(400).json("Error: " + err));
})

router.route("/add/BMI").post((req, res) => {
    const department = req.body.department;
    const gpaReq = req.body.gpaReq;
    const tracks = req.body.tracks;
    const reqVersionSem = req.body.reqVersionSem;
    const reqVersionYear = req.body.reqVersionYear;
    const timeLimit = req.body.timeLimit;

    const newReqs = new bmi({
        department,
        gpaReq,
        tracks,
        reqVersionSem,
        reqVersionYear,
        timeLimit,
    });

    newReqs.save()
        .then(() => res.json("BMI degree req added"))
        .catch((err) => res.status(400).json("Error: " + err));
})

// router.route("/add/CSE").post((req, res) => {
    
// })

router.route("/file/:file").get((req,res) =>{
    fs.readFile("degreeRequirements/" + req.params.file, "utf8", (err, string) => {
        if(err){
            return err;
        }
        res.json(string);
        // var customer = JSON.parse(string);
        // console.log("degree req: ", customer);
    });
})

module.exports = router;
