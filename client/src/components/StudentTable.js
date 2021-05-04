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
        var newStudentFilter = this.state.curStudents.filter((student) => student.firstName.toUpperCase().indexOf(e.toUpperCase()) !== -1);
        console.log(newStudentFilter);
        this.setState({ studentFilter: newStudentFilter });
    }

    cancelStudentSearch(e) {
        this.setState({ studentFilter: this.state.curStudents });
    }

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
