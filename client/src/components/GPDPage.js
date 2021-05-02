import React, { Component } from "react";
import GPDHeader from "./GPDHeader";
import StudentTable from "./StudentTable";
import StudentDetail from "./StudentDetail";
import { Grid, Button, ButtonGroup, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import FileUploadArea from "./FileUploadArea";
import Config from "../config.json";
import SuggestCourse from "./suggestCP";

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
            curDepartment: this.props.location.curDep,
        };
        if (this.state.curDepartment === undefined) {
            if (localStorage.getItem("curDepartment") != undefined) {
                this.state.curDepartment = localStorage.getItem("curDepartment");
                console.info(this.state);
            } else {
                this.state.curDepartment = "AMS";
            }
        }
        localStorage.setItem("curDepartment", this.state.curDepartment);
    }

    updateStudent(fileObj, student, i) {
        // axios.post(
    }

    deleteAllStudents = (e) => {
        e.preventDefault();
        axios.delete(Config.URL + "/student/remove/dep/" + this.state.curDepartment);
        console.log("All Student Data Deleted");
    };

    sendStudentData = (e) => {
        e.preventDefault();
        console.log("sendStudentData()");
        this.props.history.push({
            pathname: "/suggestCourse",
            student: this.state["focusStudent"],
        });
    };
    render() {

        let disabled = this.state.focusStudent === undefined?true:false;
        return (
            <>
                <GPDHeader curGPD={this.state.curGPD} />
                <Grid container spacing={1}>
                    <Grid item xs={8}>
                        <StudentTable
                            focusStudent={this.state.focusStudent}
                            changeFocusStudent={(newStudent) => this.setState({ focusStudent: newStudent })}
                            curDepartment={this.state.curDepartment}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <Box style={{ width: "95%" }}>
                            <StudentDetail focusStudent={this.state.focusStudent} />
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
                                <Button  disabled = {disabled}>
                                    <Link
                                        to={{
                                            pathname: "/editStudent",
                                            focusStudent: this.state.focusStudent,
                                        }}
                                        style={{
                                            textDecoration: "none",
                                            color: "inherit",
                                        }}
                                    >
                                        Edit Student
                                    </Link>
                                </Button>
                                <Button onClick={this.sendStudentData}>
                                    <Link
                                        to={{
                                            pathname: "/suggestCourse",
                                            state: { curGPD: this.state.curGPD },
                                        }}
                                        style={{
                                            textDecoration: "none",
                                            color: "inherit",
                                        }}
                                    >
                                        Suggest Course Plan
                                    </Link>
                                </Button>
                                <Button onClick={this.deleteAllStudents}>Delete All </Button>
                            </ButtonGroup>
                        </Box>
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default GPDPage;
