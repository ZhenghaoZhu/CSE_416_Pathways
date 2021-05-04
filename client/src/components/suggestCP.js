import Config from "../config.json";
import React, { Component } from "react";
import { Button } from "@material-ui/core";
// import { exists } from "../../../backend/models/courses.model";
// import { useLocation } from "react-router-dom"

const axios = require("axios").default;

export function smartTest() {
    console.info("IT WORKS!");
}

class coursePlan extends Component {
    constructor(props) {
        super(props);
        // GetStudent();
        // this.student = location.state.student;
        this.student = this.props.location.student["row"];
        this.courseP = new Map(); //course plans
        // {"Spring 2021": [[1,"AMS 310", "MW 10"],[1,"CSE 320", "MW 12"]]}
        this.year = 2020; //default year for now
        this.sem = "Spring"; //default semes
        //used as globals for suggest course algo when adding classes
        if (this.student["curSem"] === "Spring") {
            this.sem = "SummerI";
            this.year = this.student["curYear"];
        } else if (this.student["curSem"] === "SummerI") {
            this.sem = "SummerII";
            this.year = this.student["curYear"];
        } else if (this.student["curSem"] === "SummerII") {
            this.sem = "Fall";
            this.year = this.student["curYear"];
        } else {
            //curSem = Fall
            this.sem = "Spring";
            this.year = String(parseInt(this.student["curYear"]) + 1);
        }
        this.coursesAdded = 0;
        this.maxCoursesAllowed = 4; //default is 4
        this.times = new Map(); //{"Fall 2020": [["MW 10:30..."],["F 10:30"]]}
        this.degReqs = this.student["degreeRequirements"]["Tracks"][this.student["track"]];
    }

    smartCoursePlan = () => {
        this.obtainStudents();
    };

    coursePlanConstraints() {}

    obtainStudents = async function () {
        var jsonT;
        //retrieve students that match department and track criteria
        await axios
            .get("http://localhost:5000" + "/student/get/" + this.student["department"] + "/" + this.student["track"])
            .then((ret) => (jsonT = ret))
            .catch((err) => console.log(err));
        console.log("jsonT:", jsonT["data"]);
        var len = Object.keys(jsonT["data"]).length; //find length of this json object
        console.log("len: ", len);
        var similarlityScores = new Map(); //store similarity scores
        var map = new Map(); //map to store cur student's courses taken

        // adds each course the student took to this list
        for (var key of Object.keys(this.student["coursePlan"])) {
            // console.log(key + " -> " + this.student["coursePlan"][key])
            this.student["coursePlan"][key].forEach((element) => {
                if (map[element[1]] === undefined) {
                    map[element[1]] = 1; //default value of 1 for now
                } else {
                    map[element[1]] += 1; //add one to signify taking the class more than once
                    //TODO might have issue if student fails a class then retakes?
                }
            });
        }

        console.log("map: ", map); //TODO good up to here

        //calculate similarity scores based on map
        for (var i = 0; i < len; i++) {
            var score = 0;
            if (jsonT["data"][i]["graduated"] === true) {
                //if student graduated, proceed
                for (var key1 of Object.keys(this.student["coursePlan"])) {
                    jsonT["data"][i]["coursePlan"][key1].forEach((element) => {
                        if (map[element[1]] !== undefined) {
                            //TODO check over
                            score += 1;
                        } else {
                        }
                    });
                }
            }
            similarlityScores[i] = score; //add each score to a map
        }

        console.log("sim scores: ", similarlityScores);

        var keysSorted = Object.keys(similarlityScores).sort(function (a, b) {
            return similarlityScores[b] - similarlityScores[a];
        });
        console.log(keysSorted); //sorts with most similar in front
        this.calculateClasses(keysSorted, jsonT["data"], map);
    };
    //keysSorted = array with indexes from most similar to least similar
    //data = javascript object with other student's data (same dep and same track and graduated)
    calculateClasses(keysSorted, data, studentMap) {
        var classesMap = new Map();
        //goes through all students and calculates the occurences of each course
        keysSorted.forEach((element) => {
            //TODO change to only first 100
            console.log("each element: ", data[element]); //TODO works

            for (var val of Object.values(data[element]["coursePlan"])) {
                val.forEach(function (element) {
                    if (!classesMap.has(element[1])) {
                        //if class has not been added to map yet
                        classesMap.set(element[1], 0);
                    } else {
                        //if class has been added to map already
                        classesMap.set(element[1], classesMap.get(element[1]) + 1);
                    }
                });
            }
            console.log("classesMap: ", classesMap);
        });
        console.log("classesMap: ", classesMap);
        classesMap[Symbol.iterator] = function* () {
            //sorts the courses so highest occurrence at top
            yield* [...this.entries()].sort((a, b) => b[1] - a[1]);
        };
        //TODO may need to loop til degree reqs are good
        for (let [key, value] of classesMap) {
            // get data in descending (large -> small) sorted
            console.log(key + " " + value);
            // var addCourseRet = this.addCourse(key, studentMap);
            // if(addCourseRet === " "){
            //     break;
            // }
        }
        console.log("sorted list of classes by occurrences: ", classesMap);
    }
    //key = class name like "AMS 310"
    //studentMap = //map to store cur student's courses taken
    addCourse(key, studentMap) {
        //check pre-reqs and time constraints
        if (studentMap[key] !== undefined) {
            //this means the course in question has already been taken by the student
            return;
        }
        //now we attempt to add the course to courseP, which is our coursePlan for the student
        //lets say 4 classess is max per semester //TODO summer courses?
        if (this.maxCoursesAllowed === this.coursesAdded) {
            //so we've reached max courses in a sem, move to next
            var star = this.nextSemester();
            if (star === " ") {
                return " ";
            }
            this.coursesAdded = 0;
        }
        if (this.courseP[this.sem + " " + this.year] === undefined) {
            this.courseP[this.sem + " " + this.year] = [];
        }
        //check for prereqs and time constraints here **
        var courseInfo = this.retrieveCourseInfo(studentMap[key]); //gets the course info from db
        if (courseInfo === null) {
            return;
        }
        //TODO CHeck for no classes returned from courseinfo
        var status = this.meetPrereq(courseInfo[0], studentMap);
        if (status) {
            //if pre req is not met, do not attempt to add course
            return;
        }
        var timeTF = this.meetTimeReq(courseInfo[0]); //pass in map
        //returns the time that works with user
        if (timeTF === "") {
            //time contraints not met
            return;
        }
        //now we want to go through the degReqs and remove from it
        this.removeFromDegReqsList(courseInfo[0]);
        //increment the course count
        this.coursesAdded += 1;
        this.courseP.get(this.sem + " " + this.year).push([1, key, timeTF]);
        //after a class is added, check if deg reqs are done
        if (this.degreeReqsSatisfied()) {
            //return a course plan ()
            return " ";
        }
    }
    //look at the deg req list and remove from it
    removeFromDegReqsList(courseInfoMap) {
        //TODO might need to handle checking for excluded courses
        var flag = 0; //flag to see if course is in required courses
        //if not, check elective courses
        var reqC = this.degReqs["Required Courses"];
        for (var i = 0; i < reqC.length; i++) {
            //check if course name + number matches
            for (var j = 1; j < reqC[i].length; j++) {
                if (reqC[i][j] === courseInfoMap["department"] + " " + courseInfoMap["courseNum"]) {
                    flag = 1;
                    //delete that degReq
                    reqC.splice(i, 1);
                    return;
                }
            }
            //break outer loop
        }
        var electiveC = this.degReqs["Elective Courses"];
        if (flag === 0) {
        }
        var electiveC = this.degReqs["Elective Courses"];
        // if(flag == 0){
        // }
    }

    //check if degree requirements are met
    //TODO what if the student has a plan already
    degreeReqsSatisfied() {
        //check the degReqs object and see if the req and elective coures is empty
        if (this.degReqs["Required Courses"] === [] && this.degReqs["Elective Courses"] === []) {
            return true;
        }
        return false;
    }

    retrieveCourseInfo = async function (className) {
        var courseInfo = undefined;
        className = className.replace(" ", "");
        // var arr = className.split(" ");
        // var dep = arr[0];
        // var idNumber = arr[1];
        await axios
            .get("http://localhost:5000" + "/get/course/" + className + "/" + this.sem + "/" + this.year)
            .then((course) => (courseInfo = course))
            .catch((err) => console.log("course error: ", err));
        if (courseInfo === undefined || courseInfo === []) {
            //if undefined or doesn't exist
            return null;
        }
        return courseInfo;
    };

    //info = course information from db
    //studentMap = map with the student's already taken/taking courses
    meetPrereq(info, studentMap) {
        console.log("Inside meetPrereq");
        if (info[0].length === 0) {
            //if no pre reqs
            return true;
        } else {
            //get the pre req
            var req = info[0].match("\bw{3}sw{3}");
            for (var i = 0; i < req.length; i++) {
                for (var key of Object.keys(studentMap)) {
                    //go through all courses taken by the student already
                    if (key === req[i]) {
                        //if pre-req is taken by the student already
                        return true;
                    }
                }
            }
            //now we must loop through the courses in the course planner,
            for (var j = 0; j < req.length; j++) {
                for (var key of Object.keys(this.courseP)) {
                    //go through all courses taken by the student already
                    var courses = this.courseP.get(key);
                    for (var k = 0; k < courses.length; k++) {
                        if (courses[k] === req[j]) {
                            //if pre-req is taken by the student already
                            return true;
                        }
                    }
                }
            }
        }
        //if no pre-req is found
        return false;
    }
    //course = course object from db
    meetTimeReq(course) {
        var arr = this.courseP[this.sem + " " + this.year];
        var timeSlot = "";
        var flag = 0;
        for (var j = 0; j < course["courseInfo"].size; j++) {
            for (var i = 0; i < arr.length; i++) {
                if (course["courseInfo"][j] === arr[i][2]) {
                    //if there is a time conflict\
                    flag = 1;
                }
            }
            if (flag === 0) {
                timeSlot = course["courseInfo"][j];
            }
        }
        return timeSlot;
    }

    //moves globals sem and year to next semester
    nextSemester() {
        if (this.sem === "Spring") {
            this.sem = "SummerI";
            this.year = this.student["curYear"];
        } else if (this.sem === "SummerI") {
            this.sem = "SummerII";
            this.year = this.student["curYear"];
        } else if (this.sem === "SummerII") {
            this.sem = "Fall";
            this.year = this.student["curYear"];
        } else if (this.sem === "Fall") {
            //curSem = Fall
            this.sem = "Spring";
            this.year = String(parseInt(this.student["curYear"]) + 1);
        } else {
            console.log("Invalid semester: nextSemester()");
        }
        //TODO rn i break the algo when we go past the student's assigned grad date
        if (this.sem === this.student["gradSem"] && this.year === this.student["gradYear"]) {
            return " ";
        }
    }

    printStudent = (e) => {
        e.preventDefault();
        console.log(this.student);
    };

    render() {
        return (
            <div>
                <Button onClick={this.printStudent}> Hello World</Button>
                <Button onClick={this.smartCoursePlan}> Smart Mode</Button>
                <Button onClick={this.coursePlanConstraints}> Manual Mode</Button>
            </div>
        );
    }
}

export default coursePlan;
