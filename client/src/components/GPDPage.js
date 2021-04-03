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
const axios = require("axios").default;

const PATHWAYS_API_URL = "https://sbu-pathways.herokuapp.com";

class GPDPage extends Component {
    constructor(props) {
        super(props);
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
            axios
                .put(
                    PATHWAYS_API_URL +
                        "/student/get/sbuID/" +
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
                        coursePlan: {},
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

    updateStudentGrades = async function (curClassObj, student) {
        var curSemester = curClassObj["semester"] + " " + curClassObj["year"];
        var curItem = [
            curClassObj["section"],
            curClassObj["department"] + " " + curClassObj["course_num"],
            curClassObj["grade"],
        ];
        if (student["coursePlan"][curSemester] === undefined) {
            console.log(student["coursePlan"]);
            student["coursePlan"][curSemester] = [];
            student["coursePlan"][curSemester].push(curItem);
            console.log(student["coursePlan"]);
        } else {
            student["coursePlan"][curSemester].push(curItem);
            console.log(student["coursePlan"]);
        }
        await axios
            .post(
                PATHWAYS_API_URL + "/student/update/" + student["id"],
                student
            )
            .then((cur) => console.log("Added student: ", cur))
            .catch((err) => console.log("Error happened :(", err));
    };

    updateCourses = async function (fileObj) {
        // Find the course, if it exists then update it with new section and time slot
        // If the course doesn't exist then create it with an array of courseInfo
        //
        //
        //
        //
        //
        var newCourse = {};
        fileObj["data"].map((curCourse) => {
            var curClass = null;
            if (Object.keys(curCourse).length === 6) {
                curClass = curCourse["department"] + curCourse["course_num"];
            }
        });
        // axios
        //     .put(
        //         PATHWAYS_API_URL +
        //             "courses/update/classID/" +
        //             curStudent["sbu_id"],
        //         {
        //             firstName: curStudent["first_name"],
        //             lastName: curStudent["last_name"],
        //             id: curStudent["sbu_id"],
        //             email: curStudent["email"],
        //             gpa: 0,
        //             department: curStudent["department"],
        //             track: curStudent["track"],
        //             reqVersionSem: curStudent["requirement_version_semester"],
        //             reqVersionYear: curStudent["requirement_version_year"],
        //             entrySem: curStudent["entry_semester"],
        //             entryYear: curStudent["entry_year"],
        //             gradSem: curStudent["graduation_semester"],
        //             gradYear: curStudent["graduation_year"],
        //             coursePlan: {},
        //             projectOption: " ",
        //             facultyAdvisor: " ",
        //             proficienyReq: [],
        //             degreeRequirements: " ",
        //             curSem: "Spring",
        //             curYear: "2021",
        //             password: curStudent["password"],
        //             graduated: false,
        //             settings: " ",
        //             comments: [],
        //         }
        //     )
        //     .then((cur) => console.log("Added student: ", cur))
        //     .catch((err) => console.log("Error happened :(", err));
    };
    // student course plan file
    addCourseGrades = async function (fileObj) {
        var curData = fileObj["data"];
        for (let i = 0; i < curData.length; i++) {
            await axios
                .get(PATHWAYS_API_URL + "/student/get/" + curData[i]["sbu_id"])
                .then((student) =>
                    this.updateStudentGrades(curData[i], student["data"])
                )
                .catch((err) => console.log("Error: ", err));
        }
    };

    checkFile(results) {
        // NOTE  Courses CSV has 6 elements in each object (row), Student CSV has 13, Course Grades has 7
        var firstHeaderLen = Object.keys(results["data"][0]).length;
        switch (firstHeaderLen) {
            case 6: // Courses CSV
                this.updateCourses(results);
                break;
            case 7: // Course Grades CSV
                this.addCourseGrades(results);
                break;
            case 13: // Students CSV
                this.addStudents(results);
                break;
            default:
                console.log("File format is wrong");
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
        axios.delete(PATHWAYS_API_URL + "/student/remove");
        console.log("All Student Data Deleted");
    }

    render() {
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
