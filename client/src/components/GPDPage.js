import React, { Component } from "react";
import GPDHeader from "./GPDHeader";
import StudentTable from "./StudentTable";
import StudentDetail from "./StudentDetail";
import { DropzoneAreaBase } from "material-ui-dropzone";
import { Grid, Button, ButtonGroup, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
// import Dropzone from "react-dropzone";
// import { CSVReader } from 'react-papaparse'
// import AddStudent from "./AddStudent";

const Papa = require("papaparse");
const fs = require("fs");
const axios = require("axios").default;

class GPDPage extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.focusStudent);
        var curStudent = this.props.focusStudent;
        this.state = {
            focusStudent: {
                curStudent,
            },
        };
        this.counter = 0;
    }

    addStudents(fileObj) {
        var curStudent = null;
        for (var i = 0; i < fileObj["data"].length; i++) {
            curStudent = fileObj["data"][i];
            console.log(curStudent);
            if (curStudent["track"] === "") {
                curStudent["track"] = " ";
            }
<<<<<<< HEAD
            axios.put("http://localhost:5000/student/get/sbuID/"+fileObj["data"][i]["sbu_id"], {
                "firstName": fileObj["data"][i]["first_name"],
                "lastName": fileObj["data"][i]["last_name"],
                "id": fileObj["data"][i]["sbu_id"],
                "email": fileObj["data"][i]["email"],
                "gpa": 0,
                "department": fileObj["data"][i]["department"],
                "track": track,
                "reqVersionSem": fileObj["data"][i]["requirement_version_semester"],
                "reqVersionYear": fileObj["data"][i]["requirement_version_year"],
                "entrySem": fileObj["data"][i]["entry_semester"],
                "entryYear": fileObj["data"][i]["entry_year"],
                "gradSem": fileObj["data"][i]["graduation_semester"],
                "gradYear" : fileObj["data"][i]["graduation_year"],
                "coursePlan": {"pastCourses": {}, "currentCourses": {"Spring2021": [["AMS","537","Stuff"]]}, "futureCourses": {}, "invalidCourses": {}  },
                "projectOption": " ",
                "facultyAdvisor": " ",
                "proficienyReq": [],
                "degreeRequirements": " ",
                "password": fileObj["data"][i]["password"],
                "graduated": false,
                "settings": " ",
                "comments": []
            })
            .then((cur) => console.log("Added student: ", cur))
            .catch((err) => console.log("Error happened :(", err))
        }
    }
    // student course plan file
    addCourseGrades(fileObj){
        var i = 0
        for(i; i < fileObj["data"].length; i++){
            // console.log("Student ID:", fileObj["data"][i]["sbu_id"]);
            axios.get("http://localhost:5000/student/get/"+fileObj["data"][i]["sbu_id"])
            .then((student) =>  this.updateStudent(fileObj["data"][this.counter], student["data"]))
            .catch((err) => console.log("Error: ", err));
=======
            axios
                .put(
                    "https://sbu-pathways.herokuapp.com/student/get/sbuID/" +
                        curStudent["sbu_id"],
                    {
                        firstName: curStudent["first_name"],
                        lastName: curStudent["last_name"],
                        id: curStudent["sbu_id"],
                        email: curStudent["email"],
                        gpa: 0,
                        department: curStudent["department"],
                        track: curStudent["track"],
                        reqVersionSem:
                            curStudent["requirement_version_semester"],
                        reqVersionYear: curStudent["requirement_version_year"],
                        entrySem: curStudent["entry_semester"],
                        entryYear: curStudent["entry_year"],
                        gradSem: curStudent["graduation_semester"],
                        gradYear: curStudent["graduation_year"],
                        coursePlan: { pastCourses: [], currentCourses: [] },
                        projectOption: " ",
                        facultyAdvisor: " ",
                        proficienyReq: [],
                        degreeRequirements: " ",
                        curSem: "Spring",
                        curYear: "2021",
                        password: curStudent["password"],
                        graduated: false,
                        settings: " ",
                        comments: [],
                    }
                )
                .then((cur) => console.log("Added student: ", cur))
                .catch((err) => console.log("Error happened :(", err));
        }
    }
    // student course plan file
    addCourseGrades(fileObj) {
        var i = 0;
        for (i; i < fileObj["data"].length; i++) {
            axios
                .get(
                    "https://sbu-pathways.herokuapp.com/student/get/" +
                        fileObj["data"][i]["sbu_id"]
                )
                .then((student) => this.updateStudent(fileObj, student, i))
                .catch((err) => console.log("Error: ", err));
>>>>>>> 0104d242578454676c6765670e4fafbc90bc633b
        }
        this.counter = 0; //reset counter
    }
    // this.updateStudent(fileObj["data"], student, i)

<<<<<<< HEAD
    updateStudent(fileObj, student){
        this.counter += 1;
        if(fileObj["year"] < 2021){
            if(student["coursePlan"]["pastCourses"][fileObj["semester"]+fileObj["year"]] === undefined){
                student["coursePlan"]["pastCourses"][fileObj["semester"]+fileObj["year"]] = [];
            }
            student["coursePlan"]["pastCourses"][fileObj["semester"]+fileObj["year"]].push([fileObj["department"],fileObj["course_num"],fileObj["grade"]])
        }
        else if(fileObj["year"] > 2021){
            if(student["coursePlan"]["futureCourses"][fileObj["semester"]+fileObj["year"]] === undefined){
                student["coursePlan"]["futureCourses"][fileObj["semester"]+fileObj["year"]] = [];
            }
            student["coursePlan"]["futureCourses"][fileObj["semester"]+fileObj["year"]].push([fileObj["department"],fileObj["course_num"],fileObj["grade"]])
        }
        else{
            if(fileObj["semester"] === "Fall"){ //Fall 2021
                if(student["coursePlan"]["futureCourses"]["Fall2021"] === undefined){
                    student["coursePlan"]["futureCourses"]["Fall2021"] = [];
                }
                student["coursePlan"]["futureCourses"]["Fall2021"].push([fileObj["department"],fileObj["course_num"],fileObj["grade"]])
            }
            else if(fileObj["semester"] === "Spring"){ //Spring 2021
                if(student["coursePlan"]["currentCourses"]["Spring2021"] === undefined){
                    student["coursePlan"]["currentCourses"]["Spring2021"] = [];
                }
                student["coursePlan"]["currentCourses"]["Spring2021"].push([fileObj["department"],fileObj["course_num"],fileObj["grade"]])
            }
            else{
                if(student["coursePlan"]["futureCourse"]["Summer2021"] === undefined){
                    student["coursePlan"]["futureCourse"]["Summer2021"] = [];
                }
                student["coursePlan"]["futureCourse"]["Summer2021"].push([fileObj["department"],fileObj["course_num"],fileObj["grade"]])
                console.log("Invalid semester? Or maybe summer")
            }
        }
        axios.post("http://localhost:5000/student/update/"+student["id"], {
            coursePlan: student["coursePlan"]
        })
        .then((log) => console.log(log))
        .catch((err) => console.log("Update unsuccessful: ", err));
    }

    checkFile(results){
        // console.log("coursenum: ", results["data"][0]["course_num"])
        if(results["data"][0]["course_num"] == null){
            this.add(results);
        }
        else{
=======
    updateStudent(fileObj, student, i) {
        // axios.post(
    }

    checkFile(results) {
        console.log("coursenum: ", results["data"][0]["course_num"]);
        if (results["data"][0]["course_num"] == null) {
            this.addStudents(results);
        } else {
>>>>>>> 0104d242578454676c6765670e4fafbc90bc633b
            this.addCourseGrades(results); //TODO import course grades, student course plan file
        }
    }

    fileParse(file) {
        console.log(file);
        for (var i = 0; i < file.length; i++) {
            Papa.parse(file[i]["file"], {
                header: true,
                complete: (results) => this.checkFile(results),
            });
        }
    }

    onSub(e) {
        e.preventDefault();
        axios.delete("https://sbu-pathways.herokuapp.com/student/remove");
        console.log("All Student Data Deleted");
    }

    render() {
        console.log(this.state.focusStudent);
        return (
            <Box style={{ width: "99.82%" }}>
                <GPDHeader />
                <Grid container spacing={1}>
                    <Grid item xs={8}>
                        <StudentTable
                            focusStudent={this.state.focusStudent}
                            changeFocusStudent={(newStudent) =>
                                this.setState({ focusStudent: newStudent })
                            }
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <Box style={{ width: "95%" }}>
                            <StudentDetail
                                focusStudent={this.state.focusStudent}
                            />
                            <DropzoneAreaBase
                                onAdd={(newFiles) => this.fileParse(newFiles)}
                                filesLimit={5}
                                showPreviewsInDropzone={false}
                                showFileNames={true}
                            />

                            <ButtonGroup
                                variant="contained"
                                style={{
                                    color: "#000000",
                                    marginTop: 13,
                                }}
                            >
                                <Button>View Student File</Button>
                                <Button>
                                    <Link
                                        to="/addStudent"
                                        style={{
                                            textDecoration: "none",
                                            color: "inherit",
                                        }}
                                    >
                                        Add Student Form
                                    </Link>
                                </Button>
                                <Button>
                                    <Link
                                        to="/editStudent"
                                        style={{
                                            textDecoration: "none",
                                            color: "inherit",
                                        }}
                                    >
                                        Edit Student
                                    </Link>
                                </Button>
                                <Button>Suggest Course Plan</Button>
                                <Button onClick={this.onSub}>
                                    Delete All{" "}
                                </Button>
                            </ButtonGroup>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

export default GPDPage;
