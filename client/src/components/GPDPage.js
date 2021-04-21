import React, { Component } from "react";
import GPDHeader from "./GPDHeader";
import StudentTable from "./StudentTable";
import StudentDetail from "./StudentDetail";
import { Grid, Button, ButtonGroup, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import FileUploadArea from "./FileUploadArea";
import Config from "../config.json";

const Papa = require("papaparse");
const fs = require("fs");
const axios = require("axios").default;

class GPDPage extends Component {
    constructor(props) {
        super(props);
        // if (this.props.location.loggedInGPD === undefined) {
        //     this.props.history.push({
        //         pathname: "/login",
        //     });
        // }
        this.state = {
            focusStudent: this.props.focusStudent,
            curGPD: this.props.location.loggedInGPD,
        };
        console.log(this.state);
    }
    add(fileObj) {
        for (var i = 0; i < fileObj["data"].length; i++) {
            console.log(i, fileObj["data"][i]);
            console.log("ID", fileObj["data"][i]["sbu_id"]);
            var track = " ";
            if (fileObj["data"][i]["track"] !== "") {
                track = fileObj["data"][i]["track"];
            }
            axios
                .put(
                    Config.URL +
                        "/student/get/sbuID/" +
                        fileObj["data"][i]["sbu_id"],
                    {
                        firstName: fileObj["data"][i]["first_name"],
                        lastName: fileObj["data"][i]["last_name"],
                        id: fileObj["data"][i]["sbu_id"],
                        email: fileObj["data"][i]["email"],
                        gpa: 0,
                        department: fileObj["data"][i]["department"],
                        track: track,
                        reqVersionSem:
                            fileObj["data"][i]["requirement_version_semester"],
                        reqVersionYear:
                            fileObj["data"][i]["requirement_version_year"],
                        entrySem: fileObj["data"][i]["entry_semester"],
                        entryYear: fileObj["data"][i]["entry_year"],
                        gradSem: fileObj["data"][i]["graduation_semester"],
                        gradYear: fileObj["data"][i]["graduation_year"],
                        coursePlan: { pastCourses: [], currentCourses: [] },
                        projectOption: " ",
                        facultyAdvisor: " ",
                        proficienyReq: [],
                        degreeRequirements: " ",
                        password: fileObj["data"][i]["password"],
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
                    "http://localhost:5000/student/get/" +
                        fileObj["data"][i]["sbu_id"]
                )
                .then((student) => this.updateStudent(fileObj, student, i))
                .catch((err) => console.log("Error: ", err));
        }
    }

    updateStudent(fileObj, student, i) {
        // axios.post(
    }

    addCourse(course) {
        var depID = course["courseName"].split(" ");
        course["courseNum"] = depID[1].substring(0, depID[1].length - 1);
        course["name"] = course["courseName"].split(": ")[1];
        course["department"] = depID[0];
        // console.log(course);
        //fix course Num to delete colon :
        //fix course name, ID, courseNum
        // remove the \r\n

        axios
            .post(Config.URL + "courses/add", {
                department: course["department"],
                courseNum: course["courseNum"],
                courseName: course["name"],
                credits: course["numOfCredits"],
                preReqs: [course["prerequisites"]],
                courseDescription: course["description"],
                yearTrends: {},
                courseInfo: {},
                professorNames: {},
            })
            .then((course) => console.log("Course added", course))
            .catch((err) => console.log(err));
    }

    checkFile(results) {
        console.log("coursenum: ", results["data"][0]["course_num"]);
        if (results["data"][0]["course_num"] == null) {
            this.add(results);
        } else {
            this.addCourseGrades(results); //TODO import course grades, student course plan file
        }
    }

    fileParse(files) {
        if (files[0].file.type === "text/plain") {
            // parse the course information
            let file = files[0].file;
            let reader = new FileReader();

            const self = this;
            reader.onload = function () {
                let textFile = reader.result;
                // parse
                let course_array = textFile.match(
                    /^[A-Z]{3} \d{3}: (.+(\r?\n){1,2})+/gm
                );
                const courses = course_array.map((course) => {
                    let course_fields = course.match(/(.+(\r?\n))+/gm);
                    let courseName = course_fields[0];
                    let description = course_fields[1];
                    let prerequisites = ["None"];
                    let numOfCredits = null;

                    let matches = course.match(/\d{1}(\-\d+)? credit/);
                    let creditNum = matches === null ? "" : matches[0];
                    if (!creditNum.includes("-")) {
                        // single digit credit
                        numOfCredits = creditNum[0];
                    } else {
                        // range of credit exp 0-12
                        if (creditNum.length === 10) {
                            numOfCredits = creditNum.substring(0, 3);
                        } else if (creditNum.length === 11) {
                            numOfCredits = creditNum.substring(0, 4);
                        }
                    }

                    let prereq_match = course.match(/Prerequisite.+/);
                    let prereq_text =
                        prereq_match === null ? "" : prereq_match[0];

                    if (course.toLowerCase().includes("prerequisite")) {
                        prerequisites = prereq_text
                            .substring(prereq_text.indexOf(":") + 2)
                            .split(",");
                    }
                    // console.log(prerequisites);
                    return {
                        courseName,
                        description,
                        numOfCredits,
                        prerequisites,
                    };
                });
                // console.log(courses);
                courses.map((course) => self.addCourse(course));
            };
            reader.onerror = function () {
                console.log(reader.error);
            };
            reader.readAsText(file);
        }
    }

    onSub(e) {
        e.preventDefault();
        axios.delete(Config.URL + "student/remove");
        console.log("All Student Data Deleted");
    }

    render() {
        return (
            <Box style={{ width: "99.82%" }}>
                <GPDHeader curGPD={this.state.curGPD} />
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
                            <FileUploadArea />
                            <ButtonGroup
                                variant="contained"
                                style={{
                                    color: "#000000",
                                    marginTop: 13,
                                }}
                            >
                                <Button>Import Student</Button>
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
