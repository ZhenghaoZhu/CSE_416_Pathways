import Config from "../config.json";
import React, { Component } from "react";
import { Button } from "@material-ui/core";
// import { exists } from "../../../backend/models/courses.model";
// import { useLocation } from "react-router-dom"

const axios = require("axios").default;

class coursePlan extends Component {
    constructor(props) {
        super(props);

        this.student = this.props.location.student["row"];
        this.coursePl = {}; //course plans
        // {"Spring 2021": [[1,"AMS 310", "MW 10"],[1,"CSE 320", "MW 12"]]}
        this.year = 2020 //default year for now
        this.sem = "Spring" //default semes
        //used as globals for suggest course algo when adding classes
        if(this.student["curSem"] === "Spring"){
            this.sem = "SummerI";
            this.year = this.student["curYear"];
        }
        else if(this.student["curSem"] === "SummerI"){
            this.sem = "SummerII";
            this.year = this.student["curYear"];
        }
        else if(this.student["curSem"] === "SummerII"){
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
        this.degReqs = this.student["degreeRequirements"]["tracks"][this.student["track"]];
        //var to hold courses student need to take every sem
        this.takeEverySem = [];
        for(var i = 0; i < this.degReqs["Required Courses"].size; i++){
            if(this.degReqs["Required Courses"][i][0] === -2){
                this.takeEverySem.push(this.degReqs["Required Courses"][i][1]);//add the class we need
                //to take every semester to this.takeEverySem
            }
        }
        console.log("takeEverySem: ", this.takeEverySem);
        this.cycled = 0;
    }

    smartCoursePlan = () => {
        this.obtainStudentsAndSort();
    };

    coursePlanConstraints() {
        
    }

    obtainStudentsAndSort = async function () {
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
            if(jsonT["data"][i]["graduated"] === true){ //if student graduated, proceed
                for (var key1 of Object.keys(this.student["coursePlan"])) {
                    jsonT["data"][i]["coursePlan"][key1].forEach(element => {
                        if(map[element[1]] !== undefined){ //TODO check over
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
    calculateClasses = async function (keysSorted, data, studentMap) {
        var classesMap = new Map();
        //goes through all students and calculates the occurences of each course
        keysSorted.forEach((element) => {
            //TODO change to only first 100
            console.log("each element: ", data[element]); //TODO works

            for (var val of Object.values(data[element]["coursePlan"])) {
                val.forEach(function (element) {
                    if (!classesMap.has(element[1])) {
                        //if class has not been added to map yet
                        classesMap.set(element[1], 1);
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
        }
        //TODO may need to loop til degree reqs are good
        var counter = 0
        while(this.degreeReqsSatisfied() === false && counter !== 4){
            for (let [key, value] of classesMap) {     // get data in descending (large -> small) sorted
                console.log(key + ' ' + value);
                var addCourseRet = await this.addCourse(key, studentMap);
                if(addCourseRet === " "){
                    break;
                }
            }
            if(this.cycled === classesMap.length){
                var star = this.nextSemester();
                if(star === " "){
                    return " ";
                }
                this.cycled = 0;
            }
            counter++;
            // break; //TODO TEMPORARY
        }
        //TODO after loop, we need to display the plan somehow
        console.log("sorted list of classes by occurrences: ", classesMap);
        console.log("COURSE PLAN: ", this.coursePl);
        console.log("deg reqs after remove ", this.degReqs);
    }
    //key = class name like "AMS 310"
    //studentMap = map to store cur student's courses taken
    addCourse = async function (key, studentMap){
        //check pre-reqs and time constraints
        //TODO dups allowed
        //now we attempt to add the course to coursePl, which is our coursePlan for the student
        //lets say 4 classess is max per semester //TODO summer courses?
        if(this.maxCoursesAllowed === this.coursesAdded){//so we've reached max courses in a sem, move to next
            console.log("moved to next sem");
            var star = this.nextSemester();
            if(star === " "){
                return " ";
            }
            this.cycled = 0;
            this.coursesAdded = 0;
        }
        if(this.coursePl[this.sem+" "+this.year] === undefined){
            console.log("new semester [ [ [[ [[]]]]]]: ",this.sem + this.year);
            this.coursePl[this.sem+" "+this.year] = []
        }
        //check for prereqs and time constraints here **

        let courseInfo = null; //gets the course info from db
        var className = key;
        className = className.replace(" ", "");
        courseInfo = await axios
            .get("http://localhost:5000"+ "/courses/get/course/"+className+"/"+this.sem+"/"+this.year)
            .then((course) => {return course})
            .catch((err) => console.log("course error: ", err), courseInfo = undefined);
        
        console.log("retrieveCourseInfo: ", courseInfo);
        if(courseInfo === undefined || courseInfo["data"] === undefined  || courseInfo["data"].length === 0 || courseInfo === null){//if undefined or doesn't exist
            console.log("No courses found");
        }
        // await this.retrieveCourseInfo(key)
        //     .then((rep) => courseInfo = rep);
        // console.log("courseInfo data: ", courseInfo);
        this.cycled += 1;
        if(courseInfo === null || courseInfo["data"] === undefined){
            console.log("No courses found1111");
            return;
        }
        this.nextSteps(courseInfo, studentMap, key);
    }

    nextSteps(courseInfo, studentMap, key){
        console.log("retrieve course: ", courseInfo["data"]);
        //TODO CHeck for no classes returned from courseinfo
        var status =  this.meetPrereq(courseInfo["data"][0], studentMap);
        if(!status){ //if pre req is not met, do not attempt to add course
            console.log("pre req not met");
            return;
        }
        var timeSlot = this.meetTimeReq(courseInfo["data"][0], key); //pass in map 
        //returns the time that works with user
        if(timeSlot === []){//time contraints not met
            return;
        }
        //now we want to go through the degReqs and remove from it
        if(timeSlot[0] !== undefined && timeSlot[1] !== undefined){
            this.removeFromDegReqsList(courseInfo["data"][0]);
            // // //increment the course count
            this.coursesAdded += 1;
            
            this.coursePl[this.sem+" "+this.year][this.coursePl[this.sem+" "+this.year].length] = [timeSlot[0], key, timeSlot[1]];               
        }
    }

    //look at the deg req list and remove from it
    //courseInfoMap = course object
    removeFromDegReqsList(courseInfoMap){
        //TODO might need to handle checking for excluded courses

        var flag = 0; //flag to see if course is in required courses
        //if not, check elective courses
        var reqC = this.degReqs["Required Courses"];
        for(var i = 0; i < reqC.length; i++){
            //check if course name + number matches
            for(var j = 1; j < reqC[i].length; j++){ //[1, "MCB 520", "CHE 541"],
                if(reqC[i][j].substring(0,3) !== courseInfoMap["department"]){
                    continue;
                }
                if(reqC[i][j].includes("-")){
                    console.log("HAS - : ", reqC[i][j]);
                    var str = reqC[i][j].match(/\d{3}/gm);
                    console.log("MATCHING PATTERN FOR REQCOURSES: ", str);
                    if(str == null){
                        continue;
                    }
                    var match1 = parseInt(str[0]); //get lower class #
                    console.log("match1 :", match1);
                    var match2 = parseInt(str[1]); //get higher class #
                    console.log("match1 :", match2);
                    var courseNum = parseInt(courseInfoMap["courseNum"]);
                    if(courseNum >= match1 && courseNum <= match2){
                        //good
                        if(reqC[i][0] === 1){
                            //take once
                            console.log("SPLICE OUT REEC");
                            reqC.splice(i, 1);
                        }
                        else if(reqC[i][0] === -3){
                            reqC[i][0] = 1 //-3 means can be retaken for credit
                        }
                        else if(reqC[i][0] === -1){
                            //do nothing
                        }
                        return;
                    }
                }
                if(reqC[i][j] === courseInfoMap["department"]+" "+ courseInfoMap["courseNum"]){
                    flag = 1;
                    //delete that degReq
                    if(reqC[i][0] === 1){
                        //take once
                        reqC.splice(i, 1);
                    }
                    else if(reqC[i][0] === -3){
                        reqC[i][0] = 1 //-3 means can be retaken for credit
                    }
                    else if(reqC[i][0] === -1){
                        //do nothing
                    }
                    return;
                }
            }
            //break outer loop
        }
        var electiveC = this.degReqs["Elective Courses"];
        if(flag === 0){
            for(var i = 0; i < electiveC.length; i++){
                //check if course name + number matches
                for(var j = 1; j < electiveC[i].length; j++){
                    if(electiveC[i][j].substring(0,3) !== courseInfoMap["department"]){
                        continue;
                    }
                    if(electiveC[i][j].includes("-")){
                        console.log("----- ", electiveC[i][j]);
                        var regex = /\d{3}/gm;
                        // var regex = /\w{3}/g;
                        var str = electiveC[i][j].match(regex);
                        console.log("MATCHING PATTERN: ", str);
                        if(str == null){
                            continue;
                        }
                        var match1 = parseInt(str[0]); //get lower class #
                        console.log("match1 :", match1);
                        var match2 = parseInt(str[1]); //get higher class #
                        console.log("match2 :", match2);
                        var courseNum = parseInt(courseInfoMap["courseNum"]);
                        if(courseNum >= match1 && courseNum <= match2){
                            //good
                            if(electiveC[i][0] === 1){
                                //take once
                                electiveC.splice(i, 1);
                            }
                            else if(electiveC[i][0] === -3){
                                electiveC[i][0] = 1 //-3 means can be retaken for credit
                            }
                            else if(electiveC[i][0] === -1){
                                //do nothing
                            }
                            else if(electiveC[i][0] > 1){
                                electiveC[i][0] -= 1; //[4, "AMS 542­ - 556"]
                            }
                            return;
                        }
                    }
                    if(electiveC[i][j] === courseInfoMap["department"]+" "+ courseInfoMap["courseNum"]){
                        //delete that degReq
                        if(electiveC[i][0] === 1){
                            //take once
                            electiveC.splice(i, 1);
                        }
                        else if(electiveC[i][0] === -3){
                            electiveC[i][0] = 1 //-3 means can be retaken for credit
                        }
                        else if(electiveC[i][0] === -1){
                            //do nothing
                        }
                        else if(electiveC[i][0] > 1){
                            electiveC[i][0] -= 1; //[4, "AMS 530"]
                        }
                        return;
                    }
                    else if(electiveC[i][j] === courseInfoMap["department"]){
                        if(electiveC[i][0] === 1){
                            //take once
                            electiveC.splice(i, 1);
                        }
                        else if(electiveC[i][0] === -3){
                            electiveC[i][0] = 1 //-3 means can be retaken for credit
                        }
                        else if(electiveC[i][0] === -1){
                            //do nothing
                        }
                        else if(electiveC[i][0] > 1){
                            electiveC[i][0] -= 1; //[4, "AMS"]
                        }
                        return;
                    }
                }
            }
        }
    }



    //check if degree requirements are met
    //TODO what if the student has a plan already
    //looks at degReqs, which is a copy of the student's deg requirements
    degreeReqsSatisfied(){
        //check the degReqs object and see if the req and elective coures is empty
        if(this.degReqs["Required Courses"] === [] && this.degReqs["Elective Courses"] === []){
            return true;
        }
        return false;
    }

    // retrieveCourseInfo = async function (className) {
    //     var courseInfo = null;
    //     className = className.replace(" ", "");
    //     await axios
    //         .get("http://localhost:5000"+ "/courses/get/course/"+className+"/"+this.sem+"/"+this.year)
    //         .then((course) => (courseInfo = course))
    //         .catch((err) => console.log("course error: ", err), courseInfo = undefined);
        
    //     console.log("retrieveCourseInfo: ", courseInfo);
    //     if(courseInfo === undefined || courseInfo["data"] === undefined  || courseInfo["data"].length === 0){//if undefined or doesn't exist
    //         console.log("No courses found");
    //         return null;
    //     }
    //     return courseInfo;
    // }

    //info = course information from db
    //studentMap = map with the student's already taken/taking courses
    //TODO need to test with actual pre reqs
    meetPrereq(info, studentMap){
        console.log("Inside meetPrereq");
        info = info["preReqs"]
        if(info[0].length === 0){ //if no pre reqs
            console.log("No pre-reqs")
            return true;
        } else {
            //get the pre req
            var req = info[0].match("\bw{3}sw{3}");
            for (var i = 0; i < req.length; i++) {
                for (var key of Object.keys(studentMap)) {
                    //go through all courses taken by the student already
                    if (key === req[i]) {
                        //if pre-req is taken by the student already
                        console.log("taken previous");
                        return true;
                    }
                }
            }
            //now we must loop through the courses in the course planner,
            for(var j = 0; j < req.length; j++){
                for (var key of Object.keys(this.coursePl)) {//go through all courses taken by the student already
                    var courses = this.coursePl.get(key)
                    for(var k = 0; k < courses.length; k++){
                        if(courses[k] === req[j]){//if pre-req is taken by the student already
                            console.log("in course plan");
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
    meetTimeReq(course, key){ 
        var arr = this.coursePl[this.sem+" "+this.year];
        console.log("Inside meetTimeReq, ",arr);
        console.log("Class: ", course, " : ", course["courseInfo"].length);
        var timeSlot = [];
        if(course["courseInfo"].length === 0){
            console.log("No valid times");
            return [];
        }
        for(var j = 0; j < course["courseInfo"].length; j++){
            console.log("timeslot4: ", timeSlot);
            if(arr.length === 0){
                timeSlot = [course["courseInfo"][j][0], course["courseInfo"][j][1]];
                console.log("timeslot1: ", timeSlot);
                // this.coursePl[this.sem+" "+this.year][this.coursePl[this.sem+" "+this.year].length] = [timeSlot[0], key, timeSlot[1]];
                return timeSlot;
                // return []
            }
            else {
                for(var i = 0; i < arr.length; i++){
                    if(course["courseInfo"][j] === undefined){
                        return [];
                    }
                    console.log("arr["+i+"], ",arr[i]);
                    if(course["courseInfo"][j][1] !== arr[i][2]){
                        //if there is a time conflict
                        // assuming sections are in order
                        timeSlot = [course["courseInfo"][j][0], course["courseInfo"][j][1]];
                        console.log("timeslot1: ", timeSlot);
                        // this.coursePl[this.sem+" "+this.year][this.coursePl[this.sem+" "+this.year].length] = [timeSlot[0], key, timeSlot[1]];
                        return timeSlot;
                        // return [];
                    }
                }
            }
        }
        
        return [];
    }

    //moves globals sem and year to next semester
    nextSemester(){
        if(this.sem === "Spring"){
            this.sem = "SummerI";
            this.year = this.student["curYear"];
        }
        else if(this.sem === "SummerI"){
            this.sem = "SummerII";
            this.year = this.student["curYear"];
        }
        else if(this.sem === "SummerII"){
            this.sem = "Fall";
            this.year = this.student["curYear"];
        }
        else if(this.sem === "Fall"){ //curSem = Fall
            this.sem = "Spring";
            this.year = String(parseInt(this.student["curYear"]) + 1);
        } else {
            console.log("Invalid semester: nextSemester()");
        }
        //TODO rn i break the algo when we go past the student's assigned grad date
        if(this.sem === this.student["gradSem"] && this.year === this.student["gradYear"]){
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
