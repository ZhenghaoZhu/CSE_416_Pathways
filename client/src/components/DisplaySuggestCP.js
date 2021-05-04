import React, { Component } from "react";
import { DataGrid } from "@material-ui/data-grid";
import SearchBar from "material-ui-search-bar";
import { Box, Button, ButtonGroup } from "@material-ui/core";
import GPDHeader from "./GPDHeader";
import Config from "../config.json";
import * as helper from "./SuggestCoursePlanFunctions";

const axios = require("axios").default;

var columns = [
    { field: "department", headerName: "Department", width: 130 },
    { field: "courseNum", headerName: "Course Number", width: 160 },
    { field: "year", headerName: "Year", width: 100 },
    { field: "semester", headerName: "Semester", width: 130 },
    { field: "credits", headerName: "Credits", type: "number", width: 100 },
    { field: "timeSlot", headerName: "Time Slot", width: 200 },
];

var refresh = 0;
class DisplaySuggestCP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectionModel: [],
            courseList: [],
            coursePlanObj: this.props.history.location.newCoursePlan,
            student: this.props.history.location.focusStudent,
        };
        this.curDegreeTrack = this.state.student["degreeRequirements"]["tracks"][this.state.student["track"]];
        this.addSelectedCourses = [];
        this.coursesWithSems = [];
        this.constructCourseList();
        console.log("STUDENT: ", this.state["student"]);
    }

    constructCourseList() {
        // console.log(this.state);
        axios
            .get(Config.URL + "/student/")
            .then((response) => {
                var coursePlan = this.state.coursePlanObj;
                var newCourseList = [];
                for (const [curSem, curCourses] of Object.entries(coursePlan)) {
                    // console.log("curCOurses:", curCourses);
                    var curCourseBuild = {};
                    var courseNameSplit = undefined;
                    var semSplit = curSem.split(" ");
                    curCourses.forEach((curCourse) => {
                        courseNameSplit = curCourse[1].split(" ");
                        curCourseBuild["id"] = courseNameSplit[0] + " " + courseNameSplit[1] + " " + curSem;
                        curCourseBuild["department"] = courseNameSplit[0];
                        curCourseBuild["courseNum"] = courseNameSplit[1];
                        curCourseBuild["semester"] = semSplit[0];
                        curCourseBuild["year"] = semSplit[1];
                        curCourseBuild["credits"] = curCourse[3];
                        curCourseBuild["timeSlot"] = curCourse[2];
                        newCourseList.push(curCourseBuild);
                        curCourseBuild = {};
                    });
                }
                this.setState({
                    courseList: newCourseList,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    setSelectionModel(selection) {
        this.addSelectedCourses = [];
        this.coursesWithSems = selection;
        console.log("student: ", this.state["student"]);
        for (var i = 0; i < selection.length; i++) {
            this.addSelectedCourses.push(selection[i].substring(0, 7));
            console.log(selection[i]);
        }
        console.log(this.addSelectedCourses);
        console.log(selection);
    }

    addCourses = () => {
        var curDegreeReq = this.state.student["degreeRequirements"];
        var currentTrack = this.state.student["track"];
        var curTrackMap = curDegreeReq["tracks"][currentTrack];
        console.log("before: ", curDegreeReq["tracks"][currentTrack]);
        var degTrack = helper.returnNewTrack(this.addSelectedCourses, curTrackMap);
        curDegreeReq["tracks"][currentTrack] = degTrack;
        console.log("after: ", curDegreeReq["tracks"][currentTrack]);

        var newCoursePlan = this.state.student["coursePlan"];
        this.coursesWithSems.forEach((curCourse) => {
            var curClass = curCourse.substring(0, 7);
            var curSem = curCourse.substring(8);
            if (newCoursePlan[curSem] === undefined) {
                newCoursePlan[curSem] = [];
            }
            newCoursePlan[curSem].push(["", curClass, ""]);
        });
        this.state.student["coursePlan"] = newCoursePlan;
        this.state.student["graduated"] = curTrackMap["Elective Courses"].length === 0 && curTrackMap["Required Courses"].length === 0;
        axios
            .post(Config.URL + "/student/update/" + this.state.student["id"], this.state.student)
            .catch((err) => console.log("Unable to update student deg reqs"));
    };
    render() {
        // console.log(this.state);
        if (refresh < 30) {
            this.constructCourseList();
            refresh += 1;
        }
        return (
            <div>
                <GPDHeader />
                <h1 style={{ textAlign: "center" }}>Suggested Course Plan</h1>
                <Box
                    style={{
                        height: 650,
                        width: "60%",
                        marginBottom: 100,
                        margin: "auto",
                        marginTop: 50,
                        backgroundColor: "#f1f0f0",
                    }}
                >
                    <DataGrid
                        rows={this.state.courseList}
                        columns={columns}
                        pageSize={15}
                        disableSelectionOnClick={true}
                        autoPageSize={true}
                        checkboxSelection
                        onSelectionModelChange={(newSelection) => {
                            this.setSelectionModel(newSelection.selectionModel);
                        }}
                        selectionModel={this.state.selectionModel}
                        // loading={this.state.studentFilter.length === 0}
                    />
                    <Button
                        onClick={this.addCourses}
                        variant="contained"
                        color="secondary"
                        style={{
                            margin: "auto",
                            marginTop: 20,
                            marginLeft: "75%",
                        }}
                    >
                        Accept Selected Courses
                    </Button>
                </Box>
            </div>
        );
    }
}

export default DisplaySuggestCP;
