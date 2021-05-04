import React, { Component } from "react";
import { DataGrid } from "@material-ui/data-grid";
import SearchBar from "material-ui-search-bar";
import Box from "@material-ui/core/Box";
import Config from "../config.json";

const axios = require("axios").default;

var columns = [
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    { field: "department", headerName: "Department", width: 130 },
    { field: "track", headerName: "Track", width: 200 },
    { field: "gpa", headerName: "GPA", type: "number", width: 80 },
    { field: "projectOption", headerName: "Project Option", width: 190 },
    { field: "entryYear", headerName: "Entry Year", width: 130 },
    { field: "gradYear", headerName: "Graduating Year", width: 160 },
    { field: "graduated", headerName: "Satisfies Requirements", width: 120 },
];

class StudentTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curStudents: [],
            studentFilter: [],
            dataGridLoading: true,
            department: this.props.curDepartment,
        };
        this.getStudents();
    }

    getStudents() {
        axios
            .get(Config.URL + "/student/")
            .then((response) => {
                var filteredDepartment = response.data.filter((student) => student.department === this.state.department);
                this.setState({
                    curStudents: filteredDepartment,
                    studentFilter: filteredDepartment,
                    dataGridLoading: false,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    filterStudent(e) {
        let searchQueryArray = e.split(", ");
        // console.log(searchQueryArray);

        let categories = [];
        let queries = [];
        for (let searchQuery of searchQueryArray) {
            categories.push(searchQuery.split(": ")[0]);
            queries.push(searchQuery.split(": ")[1]);
        }

        let objArr = [];
        for (let i = 0; i < categories.length; i++) {
            let obj = {};
            obj[categories[i]] = queries[i];
            objArr.push(obj);
        }

        // console.log(categories);
        // console.log(queries);
        // console.log(filters);
        // console.log(objArr);
        // console.log(this.state.curStudents);

        let searchMap = objArr.reduce((result, current) => {
            return Object.assign(result, current);
        }, {});

        console.log(searchMap);

        // Search query must be in top to bottom order. E.g: lastName can't go after firstName
        // E.g.: firstName: peppermint, track: statistics
        // e.g.: track: operations research, gpa: 3

        let newStudentFilter = this.state.curStudents;
        if ("firstName" in searchMap) {
            newStudentFilter = newStudentFilter.filter(
                (student) => student.firstName.toUpperCase().indexOf(searchMap["firstName"].toUpperCase()) !== -1
            );
        }
        if ("lastName" in searchMap) {
            newStudentFilter = newStudentFilter.filter(
                (student) => student.lastName.toUpperCase().indexOf(searchMap["lastName"].toUpperCase()) !== -1
            );
        }
        if ("department" in searchMap) {
            newStudentFilter = newStudentFilter.filter(
                (student) => student.department.toUpperCase().indexOf(searchMap["department"].toUpperCase()) !== -1
            );
        }
        if ("track" in searchMap) {
            newStudentFilter = newStudentFilter.filter((student) => student.track.toUpperCase().indexOf(searchMap["track"].toUpperCase()) !== -1);
        }
        if ("gpa" in searchMap) {
            newStudentFilter = newStudentFilter.filter((student) => student.gpa >= searchMap["gpa"] - 0.1);
        }
        if ("projectOption" in searchMap) {
            newStudentFilter = newStudentFilter.filter(
                (student) => student.projectOption.toUpperCase().indexOf(searchMap["projectOption"].toUpperCase()) !== -1
            );
        }
        if ("entryYear" in searchMap) {
            newStudentFilter = newStudentFilter.filter(
                (student) => student.entryYear.toUpperCase().indexOf(searchMap["entryYear"].toUpperCase()) !== -1
            );
        }
        if ("gradYear" in searchMap) {
            newStudentFilter = newStudentFilter.filter(
                (student) => student.gradYear.toUpperCase().indexOf(searchMap["gradYear"].toUpperCase()) !== -1
            );
        }
        if ("graduated" in searchMap) {
            newStudentFilter = newStudentFilter.filter(
                (student) => student.graduated.toUpperCase().indexOf(searchMap["graduated"].toUpperCase()) !== -1
            );
        }

        // console.log(newStudentFilter);
        this.setState({ studentFilter: newStudentFilter });
    }

    cancelStudentSearch(e) {
        this.setState({ studentFilter: this.state.curStudents });
    }
    // lastName: Ren
    render() {
        return (
            <div
                style={{
                    height: 600,
                    width: "97%",
                    marginBottom: 100,
                    marginTop: 50,
                    marginLeft: 35,
                }}
            >
                <SearchBar
                    placeholder="Search by Student Name, ID, Courses, ..."
                    style={{ marginBottom: 10 }}
                    onRequestSearch={(student) => this.filterStudent(student)}
                    onCancelSearch={(e) => this.cancelStudentSearch(e)}
                    cancelOnEscape={true}
                />
                <Box style={{ height: "130%", backgroundColor: "#f1f0f0" }}>
                    <DataGrid
                        rows={this.state.studentFilter}
                        columns={columns}
                        pageSize={15}
                        disableSelectionOnClick={true}
                        autoPageSize={true}
                        loading={this.state.dataGridLoading}
                        onRowClick={(e) => this.props.changeFocusStudent(e)}
                    />
                </Box>
            </div>
        );
    }
}

export default StudentTable;
