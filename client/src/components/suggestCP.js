import Config from "../config.json";
import React, { Component } from "react";
import { Button } from "@material-ui/core";
// import { useLocation } from "react-router-dom"

const axios = require("axios").default;

class coursePlan extends Component {
    constructor(props) {
        super(props);
        // GetStudent();
        // this.student = location.state.student;
        this.student = this.props.location.student["row"]
        this.courseP = new Map(); //course plans
        this.year = 2020 //default year for now
        this.sem = "Spring" //default semes
        //used as globals for suggest course algo when adding classes
        if(this.student["curSem"] == "Spring"){
            this.sem = "SummerI";
            this.year = this.student["curYear"];
        }
        else if(this.student["curSem"] == "SummerI"){
            this.sem = "SummerII";
            this.year = this.student["curYear"];
        }
        else if(this.student["curSem"] == "SummerII"){
            this.sem = "Fall";
            this.year = this.student["curYear"];
        }
        else { //curSem = Fall
            this.sem = "Spring";
            this.year = String(parseInt(this.student["curYear"]) + 1);
        }
        this.coursesAdded = 0;
        this.maxCoursesAllowed = 4; //default is 4
    }

    smartCoursePlan = () => {
        this.obtainStudents();
    }

    coursePlanConstraints(){

    }

    obtainStudents = async function() {
        var jsonT
        //retrieve students that match department and track criteria
        await axios
            .get("http://localhost:5000" + "/student/get/"+this.student["department"]+"/"+this.student["track"])
            .then((ret) => jsonT = ret)
            .catch((err) => console.log(err));
        console.log("jsonT:", jsonT["data"]);
        var len = Object.keys(jsonT["data"]).length; //find length of this json object
        console.log("len: ", len);
        var similarlityScores = new Map(); //store similarity scores
        var map = new Map(); //map to store cur student's courses taken

        // adds each course the student took to this list
        for (var key of Object.keys(this.student["coursePlan"])) {
            // console.log(key + " -> " + this.student["coursePlan"][key])
            this.student["coursePlan"][key].forEach(element => {
                if(map[element[1]] === undefined){
                    map[element[1]] = 1 //default value of 1 for now
                }
                else {
                    map[element[1]] += 1; //add one to signify taking the class more than once
                    //TODO might have issue if student fails a class then retakes?
                }
            });
        }

        console.log("map: ", map); //TODO good up to here

        //calculate similarity scores based on map
        for(var i = 0; i < len; i++){
            var score = 0;
            if(jsonT["data"][i]["graduated"] === true){ //if student graduated, proceed
                for (var key of Object.keys(this.student["coursePlan"])) {
                    jsonT["data"][i]["coursePlan"][key].forEach(element => {
                        if(map[element[1]] !== undefined){ //TODO check over
                            score += 1;
                        }
                        else {
                            
                        }
                    });
                }
            }
            similarlityScores[i] = score; //add each score to a map
        }

        console.log("sim scores: ", similarlityScores);

        var keysSorted = Object.keys(similarlityScores).sort(function(a,b){return similarlityScores[b]-similarlityScores[a]})
        console.log(keysSorted); //sorts with most similar in front
        this.calculateClasses(keysSorted, jsonT["data"], map);
    }
    //keysSorted = array with indexes from most similar to least similar
    //data = javascript object with other student's data (same dep and same track and graduated)
    calculateClasses(keysSorted, data, studentMap){
        var classesMap = new Map();
        //goes through all students and calculates the occurences of each course
        keysSorted.forEach(element => { //TODO change to only first 100 
            console.log("each element: ", data[element]); //TODO works
            
            for (var val of Object.values(data[element]["coursePlan"])) {
                val.forEach(function(element){
                    if(!classesMap.has(element[1])){ //if class has not been added to map yet
                        classesMap.set(element[1], 0);
                    }
                    else {//if class has been added to map already
                        classesMap.set(element[1], classesMap.get(element[1])+1 );
                    }
                })
            }
            console.log("classesMap: ", classesMap);
        })
        console.log("classesMap: ", classesMap);
        classesMap[Symbol.iterator] = function* () { //sorts the courses so highest occurrence at top
            yield* [...this.entries()].sort((a, b) => b[1] - a[1]);
        }
        for (let [key, value] of classesMap) {     // get data in descending (large -> small) sorted
            console.log(key + ' ' + value);
            this.addCourse(key, studentMap);
        }
        console.log("sorted list of classes by occurrences: ", classesMap);
    }
    //studentMap = //map to store cur student's courses taken
    addCourse(key, studentMap){
        //check pre-reqs and time constraints
        if(studentMap[key] !== undefined){ //this means the course in question has already been taken by the student
            return;
        }
        else{//now we attempt to add the course to courseP, which is our coursePlan for the student
            //lets say 4 classess is max per semester //TODO summer courses?
            if(this.maxCoursesAllowed == this.coursesAdded){//so we've reached max courses in a sem, move to next
                this.nextSemester();
                this.coursesAdded = 0;
            }
            if(this.courseP[this.sem+" "+this.year] == undefined){
                this.courseP[this.sem+" "+this.year] = []
            }
            //check for prereqs and time constraints here **
            var courseInfo = this.retrieveCourseInfo(studentMap[key]); //gets the course info from db
            //
            var status = this.meetPrereq(courseInfo[0], studentMap);
            if(status){ //if pre req is not met, do not attempt to add course
                return; 
            }
            // this.courseP[this.sem+" "+this.year].push 
        }
        this.coursesAdded += 1;
        //after a class is added, check if deg reqs are done
        if(this.degreeReqsSatisfied()){
            //return a course plan ()
            return this.courseP;
        }
    }
    

    //check if degree requirements are met
    //TODO what if the student has a plan already
    //TODO how would we remove from the student's degree req??
    degreeReqsSatisfied(){
        //combine student's current plans  with courseP

    }

    retrieveCourseInfo = async function (className) {
        var courseInfo = undefined;
        var arr = className.split(" ");
        var dep = arr[0];
        var idNumber = arr[1];
        await axios
            .get("http://localhost:5000"+ "/get/course/"+dep+"/"+idNumber)
            .then((course) => courseInfo = course)
            .catch((err) => console.log("course error: ", err));
        if(courseInfo === undefined){
            //errir
        }
        return courseInfo;
        //else keep going
        
    }
    //info = course information from db
    //studentMap = map
    meetPrereq(info, studentMap){
        console.log("Inside meetPrereq");
        if(info[0].length == 0){ //if no pre reqs
            return true;
        }
        else {
            //get the pre req
            var req = info[0].match('\b\w{3}\s\w{3}');
            for(var i = 0; i < req.length; i++){
                for (var key of Object.keys(studentMap)) {//go through all courses taken by the student already
                    if(key === req[i]){//if pre-req is taken by the student already
                        return true;
                    }
                }
            }
            //now we must loop through the courses in the course planner,
            for(var i = 0; i < req.length; i++){
                for (var key of Object.keys(this.courseP)) {//go through all courses taken by the student already
                    if(key === req[i]){//if pre-req is taken by the student already
                        return true;
                    }
                }
            }
        }
    }

    meetTimeReq(){

    }

    //moves globals sem and year to next semester
    nextSemester(){
        if(this.sem == "Spring"){
            this.sem = "SummerI";
            this.year = this.student["curYear"];
        }
        else if(this.sem == "SummerI"){
            this.sem = "SummerII";
            this.year = this.student["curYear"];
        }
        else if(this.sem == "SummerII"){
            this.sem = "Fall";
            this.year = this.student["curYear"];
        }
        else if(this.sem == "Fall"){ //curSem = Fall
            this.sem = "Spring";
            this.year = String(parseInt(this.student["curYear"]) + 1);
        }
        else {
            console.log("Invalid semester: nextSemester()");
        }
    }

    printStudent = (e) => {
        e.preventDefault();
        console.log(this.student);
    }

    render(){
        return (
            <div> 
                <Button onClick={this.printStudent} > Hello World</Button>
                <Button onClick={this.smartCoursePlan}> Smart Mode</Button>
                <Button onClick={this.coursePlanConstraints}> Manual Mode</Button>
            </div>
        );
    }
}

export default coursePlan;