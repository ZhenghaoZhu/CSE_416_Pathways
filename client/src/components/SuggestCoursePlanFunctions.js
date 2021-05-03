import Config from "../config.json";

const axios = require("axios").default;

var curStudent = undefined;
var newCoursePlan = {};
var curPref = [];
var curAvoid = [];
var timeArr = [];
var semArr = [];
var maxCourses = 5;
var prohibitedSems = [];
var addedCourses = [];
const semMap = { Fall: 0, Spring: 1, SummerI: 2, SummerII: 3 };
const allSemester = ["Fall", "Spring", "SummerI", "SummerII"];

function fillInAllSemesters() {
    console.log(curStudent);
    prohibitedSemesters();
    // TODO  Fill in project options
    fillPreferredCourses();
    console.log(newCoursePlan);
    fillNeutralCourses();
    console.log(newCoursePlan);
    fillAvoidedCourses();
    console.log(newCoursePlan);
    return;
}

function prohibitedSemesters() {
    var curCourses = curStudent.coursePlan;
    for (const [key, value] of Object.entries(curCourses)) {
        var courseWithGrade = false;
        value.forEach((curCourse) => {
            addedCourses.push(curCourse[1]);
            if (curCourse[2] != "") {
                courseWithGrade = true;
            }
        });
        if (courseWithGrade) {
            prohibitedSems.push(key); // Semesters with grades cannot have more courses added to them
        }
    }
    console.info(curCourses);
    semArr.forEach((curSem) => {
        if (!prohibitedSems.includes(curSem)) {
            newCoursePlan[curSem] = [];
        }
    });
}

function fillPreferredCourses() {
    var curSemSplit = undefined;
    for (const [curSem, curSemCourses] of Object.entries(newCoursePlan)) {
        if (!prohibitedSems.includes(curSem)) {
            curSemSplit = curSem.split(" ");
            curPref.forEach(async (curCourse) => {
                await axios
                    .get(Config.URL + "/courses/get/course/" + curCourse + "/" + curSemSplit[0] + "/" + curSemSplit[1])
                    .then((course) => {
                        var courseData = course.data[0];
                        if (courseData != undefined) {
                            var courseName = courseData["department"] + " " + courseData["courseNum"];
                            var buildCourse = ["", courseName, ""];
                            console.log(courseData);
                            if (!addedCourses.includes(courseName) && canAddCourse(courseData)) {
                                curSemCourses.push(buildCourse);
                                addedCourses.push(courseName);
                            }
                        }
                    })
                    .catch((err) => console.log(err));
            });
        }
    }
}

function fillNeutralCourses() {}

function fillAvoidedCourses() {}

function canAddCourse(curCourse) {
    if (curCourse["courseInfo"].length === 0) {
        return true;
    }
    var retVal = false;
    curCourse["courseInfo"].forEach((curTimeSlot) => {
        if (!timeArr.includes(curTimeSlot)) {
            retVal = true;
        }
    });
    return retVal;
}

function maxCoursesReached(curSemester) {
    return newCoursePlan[curSemester].length() >= maxCourses;
}

export function createAllSemesters(student, preferredCourses, avoidedCourses, timeConstraints, semMaxCourses) {
    curStudent = student;
    curPref = preferredCourses;
    curAvoid = avoidedCourses;
    timeArr = timeConstraints;
    maxCourses = semMaxCourses;
    var lastSemYear = curStudent["gradSem"] + " " + curStudent["gradYear"];
    var gradYear = curStudent["gradYear"];
    var entrySem = curStudent["entrySem"];
    var entryYear = curStudent["entryYear"];
    var yearDiff = gradYear - entryYear + 1;
    var curSemYear = "";
    var curIdx = semMap[entrySem];
    var i = 0;
    while (i != yearDiff) {
        curSemYear = allSemester[curIdx] + " " + (parseInt(entryYear) + i);
        if (lastSemYear === curSemYear) {
            semArr.push(curSemYear);
            break;
        }
        semArr.push(curSemYear);
        curSemYear = "";
        curIdx += 1;
        curIdx %= 4;
        if (curIdx == 1) {
            i += 1;
        }
    }
    fillInAllSemesters();
}
