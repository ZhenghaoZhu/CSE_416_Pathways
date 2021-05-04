import React, { Component } from "react";
import { DataGrid } from "@material-ui/data-grid";
import SearchBar from "material-ui-search-bar";
import { Box, Button, ButtonGroup } from "@material-ui/core";
import GPDHeader from "./GPDHeader";
import Config from "../config.json";

const axios = require("axios").default;

var columns = [
    { field: "department", headerName: "Department", width: 130 },
    { field: "courseNum", headerName: "Course Number", width: 160 },
    { field: "year", headerName: "Year", width: 100 },
    { field: "semester", headerName: "Semester", width: 130 },
    { field: "credits", headerName: "Credits", type: "number", width: 100 },
    { field: "timeSlot", headerName: "Time Slot", width: 200 },
];

class DisplaySuggestCP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectionModel: [],
            courseList: [],
            refresh: false,
            coursePlanObj: this.props.history.location.newCoursePlan,
        };
        this.constructCourseList();
    }

    constructCourseList() {
        console.log(this.state);
        axios
            .get(Config.URL + "/student/")
            .then((response) => {
                var coursePlan = this.state.coursePlanObj;
                var newCourseList = [];
                for (const [curSem, curCourses] of Object.entries(coursePlan)) {
                    var curCourseBuild = {};
                    var courseNameSplit = undefined;
                    var semSplit = curSem.split(" ");
                    curCourses.forEach((curCourse) => {
                        courseNameSplit = curCourse[1].split(" ");
                        curCourseBuild["id"] = courseNameSplit[0] + courseNameSplit[1];
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
                    refresh: true,
                    courseList: newCourseList,
                });
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(console.log(this.state));
    }

    // setSelectionModel(selection) {
    //     let result = [];
    //     for (var i = 0; i < selection.length; i++) {
    //         for (var j = 0; j < suggestCourses.length; j++) {
    //             if (suggestCourses[j].id === selection[i]) {
    //                 var arr = [selection[i], suggestCourses[j].semester, suggestCourses[j].year];
    //                 result.push(arr);
    //             }
    //         }
    //     }
    //     this.setState({ selectionModel: selection });
    //     this.setState({ courseList: result });
    // }
    addSelectedCourses() {
        // TODO: ADD Selected coures here.
        console.log(this.state);
    }
    render() {
        console.log(this.state);
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
                        onClick={() => this.addSelectedCourses()}
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
