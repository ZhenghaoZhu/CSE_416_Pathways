import Config from "../config.json";
import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { useLocation } from "react-router-dom"

const axios = require("axios").default;

const curID = null

// function GetStudent() {
//     let location = useLocation();
//     console.log(location)
//   }

class coursePlan extends Component {
    constructor(props) {
        super(props);
        // GetStudent();
        // this.student = location.state.student;
        this.student = this.props.location.student["row"]
    }

    smartCoursePlan() {
        var allStudents = this.obtainStudents();
    }

    coursePlanConstraints(){

    }

    obtainStudents = async function(department, track) {
        // var jsonT
        // //retrieve students that match department and track criteria
        // await axios
        //     .get("http://localhost:5000" + "/student/get/"+department+"/"+track)
        //     .then((ret) => jsonT = ret)
        //     .catch((err) => console.log(err));

        // var len = Object.keys(jsonT).length; //find length of this json object
        // console.log("len: ", len);
        // var similarlityScores = []; //store similarity scores
        // var map = new Map(String, Number); //map to store cur student's courses taken

        // // adds each course the student took to this list
        // for (let [key, value] of this.student["coursePlan"]) {
        //     array.forEach(element => {
        //         if(map[element[1]] === undefined){
        //             map[element[1]] = 1 //default value of 1 for now
        //         }
        //         else {
        //             map[element[1]] += 1; //add one to signify taking the class more than once
        //             //TODO might have issue if student fails a class then retakes?
        //         }
        //     }); (this.student["coursePlan"][key])
        // }


        // //calculate similarity scores based on map
        // for(var i = 0; i < len; i++){
        //     var score = 0;
        //     if(jsonT[i]["graduated"] === true){ //if student graduated, proceed
        //         for (let [key, value] of jsonT[i]["coursePlan"]) {
        //             array.forEach(element => {
        //                 if(map[element[1]] !== undefined){ //TODO check over
        //                     score += 1;
        //                 }
        //                 else {
                            
        //                 }
        //             }); (jsonT[i]["coursePlan"][key])
        //         }
        //     }
        //     similarlityScores.push(score);
        // }

    }

    

    //check if degree requirements are met
    degreeReqsSatisfied(){

    }

    printStudent = (e) => {
        e.preventDefault();
        console.log(this.student);
    }

    render(){
        return (
            <div> 
                <Button onClick={this.printStudent} > Hello World</Button>
                <Button onClick={this.coursePlanConstraints}> Smart Mode</Button>
                <Button onClick={this.smartCoursePlan}> Manual Mode</Button>
            </div>
        );
    }
}

export default coursePlan;