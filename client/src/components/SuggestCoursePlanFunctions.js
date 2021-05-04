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
var curDegreeTrack = undefined;
var displayBool = false
var degreeReqsFulfilled = false;
const semMap = { Fall: 0, Spring: 1, SummerI: 2, SummerII: 3 };
const allSemester = ["Fall", "Spring", "SummerI", "SummerII"];

function fillInAllSemesters() {
    if (curDegreeTrack === undefined) {
        curDegreeTrack = curStudent["degreeRequirements"]["tracks"][curStudent["track"]];
    }
    prohibitedSemesters();
    // TODO  Fill in project options
    fillCoursesFromArray(curPref);
    fillCoursesFromArray(getRemainingRequiredCourses());
    degreeReqsFulfilled = fulfillsDegreeRequirements();
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
    semArr.forEach((curSem) => {
        if (!prohibitedSems.includes(curSem)) {
            newCoursePlan[curSem] = [];
        }
    });
}

function inExcludedCourses(excludedList, courseID) {
    excludedList.forEach((curCourse) => {
        if (curCourse[1] === courseID) {
            return true;
        }
    });
    return false;
}

function checkSelectedCourses(curCourseArray, curCourse) {
    var curCourseCheck = null;
    for (var i = 0; i < curCourseArray.length; i++) {
        curCourseCheck = curCourseArray[i];
        if (curCourseCheck !== undefined && curCourseCheck[1].indexOf("-") > -1) {
            // NOTE  Has Range
            var curCourseSplit = curCourse.split(" ");
            var curCourseDep = curCourseSplit[0];
            var curCourseNum = curCourseSplit[1];
            var curCourseCheckNums = curCourseCheck[1].split(" ");
            if (
                curCourseDep === curCourseCheckNums[0] &&
                curCourseNum >= parseInt(curCourseCheckNums[1]) &&
                curCourseNum <= parseInt(curCourseCheckNums[3])
            ) {
                curCourseCheck[0] = curCourseCheck[0] - 1;
                if (curCourseCheck[0] === 0) {
                    curCourseArray.splice(i, 1);
                }
                return true;
            }
        } else {
            var curCourseSplit = curCourse.split(" ");
            var curCourseDep = curCourseSplit[0];
            if (curCourseCheck !== undefined && (curCourseCheck[1] === curCourseDep || curCourseCheck.includes(curCourse))) {
                curCourseCheck[0] = curCourseCheck[0] - 1;
                if (curCourseCheck[0] === 0) {
                    curCourseArray.splice(i, 1);
                }
                return true;
            }
        }
    }
    return false;
}

function fulfillsDegreeRequirements() {
    var reqArrLen = curDegreeTrack["Required Courses"].length;
    var elecArrLen = curDegreeTrack["Elective Courses"].length;
    return reqArrLen == 0 && elecArrLen == 0;
}

async function satisfiesDegreeRequirements(courseID) {
    // Get current degree requirement and track
    // Iterate through previous course plan taking out from specific track
    // Iterate through new course plan doing the same thing
    // If track empty return true else false
    var seenBool = false;
    if (!inExcludedCourses(curDegreeTrack["Excluded Courses"], courseID)) {
        seenBool = checkSelectedCourses(curDegreeTrack["Required Courses"], courseID);
        if (!seenBool) {
            checkSelectedCourses(curDegreeTrack["Elective Courses"], courseID);
        }
        seenBool = false;
    }
    if(!displayBool){
        curStudent["degreeRequirements"]["tracks"][curStudent["track"]] = curDegreeTrack;
    }
    return fulfillsDegreeRequirements();
}

function fillCoursesFromArray(curCourseArray) {
    var curSemSplit = undefined;
    for (const [curSem, curSemCourses] of Object.entries(newCoursePlan)) {
        curSemSplit = curSem.split(" ");
        curCourseArray.forEach((curCourse) => {
            axios
                .get(Config.URL + "/courses/get/course/" + curCourse + "/" + curSemSplit[0] + "/" + curSemSplit[1])
                .then((course) => {
                    var courseData = course.data[0];
                    if (courseData != undefined) {
                        var courseName = courseData["department"] + " " + courseData["courseNum"];
                        var canAddRet = canAddCourse(courseData);
                        if (!addedCourses.includes(courseName) && canAddRet[0] && !maxCoursesReached(curSem)) {
                            var buildCourse = undefined;
                            if (courseData["courseInfo"].length == 0) {
                                buildCourse = ["", courseName, "", courseData["credits"]];
                            } else {
                                buildCourse = [canAddRet[1][0], courseName, canAddRet[1][1], courseData["credits"]];
                            }
                            curSemCourses.push(buildCourse);
                            addedCourses.push(courseName);
                            degreeReqsFulfilled = satisfiesDegreeRequirements(courseName);
                        }
                    } else {
                        console.info(
                            "DIDNT FIND IT",
                            curCourse,
                            Config.URL + "/courses/get/course/" + curCourse + "/" + curSemSplit[0] + "/" + curSemSplit[1]
                        );
                    }
                })
                .catch((err) => console.log(err));
        });
    }
}

function getRemainingRequiredCourses() {
    var retArr = [];
    curDegreeTrack["Required Courses"].forEach((curCourse) => {
        var buildCoursename = curCourse[1].replace(/\s/g, "");
        retArr.push(buildCoursename);
    });
    return retArr;
}

function canAddCourse(curCourse) {
    if (curCourse["courseInfo"].length === 0) {
        return [true, ["", ""]];
    }
    var retTime = ["", ""];
    var retVal = false;
    curCourse["courseInfo"].forEach((curTimeSlot) => {
        if (!timeArr.includes(curTimeSlot)) {
            retVal = true;
            retTime = curTimeSlot;
        }
    });
    return [retVal, retTime];
}

function maxCoursesReached(curSemester) {
    return newCoursePlan[curSemester].length >= maxCourses;
}

async function getStudentTrack() {}

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
    return newCoursePlan;
}

export function returnNewTrack(coursesToAdd, studentTrack){
    console.log("first: ",coursesToAdd, studentTrack)
    displayBool = true
    curDegreeTrack = studentTrack
    coursesToAdd.forEach((curCourse) => {
        satisfiesDegreeRequirements(curCourse)
    })
    console.log("returnNewTrack",curDegreeTrack)
    return curDegreeTrack;
}