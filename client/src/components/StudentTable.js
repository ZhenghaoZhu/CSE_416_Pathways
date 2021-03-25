import React, { Component } from "react";
import { DataGrid } from "@material-ui/data-grid";
import SearchBar from "material-ui-search-bar";
import Box from "@material-ui/core/Box";

const axios = require("axios").default;

var columns = [
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    { field: "department", headerName: "Department", width: 130 },
    { field: "track", headerName: "track", width: 130 },
    { field: "gpa", headerName: "GPA", type: "number", width: 80 },
    { field: "projectOption", headerName: "Project Option", width: 130 },
    { field: "facultyAdvisor", headerName: "Faculty Advisor", width: 130 },
    { field: "entryYear", headerName: "Entry Year", width: 130 },
    { field: "gradSem", headerName: "Graduating Semester", width: 130 },
    { field: "graduated", headerName: "Graduated", width: 110 },
];

class StudentTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curStudents: [],
            studentFilter: [],
        };
    }

    componentDidMount() {
        this.getStudents();
        console.log(this.state.curStudents);
    }

    getStudents() {
        axios
            .get("http://localhost:5000/student/")
            .then((response) => {
                this.setState({
                    curStudents: response.data,
                    studentFilter: response.data,
                });
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                console.log("After axios request:");
            });
    }

    filterStudent(e) {
        // this.setState({curCourses: this.state.curCourses.filter(course => course.courseName.includes(e))})
        var newStudentFilter = this.state.curStudents.filter((student) =>
            student.firstName.toUpperCase().includes(e.toUpperCase(), 0)
        );
        this.setState({ studentFilter: newStudentFilter });
    }

    cancelStudentSearch(e) {
        console.log(e);
        var allStudents = this.state.curStudents;
        this.setState({ studentFilter: allStudents });
    }

    render() {
        console.log(this.props);
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
                        disableSelectionOnClick="true"
                        // autoPageSize="true"
                        onRowClick={(e) => this.props.changeFocusStudent(e)}
                    />
                </Box>
            </div>
        );
    }
}

export default StudentTable;
